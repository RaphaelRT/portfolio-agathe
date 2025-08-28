#!/usr/bin/env node
/*
  Sanitize filenames in public/images:
  - remove diacritics
  - replace spaces and special characters with hyphens
  - lowercase file extensions
  - avoid collisions by suffixing -1, -2, ...
*/

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

/**
 * Returns true if the name corresponds to a media file we want to process
 */
function isMediaFile(fileName) {
  const lower = fileName.toLowerCase();
  if (lower === 'index.json') return false; // do not modify the generated index
  const exts = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.mov', '.avi', '.mkv'
  ];
  return exts.some(ext => lower.endsWith(ext));
}

/**
 * Remove accents, replace non-alphanumeric with hyphens, and compress
 */
function slugifyBaseName(baseName) {
  return baseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // diacritics
    .replace(/[\[\](){}]/g, ' ') // brackets/parentheses -> space
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$|\.+$/g, '')
    .replace(' copie', '')
    .replace('copie', '')
    .replace('-(?=\.[^.]+$)', '')
    .toLowerCase();
}

/**
 * Rename a file while avoiding collisions in the given directory
 */
async function renameWithCollisionAvoid(dir, currentName, targetBase, targetExt) {
  const targetExtLower = targetExt.toLowerCase();
  let candidate = `${targetBase}${targetExtLower}`;
  let counter = 1;
  while (true) {
    const targetPath = path.join(dir, candidate);
    if (!fs.existsSync(targetPath)) {
      await fs.promises.rename(path.join(dir, currentName), targetPath);
      return candidate;
    }
    candidate = `${targetBase}-${counter}${targetExtLower}`;
    counter += 1;
  }
}

async function processDirectory(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recurse into subdirectories but do not rename folders
      await processDirectory(fullPath);
      continue;
    }
    if (!isMediaFile(entry.name)) continue;

    const ext = path.extname(entry.name);
    const base = path.basename(entry.name, ext);
    const slug = slugifyBaseName(base);
    const extLower = ext.toLowerCase();

    // Skip if already clean
    const desiredName = `${slug}${extLower}`;
    if (desiredName === entry.name) continue;

    const finalName = await renameWithCollisionAvoid(dir, entry.name, slug, ext);
    console.log(`Renamed: ${path.relative(imagesDir, path.join(dir, entry.name))} -> ${path.relative(imagesDir, path.join(dir, finalName))}`);
  }
}

(async () => {
  try {
    if (!fs.existsSync(imagesDir)) {
      console.error(`Dossier introuvable: ${imagesDir}`);
      process.exit(1);
    }
    await processDirectory(imagesDir);
    console.log('Sanitisation terminée.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();



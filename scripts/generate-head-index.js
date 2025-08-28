#!/usr/bin/env node
/*
  Generate public/images/head/index.json listing media files in that folder.
  Output format:
  {
    "generatedAt": "ISO_DATE",
    "items": ["/images/head/file-1.jpg", "/images/head/file-2.webp", ...]
  }
*/

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const headDir = path.join(projectRoot, 'public', 'images', 'head');
const outputFile = path.join(headDir, 'index.json');

const allowed = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

function isMedia(fileName) {
  const lower = fileName.toLowerCase();
  if (lower === 'index.json') return false;
  return allowed.has(path.extname(lower));
}

(async () => {
  try {
    if (!fs.existsSync(headDir)) {
      console.error(`Folder not found: ${headDir}`);
      process.exit(1);
    }
    const entries = await fs.promises.readdir(headDir, { withFileTypes: true });
    const files = entries
      .filter(e => e.isFile() && isMedia(e.name))
      .map(e => path.posix.join('/images/head', e.name))
      .sort();

    const json = JSON.stringify({ generatedAt: new Date().toISOString(), items: files }, null, 2);
    await fs.promises.writeFile(outputFile, json, 'utf8');
    console.log(`Wrote: ${outputFile}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();



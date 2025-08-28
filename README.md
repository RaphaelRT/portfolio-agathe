## Agathe Minier — Portfolio (2025)

A modern, performant portfolio built with Next.js, showcasing the work of designer Agathe Minier with a mobile-first experience and curated media handling.

### Developed by

- Developed by: ROBERT Raphaël  
  Portfolio: [raphaelrbr.com](https://raphaelrbr.com/)  
  GitHub: [RaphaelRT](https://github.com/RaphaelRT)  
  LinkedIn: [raphael-rbrt](https://www.linkedin.com/in/raphael-rbrt/)

### Artist

- Artist: Agathe Minier  
  Contact: `+33 6 32 31 61 53` — `agatheminier.design@gmail.com`  
  Socials:  
  - Instagram: `@ag.type`  
  - LinkedIn: `Agathe Minier`

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript, ESLint
- Tailwind CSS for styling
- Node.js scripts for media sanitation and indexing

## Features

- Mobile-first mini carousels with touch navigation per project (no arrows on desktop; single next arrow on mobile mini carousels)
- Smart media handling: images and videos (`playsInline` to avoid auto full-screen on mobile)
- Automatic filename sanitation for assets in `public/images` (accents removed, spaces to hyphens, lowercase extensions, collision-safe)
- Optional media index for `public/images/head` used by the homepage to randomly pick a hero image

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The project currently uses a custom dev script that performs a build step and then launches the dev server with Turbopack. Visit `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

## Media Workflow

### 1) Sanitize image filenames

The repository includes a sanitizer for all media under `public/images` (recursive):

```bash
npm run images:sanitize
```

Rules applied:
- Remove diacritics/accents
- Replace spaces/special characters with hyphens
- Lowercase file extensions
- Remove trailing dashes before extensions
- Avoid filename collisions with numerical suffixes

### 2) Homepage head images index (optional)

The homepage can fetch a random image from `public/images/head` via a generated index:

```bash
npm run images:head:prepare
# runs: sanitize + generates /public/images/head/index.json
```

`src/app/page.tsx` will try to load `/images/head/index.json` and pick a random non-video asset; if not available, it falls back to curated slides.

## Project Structure (high level)

- `src/app/` — App Router pages (`page.tsx`, `work/`, `about/`)
- `src/components/` — UI components (`Carousel`, `Header`, `Footer`)
- `public/` — Static assets (images, svg, fonts)
- `scripts/` — Node scripts (`sanitize-images.js`, `generate-head-index.js`)

## Key Technical Decisions

- App Router with Client Components where needed (carousel, interactive sections)
- Touch-first mini carousels on mobile: per-project isolated sliders, 100% width, portrait vs landscape height control (`60vh` portrait with `object-contain`, `50vh` landscape with `object-cover`)
- Video playback controlled for mobile: `playsInline` and no autoplay in mini carousels to avoid unexpected full-screen behavior on some devices
- Sanitized filenames ensure reliable asset URLs and prevent deploy issues on case-sensitive or special-character-sensitive file systems

## Commands Reference

- `npm run dev` — Build then start dev server with Turbopack
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — Lint the codebase
- `npm run images:sanitize` — Sanitize all filenames in `public/images`
- `npm run images:head:prepare` — Sanitize images and generate `/images/head/index.json`

## License

This project is intended as a portfolio site. For reuse or contributions, please contact the developer or the artist.

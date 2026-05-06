# Magnus Landing

Marketing landing site for Magnus Chain. Built with Next.js 15 (App Router), statically exported, deployed to Cloudflare Pages.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Static output is written to `out/`.

## Deployment (Cloudflare Pages)

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 20

## Tech stack

- Next.js 15 — App Router, static export
- React 19
- TypeScript
- Tailwind v4 (`@tailwindcss/postcss`)
- Three.js — 3D background
- Motion (framer-motion) — entry animations

## Project structure

- `app/` — App Router pages and root layout
- `components/` — UI components
  - `components/sections/` — landing-page sections
- `lib/` — shared data and utilities
- `public/` — static assets

## Notes

- `metadataBase` and Open Graph URLs in `app/layout.tsx` use `https://magnus.network` as a placeholder. Replace with the real production domain before launch.

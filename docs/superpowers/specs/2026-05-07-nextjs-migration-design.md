# Magnus Landing — Vite → Next.js Migration

**Date:** 2026-05-07
**Status:** Approved (pending user review of this spec)
**Author:** brainstorming session

## Goal

Migrate the existing Magnus Chain single-page landing site from Vite to Next.js (App Router) with no visual or content changes, while:

- Preserving the existing design, copy, animations, and Three.js 3D background.
- Setting up the project to deploy as a fully static site on Cloudflare Pages.
- Lightly componentizing the inline sections in `App.tsx` so additional landing pages can be added later without a structural refactor.

This is an as-is migration with light componentization. No new features, no design changes.

## Why Next.js (over Gatsby)

Originally scoped as a Gatsby migration. Switched to Next.js after comparison:

- Gatsby v5 is in maintenance mode (Netlify acquired in 2023, slowed development); last major release in 2022; no React 19 support.
- Next.js is actively developed by Vercel, supports React 19, has the largest React ecosystem, and Cloudflare Pages has first-class Next.js support.
- The site has no GraphQL or content-sourcing needs, which is where Gatsby's data layer would have provided value.

Next.js with `output: 'export'` produces static HTML that drops onto Cloudflare Pages with no runtime.

## Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19 (preserved)
- **TypeScript:** preserved
- **Styling:** Tailwind v4 via `@tailwindcss/postcss` + Next.js built-in PostCSS support
- **Animations:** `motion` / framer-motion (preserved)
- **3D:** Three.js (preserved, version pinned)
- **Deployment:** Cloudflare Pages (static export)

## Rendering model

- All pages pre-rendered at build time (`output: 'export'`).
- Output: `out/` directory of static HTML/JS/CSS, served from CDN.
- No server runtime; no edge functions in v1.
- Escape hatch: if SSR/edge is ever needed, drop `output: 'export'` and adopt `@cloudflare/next-on-pages`.

## Server vs Client components

Default to server components. Mark `'use client'` only where required:

- `components/ThreeBackground.tsx` — uses `window`, `useEffect`, Three.js (browser-only)
- `components/sections/Hero.tsx` — uses `motion.div` from framer-motion
- `components/ThreeBackgroundClient.tsx` — wrapper boundary for `next/dynamic({ ssr: false })`

All other section components (`Gas`, `Gateway`, `Netting`, `EVM`), `Navbar`, and `Footer` remain server components — they ship zero client JS.

## File structure

```
magnus-landing/
├── app/
│   ├── layout.tsx              Root layout — metadata, fonts, Navbar, Footer
│   ├── page.tsx                Home page — composes section components
│   └── globals.css             Tailwind import + @theme block
├── components/
│   ├── Navbar.tsx              Server component
│   ├── Footer.tsx              Server component
│   ├── ThreeBackground.tsx     'use client' — Three.js scene
│   ├── ThreeBackgroundClient.tsx   'use client' wrapper, dynamic ssr:false
│   └── sections/
│       ├── Hero.tsx            'use client' (Motion)
│       ├── Gas.tsx
│       ├── Gateway.tsx
│       ├── Netting.tsx
│       └── EVM.tsx
├── lib/
│   └── data.ts                 Existing constants (preserved as-is)
├── public/
│   └── favicon.ico             Placeholder
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

Path alias `@/*` → project root (Next.js convention, matches current setup).

## Migration mapping

| Old | New |
|---|---|
| `index.html` | `app/layout.tsx` |
| `src/main.tsx` | (deleted — Next.js handles bootstrap) |
| `src/App.tsx` (inline sections) | `app/page.tsx` + `components/sections/*` |
| `src/components/Layout.tsx` | `components/Navbar.tsx` + `app/layout.tsx` (root container) |
| `src/components/ThreeBackground.tsx` | `components/ThreeBackground.tsx` + `ThreeBackgroundClient.tsx` |
| `src/lib/data.ts` | `lib/data.ts` |
| `src/index.css` | `app/globals.css` |
| `vite.config.ts` | `next.config.ts` |
| `tsconfig.json` | replaced with Next.js-flavored tsconfig |
| `metadata.json` | deleted (AI Studio artifact, unused) |
| `.env.example` | deleted (no env vars needed) |

## Tailwind v4 setup

`postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

`app/globals.css` — move existing CSS as-is, with one change: drop the Google Fonts `@import url(...)` line. Fonts move to `next/font/google` in `app/layout.tsx`:

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

Update the `@theme` block in `globals.css` so `--font-sans` and `--font-mono` reference the `next/font` CSS variables instead of literal font names:

```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;
  /* ...rest of @theme unchanged */
}
```

Apply both variables to the root in `layout.tsx`:
```tsx
<html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
```

Using distinct variable names (`--font-inter`, `--font-jetbrains`) instead of reusing `--font-sans`/`--font-mono` avoids name collisions between `next/font` and the `@theme` block.

### Package changes

**Remove:**
- `@google/genai` (unused)
- `dotenv` (unused)
- `express`, `@types/express` (unused)
- `tsx` (Vite-only)
- `autoprefixer` (Tailwind v4 includes its own)
- `@tailwindcss/vite` (Vite-only)
- `vite`, `@vitejs/plugin-react`

**Add:**
- `next` (^15)
- `@tailwindcss/postcss`
- `eslint`, `eslint-config-next`

**Keep:**
- `react`, `react-dom` (^19)
- `tailwindcss` (^4)
- `motion`
- `three`, `@types/three`
- `lucide-react`
- `typescript`, `@types/node`

## Three.js dynamic import

`components/ThreeBackground.tsx` — keep the existing Three.js scene logic verbatim; add `'use client'` at the top of the file.

`components/ThreeBackgroundClient.tsx`:

```tsx
"use client";
import dynamic from "next/dynamic";

export const ThreeBackgroundClient = dynamic(
  () => import("./ThreeBackground").then((m) => ({ default: m.ThreeBackground })),
  { ssr: false }
);
```

`app/page.tsx` imports and renders `ThreeBackgroundClient` (not `ThreeBackground` directly).

**Why two files:** `ssr: false` is only valid inside a client component; the wrapper is the client boundary, and it lazy-loads Three.js so the ~600KB `three` library is only fetched in the browser.

## Next.js config

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
```

`images: { unoptimized: true }` is required for static export — Next's image optimizer needs a runtime, which static export doesn't have. Future option: a Cloudflare Images custom loader, but YAGNI for v1.

## SEO metadata

In `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Magnus — The stablecoin blockchain",
  description: "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer. No destination gas fees.",
  metadataBase: new URL("https://magnus.network"),
  openGraph: {
    title: "Magnus — The stablecoin blockchain",
    description: "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
    url: "https://magnus.network",
    siteName: "Magnus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnus — The stablecoin blockchain",
    description: "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
  },
};
```

`metadataBase` uses `https://magnus.network` as a placeholder. To be replaced with the real production domain when known. The README will flag this.

## Cloudflare Pages deployment

**Build settings:**

- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Output directory: `out`
- Node version: 20

**`package.json` scripts:**

```json
{
  "dev": "next dev --port 3000",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

After `next build` with `output: 'export'`, all static files land in `out/`. Cloudflare Pages serves from there directly.

## What stays exactly the same

- All copy, all section content, all section ordering
- Three.js scene logic — geometry, materials, scroll-driven animation states
- Tailwind theme colors (`--color-brand`, `--color-brand-light`, `--color-bg`, etc.)
- Motion animations on Hero
- All data in `lib/data.ts`
- Visual design and layout — pixel-equivalent output

## What gets deleted

- `vite.config.ts`
- `index.html`
- `metadata.json`
- `src/main.tsx`
- `src/index.css` (content moves to `app/globals.css`)
- `.env.example`
- The `src/` directory after content migrates out
- Vite-specific dependencies listed under "Package changes → Remove"

## Open items / placeholders

- **Production domain** for `metadataBase` and Open Graph URLs — currently `https://magnus.network` placeholder. To be confirmed.
- **Favicon** — currently a placeholder `favicon.ico`. Real asset to be added when available.
- **OG image** — none yet; can be added later as `app/opengraph-image.tsx` or static file.

## Out of scope

- New pages (`/developers`, `/blog`, etc.) — file structure supports them, but not built in this migration.
- Analytics, A/B testing, CMS integration.
- Internationalization.
- Cloudflare Images integration.
- React 19 feature adoption (`use()`, server actions, etc.).

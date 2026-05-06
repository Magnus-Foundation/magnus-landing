# Magnus Landing — Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Magnus Chain landing site from Vite to Next.js 15 (App Router) with no visual or content changes, deployed as a static export to Cloudflare Pages.

**Architecture:** Next.js App Router with `output: 'export'` for static generation. Existing inline sections in `App.tsx` are split into focused server components under `components/sections/`. Three.js background uses `next/dynamic({ ssr: false })` to avoid SSR issues. Tailwind v4 with `@tailwindcss/postcss`. Fonts loaded via `next/font/google`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, Three.js, Motion (framer-motion).

**Spec:** [`docs/superpowers/specs/2026-05-07-nextjs-migration-design.md`](../specs/2026-05-07-nextjs-migration-design.md)

---

## Notes for the executing engineer

- The "tests" for this migration are TypeScript compilation, Next.js build success, and visual verification in the dev server. Traditional unit tests don't apply to a static-content migration.
- The current project is **not a git repository**. Task 0 initializes git. The user has set a preference to be **asked before each commit** — surface a yes/no prompt at every commit step in this plan.
- During the migration, the old `src/` directory and `vite.config.ts` etc. will coexist with the new `app/` and `components/` directories. They're cleaned up in Task 13. Next.js ignores `src/` since we don't use it for routing.
- Use `pnpm` if available, otherwise `npm`. Examples below use `npm`.

---

## Task 0: Initialize git

**Files:**
- Create: `.git/` (via `git init`)

- [ ] **Step 1: Confirm with user before initializing git**

Prompt: "About to run `git init` in `/Users/james/projects/reactjs/magnus-landing`. OK to proceed?"

- [ ] **Step 2: Initialize git repo**

```bash
git init
git branch -m main
```

- [ ] **Step 3: Stage and commit existing Vite project as baseline**

Confirm with user before committing.

```bash
git add -A
git commit -m "chore: snapshot pre-migration Vite project"
```

---

## Task 1: Set up package.json with Next.js dependencies

**Files:**
- Modify: `package.json`
- Create: `.gitignore` (replace existing)

- [ ] **Step 1: Replace `package.json` contents**

```json
{
  "name": "magnus-landing",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.184.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.14",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.184.0",
    "eslint": "^9",
    "eslint-config-next": "^15.0.0",
    "tailwindcss": "^4.1.14",
    "typescript": "^5.8.2"
  }
}
```

- [ ] **Step 2: Replace `.gitignore`**

```
# dependencies
node_modules/
.pnp
.pnp.*

# testing
coverage/

# next.js
.next/
out/

# production
build/
dist/

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts

# vite leftovers (will be deleted in Task 13)
```

- [ ] **Step 3: Install dependencies**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: install completes without errors, generates `package-lock.json` and `node_modules/`.

- [ ] **Step 4: Commit**

Confirm with user before committing.

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: switch dependencies to Next.js 15"
```

---

## Task 2: Create Next.js config files

**Files:**
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Modify: `tsconfig.json` (replace contents)

- [ ] **Step 1: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
```

- [ ] **Step 2: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 3: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "src"]
}
```

Note: `"src"` is added to `exclude` so old Vite files don't break typechecking during migration. Removed in Task 13.

- [ ] **Step 4: Verify typecheck passes (will fail — no app yet)**

Run: `npm run typecheck`
Expected: passes (no app/ files yet, nothing to typecheck).

- [ ] **Step 5: Commit**

Confirm with user before committing.

```bash
git add next.config.ts postcss.config.mjs tsconfig.json
git commit -m "chore: add Next.js + Tailwind v4 + TS config"
```

---

## Task 3: Migrate globals.css

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/globals.css`**

This is `src/index.css` with three changes: drop the Google Fonts `@import` (replaced by `next/font` in Task 5), update `--font-sans`/`--font-display`/`--font-mono` to reference `next/font` CSS variables.

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;

  --color-brand: #0F172A;
  --color-brand-light: #2563EB;
  --color-accent: #2563EB;
  --color-gold: #B45309;
  --color-green: #059669;
  --color-red: #DC2626;

  --color-bg: #FFFFFF;
  --color-surface: #F8FAFC;
  --color-surface-hover: #F1F5F9;
  --color-border: #E2E8F0;

  --color-text-main: #0F172A;
  --color-text-muted: #475569;
  --color-text-dim: #94A3B8;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-main);
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-dim);
}
```

- [ ] **Step 2: Commit**

Confirm with user before committing.

```bash
git add app/globals.css
git commit -m "feat: add Tailwind v4 theme and globals"
```

---

## Task 4: Migrate `lib/data.ts`

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Copy `src/lib/data.ts` to `lib/data.ts` verbatim**

```bash
mkdir -p lib
cp src/lib/data.ts lib/data.ts
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 3: Commit**

Confirm with user before committing.

```bash
git add lib/data.ts
git commit -m "feat: move data constants to lib/"
```

---

## Task 5: Create `components/Navbar.tsx`

**Files:**
- Create: `components/Navbar.tsx`

The Navbar is currently inline inside `src/components/Layout.tsx`. Extract verbatim.

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-brand flex items-center justify-center rounded-sm">
          <div className="w-2 h-2 bg-bg rounded-sm" />
        </div>
        <span className="font-display font-medium text-lg tracking-tight">Magnus</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm text-text-muted">
        <a href="#gas" className="hover:text-brand-light transition-colors">sys.gas</a>
        <a href="#gateway" className="hover:text-brand-light transition-colors">sys.gateway</a>
        <a href="#netting" className="hover:text-brand-light transition-colors">sys.netting</a>
        <a href="#evm" className="hover:text-brand-light transition-colors">bin.init</a>
      </div>
      <div>
        <a
          href="#docs"
          className="font-mono text-xs uppercase tracking-widest bg-brand/5 border border-brand/20 px-4 py-2 rounded text-brand hover:bg-brand hover:text-white transition-all"
        >
          Read Docs
        </a>
      </div>
    </header>
  );
}
```

No `'use client'` directive — Navbar is a server component.

- [ ] **Step 2: Commit**

Confirm with user before committing.

```bash
git add components/Navbar.tsx
git commit -m "feat: extract Navbar component"
```

---

## Task 6: Create `components/Footer.tsx`

**Files:**
- Create: `components/Footer.tsx`

The footer is currently inline at the bottom of `src/App.tsx`. Extract verbatim.

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-12 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm text-text-muted">
        <div className="flex gap-4 items-center">
          <span className="text-brand font-medium flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-brand-light" />
            Magnus Network
          </span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-light transition">Twitter</a>
          <a href="#" className="hover:text-brand-light transition">Docs</a>
          <a href="#" className="hover:text-brand-light transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
```

No `'use client'`.

- [ ] **Step 2: Commit**

Confirm with user before committing.

```bash
git add components/Footer.tsx
git commit -m "feat: extract Footer component"
```

---

## Task 7: Create `app/layout.tsx`

**Files:**
- Create: `app/layout.tsx`

This replaces `index.html`, `src/main.tsx`, and the outer `<Layout>` wrapper from `src/components/Layout.tsx`. It owns: `<html>`, `<body>`, fonts, metadata, Navbar, Footer.

- [ ] **Step 1: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Magnus — The stablecoin blockchain",
  description:
    "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer. No destination gas fees.",
  metadataBase: new URL("https://magnus.network"),
  openGraph: {
    title: "Magnus — The stablecoin blockchain",
    description:
      "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
    url: "https://magnus.network",
    siteName: "Magnus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnus — The stablecoin blockchain",
    description:
      "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-bg text-text-main flex flex-col font-sans overflow-x-hidden selection:bg-brand-light/20 selection:text-brand-light">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

Note: The original `src/App.tsx` puts the Footer inside its own `<footer>` after the main content. Moving Footer into the root layout is a small structural change — Footer now lives outside the main scrollable content but is still positioned correctly (it has `relative z-10`). If Footer placement breaks the visual design (e.g., relative to the Three.js canvas), move Footer rendering back into `app/page.tsx` instead.

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 3: Commit**

Confirm with user before committing.

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with metadata + fonts"
```

---

## Task 8: Migrate Three.js components

**Files:**
- Create: `components/ThreeBackground.tsx`
- Create: `components/ThreeBackgroundClient.tsx`

- [ ] **Step 1: Copy existing Three.js code to `components/ThreeBackground.tsx`**

Copy `src/components/ThreeBackground.tsx` verbatim, then add `'use client';` as the first line of the file:

```bash
cp src/components/ThreeBackground.tsx components/ThreeBackground.tsx
```

Then prepend `'use client';\n\n` to the top of `components/ThreeBackground.tsx`. The first lines should read:

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// ...rest of file unchanged
```

- [ ] **Step 2: Create `components/ThreeBackgroundClient.tsx`**

```tsx
"use client";
import dynamic from "next/dynamic";

export const ThreeBackgroundClient = dynamic(
  () =>
    import("./ThreeBackground").then((m) => ({ default: m.ThreeBackground })),
  { ssr: false }
);
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 4: Commit**

Confirm with user before committing.

```bash
git add components/ThreeBackground.tsx components/ThreeBackgroundClient.tsx
git commit -m "feat: add Three.js background with dynamic SSR=false wrapper"
```

---

## Task 9: Create `components/sections/Hero.tsx`

**Files:**
- Create: `components/sections/Hero.tsx`

Extract Hero section verbatim from `src/App.tsx` (lines ~25-47). Hero uses `motion.div` so it's a client component.

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 w-full min-h-[90vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-brand leading-[1.05] mb-8">
          The stablecoin <br />
          <span className="text-text-muted">blockchain.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-12">
          The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.
          No destination gas fees. Global liquidity lives here, and routes seamlessly everywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#docs"
            className="bg-brand-light text-white px-8 py-4 rounded font-medium hover:bg-brand transition text-center shadow-lg shadow-brand/10"
          >
            Read Documentation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 3: Commit**

Confirm with user before committing.

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 10: Create remaining section components

**Files:**
- Create: `components/sections/SectionLabel.tsx`
- Create: `components/sections/Gas.tsx`
- Create: `components/sections/Gateway.tsx`
- Create: `components/sections/Netting.tsx`
- Create: `components/sections/EVM.tsx`

These are all server components (no client interactivity). The `SectionLabel` helper from `src/App.tsx` is shared across multiple sections, so extract it once.

- [ ] **Step 1: Create `components/sections/SectionLabel.tsx`**

```tsx
export function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-sm text-text-muted">{num}</span>
      <span className="block w-8 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/sections/Gas.tsx`**

```tsx
import { SectionLabel } from "./SectionLabel";

const FEATURES = [
  { title: "FX Oracle", desc: "On-chain FX translation with strong outlier filtering for accurate fee metering." },
  { title: "Auto-Resolve", desc: "Wallet-inferred fee token resolution allows seamless transactions for the user." },
  { title: "EVM Ready", desc: "Vanilla EVM wallets work natively with stablecoin fee deduction." },
];

export function Gas() {
  return (
    <section id="gas" className="py-24 border-t border-border overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <SectionLabel num="01" label="Gas Mechanism" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
          Multi-Currency Gas
        </h2>

        <div className="mb-12">
          <p className="text-lg text-text-muted leading-relaxed">
            Pay gas in any stablecoin—no native gas token required. Validators receive direct credit in the chosen currency, eliminating swaps and slippage.
          </p>
        </div>

        <div className="mt-8">
          <div className="space-y-8">
            {FEATURES.map((item, idx) => (
              <div key={idx} className="border-t border-border/40 pt-6">
                <h3 className="font-medium text-brand text-lg mb-2">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/Gateway.tsx`**

```tsx
import { SectionLabel } from "./SectionLabel";

const RAILS = [
  { name: "VietQR", region: "VN", type: "Instant Payment" },
  { name: "M-Pesa", region: "KE", type: "Mobile Money" },
  { name: "GCash", region: "PH", type: "E-Wallet" },
  { name: "UPI", region: "IN", type: "Real-time Payment" },
  { name: "PIX", region: "BR", type: "Instant Payment" },
];

export function Gateway() {
  return (
    <section id="gateway" className="py-24 border-t border-border relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <SectionLabel num="02" label="Fiat Rails" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
          Native Gateway Protocol
        </h2>

        <div className="mb-12">
          <p className="text-lg text-text-muted leading-relaxed">
            Native fiat rail integration. <strong className="text-brand font-medium">MGP</strong> offers gateway precompiles, on-chain escrow, and slashable settlement attestations.
          </p>
        </div>

        <div className="mt-8">
          <div className="border-y border-border/40 divide-y divide-border/40">
            {RAILS.map((rail) => (
              <div key={rail.name} className="flex justify-between items-center py-4 group">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-dim w-8 group-hover:text-brand-light/70 transition-colors">{rail.region}</span>
                  <span className="font-medium text-brand group-hover:text-brand-light transition-colors">{rail.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted hidden sm:block">{rail.type}</span>
                  <span className="font-mono text-[10px] text-green tracking-widest">ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-l-2 border-brand-light/30 pl-4 py-1 mt-12">
          <p className="text-sm text-text-dim">
            Protocol primitives, not application-layer wrappers. Integrated with Magnus Bridge Standard (MBS).
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/sections/Netting.tsx`**

```tsx
import { SectionLabel } from "./SectionLabel";

export function Netting() {
  return (
    <section id="netting" className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative">
        <SectionLabel num="03" label="Liquidity Routing" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
          Multilateral Netting
        </h2>

        <div className="mb-12">
          <p className="text-lg text-text-muted leading-relaxed">
            Our <span className="text-brand font-medium">90%+ netting target</span> means most cross-chain transfers never hit a bridge — they net out. This fundamental shift in routing mechanics makes gas-free outbound sends sustainable, as the protocol covers destination gas using netting savings.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-border/40">
          <div className="space-y-6">
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest border-b border-border/40 pb-4">Legacy Bridges</div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-text-dim">Topology</span> <span className="text-text-muted">N² Connections</span></div>
              <div className="flex justify-between"><span className="text-text-dim">Efficiency</span> <span className="text-text-muted">High rebalancing costs</span></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-[10px] text-brand-light uppercase tracking-widest border-b border-brand-light/20 pb-4 flex justify-between">
              <span>Magnus Protocol</span>
              <span className="text-green text-[10px]">90% NET</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-text-dim">Topology</span> <span className="text-brand">Hub-and-Spoke</span></div>
              <div className="flex justify-between"><span className="text-text-dim">Efficiency</span> <span className="text-brand">Internalized savings</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/sections/EVM.tsx`**

```tsx
import { SectionLabel } from "./SectionLabel";

const FEATURES = [
  { title: "High-Performance Execution", desc: "Standard EVM execution environment. Fully compatible with standard Solidity tooling out of the box." },
  { title: "Optimized Consensus", desc: "Delivers ~200ms blocks with ~300ms deterministic finality." },
  { title: "MEV Protection", desc: "No public mempool. First-come-first-serve ordering natively guarantees no front-running." },
  { title: "Isolated Resource Pools", desc: "Advanced token standard with dedicated payment lanes to prevent noisy-neighbor contention." },
];

export function EVM() {
  return (
    <section id="evm" className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <SectionLabel num="04" label="Performance" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
          Standard EVM. <br />
          Sub-second finality.
        </h2>

        <div className="mt-8">
          <div className="space-y-8">
            {FEATURES.map((item, idx) => (
              <div key={idx} className="border-t border-border/40 pt-6">
                <h3 className="font-medium text-brand text-lg mb-2">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 7: Commit**

Confirm with user before committing.

```bash
git add components/sections/
git commit -m "feat: add Gas, Gateway, Netting, EVM section components"
```

---

## Task 11: Create `app/page.tsx`

**Files:**
- Create: `app/page.tsx`

Page composition. Replaces the body of `src/App.tsx`'s return.

- [ ] **Step 1: Create `app/page.tsx`**

```tsx
import { ThreeBackgroundClient } from "@/components/ThreeBackgroundClient";
import { Hero } from "@/components/sections/Hero";
import { Gas } from "@/components/sections/Gas";
import { Gateway } from "@/components/sections/Gateway";
import { Netting } from "@/components/sections/Netting";
import { EVM } from "@/components/sections/EVM";

export default function Home() {
  return (
    <>
      <ThreeBackgroundClient />
      <div className="relative w-full lg:w-[55vw] z-10 flex flex-col bg-bg/80 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-md">
        <Hero />
        <Gas />
        <Gateway />
        <Netting />
        <EVM />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 3: Commit**

Confirm with user before committing.

```bash
git add app/page.tsx
git commit -m "feat: compose home page from section components"
```

---

## Task 12: Verify dev server and static export build

**Files:** none

- [ ] **Step 1: Run dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`. No errors in terminal.

- [ ] **Step 2: Manual visual verification**

Open `http://localhost:3000` in a browser. Verify:
- Page loads with no console errors.
- Three.js background renders (3D lens visible, scrolling animates it through 5 states).
- All 4 sections (Gas, Gateway, Netting, EVM) display.
- Navbar shows "Magnus" logo + 4 nav links + "Read Docs" button.
- Footer shows "Magnus Network" + Twitter/Docs/GitHub links.
- Fonts: Inter for body, JetBrains Mono for nav/labels.
- Theme colors match (white background, dark navy `#0F172A` brand text, blue `#2563EB` accents).

If any of these fail, stop and report. Do not proceed to step 3.

- [ ] **Step 3: Stop dev server, run static export build**

Run: `npm run build`
Expected: build succeeds. Output: `out/` directory created with `index.html`, `_next/` static assets, etc.

If build fails with `window is not defined`, the issue is the Three.js component leaking out of the dynamic-import boundary. Verify `app/page.tsx` imports `ThreeBackgroundClient` (not `ThreeBackground`).

- [ ] **Step 4: Verify static export output**

Run: `ls out/`
Expected: directory exists, contains `index.html` and `_next/`.

Optional: serve locally to test the static output:
```bash
npx serve out
```
Open the URL — should look identical to the dev server.

- [ ] **Step 5: Commit lockfile changes (if any)**

Confirm with user before committing.

```bash
git add -A
git commit -m "chore: verified dev + static export build"
```

(May be a no-op commit if nothing changed; that's fine — skip the commit if `git status` shows no changes.)

---

## Task 13: Clean up old Vite files

**Files:**
- Delete: `src/`, `vite.config.ts`, `index.html`, `metadata.json`, `.env.example`
- Modify: `tsconfig.json` (remove `"src"` from exclude)

- [ ] **Step 1: Delete Vite-era files**

Confirm with user before deleting.

```bash
rm -rf src/
rm vite.config.ts index.html metadata.json .env.example
```

- [ ] **Step 2: Remove `"src"` from `tsconfig.json` exclude**

Edit `tsconfig.json`. Change:
```json
"exclude": ["node_modules", "src"]
```
to:
```json
"exclude": ["node_modules"]
```

- [ ] **Step 3: Verify everything still works**

```bash
npm run typecheck
npm run build
```
Both expected to pass.

- [ ] **Step 4: Commit**

Confirm with user before committing.

```bash
git add -A
git commit -m "chore: remove Vite-era files"
```

---

## Task 14: Update README.md

**Files:**
- Modify: `README.md` (replace contents)

- [ ] **Step 1: Replace `README.md`**

```markdown
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
```

- [ ] **Step 2: Commit**

Confirm with user before committing.

```bash
git add README.md
git commit -m "docs: update README for Next.js + Cloudflare Pages"
```

---

## Final verification

- [ ] **Run full check**

```bash
npm run typecheck
npm run lint
npm run build
```
All three should pass.

- [ ] **Visual diff against original**

Compare the dev server output (or `out/index.html` opened in browser) against the original Vite app screenshots. Pay attention to:
- Three.js scene appearance and scroll-driven animation.
- Hero entry animation.
- Section borders, spacing, typography.
- Navbar fixed-position behavior.
- Footer position.

If anything looks different, surface to user — don't try to "fix" it without checking the design.

---

## Summary of files after migration

```
magnus-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ThreeBackground.tsx
│   ├── ThreeBackgroundClient.tsx
│   └── sections/
│       ├── EVM.tsx
│       ├── Gas.tsx
│       ├── Gateway.tsx
│       ├── Hero.tsx
│       ├── Netting.tsx
│       └── SectionLabel.tsx
├── lib/
│   └── data.ts
├── public/                  (empty for now)
├── docs/
│   └── superpowers/
│       ├── specs/2026-05-07-nextjs-migration-design.md
│       └── plans/2026-05-07-nextjs-migration.md
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── tsconfig.json
```

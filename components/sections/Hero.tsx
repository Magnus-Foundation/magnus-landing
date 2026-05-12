"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-56 md:pb-32 w-full min-h-[90vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-text-main leading-[1.05] mb-8">
          The settlement layer <br />
          <span className="text-text-muted">for stablecoins.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-12">
          One settlement layer for the world&apos;s stablecoins. Magnus unifies chains, banks,
          and rails. No destination gas. Instant global routing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <a
            href="https://docs.magnuschain.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-bg px-8 py-4 rounded-sm font-semibold hover:bg-brand-light transition-colors text-center text-sm cursor-pointer"
          >
            Read Documentation
          </a>
          <a
            href="https://docs.magnuschain.xyz/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-text-muted px-8 py-4 rounded-sm font-mono text-xs uppercase tracking-widest hover:border-brand/40 hover:text-brand transition-all text-center cursor-pointer"
          >
            Try Devnet →
          </a>
        </div>

        {/* Devnet info block */}
        <div className="font-mono text-xs text-text-muted bg-surface border border-border rounded-sm px-4 py-3 inline-flex flex-col gap-1.5">
          <div><span className="text-text-dim mr-3">Network</span><span className="text-brand">Staccato (Devnet)</span></div>
          <div><span className="text-text-dim mr-3">RPC    </span><span className="text-text-muted">staccato-rpc.magnuschain.xyz</span></div>
          <div><span className="text-text-dim mr-3">Explorer</span><span className="text-text-muted">devnet.magnuschain.xyz</span></div>
        </div>
      </motion.div>
    </section>
  );
}

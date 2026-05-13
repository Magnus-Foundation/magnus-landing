"use client";

import { AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow } from "../SectionAnimations";

const FEATURES = [
  { key: "high-performance", label: "High-Performance Execution", desc: "Standard EVM execution environment. Fully compatible with standard Solidity tooling out of the box." },
  { key: "consensus",        label: "Optimized Consensus",        desc: "Delivers ~200ms blocks with ~300ms deterministic finality." },
  { key: "mev",              label: "MEV Protection",             desc: "No public mempool. First-come-first-serve ordering natively guarantees no front-running." },
  { key: "isolation",        label: "Isolated Resource Pools",    desc: "Advanced token standard with dedicated payment lanes to prevent noisy-neighbor contention." },
];

export function EVM() {
  return (
    <section id="evm" className="relative z-10 py-24 border-t border-brand/20">
      <AnimLabel>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand mb-8">
          // 04 — PERFORMANCE
        </div>
      </AnimLabel>

      <AnimHeading className="mb-10">
        <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1.1] text-text-main">
          Standard EVM.<br />Sub-second finality.
        </h2>
      </AnimHeading>

      <AnimBody className="mb-6">
        <span className="font-mono text-sm text-brand/70">$ magnus query performance --verbose</span>
      </AnimBody>

      <AnimRows className="space-y-5">
        {FEATURES.map((f) => (
          <AnimRow key={f.key} className="flex gap-3">
            <span className="text-brand mt-0.5 flex-shrink-0 select-none">◆</span>
            <div>
              <div className="font-mono text-sm font-bold text-text-main mb-1">{f.label}</div>
              <div className="font-mono text-xs text-white/40 leading-relaxed">{f.desc}</div>
            </div>
          </AnimRow>
        ))}
      </AnimRows>
    </section>
  );
}

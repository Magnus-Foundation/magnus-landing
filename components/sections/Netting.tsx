"use client";

import { AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow } from "../SectionAnimations";

const COMPARISON = [
  { key: "topology",     legacy: "N² connections",    magnus: "hub-and-spoke",        highlight: false },
  { key: "efficiency",   legacy: "high rebalancing",  magnus: "internalized savings",  highlight: false },
  { key: "netting_rate", legacy: "~0%",               magnus: "90%+",                  highlight: true  },
];

export function Netting() {
  return (
    <section id="netting" className="relative z-10 py-24 border-t border-brand/20">
      <AnimLabel>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand mb-8">
          // 03 — LIQUIDITY ROUTING
        </div>
      </AnimLabel>

      <AnimHeading className="mb-10">
        <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
          Multilateral Netting
        </h2>
      </AnimHeading>

      <AnimBody className="mb-6">
        <span className="font-mono text-sm text-brand/70">$ magnus compare --module netting --vs legacy</span>
      </AnimBody>

      <AnimBody className="mb-8">
        <p className="font-mono text-xs text-white/40 leading-relaxed max-w-2xl">
          Our <span className="text-brand">90%+ netting target</span> means most cross-chain
          transfers never hit a bridge — they net out. Gas-free outbound sends are sustainable
          because the protocol covers destination gas using netting savings.
        </p>
      </AnimBody>

      {/* Column headers */}
      <AnimBody className="mb-2">
        <div className="font-mono text-[10px] grid gap-4" style={{ gridTemplateColumns: "9rem 1fr 1fr" }}>
          <span className="text-white/20"></span>
          <span className="text-white/30 uppercase tracking-widest">Legacy</span>
          <span className="text-brand/70 uppercase tracking-widest">Magnus</span>
        </div>
        <div className="font-mono text-[10px] text-white/10 mt-1 mb-3">
          {"─────────────  ────────────────────  ────────────────────"}
        </div>
      </AnimBody>

      <AnimRows className="space-y-2">
        {COMPARISON.map((row) => (
          <AnimRow key={row.key}>
            <div className="font-mono text-sm grid gap-4 items-baseline" style={{ gridTemplateColumns: "9rem 1fr 1fr" }}>
              <span className="text-white/30 text-xs">{row.key}</span>
              <span className="text-white/30 text-xs">{row.legacy}</span>
              <span className={`text-xs font-bold ${row.highlight ? "text-green" : "text-text-main"}`}>
                {row.magnus}
                {row.highlight && " ✓"}
              </span>
            </div>
          </AnimRow>
        ))}
      </AnimRows>
    </section>
  );
}

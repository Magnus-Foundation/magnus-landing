"use client";

import { AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow } from "../SectionAnimations";

const RAILS = [
  { region: "VN", name: "VietQR", type: "Instant Payment" },
  { region: "KE", name: "M-Pesa", type: "Mobile Money" },
  { region: "PH", name: "GCash",  type: "E-Wallet" },
  { region: "IN", name: "UPI",    type: "Real-time Payment" },
  { region: "BR", name: "PIX",    type: "Instant Payment" },
];

export function Gateway() {
  return (
    <section id="gateway" className="relative z-10 py-24 border-t border-brand/20">
      <AnimLabel>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand mb-8">
          // 02 — FIAT RAILS
        </div>
      </AnimLabel>

      <AnimHeading className="mb-10">
        <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
          Native Gateway Protocol
        </h2>
      </AnimHeading>

      <AnimBody className="mb-6">
        <span className="font-mono text-sm text-brand/70">$ magnus list rails --status</span>
      </AnimBody>

      <AnimBody className="mb-8">
        <p className="font-mono text-xs text-white/40 leading-relaxed max-w-2xl">
          Native fiat rail integration.{" "}
          <span className="text-brand">MGP</span> offers gateway precompiles,
          on-chain escrow, and slashable settlement attestations.
        </p>
      </AnimBody>

      <AnimRows className="space-y-3">
        {RAILS.map((rail) => (
          <AnimRow key={rail.region} className="flex items-center gap-3">
            <span className="text-green select-none flex-shrink-0">✓</span>
            <span className="font-mono text-sm font-bold text-text-main w-24">{rail.name}</span>
            <span className="font-mono text-xs text-white/30 w-8">{rail.region}</span>
            <span className="font-mono text-xs text-white/40 flex-1">{rail.type}</span>
            <span className="font-mono text-[10px] text-green tracking-widest">ACTIVE</span>
          </AnimRow>
        ))}
      </AnimRows>

      <AnimBody className="mt-8">
        <p className="font-mono text-[11px] text-white/25 leading-relaxed">
          <span className="text-brand/40">›</span>{"  "}Protocol primitives, not application-layer wrappers.
          Integrated with Magnus Bridge Standard (MBS).
        </p>
      </AnimBody>
    </section>
  );
}

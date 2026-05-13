"use client";

import { AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow } from "../SectionAnimations";

const FEATURES = [
  { key: "multi-currency-gas",  label: "Multi-Currency Gas",  desc: "Pay gas in any stablecoin — no native gas token required. Validators receive direct credit in the chosen currency, eliminating swaps and slippage." },
  { key: "fx-oracle",           label: "FX Oracle",           desc: "On-chain FX translation with strong outlier filtering for accurate fee metering." },
  { key: "auto-resolve",        label: "Auto-Resolve",        desc: "Wallet-inferred fee token resolution allows seamless transactions for the user." },
  { key: "evm-ready",           label: "EVM Ready",           desc: "Vanilla EVM wallets work natively with stablecoin fee deduction." },
];

export function Gas() {
  return (
    <section id="gas" className="relative z-10 py-24 border-t border-brand/20">
      <AnimLabel>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand mb-8">
          // 01 — GAS MECHANISM
        </div>
      </AnimLabel>

      <AnimHeading className="mb-10">
        <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
          Multi-Currency Gas
        </h2>
      </AnimHeading>

      <AnimBody className="mb-6">
        <span className="font-mono text-sm text-brand/70">$ magnus query gas</span>
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

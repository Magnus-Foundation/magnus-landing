"use client";

import { SectionLabel } from "./SectionLabel";
import {
  SectionContainer, AnimLabel, AnimHeading, AnimRows, AnimRow,
} from "../SectionAnimations";

const FEATURES = [
  { title: "Multi-Currency Gas", desc: "Pay gas in any stablecoin — no native gas token required. Validators receive direct credit in the chosen currency, eliminating swaps and slippage." },
  { title: "FX Oracle", desc: "On-chain FX translation with strong outlier filtering for accurate fee metering." },
  { title: "Auto-Resolve", desc: "Wallet-inferred fee token resolution allows seamless transactions for the user." },
  { title: "EVM Ready", desc: "Vanilla EVM wallets work natively with stablecoin fee deduction." },
];

export function Gas() {
  return (
    <section id="gas" className="relative z-10 py-24 border-t border-brand/20 overflow-hidden">
      <SectionContainer>
        <AnimLabel>
          <SectionLabel num="01" label="Gas Mechanism" />
        </AnimLabel>

        <AnimHeading className="mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
            Multi-Currency Gas
          </h2>
        </AnimHeading>

        <AnimRows className="border border-brand/20">
          {FEATURES.map((item, i) => (
            <AnimRow
              key={item.title}
              className={`p-6 group hover:bg-brand/5 transition-colors ${i > 0 ? "border-t border-brand/20" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] tracking-widest text-brand/40 mt-1 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-brand mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </AnimRow>
          ))}
        </AnimRows>
      </SectionContainer>
    </section>
  );
}

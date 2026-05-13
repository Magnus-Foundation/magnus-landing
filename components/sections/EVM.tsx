"use client";

import { SectionLabel } from "./SectionLabel";
import {
  SectionContainer, AnimLabel, AnimHeading, AnimRows, AnimRow,
} from "../SectionAnimations";

const FEATURES = [
  { title: "High-Performance Execution", desc: "Standard EVM execution environment. Fully compatible with standard Solidity tooling out of the box." },
  { title: "Optimized Consensus",         desc: "Delivers ~200ms blocks with ~300ms deterministic finality." },
  { title: "MEV Protection",              desc: "No public mempool. First-come-first-serve ordering natively guarantees no front-running." },
  { title: "Isolated Resource Pools",     desc: "Advanced token standard with dedicated payment lanes to prevent noisy-neighbor contention." },
];

export function EVM() {
  return (
    <section id="evm" className="relative z-10 py-24 border-t border-brand/20">
      <SectionContainer>
        <AnimLabel>
          <SectionLabel num="04" label="Performance" />
        </AnimLabel>

        <AnimHeading className="mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
            Standard EVM.<br />Sub-second finality.
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

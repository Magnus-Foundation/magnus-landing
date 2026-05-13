"use client";

import { SectionLabel } from "./SectionLabel";
import {
  SectionContainer, AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow,
} from "../SectionAnimations";

const COMPARISON = [
  {
    side: "Legacy Bridges",
    accent: false,
    badge: null,
    rows: [
      { label: "Topology",   value: "N² Connections" },
      { label: "Efficiency", value: "High rebalancing costs" },
    ],
  },
  {
    side: "Magnus Protocol",
    accent: true,
    badge: "90% NET",
    rows: [
      { label: "Topology",   value: "Hub-and-Spoke" },
      { label: "Efficiency", value: "Internalized savings" },
    ],
  },
];

export function Netting() {
  return (
    <section id="netting" className="relative z-10 py-24 border-t border-brand/20">
      <SectionContainer>
        <AnimLabel>
          <SectionLabel num="03" label="Liquidity Routing" />
        </AnimLabel>

        <AnimHeading className="mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
            Multilateral Netting
          </h2>
        </AnimHeading>

        <AnimBody className="mb-12">
          <p className="font-mono text-sm text-text-muted leading-relaxed max-w-xl">
            Our <span className="text-brand">90%+ netting target</span> means most cross-chain
            transfers never hit a bridge — they net out. Gas-free outbound sends are sustainable
            because the protocol covers destination gas using netting savings.
          </p>
        </AnimBody>

        <AnimRows className="grid md:grid-cols-2 border border-brand/20">
          {COMPARISON.map((col, ci) => (
            <AnimRow
              key={col.side}
              className={ci === 0 ? "p-6 border-b md:border-b-0 md:border-r border-brand/20" : "p-6"}
            >
              <div
                className={`font-mono text-[10px] tracking-widest uppercase border-b pb-4 mb-6 flex justify-between ${
                  col.accent ? "text-brand border-brand/20" : "text-text-muted border-brand/20"
                }`}
              >
                <span>{col.side}</span>
                {col.badge && <span className="text-green">{col.badge}</span>}
              </div>
              <div className="space-y-4 font-mono text-sm">
                {col.rows.map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-text-muted">{row.label}</span>
                    <span className={col.accent ? "text-text-main" : "text-text-muted"}>{row.value}</span>
                  </div>
                ))}
              </div>
            </AnimRow>
          ))}
        </AnimRows>
      </SectionContainer>
    </section>
  );
}

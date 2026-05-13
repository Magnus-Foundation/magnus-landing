"use client";

import { SectionLabel } from "./SectionLabel";
import {
  SectionContainer, AnimLabel, AnimHeading, AnimBody, AnimRows, AnimRow,
} from "../SectionAnimations";

const RAILS = [
  { name: "VietQR", region: "VN", type: "Instant Payment" },
  { name: "M-Pesa", region: "KE", type: "Mobile Money" },
  { name: "GCash",  region: "PH", type: "E-Wallet" },
  { name: "UPI",    region: "IN", type: "Real-time Payment" },
  { name: "PIX",    region: "BR", type: "Instant Payment" },
];

export function Gateway() {
  return (
    <section id="gateway" className="relative z-10 py-24 border-t border-brand/20 overflow-hidden">
      <SectionContainer>
        <AnimLabel>
          <SectionLabel num="02" label="Fiat Rails" />
        </AnimLabel>

        <AnimHeading className="mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight text-text-main">
            Native Gateway Protocol
          </h2>
        </AnimHeading>

        <AnimBody className="mb-12">
          <p className="font-mono text-sm text-text-muted leading-relaxed max-w-xl">
            Native fiat rail integration.{" "}
            <span className="text-brand">MGP</span> offers gateway precompiles,
            on-chain escrow, and slashable settlement attestations.
          </p>
        </AnimBody>

        <AnimRows className="border border-brand/20">
          {RAILS.map((rail, i) => (
            <AnimRow
              key={rail.name}
              className={`flex justify-between items-center px-6 py-4 group hover:bg-brand/5 transition-colors ${i > 0 ? "border-t border-brand/20" : ""}`}
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] tracking-widest text-brand/40 w-6">{rail.region}</span>
                <span className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-text-main group-hover:text-brand transition-colors">
                  {rail.name}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-text-muted hidden sm:block">{rail.type}</span>
                <span className="font-mono text-[10px] tracking-widest text-green">ACTIVE</span>
              </div>
            </AnimRow>
          ))}
        </AnimRows>

        <AnimBody>
          <div className="border-l-2 border-brand/30 pl-4 py-1 mt-10">
            <p className="font-mono text-xs text-text-muted">
              Protocol primitives, not application-layer wrappers. Integrated with Magnus Bridge Standard (MBS).
            </p>
          </div>
        </AnimBody>
      </SectionContainer>
    </section>
  );
}

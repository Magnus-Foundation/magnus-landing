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

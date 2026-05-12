import { SectionLabel } from "./SectionLabel";

export function Netting() {
  return (
    <section id="netting" className="py-24 border-t border-border">
      <div>
        <SectionLabel num="03" label="Liquidity Routing" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-text-main">
          Multilateral Netting
        </h2>

        <div className="mb-12">
          <p className="text-lg text-text-muted leading-relaxed">
            Our <span className="text-text-main font-medium">90%+ netting target</span> means most cross-chain
            transfers never hit a bridge — they net out. This fundamental shift in routing mechanics makes gas-free
            outbound sends sustainable, as the protocol covers destination gas using netting savings.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-border/40">
          <div className="space-y-6">
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest border-b border-border/40 pb-4">
              Legacy Bridges
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-text-dim">Topology</span>
                <span className="text-text-muted">N² Connections</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Efficiency</span>
                <span className="text-text-muted">High rebalancing costs</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-[10px] text-brand uppercase tracking-widest border-b border-brand/20 pb-4 flex justify-between">
              <span>Magnus Protocol</span>
              <span className="text-green text-[10px]">90% NET</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-text-dim">Topology</span>
                <span className="text-text-main">Hub-and-Spoke</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Efficiency</span>
                <span className="text-text-main">Internalized savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { SectionLabel } from "./SectionLabel";

const RAILS = [
  { name: "VietQR", region: "VN", type: "Instant Payment" },
  { name: "M-Pesa", region: "KE", type: "Mobile Money" },
  { name: "GCash", region: "PH", type: "E-Wallet" },
  { name: "UPI", region: "IN", type: "Real-time Payment" },
  { name: "PIX", region: "BR", type: "Instant Payment" },
];

export function Gateway() {
  return (
    <section id="gateway" className="py-24 border-t border-border relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <SectionLabel num="02" label="Fiat Rails" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
          Native Gateway Protocol
        </h2>

        <div className="mb-12">
          <p className="text-lg text-text-muted leading-relaxed">
            Native fiat rail integration. <strong className="text-brand font-medium">MGP</strong> offers gateway precompiles, on-chain escrow, and slashable settlement attestations.
          </p>
        </div>

        <div className="mt-8">
          <div className="border-y border-border/40 divide-y divide-border/40">
            {RAILS.map((rail) => (
              <div key={rail.name} className="flex justify-between items-center py-4 group">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-dim w-8 group-hover:text-brand-light/70 transition-colors">{rail.region}</span>
                  <span className="font-medium text-brand group-hover:text-brand-light transition-colors">{rail.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted hidden sm:block">{rail.type}</span>
                  <span className="font-mono text-[10px] text-green tracking-widest">ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-l-2 border-brand-light/30 pl-4 py-1 mt-12">
          <p className="text-sm text-text-dim">
            Protocol primitives, not application-layer wrappers. Integrated with Magnus Bridge Standard (MBS).
          </p>
        </div>
      </div>
    </section>
  );
}

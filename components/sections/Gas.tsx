import { SectionLabel } from "./SectionLabel";

const FEATURES = [
  { title: "Multi-Currency Gas", desc: "Pay gas in any stablecoin — no native gas token required. Validators receive direct credit in the chosen currency, eliminating swaps and slippage." },
  { title: "FX Oracle", desc: "On-chain FX translation with strong outlier filtering for accurate fee metering." },
  { title: "Auto-Resolve", desc: "Wallet-inferred fee token resolution allows seamless transactions for the user." },
  { title: "EVM Ready", desc: "Vanilla EVM wallets work natively with stablecoin fee deduction." },
];

export function Gas() {
  return (
    <section id="gas" className="py-24 border-t border-border overflow-hidden">
      <div className="relative z-10">
        <SectionLabel num="01" label="Gas Mechanism" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-text-main">
          Multi-Currency Gas
        </h2>

        <div className="space-y-8">
          {FEATURES.map((item) => (
            <div key={item.title} className="border-t border-border/40 pt-6">
              <h3 className="font-medium text-brand text-lg mb-2">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const RAILS = [
  { reg: "VN", nm: "VietQR", ty: "Instant bank transfer" },
  { reg: "KE", nm: "M-Pesa", ty: "Mobile money" },
  { reg: "PH", nm: "GCash", ty: "E-wallet" },
  { reg: "IN", nm: "UPI", ty: "Real-time payments" },
  { reg: "BR", nm: "PIX", ty: "Instant payments" },
];

export function Gateway() {
  return (
    <div className="wrap">
      <section className="blk blk-line" id="gateway">
        <span className="eyebrow">Fiat rails · roadmap</span>
        <h2 className="sec" style={{ marginTop: 16, maxWidth: "18ch" }}>
          Built for the rails 2 billion people use.
        </h2>
        <p className="body-m" style={{ marginTop: 18 }}>
          The protocol ships the primitives today: gateway precompiles, on-chain escrow, and
          slashable settlement attestations. Rail integrations are on the roadmap, starting with
          the five below.
        </p>
        <div className="rails">
          {RAILS.map((r) => (
            <div className="rail" key={r.reg}>
              <div className="st">PLANNED</div>
              <div className="reg">{r.reg}</div>
              <div className="nm">{r.nm}</div>
              <div className="ty">{r.ty}</div>
            </div>
          ))}
          <div className="rail more">
            <div className="reg">+ MORE</div>
            <div className="nm">17 in pipeline</div>
            <div className="ty">SEPA, PromptPay, DuitNow</div>
          </div>
        </div>
      </section>
    </div>
  );
}

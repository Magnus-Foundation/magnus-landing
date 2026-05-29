const METRICS = [
  { n: "10,000", u: "+", l: "TPS" },
  { n: "0.3", u: "s", l: "Finality" },
  { n: "$0.0001", u: "", l: "Avg gas" },
  { n: "EVM", u: "", l: "Compatible" },
];

const ROWS = [
  { reg: "VN", nm: "VietQR", amt: "₫1,240,000", to: "48.92 USDT", st: "✓ 0.3s" },
  { reg: "KE", nm: "M-Pesa", amt: "KSh 4,500", to: "34.71 USDC", st: "✓ 0.2s" },
  { reg: "IN", nm: "UPI", amt: "₹8,200", to: "98.40 USDT", st: "✓ 0.3s" },
  { reg: "BR", nm: "PIX", amt: "R$ 320", to: "63.18 mBRL", pending: true },
  { reg: "PH", nm: "GCash", amt: "₱2,750", to: "48.10 USDT", st: "✓ 0.3s" },
];

export function Hero() {
  return (
    <>
      <div className="wrap">
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-l">
            <span className="eyebrow">Stablecoin settlement layer / L1</span>
            <h1>
              The settlement layer<br />for <span className="amber">stablecoins.</span>
            </h1>
            <p className="lede">
              One EVM chain for global stablecoin payments. Pay gas in any token, settle across
              every chain, with no destination gas.
            </p>
            <div className="cta-row">
              <a
                href="https://docs.magnus.foundation/quickstart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start on devnet →
              </a>
              <a
                href="https://docs.magnus.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Read docs
              </a>
            </div>
          </div>

          <div className="settle glass" aria-label="Settlement preview">
            <div className="settle-hd">
              <span className="t">Settlement preview</span>
              <span className="live">example flow</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.reg} className={`srow${r.pending ? " pending" : ""}`}>
                <span className="reg">{r.reg}</span>
                <span className="snm">{r.nm}</span>
                <span className="amt">{r.amt}</span>
                <span className="to">→ <b>{r.to}</b></span>
                <span className="st">
                  {r.pending ? (
                    <><span className="dot dot-amber pulse" />net</>
                  ) : (
                    r.st
                  )}
                </span>
              </div>
            ))}
            <div className="settle-ft">
              <div>
                <div className="l">Planned for launch</div>
                <div className="v">5<span className="u"> rails</span></div>
              </div>
              <span className="net">+ 17 in pipeline</span>
            </div>
          </div>
        </section>
      </div>

      <div className="statband">
        <div className="wrap statband-inner">
          {METRICS.map((m) => (
            <div className="m" key={m.l}>
              <div className="n">{m.n}<span className="u">{m.u}</span></div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

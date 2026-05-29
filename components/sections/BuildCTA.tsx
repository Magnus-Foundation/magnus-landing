const CODE = [
  { c: "p", t: "$ magnus connect --chain staccato" },
  { c: "g", t: "› ✓ Connected to Staccato (Devnet)" },
  { c: "c", t: "› block #4,219,847 · finality 0.3s" },
  { c: "p", t: "$ forge create Stablecoin.sol" },
  { c: "g", t: "› ✓ Deployed · gas paid in USDT" },
  { c: "c", t: "› 0xMGP…a31f · $0.0001" },
];

export function BuildCTA() {
  return (
    <div className="wrap">
      <section className="blk blk-line">
        <div className="cta">
          <div className="cta-grid">
            <div>
              <h2 className="sec">Deploy in five minutes.</h2>
              <p className="body-m" style={{ marginTop: 18 }}>
                Staccato devnet is live. Deploy your first stablecoin contract with the same
                tooling you already use on Ethereum.
              </p>
              <div className="cta-row" style={{ marginTop: 30 }}>
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
            <div className="codeblk">
              <div className="bar">
                <i /><i /><i /><span className="t">magnus cli</span>
              </div>
              <pre>
                {CODE.map((l, i) => (
                  <span key={i} className={`cl ${l.c}`}>{l.t}</span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

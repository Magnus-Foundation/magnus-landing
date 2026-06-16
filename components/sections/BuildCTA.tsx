import { Reveal } from "@/components/Reveal";
import { Terminal } from "@/components/Terminal";

export function BuildCTA() {
  return (
    <div className="wrap">
      <section className="blk blk-line">
        <Reveal className="cta" as="div">
          <div className="cta-grid">
            <div>
              <h2 className="sec">Deploy in five minutes.</h2>
              <p className="body-m" style={{ marginTop: 18 }}>
                Staccato devnet is live. Deploy your first stablecoin contract with the same
                tooling you already use on Ethereum.
              </p>
              <div className="cta-row" style={{ marginTop: 32 }}>
                <a href="https://docs.magnus.foundation/quickstart" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Start on devnet <span style={{ fontFamily: "var(--font-mono)" }}>→</span>
                </a>
                <a href="https://docs.magnus.foundation" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Read docs
                </a>
              </div>
            </div>
            <Terminal />
          </div>
        </Reveal>
      </section>
    </div>
  );
}

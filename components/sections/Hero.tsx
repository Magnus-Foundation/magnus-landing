import { Globe } from "@/components/Globe";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export function Hero() {
  return (
    <>
      <div className="wrap" id="top">
        <section className="hero">
          <Reveal className="hero-l">
            <span className="pill">
              <span className="dot dot-amber" style={{ animation: "mpulse 3s ease-in-out infinite" }} />
              Stablecoin settlement layer · L1
            </span>
            <h1>
              The settlement layer for <span className="amber">stablecoins</span>.
            </h1>
            <p className="lede">
              One EVM chain for global stablecoin payments. Pay gas in any token, settle across
              every chain, with no destination gas.
            </p>
            <div className="cta-row">
              <a href="https://docs.magnus.foundation/quickstart" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Start on devnet <span style={{ fontFamily: "var(--font-mono)" }}>→</span>
              </a>
              <a href="https://docs.magnus.foundation" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Read docs
              </a>
            </div>
            <div className="hero-tags">
              <span>100% EVM</span><span className="sep">·</span>
              <span>Solidity-native</span><span className="sep">·</span>
              <span>Staccato devnet live</span>
            </div>
          </Reveal>

          <Reveal as="div">
            <Globe />
          </Reveal>
        </section>
      </div>

      <div className="statband">
        <div className="wrap">
          <div className="statband-inner">
            <div className="m">
              <div className="n"><Counter value={10000} comma /><span className="u">+</span></div>
              <div className="l">TPS</div>
            </div>
            <div className="m">
              <div className="n">0.3<span className="u">s</span></div>
              <div className="l">Finality</div>
            </div>
            <div className="m">
              <div className="n">$0.0001</div>
              <div className="l">Avg gas</div>
            </div>
            <div className="m">
              <div className="n">EVM</div>
              <div className="l">Compatible</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

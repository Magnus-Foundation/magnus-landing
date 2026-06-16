import { EyeOff, Layers } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export function EVM() {
  return (
    <div className="wrap">
      <section className="blk blk-line" id="perf">
        <Reveal>
          <span className="eyebrow">EVM runtime</span>
          <h2 className="sec" style={{ marginTop: 16, maxWidth: "16ch" }}>
            Standard EVM, sub-second finality.
          </h2>
        </Reveal>
        <Reveal className="bento" as="div">
          <div className="cell">
            <div className="num"><Counter value={200} /><span className="u">ms</span></div>
            <div className="lab">Block time</div>
          </div>
          <div className="cell">
            <div className="num"><Counter value={300} /><span className="u">ms</span></div>
            <div className="lab">Deterministic finality</div>
          </div>
          <div className="cell feat-cell">
            <div className="ic"><EyeOff size={22} strokeWidth={1.5} /></div>
            <div>
              <h4>No public mempool</h4>
              <p>First-come-first-serve ordering guarantees no front-running natively. MEV protection is built in, not bolted on.</p>
            </div>
          </div>
          <div className="cell feat-cell">
            <div className="ic"><Layers size={22} strokeWidth={1.5} /></div>
            <div>
              <h4>Isolated resource pools</h4>
              <p>Dedicated payment lanes per token standard prevent noisy-neighbor contention under load.</p>
            </div>
          </div>
          <div className="cell">
            <div className="num"><Counter value={100} /><span className="u">%</span></div>
            <div className="lab">Solidity compatible</div>
          </div>
          <div className="cell">
            <div className="num">∞</div>
            <div className="lab">Stablecoins supported</div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

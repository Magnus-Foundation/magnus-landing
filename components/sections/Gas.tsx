import { Gauge, Wallet } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CHIPS = [
  { t: "USDT", on: true },
  { t: "mVND", on: true },
  { t: "USDC", on: false },
  { t: "mEUR", on: false },
  { t: "mKES", on: false },
  { t: "+ any MIP-20", on: false },
];

export function Gas() {
  return (
    <div className="wrap">
      <section className="blk" id="gas">
        <div className="split">
          <Reveal>
            <span className="eyebrow">Gas abstraction</span>
            <h2 className="sec" style={{ marginTop: 16 }}>Pay gas in any stablecoin.</h2>
            <p className="body-m" style={{ marginTop: 20 }}>
              No native gas token. Validators are credited directly in the currency the user
              already holds — no swaps, no slippage.
            </p>
            <div className="featlist">
              <div className="feat">
                <div className="ic"><Gauge size={19} strokeWidth={1.6} /></div>
                <div>
                  <h4>FX oracle metering</h4>
                  <p>On-chain FX translation with outlier filtering for accurate, manipulation-resistant fees.</p>
                </div>
              </div>
              <div className="feat">
                <div className="ic"><Wallet size={19} strokeWidth={1.6} /></div>
                <div>
                  <h4>Auto-resolve fee token</h4>
                  <p>The wallet infers which token to charge. Vanilla EVM wallets work natively — no extra UX.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="glass flowcard" as="div">
            <div className="chips">
              {CHIPS.map((c) => (
                <span key={c.t} className={`chip${c.on ? " on" : ""}`}>{c.t}</span>
              ))}
            </div>
            <div className="flowarrow">
              <div className="flownode">
                <div className="t">User pays</div>
                <div className="v" style={{ color: "var(--accent)" }}>2.50 USDT</div>
              </div>
              <div className="flowsep">──▸</div>
              <div className="flownode">
                <div className="t">Validator gets</div>
                <div className="v">2.50 USDT</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", marginTop: 24, fontSize: 12.5, color: "var(--color-text-dim)", textAlign: "center" }}>
              No swap. No slippage. No bridge hop.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

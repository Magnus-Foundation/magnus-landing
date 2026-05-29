import { Gauge, Wallet } from "lucide-react";

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
          <div>
            <h2 className="sec">
              Pay gas in any<br />stablecoin.
            </h2>
            <p className="body-m" style={{ marginTop: 20 }}>
              No native gas token. Validators are credited directly in the currency the user
              already holds, so there are no swaps and no slippage.
            </p>
            <div className="featlist">
              <div className="feat">
                <div className="ic"><Gauge size={18} strokeWidth={1.5} /></div>
                <div>
                  <h4>FX oracle metering</h4>
                  <p>On-chain FX translation with outlier filtering for accurate, manipulation-resistant fees.</p>
                </div>
              </div>
              <div className="feat">
                <div className="ic"><Wallet size={18} strokeWidth={1.5} /></div>
                <div>
                  <h4>Auto-resolve fee token</h4>
                  <p>The wallet infers which token to charge. Vanilla EVM wallets work natively, no extra UX.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass flowcard">
            <div className="chips">
              {CHIPS.map((c) => (
                <span key={c.t} className={`chip${c.on ? " on" : ""}`}>{c.t}</span>
              ))}
            </div>
            <div className="flowarrow">
              <div className="flownode">
                <div className="t">User pays</div>
                <div className="v" style={{ color: "var(--color-brand)" }}>2.50 USDT</div>
              </div>
              <div className="flowsep">───▸</div>
              <div className="flownode">
                <div className="t">Validator gets</div>
                <div className="v">2.50 USDT</div>
              </div>
            </div>
            <p
              className="mono"
              style={{ marginTop: 22, fontSize: 12.5, color: "var(--color-text-dim)", textAlign: "center", fontFamily: "var(--font-mono)" }}
            >
              No swap. No slippage. No bridge hop.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

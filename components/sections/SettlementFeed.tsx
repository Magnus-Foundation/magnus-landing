"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Tx = { id: number; reg: string; nm: string; amt: string; to: string; st: string; pending: boolean };

const POOL = [
  { reg: "VN", nm: "VietQR", amt: "₫1,240,000", to: "48.92 USDT" },
  { reg: "KE", nm: "M-Pesa", amt: "KSh 4,500", to: "34.71 USDC" },
  { reg: "IN", nm: "UPI", amt: "₹8,200", to: "98.40 USDT" },
  { reg: "PH", nm: "GCash", amt: "₱2,750", to: "48.10 USDT" },
  { reg: "BR", nm: "PIX", amt: "R$ 320", to: "63.18 mBRL" },
  { reg: "SG", nm: "PayNow", amt: "S$ 90", to: "67.02 USDC" },
  { reg: "NG", nm: "NIBSS", amt: "₦52,000", to: "34.10 USDT" },
  { reg: "ID", nm: "QRIS", amt: "Rp 780,000", to: "49.40 USDC" },
];
const TIMES = ["0.2s", "0.3s", "0.3s", "0.4s"];

const INITIAL: Tx[] = POOL.slice(0, 6).map((r, i) => ({
  ...r,
  id: i + 1,
  st: `✓ ${TIMES[i % TIMES.length]}`,
  pending: false,
}));

export function SettlementFeed() {
  const [feed, setFeed] = useState<Tx[]>(INITIAL);

  useEffect(() => {
    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let nid = 100;
    const settleTimers: number[] = [];
    const tick = () => {
      const base = POOL[Math.floor(Math.random() * POOL.length)];
      const id = nid++;
      const tx: Tx = { ...base, id, pending: true, st: "" };
      setFeed((f) => [tx, ...f].slice(0, 6));
      settleTimers.push(
        window.setTimeout(() => {
          setFeed((f) =>
            f.map((r) =>
              r.id === id
                ? { ...r, pending: false, st: `✓ ${TIMES[Math.floor(Math.random() * TIMES.length)]}` }
                : r
            )
          );
        }, 1100)
      );
    };
    const iv = window.setInterval(tick, 2700);
    return () => { window.clearInterval(iv); settleTimers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="wrap">
      <section className="blk blk-line">
        <Reveal style={{ textAlign: "center", maxWidth: "60ch", margin: "0 auto" }}>
          <span className="eyebrow">Cross-chain settlement</span>
          <h2 className="sec" style={{ marginTop: 16 }}>Local money in. Stablecoins out. 0.3 seconds.</h2>
        </Reveal>
        <Reveal className="settle" as="div">
          <div className="settle-hd">
            <span className="t">Settlement feed</span>
            <span className="live"><span className="dot dot-green" style={{ animation: "mpulse 2.4s ease-in-out infinite" }} />example flow</span>
          </div>
          <div>
            {feed.map((r) => (
              <div key={r.id} className={`srow${r.pending ? " pending" : ""}`}>
                <span className="reg">{r.reg}</span>
                <span className="snm">{r.nm}</span>
                <span className="amt">{r.amt}</span>
                <span className="to">→ {r.to}</span>
                <span className="st">
                  {r.pending ? (
                    <>
                      <span className="dot dot-amber" style={{ display: "inline-block", marginRight: 6, verticalAlign: "middle", animation: "mpulse 1.3s ease-in-out infinite" }} />
                      net
                    </>
                  ) : (
                    r.st
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="settle-ft">
            <div>
              <div className="l">Planned for launch</div>
              <div className="v">5<span className="u"> rails</span></div>
            </div>
            <span className="net">+ 17 in pipeline</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

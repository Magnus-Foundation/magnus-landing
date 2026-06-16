import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

const MESH = [
  [270, 95, 210, 154], [270, 95, 90, 154], [270, 95, 30, 95], [270, 95, 90, 36], [270, 95, 210, 36],
  [210, 154, 90, 154], [210, 154, 30, 95], [210, 154, 90, 36], [210, 154, 210, 36],
  [90, 154, 30, 95], [90, 154, 90, 36], [90, 154, 210, 36],
  [30, 95, 90, 36], [30, 95, 210, 36], [90, 36, 210, 36],
];
const NODES: [number, number][] = [
  [270, 95], [210, 154], [90, 154], [30, 95], [90, 36], [210, 36],
];
const LABELS: [number, number, string][] = [
  [90, 20, "ETH"], [210, 20, "SOL"], [270, 116, "BSC"],
  [210, 176, "ARB"], [90, 176, "OP"], [30, 116, "AVAX"],
];

export function Netting() {
  return (
    <div className="wrap">
      <section className="blk blk-line" id="netting">
        <Reveal>
          <span className="eyebrow">Netting engine</span>
          <h2 className="sec" style={{ marginTop: 16, maxWidth: "20ch" }}>
            Most transfers never touch a bridge.
          </h2>
          <p className="body-m" style={{ marginTop: 18 }}>
            A 90%+ netting target means cross-chain transfers cancel out internally. Gas-free
            outbound sends stay sustainable because netting savings cover destination gas.
          </p>
        </Reveal>

        <Reveal className="compare" as="div">
          <div className="diag">
            <div className="tag">Legacy bridges</div>
            <div className="big" style={{ color: "var(--color-text-muted)" }}>~0%</div>
            <div className="cap">Every chain bridged to every other. N² routes, constant rebalancing.</div>
            <svg viewBox="0 0 300 188" height={200}>
              <defs>
                <marker id="ahg" markerWidth={7} markerHeight={7} refX={5} refY={3} orient="auto">
                  <path d="M0,0 L6,3 L0,6 z" fill="rgba(154,154,152,.55)" />
                </marker>
              </defs>
              <g stroke="rgba(154,154,152,.2)" strokeWidth={1}>
                {MESH.map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
              </g>
              <g stroke="rgba(154,154,152,.5)" strokeWidth={1.1} fill="none" strokeDasharray="3 3">
                <path d="M256,110 Q236,142 219,151" markerEnd="url(#ahg)" />
                <path d="M44,110 Q60,143 81,151" markerEnd="url(#ahg)" />
              </g>
              <g fill="#16161A" stroke="rgba(154,154,152,.62)" strokeWidth={1.5}>
                {NODES.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={7} />
                ))}
              </g>
              <g fill="#6B6B69" fontFamily="var(--font-mono)" fontSize={9} letterSpacing={1} textAnchor="middle">
                {LABELS.map(([x, y, t]) => (
                  <text key={t} x={x} y={y}>{t}</text>
                ))}
              </g>
            </svg>
          </div>

          <div className="diag win">
            <div className="tag">Magnus netting</div>
            <div className="big" style={{ color: "var(--accent)" }}><Counter value={90} />%+</div>
            <div className="cap">One hub nets every chain. Transfers cancel out before they bridge.</div>
            <svg viewBox="0 0 300 188" height={200}>
              <g stroke="rgba(232,160,32,.42)" strokeWidth={1.4}>
                {NODES.map(([x2, y2], i) => (
                  <line key={i} x1={150} y1={95} x2={x2} y2={y2} />
                ))}
              </g>
              <circle className="fd fd1" r={3} />
              <circle className="fd fd2" r={3} />
              <circle className="fd fd3" r={3} />
              <g fill="#E8A020">
                {NODES.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={7} />
                ))}
              </g>
              <g fill="rgba(232,160,32,.8)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing={1} textAnchor="middle">
                {LABELS.map(([x, y, t]) => (
                  <text key={t} x={x} y={y}>{t}</text>
                ))}
              </g>
              <circle cx={150} cy={95} r={29} fill="#0A0A0B" />
              <circle cx={150} cy={95} r={26} fill="#0C0C0D" stroke="rgba(232,160,32,.55)" strokeWidth={1.5} />
              <image href="/magnus-mark.png" x={135} y={82} width={30} height={26} />
            </svg>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

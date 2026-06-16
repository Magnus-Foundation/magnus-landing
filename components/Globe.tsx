"use client";

import { useEffect, useRef } from "react";

/**
 * Rotating dotted-sphere globe with animated great-circle payment arcs.
 * Pure canvas — no Three.js dependency. Degrades to a single static frame
 * when prefers-reduced-motion is set.
 */
export function Globe({ accent = "#E8A020" }: { accent?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hex = accent.replace("#", "");
    const rgb = [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ].join(",");
    const rgbL = "245,184,74";

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 600;
    const pts: [number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * 2.399963229;
      pts.push([Math.cos(th) * rr, y, Math.sin(th) * rr]);
    }
    const ll = (lat: number, lon: number): [number, number, number] => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const the = ((lon + 180) * Math.PI) / 180;
      return [-Math.sin(phi) * Math.cos(the), Math.cos(phi), Math.sin(phi) * Math.sin(the)];
    };
    const C: Record<string, [number, number, number]> = {
      VN: ll(21, 105), KE: ll(-1, 36), IN: ll(19, 72), BR: ll(-23, -46),
      PH: ll(14, 121), US: ll(40, -74), EU: ll(50, 8), SG: ll(1, 103), NG: ll(6, 3),
    };
    const arcs: [string, string][] = [
      ["VN", "SG"], ["KE", "EU"], ["IN", "SG"], ["BR", "US"],
      ["PH", "SG"], ["NG", "EU"], ["US", "EU"], ["SG", "US"],
    ];
    const slerp = (a: number[], b: number[], t: number): number[] => {
      let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      d = Math.max(-1, Math.min(1, d));
      const o = Math.acos(d);
      if (o < 1e-4) return a;
      const s = Math.sin(o), k0 = Math.sin((1 - t) * o) / s, k1 = Math.sin(t * o) / s;
      return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
    };
    const tilt = -0.42, ct = Math.cos(tilt), st = Math.sin(tilt);
    let rot = reduced ? 0.7 : 0;
    let raf = 0;
    const proj = (p: number[]) => {
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const x = p[0] * cr + p[2] * sr;
      const z = -p[0] * sr + p[2] * cr;
      const y = p[1];
      return { x, y: y * ct - z * st, z: y * st + z * ct };
    };
    const draw = (t: number) => {
      if (!reduced) rot += 0.0016;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.4;
      for (let i = 0; i < pts.length; i++) {
        const q = proj(pts[i]);
        const depth = (q.z + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb},${(0.1 + depth * 0.5).toFixed(3)})`;
        ctx.arc(cx + q.x * R, cy + q.y * R, 0.55 + depth * 1.25, 0, 6.2832);
        ctx.fill();
      }
      for (let i = 0; i < arcs.length; i++) {
        const pa = C[arcs[i][0]], pb = C[arcs[i][1]];
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= 26; s++) {
          const pp = proj(slerp(pa, pb, s / 26));
          if (pp.z < -0.2) { started = false; continue; }
          const X = cx + pp.x * R, Y = cy + pp.y * R;
          if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y);
        }
        ctx.strokeStyle = `rgba(${rgb},0.45)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        const prog = ((t / 2400) + i * 0.37) % 1;
        const pp = proj(slerp(pa, pb, prog));
        if (pp.z > -0.1) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgbL},0.95)`;
          ctx.shadowColor = accent;
          ctx.shadowBlur = 9;
          ctx.arc(cx + pp.x * R, cy + pp.y * R, 2.3, 0, 6.2832);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    if (reduced) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [accent]);

  return (
    <div className="globe-wrap">
      <div className="halo" />
      <canvas ref={ref} aria-hidden="true" />
      <div className="float-pill" style={{ top: "13%", left: "-3%", animation: "mfloat 6.5s ease-in-out infinite" }}>
        <span className="dot dot-green" />VietQR · 0.3s
      </div>
      <div className="float-pill" style={{ top: "42%", right: "-6%", animation: "mfloat 7.5s ease-in-out infinite .6s" }}>
        <span className="dot dot-green" />M-Pesa · 0.2s
      </div>
      <div className="float-pill" style={{ bottom: "11%", left: "6%", animation: "mfloat 6.9s ease-in-out infinite 1.1s" }}>
        <span className="dot dot-amber" style={{ animation: "mpulse 1.6s ease-in-out infinite" }} />PIX · netting
      </div>
    </div>
  );
}

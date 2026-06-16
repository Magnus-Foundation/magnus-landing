"use client";

import { useEffect, useRef } from "react";

const CODE: { c: "p" | "g" | "c"; t: string }[] = [
  { c: "p", t: "$ magnus connect --chain staccato" },
  { c: "g", t: "› ✓ Connected to Staccato (Devnet)" },
  { c: "c", t: "› block #4,219,847 · finality 0.3s" },
  { c: "p", t: "$ forge create Stablecoin.sol" },
  { c: "g", t: "› ✓ Deployed · gas paid in USDT" },
  { c: "c", t: "› 0xMGP…a31f · $0.0001" },
];

/** Terminal whose lines reveal sequentially on view. Degrades safe. */
export function Terminal() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const term = ref.current;
    if (!term) return;
    const lines = Array.from(term.querySelectorAll<HTMLElement>(".cl"));
    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !lines.length) return;

    lines.forEach((l) => {
      l.style.opacity = "0";
      l.style.transform = "translateX(-6px)";
      l.style.transition = "opacity .35s ease, transform .35s ease";
    });
    const timers: number[] = [];
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      lines.forEach((l, i) =>
        timers.push(window.setTimeout(() => {
          l.style.opacity = "1";
          l.style.transform = "none";
        }, 380 + i * 360))
      );
    };
    const inView = () => {
      const r = term.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 0;
    };
    if (inView()) play();
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { play(); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(term);
    const onScroll = () => { if (inView()) { play(); cleanup(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    const safety = window.setTimeout(play, 2200);
    function cleanup() {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(safety);
      timers.forEach(clearTimeout);
    }
    return cleanup;
  }, []);

  return (
    <div className="codeblk">
      <div className="bar">
        <i /><i /><i /><span className="t">magnus cli</span>
      </div>
      <pre ref={ref}>
        {CODE.map((l, i) => (
          <span key={i} className={`cl ${l.c}`}>{l.t}</span>
        ))}
      </pre>
    </div>
  );
}

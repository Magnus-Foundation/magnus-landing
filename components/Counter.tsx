"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` once scrolled into view. Renders the final value as the
 * SSR/no-JS fallback, then animates from 0 on first intersection. Degrades safe.
 */
export function Counter({
  value,
  comma = false,
  className,
}: {
  value: number;
  comma?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fmt = (v: number) => (comma ? v.toLocaleString("en-US") : String(v));
    if (reduced) { el.textContent = fmt(value); return; }

    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      const dur = 1300, start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(e * value));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = fmt(0);
      requestAnimationFrame(step);
    };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.85 && r.bottom > 0;
    };
    if (inView()) run();
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.6 }
    );
    io.observe(el);
    const onScroll = () => { if (inView()) { run(); cleanup(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() { io.disconnect(); window.removeEventListener("scroll", onScroll); }
    return cleanup;
  }, [value, comma]);

  return <span ref={ref} className={className}>{comma ? value.toLocaleString("en-US") : value}</span>;
}

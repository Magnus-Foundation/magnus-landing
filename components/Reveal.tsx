"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper. Adds `.in` when the element enters the viewport.
 * Degrades safe: reveals immediately if already in view, on scroll, and via a
 * hard-timeout fallback — content is never left hidden if IntersectionObserver
 * doesn't fire.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { el.classList.add("in"); return; }

    const show = () => el.classList.add("in");
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    if (inView()) show();

    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { show(); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    const onScroll = () => { if (inView()) { show(); cleanup(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const safety = window.setTimeout(show, 1400);

    function cleanup() {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(safety);
    }
    return cleanup;
  }, []);

  // @ts-expect-error — dynamic tag with ref is fine at runtime
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}

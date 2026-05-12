"use client";

import { useEffect, useRef } from "react";

const METRICS = [
  { value: "300", unit: "ms", label: "Finality" },
  { value: "90", unit: "%+", label: "Netting Rate" },
  { value: "5", unit: "", label: "Payment Rails" },
  { value: "∞", unit: "", label: "Stablecoin Support" },
];

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || !ref.current) return;
    const el = ref.current;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * numericValue).toString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export function MetricsBar() {
  return (
    <div className="border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`py-10 px-6 flex flex-col gap-2 ${
                i < METRICS.length - 1 ? "border-r border-border/50" : ""
              }`}
            >
              <div className="font-display font-bold text-4xl md:text-5xl text-text-main tracking-tight">
                <Counter value={m.value} />
                <span className="text-brand">{m.unit}</span>
              </div>
              <div className="font-mono text-xs text-text-muted uppercase tracking-widest">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

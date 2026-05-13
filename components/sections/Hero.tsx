"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";

const TERMINAL_LINES = [
  { type: "prompt", text: "$ magnus connect --chain staccato --rpc staccato-rpc.magnuschain.xyz", delay: 0.3 },
  { type: "output", text: "> Connecting...", delay: 0.9 },
  { type: "output", text: "> ✓ Connected to Staccato (Devnet)", delay: 1.4 },
  { type: "text",   text: "> Block height: #4,219,847", delay: 1.8 },
  { type: "text",   text: "> Finality:     0.3s", delay: 2.1 },
  { type: "text",   text: "> Gas cost:     $0.0001 (USDT / mVND / USDC / mEUR)", delay: 2.4 },
  { type: "text",   text: "> EVM:          Compatible ✓", delay: 2.7 },
];

interface StatItem {
  num: string;
  label: string;
  countTo?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const STATS: StatItem[] = [
  { num: "10,000", label: "TPS",        countTo: 10000, suffix: "" },
  { num: "0.3s",   label: "FINALITY",   countTo: 3,     prefix: "0.", suffix: "s", decimals: 1 },
  { num: "$0.0001",label: "GAS FEES",   countTo: 1,     prefix: "$0.000", suffix: "" },
  { num: "EVM",    label: "COMPATIBLE" },
];

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [display, setDisplay] = useState(stat.countTo !== undefined ? (stat.prefix ?? "") + "0" + (stat.suffix ?? "") : stat.num);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || stat.countTo === undefined || started.current) return;
    started.current = true;

    const start = 0;
    const end = stat.countTo;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = start + (end - start) * ease;

      if (stat.decimals) {
        setDisplay((stat.prefix ?? "") + value.toFixed(stat.decimals) + (stat.suffix ?? ""));
      } else if (stat.prefix === "$0.000") {
        setDisplay("$0.000" + Math.round(value));
      } else {
        setDisplay(Math.round(value).toLocaleString() + (stat.suffix ?? ""));
      }

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, stat]);

  return <span>{display}</span>;
}

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // Animation states
  const [ruleDrawn, setRuleDrawn] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);

  useEffect(() => {
    // 1. Rule draws at 200ms
    const t1 = setTimeout(() => setRuleDrawn(true), 200);
    // 2. Headline appears after rule finishes (~700ms)
    const t2 = setTimeout(() => setHeadlineVisible(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative z-10 pt-20 pb-16 w-full min-h-screen flex flex-col justify-center">

      {/* 3. Amber rule draw */}
      <div className="flex items-center gap-4 w-full mb-16">
        <motion.div
          className="h-px bg-brand/40"
          initial={{ width: 0, opacity: 0 }}
          animate={ruleDrawn ? { width: "100%", opacity: 1 } : {}}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ flex: 1 }}
        />
        <motion.span
          className="font-mono text-[10px] tracking-[0.22em] text-brand uppercase whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={ruleDrawn ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          // STABLECOIN SETTLEMENT LAYER L1
        </motion.span>
        <motion.div
          className="w-1.5 h-1.5 bg-brand flex-shrink-0"
          initial={{ opacity: 0, scale: 0 }}
          animate={ruleDrawn ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.2, delay: 0.5 }}
        />
      </div>

      {/* 1. Headline scan-in */}
      <h1 style={{ lineHeight: 0.88, letterSpacing: "-0.03em" }}>
        <motion.span
          className="block font-black text-text-main uppercase"
          style={{ fontSize: "clamp(72px, 11vw, 144px)" }}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
          animate={headlineVisible ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          SETTLEMENT
        </motion.span>
        <motion.span
          className="block font-black text-brand uppercase"
          style={{ fontSize: "clamp(72px, 11vw, 144px)" }}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
          animate={headlineVisible ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          LAYER.
        </motion.span>
      </h1>

      {/* Descriptor */}
      <motion.div
        className="mt-8 space-y-1"
        initial={{ opacity: 0, y: 8 }}
        animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <p className="font-mono text-sm text-brand/60">One unified layer for global stablecoin settlement.</p>
        <p className="font-mono text-sm text-brand/60">No destination gas. Instant routing. EVM-native.</p>
      </motion.div>

      {/* Terminal block */}
      <motion.div
        className="mt-10 max-w-2xl border border-brand/30"
        initial={{ opacity: 0, y: 12 }}
        animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.65 }}
      >
        <div className="px-4 py-2 flex items-center gap-2.5" style={{ backgroundColor: "rgba(232,160,32,0.2)" }}>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-brand/30" />
            <div className="w-2 h-2 rounded-full bg-brand/30" />
            <div className="w-2 h-2 rounded-full bg-brand/30" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-brand">
            MAGNUS CLI — STACCATO DEVNET
          </span>
        </div>
        <div className="p-6 flex flex-col gap-1.5 font-mono text-[13px]">
          {TERMINAL_LINES.map((line, i) => (
            <div
              key={i}
              className={`terminal-line ${
                line.type === "prompt" ? "text-brand" :
                line.type === "output" ? "text-green" :
                "text-white/70"
              }`}
              style={{ animationDelay: `${line.delay + 0.65}s` }}
            >
              {line.text}
            </div>
          ))}
          <div className="terminal-cursor-line" style={{ animationDelay: "4.0s" }}>
            <span className="text-brand font-mono text-[13px]">$</span>
            <span className="terminal-cursor ml-1.5" style={{ animationDelay: "4.0s" }} />
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="mt-10 flex gap-4 flex-wrap"
        initial={{ opacity: 0, y: 8 }}
        animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <a
          href="https://docs.magnuschain.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-brand border border-brand px-8 py-4 hover:bg-brand hover:text-bg transition-colors cursor-pointer"
        >
          [ READ_DOCS ]
        </a>
        <a
          href="https://docs.magnuschain.xyz/quickstart"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-brand/60 border border-brand/20 px-8 py-4 hover:border-brand/50 hover:text-brand transition-all cursor-pointer"
        >
          [ TRY_DEVNET → ]
        </a>
      </motion.div>

      {/* 2. Stats counter strip */}
      <div
        ref={statsRef}
        className="mt-16 pt-8 border-t border-brand/20 grid grid-cols-2 md:grid-cols-4 w-full"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={`flex flex-col gap-2 px-6 ${i === 0 ? "pl-0" : "border-l border-brand/10"}`}
            initial={{ opacity: 0, y: 12 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="font-black text-5xl text-brand leading-none" style={{ letterSpacing: "-0.02em" }}>
              <AnimatedStat stat={stat} inView={statsInView} />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="h-16" />
    </section>
  );
}

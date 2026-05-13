"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -60px 0px", amount: 0 } as const;

// Each element uses whileInView directly — no manual IO management,
// no state, no race conditions. Framer handles it.

export function SectionContainer({
  children, className,
}: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function AnimLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function AnimHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.35, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// AnimRows: wrapper that staggers its AnimRow children
export function AnimRows({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

// Each row animates independently on scroll
export function AnimRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.35, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

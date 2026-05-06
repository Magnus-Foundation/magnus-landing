"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 w-full min-h-[90vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-brand leading-[1.05] mb-8">
          The stablecoin <br />
          <span className="text-text-muted">blockchain.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-12">
          The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.
          No destination gas fees. Global liquidity lives here, and routes seamlessly everywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#docs"
            className="bg-brand-light text-white px-8 py-4 rounded font-medium hover:bg-brand transition text-center shadow-lg shadow-brand/10"
          >
            Read Documentation
          </a>
        </div>
      </motion.div>
    </section>
  );
}

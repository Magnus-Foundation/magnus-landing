export function BuildCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(232,160,32,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,48,80,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,48,80,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-text-muted border border-border px-4 py-2 rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
          For Builders
        </div>

        <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-text-main mb-6 leading-tight">
          Build on<br />
          <span
            style={{
              background: "linear-gradient(135deg, #E8A020 0%, #F5B84A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Magnus.
          </span>
        </h2>

        <p className="text-lg text-text-muted max-w-xl mx-auto mb-12 leading-relaxed">
          Staccato devnet is live. Deploy your first stablecoin contract in under 5 minutes — same tooling you use on Ethereum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://docs.magnus.foundation/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand text-bg font-semibold px-8 py-4 rounded-sm hover:bg-brand-light transition-colors cursor-pointer text-sm"
          >
            Quickstart Guide
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="https://docs.magnus.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border text-text-muted font-mono text-xs px-8 py-4 rounded-sm hover:border-text-muted hover:text-text-main transition-all cursor-pointer tracking-widest uppercase"
          >
            Full Docs
          </a>
        </div>
      </div>
    </section>
  );
}

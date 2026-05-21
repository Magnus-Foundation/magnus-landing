import { MagnusLogo } from "./MagnusLogo";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-brand/20 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto px-6 md:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MagnusLogo size={36} />
          <span className="font-mono font-bold text-sm tracking-[0.25em] uppercase text-text-main">
            Magnus
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.12em]">
          <a href="#gas"     className="text-brand/50 hover:text-brand transition-colors">GAS</a>
          <a href="#gateway" className="text-brand/50 hover:text-brand transition-colors">GATEWAY</a>
          <a href="#netting" className="text-brand/50 hover:text-brand transition-colors">NETTING</a>
          <a href="#evm"     className="text-brand/50 hover:text-brand transition-colors">EVM</a>
        </div>
        <div>
          <a
            href="https://docs.magnus.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-brand border border-brand px-4 py-2 hover:bg-brand hover:text-bg transition-colors cursor-pointer"
          >
            READ_DOCS
          </a>
        </div>
      </div>
    </header>
  );
}

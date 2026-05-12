import { MagnusLogo } from "./MagnusLogo";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MagnusLogo className="w-10 h-10 text-text-main" />
          <span className="font-sans font-semibold text-2xl tracking-tight text-text-main">Magnus</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-text-muted">
          <a href="#gas"     className="hover:text-brand transition-colors">sys.gas</a>
          <a href="#gateway" className="hover:text-brand transition-colors">sys.gateway</a>
          <a href="#netting" className="hover:text-brand transition-colors">sys.netting</a>
          <a href="#evm"     className="hover:text-brand transition-colors">sys.evm</a>
        </div>
        <div>
          <a
            href="https://docs.magnuschain.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest bg-brand/10 border border-brand/25 px-4 py-2 rounded-sm text-brand hover:bg-brand hover:text-bg transition-colors cursor-pointer"
          >
            Read Docs
          </a>
        </div>
      </div>
    </header>
  );
}

import { ReactNode } from "react";

export function MagnusLogo({ className = "w-7 h-7 text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 10L16 4L26 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 22V10L16 16L26 10V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 22L16 28L26 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MagnusLogo2({ className = "w-7 h-7 text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7 24V6L16 14L25 6V24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11L16 19L25 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M7 16L16 24L25 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
    </svg>
  );
}


export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col font-sans overflow-x-hidden selection:bg-brand-light/20 selection:text-brand-light">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-brand flex items-center justify-center rounded-sm">
          <div className="w-2 h-2 bg-bg rounded-sm" />
        </div>
        <span className="font-display font-medium text-lg tracking-tight">Magnus</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm text-text-muted">
        <a href="#gas" className="hover:text-brand-light transition-colors">sys.gas</a>
        <a href="#gateway" className="hover:text-brand-light transition-colors">sys.gateway</a>
        <a href="#netting" className="hover:text-brand-light transition-colors">sys.netting</a>
        <a href="#evm" className="hover:text-brand-light transition-colors">bin.init</a>
      </div>
      <div>
        <a
          href="#docs"
          className="font-mono text-xs uppercase tracking-widest bg-brand/5 border border-brand/20 px-4 py-2 rounded text-brand hover:bg-brand hover:text-white transition-all"
        >
          Read Docs
        </a>
      </div>
    </header>
  );
}

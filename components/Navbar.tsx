export function Navbar() {
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

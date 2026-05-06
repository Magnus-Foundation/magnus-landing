export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-12 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm text-text-muted">
        <div className="flex gap-4 items-center">
          <span className="text-brand font-medium flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-brand-light" />
            Magnus Network
          </span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-light transition">Twitter</a>
          <a href="#" className="hover:text-brand-light transition">Docs</a>
          <a href="#" className="hover:text-brand-light transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

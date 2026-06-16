import { MagnusLogo } from "./MagnusLogo";

const LINKS = [
  { label: "Gas", href: "#gas" },
  { label: "Rails", href: "#rails" },
  { label: "Netting", href: "#netting" },
  { label: "Performance", href: "#perf" },
];

export function Navbar() {
  return (
    <header className="nav-shell">
      <div className="wrap">
        <nav className="nav-inner">
          <a href="#top" className="logo">
            <MagnusLogo size={26} />
            MAGNUS
          </a>
          <div className="navlinks">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a
              href="https://github.com/Magnus-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: "var(--color-text-muted)" }}
            >
              GitHub
            </a>
            <a
              href="https://docs.magnus.foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: "9px 17px", fontSize: 14, borderRadius: 10 }}
            >
              Read docs
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

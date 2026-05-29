import { MagnusLogo } from "./MagnusLogo";

const LINKS = [
  { label: "Gas", href: "#gas" },
  { label: "Rails", href: "#gateway" },
  { label: "Netting", href: "#netting" },
  { label: "Performance", href: "#perf" },
];

export function Navbar() {
  return (
    <header className="nav-shell">
      <div className="wrap">
        <nav className="nav-inner">
          <a href="/" className="logo">
            <MagnusLogo size={26} />
            MAGNUS
          </a>
          <div className="navlinks">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <a
            href="https://docs.magnus.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Read docs
          </a>
        </nav>
      </div>
    </header>
  );
}

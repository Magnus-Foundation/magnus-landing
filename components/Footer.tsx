import { MagnusLogo } from "./MagnusLogo";

const GROUPS = [
  {
    label: "Product",
    links: [
      { name: "Gas layer", href: "#gas" },
      { name: "Gateway", href: "#rails" },
      { name: "Netting engine", href: "#netting" },
      { name: "EVM runtime", href: "#perf" },
    ],
  },
  {
    label: "Developers",
    links: [
      { name: "Documentation", href: "https://docs.magnus.foundation", ext: true },
      { name: "API reference", href: "https://docs.magnus.foundation", ext: true },
      { name: "GitHub", href: "https://github.com/Magnus-Foundation", ext: true },
      { name: "Explorer", href: "https://devnet.magnus.foundation", ext: true },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "mailto:info@magnus.foundation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a href="#top" className="logo">
              <MagnusLogo size={24} />
              MAGNUS
            </a>
            <p className="foot-lede">
              The settlement layer for stablecoins, across every chain.
            </p>
          </div>
          {GROUPS.map((g) => (
            <div key={g.label}>
              <h5>{g.label}</h5>
              <ul>
                {g.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      {...("ext" in l && l.ext
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bot">
          <span>© {new Date().getFullYear()} Magnus Foundation</span>
          <div className="legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/security">Security</a>
            <a href="https://x.com/magnus_chain" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

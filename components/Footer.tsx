import { MagnusLogo } from "./MagnusLogo";

const linkGroups = [
  {
    label: "sys.product",
    links: [
      { name: "Gas Layer",      href: "#gas" },
      { name: "Gateway",        href: "#gateway" },
      { name: "Netting Engine", href: "#netting" },
      { name: "EVM Runtime",    href: "#evm" },
    ],
  },
  {
    label: "sys.developers",
    links: [
      { name: "Documentation", href: "https://docs.magnus.foundation" },
      { name: "API Reference",  href: "https://docs.magnus.foundation" },
      { name: "GitHub",         href: "#github" },
      { name: "Bug Bounty",     href: "#bounty" },
    ],
  },
  {
    label: "sys.network",
    links: [
      { name: "Validators", href: "#validators" },
      { name: "Explorer",   href: "https://devnet.magnus.foundation" },
      { name: "Bridge",     href: "#bridge" },
    ],
  },
  {
    label: "sys.company",
    links: [
      { name: "About",   href: "#about" },
      { name: "Blog",    href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter",  href: "#twitter" },
  { name: "Discord",  href: "#discord" },
  { name: "Telegram", href: "#telegram" },
  { name: "Mirror",   href: "#mirror" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-brand/20 bg-bg w-full">
      <div className="mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          <div className="col-span-2 md:col-span-6 lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <MagnusLogo size={36} />
              <span className="font-mono font-bold text-sm tracking-[0.25em] uppercase text-text-main">
                Magnus
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed max-w-xs">
              The settlement layer for stablecoins, across every chain and bank.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.label} className="md:col-span-3 lg:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand mb-5">
                {group.label}
              </div>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-text-muted hover:text-brand transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand/20 pt-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 font-mono text-[10px] text-text-muted">
            <span>© {new Date().getFullYear()} Magnus Labs Inc.</span>
            <div className="flex gap-6">
              <a href="/privacy"  className="hover:text-brand transition-colors">Privacy</a>
              <a href="#terms"    className="hover:text-brand transition-colors">Terms</a>
              <a href="#security" className="hover:text-brand transition-colors">Security</a>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {socialLinks.map((s, i) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className={`font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-brand transition-colors px-3 py-2 ${
                  i < socialLinks.length - 1 ? "border-r border-brand/20" : ""
                }`}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

const links = [
  { label: "Games", href: "/games" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Studio", href: "/studio" },
  { label: "Log", href: "/blog" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-[60] bg-paper/[0.86] backdrop-blur-[10px] border-b border-line">
      <div className="max-w-[1180px] mx-auto px-7 py-[15px] flex items-center justify-between gap-6">
        {/* Logo — Alejandro Endo monogram + wordmark */}
        <Link href="/" className="flex items-center gap-[11px] no-underline">
          <span className="w-[34px] h-[34px] rounded-badge bg-accent grid place-items-center">
            <span className="font-heading font-bold text-paper text-[16px] leading-none">
              ae
            </span>
          </span>
          <span className="font-heading font-bold text-[19px] tracking-[-0.01em] text-ink">
            alejandro <span className="text-accent">endo</span>
          </span>
        </Link>

        {/* Nav links + CTA */}
        <div className="flex items-center gap-5 flex-wrap justify-end">
          <div className="flex gap-5 font-mono text-[12.5px] font-medium uppercase tracking-[0.06em]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink no-underline hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#contact"
            className="font-heading font-semibold text-[14px] text-paper bg-accent rounded-badge px-[18px] py-[9px] no-underline transition-opacity hover:opacity-85"
          >
            Hire me
          </Link>
        </div>
      </div>
    </nav>
  );
}

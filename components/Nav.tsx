"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/#top" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
  { label: "Games", href: "/games" },
];

export default function Nav() {
  // Strengthen the sticky bar (more opaque + soft shadow) once the page scrolls.
  const [scrolled, setScrolled] = useState(false);
  // On /studio the bar adopts the studio palette; `.theme-studio` redefines the
  // color vars so every utility below re-resolves to cream + pine.
  const isStudio = usePathname() === "/studio";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[60] backdrop-blur-[10px] border-b border-line transition-[background,box-shadow,color] duration-300 ${
        isStudio ? "theme-studio" : ""
      } ${scrolled ? "bg-paper/95 shadow-soft-sm" : "bg-paper/[0.86]"}`}
    >
      <div className="max-w-[1180px] mx-auto px-7 py-[15px] flex items-center justify-between gap-6">
        {/* Logo — Alejandro Endo monogram + wordmark */}
        <Link href="/" className="flex items-center gap-[11px] no-underline">
          
          <span className="font-heading font-bold text-[19px] tracking-[-0.01em] text-ink">
            Alejandro <span className="text-accent">Endo</span>
          </span>
        </Link>

        {/* Nav links + CTA */}
        <div className="flex items-center gap-5 flex-wrap justify-end">
          <div className="flex gap-5 font-mono text-[12.5px] font-medium uppercase tracking-[0.06em]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-ink no-underline hover:text-accent transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/studio"
            className="font-heading font-semibold text-[14px] text-paper bg-accent rounded-badge px-[18px] py-[9px] no-underline transition-opacity hover:opacity-85"
          >
            Game Studio
          </Link>
        </div>
      </div>
    </nav>
  );
}

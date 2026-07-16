import Link from "next/link";
import type { SiteContent } from "@/lib/types";

export default function Hero({
  hero,
  stats,
  resumeHref,
}: {
  hero: SiteContent["hero"];
  stats: SiteContent["about"]["stats"];
  resumeHref: string;
}) {
  return (
    <header
      id="top"
      className="bg-ink text-paper border-b border-[#2A2A2A] scroll-mt-20"
    >
      <div className="max-w-[1180px] mx-auto px-7 pt-20 pb-[88px] flex flex-wrap gap-14 items-center">
        {/* Left column — copy */}
        <div className="flex-1 basis-[440px] min-w-[300px]">
          <div
            className="rise font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-[26px]"
            style={{ animationDelay: "60ms" }}
          >
            {hero.badge}
          </div>

          <h1
            className="rise font-heading font-bold text-[clamp(38px,6vw,66px)] leading-[1.02] tracking-[-0.025em] m-0 mb-6"
            style={{ animationDelay: "120ms" }}
          >
            {hero.heading} <span className="text-accent">{hero.highlight}</span>
          </h1>

          <p
            className="rise text-[clamp(16px,1.6vw,18.5px)] leading-[1.62] max-w-[540px] text-paper/[0.68] mb-[34px]"
            style={{ animationDelay: "180ms" }}
          >
            {hero.subcopy}
          </p>

          <div
            className="rise flex flex-wrap gap-3 mb-8"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/#work"
              className="font-heading font-semibold text-[15px] text-paper bg-accent rounded-btn px-6 py-[13px] no-underline transition-opacity hover:opacity-[0.88]"
            >
              See my games →
            </Link>
            <a
              href={resumeHref}
              download
              className="font-heading font-semibold text-[15px] text-paper bg-transparent border border-paper/[0.28] rounded-btn px-6 py-[13px] no-underline transition-colors hover:border-accent"
            >
              Download CV
            </a>
          </div>

          <div
            className="rise flex flex-wrap gap-[9px] font-mono text-[12px] font-medium tracking-[0.03em]"
            style={{ animationDelay: "300ms" }}
          >
            {hero.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="text-paper no-underline border border-paper/[0.22] rounded-chip px-[13px] py-[7px] transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div
            className="rise flex gap-9 flex-wrap mt-9"
            style={{ animationDelay: "340ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading font-bold text-[36px] text-accent leading-none">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] font-medium uppercase text-paper/55 mt-[6px] tracking-[0.04em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — portrait with accent offset square */}
        <div
          className="rise flex-[0_1_340px] min-w-[260px] flex justify-center relative"
          style={{ animationDelay: "380ms" }}
        >
          <div className="relative w-[300px] h-[300px]">
            <div className="absolute top-4 left-4 w-[300px] h-[300px] rounded-card-xl bg-accent" />
            <div className="relative w-[300px] h-[300px] rounded-card-xl border border-black/15 bg-[#DDDDDD] grid place-items-center overflow-hidden">
              <span className="font-mono text-[11px] text-ink/40 uppercase tracking-[0.1em]">
                Portrait
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

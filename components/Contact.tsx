import type { SiteContent } from "@/lib/types";
import Reveal from "./Reveal";

export default function Contact({ contact }: { contact: SiteContent["contact"] }) {
  return (
    <section id="contact" className="bg-accent scroll-mt-20">
      <Reveal className="max-w-[1180px] mx-auto px-7 py-[92px] text-center text-paper">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-paper/[0.72] mb-[18px]">
          Let&apos;s talk
        </div>
        <h2 className="font-heading font-bold text-[clamp(32px,5vw,56px)] leading-[1.06] max-w-[780px] mx-auto mb-[22px] tracking-[-0.025em]">
          {contact.heading}
        </h2>
        <p className="text-[18px] leading-[1.6] max-w-[520px] mx-auto mb-9 text-paper/[0.92]">
          {contact.subcopy}
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <a
            href={contact.primary.href}
            target={contact.primary.external ? "_blank" : undefined}
            rel={contact.primary.external ? "noopener noreferrer" : undefined}
            className="font-heading font-semibold text-[16px] text-ink bg-paper rounded-btn px-[26px] py-[14px] no-underline transition-transform hover:-translate-y-0.5"
          >
            {contact.primary.label}
          </a>
          <a
            href={contact.resumeHref}
            className="font-heading font-semibold text-[16px] text-paper bg-ink rounded-btn px-[26px] py-[14px] no-underline transition-transform hover:-translate-y-0.5"
          >
            Download CV (PDF)
          </a>
        </div>

        <div className="flex gap-[10px] justify-center flex-wrap font-mono text-[12.5px] font-medium">
          {contact.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              className="text-paper no-underline border border-paper/45 rounded-chip px-[15px] py-[8px] transition-colors hover:bg-paper hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

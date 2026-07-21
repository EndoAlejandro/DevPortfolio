import type { SiteContent } from "@/lib/types";
import Reveal from "./Reveal";

export default function Skills({ skills }: { skills: SiteContent["skills"] }) {
  return (
    <section id="skills" className="bg-ink text-paper mt-[52px] scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-7 py-[88px]">
        <Reveal className="mb-12 max-w-[640px]">
          <div className="font-label text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
            What I bring to a team
          </div>
          <h2 className="font-heading font-bold text-[clamp(30px,4.2vw,44px)] tracking-[-0.02em] m-0 mb-4">
            {skills.heading}
          </h2>
          <p className="text-[16.5px] leading-[1.6] text-paper/[0.66] m-0">
            {skills.subcopy}
          </p>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
          {skills.categories.map((cat, i) => (
            <Reveal
              key={cat.title}
              delay={Math.min(i, 6) * 70}
              className="border border-paper/[0.16] rounded-card p-[26px] bg-paper/[0.03]"
            >
              <div className="font-heading font-semibold text-[19px] text-accent mb-[18px]">
                {cat.title}
              </div>
              {/* Plain list: no chips, separated by a middot. */}
              <div className="flex flex-wrap items-center gap-y-1">
                {cat.items.map((item, idx) => (
                  <span key={item} className="font-label text-[12px] font-medium">
                    {item}
                    {idx < cat.items.length - 1 && (
                      <span aria-hidden="true" className="mx-2 text-paper/40">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

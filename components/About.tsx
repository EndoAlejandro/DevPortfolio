import type { SiteContent } from "@/lib/types";

export default function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section
      id="about"
      className="max-w-[1180px] mx-auto px-7 py-24 scroll-mt-20 flex flex-wrap gap-14 items-center"
    >
      {/* Portrait with accent ring */}
      <div className="flex-[0_1_280px] min-w-[240px] flex justify-center">
        <div className="relative w-[248px] h-[248px]">
          <div className="absolute inset-[-8px] rounded-full border border-accent" />
          <div className="relative w-[248px] h-[248px] rounded-full border border-line bg-[#DDDDDD] grid place-items-center overflow-hidden">
            <span className="font-mono text-[11px] text-ink/40 uppercase tracking-[0.1em]">
              Photo
            </span>
          </div>
        </div>
      </div>

      {/* Copy + stats */}
      <div className="flex-1 basis-[460px] min-w-[300px]">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-[14px]">
          About
        </div>
        <h2 className="font-heading font-bold text-[clamp(28px,3.6vw,38px)] tracking-[-0.02em] m-0 mb-5">
          {about.heading}
        </h2>
        {about.paragraphs.map((p, i) => (
          <p
            key={i}
            className={`text-[16px] leading-[1.68] text-ink/[0.78] m-0 ${
              i === about.paragraphs.length - 1 ? "mb-[30px]" : "mb-4"
            }`}
          >
            {p}
          </p>
        ))}
        <div className="flex gap-9 flex-wrap">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-bold text-[36px] text-accent leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] font-medium uppercase text-ink/55 mt-[6px] tracking-[0.04em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

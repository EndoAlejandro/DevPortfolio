import type { SiteContent } from "@/lib/types";

export default function Employers({
  employers,
}: {
  employers: SiteContent["employers"];
}) {
  if (!employers?.items?.length) return null;

  return (
    <section className="max-w-[1180px] mx-auto px-7 pt-8 pb-16">
      <div className="mb-8">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
          {employers.heading}
        </div>
        {employers.subcopy && (
          <p className="font-body text-[15px] leading-[1.55] text-ink/60 max-w-[520px] m-0">
            {employers.subcopy}
          </p>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {employers.items.map((item) => {
          const inner = item.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.logo}
              alt={item.name}
              className="max-h-9 w-auto object-contain opacity-80"
            />
          ) : (
            <span className="font-heading font-semibold text-[18px] text-ink/70">
              {item.name}
            </span>
          );

          const box = "border border-line rounded-card bg-card grid place-items-center h-[92px] px-5 transition-colors hover:border-ink/40";

          return item.href ? (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${box} no-underline`}
            >
              {inner}
            </a>
          ) : (
            <div key={item.name} className={box}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

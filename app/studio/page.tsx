import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, getSite } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import ShelfCard from "@/components/ShelfCard";
import type { StudioLang } from "@/lib/types";

export const metadata: Metadata = {
  title: "Lost Medium - Game Studio",
  description:
    "Lost Medium - a small game studio Alejandro Endo co-founded. The team, the story, and the games made under the studio banner.",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: StudioLang = rawLang === "es" ? "es" : "en";

  const site = getSite();
  const s = site.studio[lang];
  const projects = await getAllProjects();
  const studioGames = projects.filter((p) => p.studio);
  const selected = studioGames.filter((p) => p.category === "selected");
  const shelf = studioGames.filter((p) => p.category === "shelf");

  const langLink = (code: StudioLang, label: string) => (
    <Link
      href={`/studio?lang=${code}`}
      aria-current={lang === code ? "true" : undefined}
      className={`no-underline ${
        lang === code ? "text-accent" : "text-ink/40 hover:text-ink/70"
      } transition-colors`}
    >
      {label}
    </Link>
  );

  return (
    <main className="theme-studio bg-paper text-ink min-h-screen">
      {/* COVER — echoes the Lost Medium proposal look: cream + pine green */}
      <section className="max-w-[1180px] mx-auto px-7 pt-16 pb-20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-heading font-bold text-[20px] tracking-[-0.02em]">
              lost medium
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
              studios
            </span>
          </div>
          {/* Language toggle */}
          <div className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em]">
            {langLink("en", "EN")}
            <span className="text-ink/25">/</span>
            {langLink("es", "ES")}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-ink mb-5">
            {s.label}
          </div>
          <h1 className="font-heading font-bold uppercase text-accent text-[clamp(56px,13vw,150px)] leading-[0.88] tracking-[-0.02em] m-0">
            {site.studio.title}
          </h1>
        </div>

        <div className="border-t border-line my-9" />

        <p className="font-heading text-[clamp(18px,2.4vw,28px)] font-medium leading-[1.35] max-w-[860px] m-0">
          {s.tagline}
        </p>

        <div className="border-t border-line my-9" />

        <div className="flex justify-between flex-wrap gap-4 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink/70">
          <span>
            {s.founded} · {s.location}
          </span>
          <span>Lost Medium Studios</span>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-[860px] mx-auto px-7 pb-6">
        {s.description.map((p, i) => (
          <p
            key={i}
            className="text-[17px] leading-[1.7] text-ink/[0.82] m-0 mb-5"
          >
            {p}
          </p>
        ))}
      </section>

      {/* TEAM */}
      <section className="max-w-[1180px] mx-auto px-7 py-14">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-8">
          {s.teamHeading}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
          {s.members.map((m) => (
            <div key={m.name} className="flex flex-col items-start">
              <div className="w-[76px] h-[76px] rounded-full border border-line bg-card grid place-items-center mb-4 overflow-hidden">
                <span className="font-heading font-bold text-[22px] text-accent">
                  {initials(m.name)}
                </span>
              </div>
              <div className="font-heading font-semibold text-[19px] tracking-[-0.01em]">
                {m.name}
              </div>
              <div className="font-mono text-[11.5px] font-medium uppercase tracking-[0.04em] text-ink/55 mt-1">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GAMES */}
      <section className="max-w-[1180px] mx-auto px-7 pb-24">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-8">
          {s.gamesHeading}
        </div>

        {studioGames.length === 0 ? (
          <p className="font-body text-[16px] text-ink/60">
            {lang === "es"
              ? "Pronto habrá proyectos del estudio - vuelve pronto."
              : "Studio projects are on the way - check back soon."}
          </p>
        ) : (
          <>
            {selected.length > 0 && (
              <div className="flex flex-col gap-[26px] mb-8">
                {selected.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    imageRight={i % 2 === 1}
                  />
                ))}
              </div>
            )}
            {shelf.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
                {shelf.map((project) => (
                  <ShelfCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

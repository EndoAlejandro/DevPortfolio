import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import GameCard from "@/components/GameCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "All games - Alejandro Endo",
  description:
    "The full catalog of games and prototypes by Alejandro Endo - Video Games and jam projects.",
};

export default async function GamesPage() {
  const projects = await getAllProjects();
  // Selected games first, then shelf/prototypes; keep manual order within each.
  const all = [...projects].sort((a, b) => {
    const ca = a.category === "selected" ? 0 : 1;
    const cb = b.category === "selected" ? 0 : 1;
    if (ca !== cb) return ca - cb;
    return (a.order ?? 999) - (b.order ?? 999);
  });

  return (
    <main className="max-w-[1180px] mx-auto px-7 pt-[74px] pb-24">
      <Reveal className="mb-10 max-w-[720px]">
        <div className="font-label text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
          All games
        </div>
        <h1 className="font-heading font-bold text-[clamp(38px,6vw,64px)] leading-[1.0] tracking-[-0.025em] m-0 mb-4">
          Everything I&apos;ve made
        </h1>
        <p className="text-[clamp(16px,1.6vw,18px)] leading-[1.6] text-ink/70 m-0">
          The full shelf - shipped solo builds and quick prototypes alike. Each
          card opens its page, where you can watch it, read the notes, and play.
        </p>
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        {all.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 6) * 60}>
            <GameCard project={project} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}

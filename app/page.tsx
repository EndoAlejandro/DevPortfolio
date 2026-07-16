import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ShelfCard from "@/components/ShelfCard";
import Skills from "@/components/Skills";
import Employers from "@/components/Employers";
import Contact from "@/components/Contact";
import { getAllProjects, getSite } from "@/lib/content";

export default async function Home() {
  const site = getSite();
  const projects = await getAllProjects();
  const selected = projects.filter((p) => p.category === "selected");
  const shelf = projects.filter((p) => p.category === "shelf");

  return (
    <main>
      <Hero
        hero={site.hero}
        stats={site.about.stats}
        resumeHref={site.contact.resumeHref}
      />

      <Employers employers={site.employers} />

      {/* WORK — Selected games */}
      <section
        id="work"
        className="max-w-[1180px] mx-auto px-7 pt-24 pb-[34px] scroll-mt-20"
      >
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-11">
          <div>
            <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
              Selected games
            </div>
            <h2 className="font-heading font-bold text-[clamp(30px,4.2vw,44px)] tracking-[-0.02em] m-0">
              Things I made and released
            </h2>
          </div>
          <Link
            href="/games"
            className="font-mono text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
          >
            View all games →
          </Link>
        </Reveal>

        <div className="flex flex-col gap-[26px]">
          {selected.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 6) * 80}>
              <ProjectCard project={project} imageRight={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MORE FROM THE SHELF */}
      <section className="max-w-[1180px] mx-auto px-7 pt-[62px] pb-11">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-9">
          <div>
            <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
              More from the shelf
            </div>
            <h2 className="font-heading font-bold text-[clamp(28px,3.6vw,38px)] tracking-[-0.02em] m-0">
              Prototypes &amp; smaller builds
            </h2>
          </div>
          <Link
            href="/games"
            className="font-mono text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
          >
            View all games →
          </Link>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {shelf.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 6) * 70}>
              <ShelfCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <Skills skills={site.skills} />
      <Contact contact={site.contact} />
    </main>
  );
}

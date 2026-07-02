import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ShelfCard from "@/components/ShelfCard";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Employers from "@/components/Employers";
import Devlog from "@/components/Devlog";
import Contact from "@/components/Contact";
import { getAllPosts, getAllProjects, getSite } from "@/lib/content";

export default async function Home() {
  const site = getSite();
  const projects = await getAllProjects();
  const posts = await getAllPosts();
  const selected = projects.filter((p) => p.category === "selected");
  const shelf = projects.filter((p) => p.category === "shelf");

  return (
    <main>
      <Hero hero={site.hero} />

      <Employers employers={site.employers} />

      {/* WORK — Selected games */}
      <section
        id="work"
        className="max-w-[1180px] mx-auto px-7 pt-24 pb-[34px] scroll-mt-20"
      >
        <div className="flex items-end justify-between gap-5 flex-wrap mb-11">
          <div>
            <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
              Selected games
            </div>
            <h2 className="font-heading font-bold text-[clamp(30px,4.2vw,44px)] tracking-[-0.02em] m-0">
              Things I made and released
            </h2>
          </div>
          <p className="font-body text-[15px] leading-[1.55] text-ink/60 max-w-[300px] m-0">
            Solo builds, concept to launch — all playable free on itch.io.
          </p>
        </div>

        <div className="flex flex-col gap-[26px]">
          {selected.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              imageRight={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* MORE FROM THE SHELF */}
      <section className="max-w-[1180px] mx-auto px-7 pt-[62px] pb-11">
        <div className="mb-9">
          <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
            More from the shelf
          </div>
          <h2 className="font-heading font-bold text-[clamp(28px,3.6vw,38px)] tracking-[-0.02em] m-0">
            Prototypes &amp; smaller builds
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {shelf.map((project) => (
            <ShelfCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <Skills skills={site.skills} />
      <About about={site.about} />
      <Devlog posts={posts} />
      <Contact contact={site.contact} />
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAllProjects, getProjectBySlug, getSite } from "@/lib/content";
import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/youtube";
import { pageLabel, playLabel } from "@/lib/links";
import MarkdownBody from "@/components/MarkdownBody";
import TagPill from "@/components/TagPill";
import CoverImage from "@/components/CoverImage";
import Lightbox from "@/components/Lightbox";
import Factsheet, { type FactRow } from "@/components/Factsheet";
import GameTeam from "@/components/GameTeam";
import type { Project, StudioMember } from "@/lib/types";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

async function load(slug: string): Promise<Project | null> {
  try {
    return await getProjectBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await load(slug);
  if (!project) return {};
  return {
    title: `${project.title} - Alejandro Endo`,
    description: project.summary,
  };
}

/** Small mono section label with an accent tick — astero's core device. */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-label text-[12px] font-medium uppercase tracking-[0.1em] text-ink/45 mb-5">
      <span className="inline-block w-4 h-px bg-accent" />
      {children}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await load(slug);
  if (!project) notFound();

  const embed = youtubeEmbedUrl(project.video);
  const videoThumb = project.videoThumbnail || youtubeThumbnail(project.video);
  const hasGalleryRow = !!embed || (project.gallery?.length ?? 0) > 0;

  // Factsheet: trimmed set. Blank rows are dropped so the grid stays tight.
  const release = project.releaseDate ?? (project.year ? String(project.year) : undefined);
  const facts: FactRow[] = [
    project.studio ? { label: "Studio", value: "Lost Medium Games" } : null,
    { label: "Developer", value: project.developer ?? "Alejandro Endo" },
    project.client ? { label: "Client", value: project.client } : null,
    release ? { label: "Release", value: release } : null,
    project.platform ? { label: "Platform", value: project.platform } : null,
    project.genre ? { label: "Genre", value: project.genre } : null,
    { label: "Engine", value: project.engine ?? "Unity" },
  ].filter((row): row is FactRow => row !== null);

  // Team: the project's own credits when set; otherwise fall back to the Lost
  // Medium roster (studio games) or just Alejandro (solo work).
  const site = getSite();
  const team: StudioMember[] =
    project.team && project.team.length > 0
      ? project.team
      : project.studio
        ? site.studio.en.members
        : [{ name: "Alejandro Endo", role: "Developer" }];

  return (
    <main className="max-w-[1000px] mx-auto px-7 pt-16 pb-24">
      <Link
        href="/#work"
        className="font-label text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
      >
        ← Back to work
      </Link>

      {/* Hero */}
      <header className="mt-8 mb-10">
        <div className="font-label text-[12px] font-medium uppercase tracking-[0.12em] text-accent mb-3">
          {project.studio ? "Lost Medium Games" : "Alejandro Endo"}
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-3">
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] tracking-[-0.02em] m-0">
            {project.title}
          </h1>
          {project.genre && <TagPill variant="genre">{project.genre}</TagPill>}
        </div>

        {project.tagline && (
          <p className="font-heading text-[clamp(17px,2.4vw,22px)] text-ink/70 m-0 mb-4 max-w-[640px]">
            {project.tagline}
          </p>
        )}

        {(project.status || project.role) && (
          <div className="flex items-center gap-3 flex-wrap mb-6">
            {project.status && (
              <span className="inline-block font-label text-[11px] font-medium uppercase tracking-[0.05em] bg-accent text-ink rounded-badge px-[9px] py-[4px]">
                {project.status}
              </span>
            )}
            {project.role && (
              <span className="font-label text-[12px] font-medium tracking-[0.05em] text-ink/50 uppercase">
                {project.role}
              </span>
            )}
          </div>
        )}

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-[7px] mb-7">
            {project.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}

        {/* Actions */}
        {(project.links?.play || project.links?.page || project.links?.source) && (
          <div className="flex gap-4 items-center flex-wrap">
            {project.links?.play && (
              <a
                href={project.links.play}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-semibold text-[15px] text-paper bg-ink rounded-btn px-6 py-3 no-underline transition-opacity hover:opacity-85"
              >
                {playLabel(project.links)}
              </a>
            )}
            {project.links?.page && (
              <a
                href={project.links.page}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label font-medium text-[13px] text-ink no-underline border-b-[1.5px] border-accent pb-[2px]"
              >
                {pageLabel(project.links)} ↗
              </a>
            )}
            {project.links?.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label font-medium text-[13px] text-ink no-underline border-b-[1.5px] border-accent pb-[2px]"
              >
                Source ↗
              </a>
            )}
          </div>
        )}
      </header>

      <Lightbox>
        {/* Key art — click to zoom */}
        <div className="relative w-full aspect-[16/10] rounded-card-lg overflow-hidden border border-line bg-[#DDDDDD] grid place-items-center mb-14">
          <CoverImage
            src={project.cover}
            alt={`${project.title} - key art`}
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </div>

        {/* About (write-up) with the factsheet as a sticky sidebar to its right. */}
        <div className="grid lg:grid-cols-[1fr_15rem] gap-x-12 gap-y-10 items-start mb-14">
          <section>
            <SectionLabel>About</SectionLabel>
            <MarkdownBody html={project.contentHtml} />
          </section>

          <aside className="lg:sticky lg:top-24">
            <SectionLabel>Factsheet</SectionLabel>
            <Factsheet rows={facts} />
          </aside>
        </div>

        {/* Screenshots — gallery + a video miniature that plays on click. */}
        {hasGalleryRow && (
          <section className="mb-14">
            <SectionLabel>Screenshots</SectionLabel>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
              {embed && (
                <button
                  type="button"
                  data-video={`${embed}?autoplay=1&rel=0`}
                  aria-label={`Play ${project.title} gameplay`}
                  className="group relative block w-full aspect-[4/3] rounded-card border border-line overflow-hidden bg-ink cursor-pointer"
                >
                  {videoThumb && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={videoThumb}
                      alt={`${project.title} - gameplay`}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity !cursor-pointer"
                    />
                  )}
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-[54px] h-[54px] rounded-full bg-black/55 group-hover:bg-accent transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute bottom-2 left-3 font-label text-[10px] font-medium uppercase tracking-[0.08em] text-white/90">
                    Gameplay
                  </span>
                </button>
              )}
              {project.gallery?.map((src) => (
                <div
                  key={src}
                  className="relative w-full aspect-[4/3] rounded-card border border-line overflow-hidden bg-[#DDDDDD]"
                >
                  {/* Cover-fill the tile (crop overflow) so every screenshot is
                      the same size with no white space; the Lightbox opens the
                      full, uncropped image on click. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover !cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </Lightbox>

      {/* Team */}
      <section>
        <SectionLabel>Team</SectionLabel>
        <GameTeam members={team} />
      </section>
    </main>
  );
}

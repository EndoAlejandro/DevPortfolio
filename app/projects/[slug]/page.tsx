import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/youtube";
import MarkdownBody from "@/components/MarkdownBody";
import TagPill from "@/components/TagPill";
import CoverImage from "@/components/CoverImage";
import Lightbox from "@/components/Lightbox";
import type { Project } from "@/lib/types";

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
    title: `${project.title} — Alejandro Endo`,
    description: project.summary,
  };
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

  return (
    <main className="max-w-[1000px] mx-auto px-7 pt-16 pb-24">
      <Link
        href="/#work"
        className="font-mono text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
      >
        ← Back to work
      </Link>

      {/* Header */}
      <div className="mt-8 mb-6">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] tracking-[-0.02em] m-0">
            {project.title}
          </h1>
          {project.genre && <TagPill variant="genre">{project.genre}</TagPill>}
        </div>
        {project.role && (
          <div className="font-mono text-[12px] font-medium tracking-[0.05em] text-ink/50 uppercase">
            {project.role}
          </div>
        )}
      </div>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-[7px] mb-7">
          {project.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}

      {/* Actions */}
      {(project.links?.play || project.links?.page || project.links?.source) && (
        <div className="flex gap-4 items-center flex-wrap mb-10">
          {project.links?.play && (
            <a
              href={project.links.play}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold text-[15px] text-paper bg-ink rounded-btn px-6 py-3 no-underline transition-opacity hover:opacity-85"
            >
              Play in browser
            </a>
          )}
          {project.links?.page && (
            <a
              href={project.links.page}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-medium text-[13px] text-ink no-underline border-b-[1.5px] border-accent pb-[2px]"
            >
              View on itch.io ↗
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-medium text-[13px] text-ink no-underline border-b-[1.5px] border-accent pb-[2px]"
            >
              Source ↗
            </a>
          )}
        </div>
      )}

      <Lightbox>
        {/* Key art — click to zoom */}
        <div className="relative w-full aspect-[16/10] rounded-card-lg overflow-hidden border border-line bg-[#DDDDDD] grid place-items-center mb-10">
          <CoverImage
            src={project.cover}
            alt={`${project.title} — key art`}
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </div>

        {/* Write-up */}
        <MarkdownBody html={project.contentHtml} />

        {/* Gallery — screenshots + a video miniature that plays on click */}
        {hasGalleryRow && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mt-12">
            {embed && (
              <button
                type="button"
                data-video={`${embed}?autoplay=1&rel=0`}
                aria-label={`Play ${project.title} gameplay`}
                className="group relative block w-full aspect-video rounded-card border border-line overflow-hidden bg-ink cursor-pointer"
              >
                {videoThumb && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={videoThumb}
                    alt={`${project.title} — gameplay`}
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
                <span className="absolute bottom-2 left-3 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white/90">
                  Gameplay
                </span>
              </button>
            )}
            {project.gallery?.map((src) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt={project.title}
                className="w-full rounded-card border border-line"
              />
            ))}
          </div>
        )}
      </Lightbox>
    </main>
  );
}

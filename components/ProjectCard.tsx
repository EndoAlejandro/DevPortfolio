import Link from "next/link";
import type { Project } from "@/lib/types";
import TagPill from "./TagPill";

// Large "Selected games" card. Alternates image side by index parity.
export default function ProjectCard({
  project,
  imageRight = false,
}: {
  project: Project;
  imageRight?: boolean;
}) {
  const { title, genre, role, summary, tags, links, slug } = project;

  const imageCol = (
    <div
      className={`flex-1 basis-[420px] min-w-[300px] ${imageRight ? "border-l border-line" : ""}`}
    >
      {/* Cover placeholder — swap for real key art at project.cover */}
      <div className="w-full aspect-[16/10] bg-[#DDDDDD] grid place-items-center">
        <span className="font-mono text-[11px] text-ink/40 uppercase tracking-[0.1em]">
          {title}
        </span>
      </div>
    </div>
  );

  const contentCol = (
    <div
      className={`flex-1 basis-[340px] min-w-[280px] p-[34px] pb-8 ${imageRight ? "" : "border-l border-line"}`}
    >
      <div className="flex items-center gap-3 mb-[14px] flex-wrap">
        <Link
          href={`/projects/${slug}`}
          className="font-heading font-bold text-[28px] tracking-[-0.01em] text-ink no-underline hover:text-accent transition-colors"
        >
          {title}
        </Link>
        {genre && <TagPill variant="genre">{genre}</TagPill>}
      </div>

      {role && (
        <div className="font-mono text-[11.5px] font-medium tracking-[0.05em] text-ink/50 uppercase mb-4">
          {role}
        </div>
      )}

      <p className="text-[15px] leading-[1.62] text-ink/[0.78] mb-[22px]">
        {summary}
      </p>

      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-[7px] mb-6">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}

      <div className="flex gap-4 items-center flex-wrap">
        {links?.play && (
          <a
            href={links.play}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-[14px] text-paper bg-ink rounded-badge px-[18px] py-[10px] no-underline transition-opacity hover:opacity-85"
          >
            Play in browser
          </a>
        )}
        {links?.page && (
          <a
            href={links.page}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-medium text-[12.5px] text-ink no-underline border-b-[1.5px] border-accent pb-[2px]"
          >
            View page ↗
          </a>
        )}
      </div>
    </div>
  );

  return (
    <article
      className={`flex flex-wrap ${imageRight ? "flex-wrap-reverse" : ""} border border-line rounded-card-lg overflow-hidden bg-card shadow-soft`}
    >
      {imageRight ? (
        <>
          {contentCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {contentCol}
        </>
      )}
    </article>
  );
}

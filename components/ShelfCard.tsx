import type { Project } from "@/lib/types";

// Compact "More from the shelf" card. The whole card links out to itch.io.
export default function ShelfCard({ project }: { project: Project }) {
  const href = project.links?.page ?? project.links?.play ?? "#";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline text-inherit border border-line rounded-card overflow-hidden bg-card shadow-soft-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Cover placeholder — swap for real key art at project.cover */}
      <div className="w-full aspect-[4/3] bg-[#DDDDDD] border-b border-line grid place-items-center">
        <span className="font-mono text-[11px] text-ink/40 uppercase tracking-[0.1em]">
          {project.title}
        </span>
      </div>
      <div className="px-[19px] pt-[17px] pb-[19px]">
        <div className="font-heading font-semibold text-[19px] tracking-[-0.01em] mb-[5px]">
          {project.title}
        </div>
        {project.role && (
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-ink/55">
            {project.role}
          </div>
        )}
      </div>
    </a>
  );
}

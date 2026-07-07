import Link from "next/link";
import type { Project } from "@/lib/types";
import CoverImage from "./CoverImage";

// Compact "More from the shelf" card. Links to the internal project page.
export default function ShelfCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block no-underline text-inherit border border-line rounded-card overflow-hidden bg-card shadow-soft-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative w-full aspect-[4/3] bg-[#DDDDDD] border-b border-line grid place-items-center overflow-hidden">
        <CoverImage
          src={project.cover}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, 25vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
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
    </Link>
  );
}

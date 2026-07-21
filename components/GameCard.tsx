import Link from "next/link";
import type { Project } from "@/lib/types";
import CoverImage from "./CoverImage";

// Uniform catalog card used on /games. Links to the internal project page.
export default function GameCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group no-underline text-inherit border border-line rounded-card overflow-hidden bg-card shadow-soft-sm h-full flex flex-col transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative w-full aspect-[16/10] bg-[#DDDDDD] border-b border-line grid place-items-center overflow-hidden">
        <CoverImage
          src={project.cover}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-[19px] pt-[17px] pb-[19px] flex flex-col flex-1">
        <div className="font-heading font-semibold text-[20px] tracking-[-0.01em] mb-[6px] group-hover:text-accent transition-colors">
          {project.title}
        </div>
        {project.role && (
          <div className="font-label text-[11px] font-medium uppercase tracking-[0.04em] text-ink/55">
            {project.role}
          </div>
        )}
      </div>
    </Link>
  );
}

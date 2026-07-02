import Link from "next/link";
import type { Post } from "@/lib/types";
import TagPill from "./TagPill";

// Format ISO date "2026-05-12" -> "May 2026".
export function monthYear(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group no-underline text-inherit border border-line rounded-card overflow-hidden bg-card shadow-soft-sm h-full flex flex-col transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="w-full aspect-[16/9] bg-[#DDDDDD] border-b border-line grid place-items-center">
        <span className="font-mono text-[11px] text-ink/40 uppercase tracking-[0.1em] px-4 text-center">
          {post.title}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-ink/50 mb-[10px]">
          {monthYear(post.date)} · {post.readingTime}
        </div>
        <h3 className="font-heading font-semibold text-[20px] leading-[1.15] tracking-[-0.01em] m-0 mb-[10px] group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-[14.5px] leading-[1.55] text-ink/[0.74] m-0 mb-4 flex-1">
          {post.excerpt}
        </p>
        {post.tags?.length > 0 && (
          <div className="flex gap-[6px] flex-wrap">
            {post.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

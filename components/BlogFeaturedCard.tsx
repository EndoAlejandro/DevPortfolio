import Link from "next/link";
import type { Post } from "@/lib/types";
import TagPill from "./TagPill";
import { monthYear } from "./BlogCard";

// Large featured post at the top of /blog.
export default function BlogFeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group no-underline text-inherit flex flex-wrap border border-line rounded-card-lg overflow-hidden bg-card shadow-soft transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex-1 basis-[440px] min-w-[300px] relative aspect-[16/10] bg-[#DDDDDD] grid place-items-center overflow-hidden border-r border-line">
        <span className="absolute top-4 left-4 z-[2] font-label text-[11px] font-medium uppercase tracking-[0.06em] text-paper bg-accent rounded-chip px-[9px] py-1">
          Latest
        </span>
        <span className="font-label text-[11px] text-ink/40 uppercase tracking-[0.1em] px-4 text-center">
          {post.title}
        </span>
      </div>
      <div className="flex-1 basis-[320px] min-w-[280px] p-[34px] flex flex-col justify-center">
        <div className="font-label text-[12px] font-medium uppercase tracking-[0.04em] text-ink/50 mb-[14px]">
          {monthYear(post.date)} · {post.readingTime}
        </div>
        <h2 className="font-heading font-bold text-[clamp(24px,3vw,34px)] leading-[1.08] tracking-[-0.01em] m-0 mb-[14px] group-hover:text-accent transition-colors">
          {post.title}
        </h2>
        <p className="text-[16px] leading-[1.6] text-ink/[0.78] m-0 mb-5">
          {post.excerpt}
        </p>
        {post.tags?.length > 0 && (
          <div className="flex gap-[7px] flex-wrap mb-5">
            {post.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
        <span className="font-heading font-semibold text-[15px] text-accent border-b-[1.5px] border-accent self-start pb-[2px]">
          Read the post →
        </span>
      </div>
    </Link>
  );
}

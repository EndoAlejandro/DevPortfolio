import Link from "next/link";
import type { Post } from "@/lib/types";
import Reveal from "./Reveal";

// Format an ISO date ("2026-05-12") as "2026.05" for the compact log list.
function shortDate(iso: string): string {
  return iso.slice(0, 7).replace("-", ".");
}

export default function Devlog({ posts }: { posts: Post[] }) {
  return (
    <section
      id="log"
      className="max-w-[1180px] mx-auto px-7 pt-5 pb-24 scroll-mt-20"
    >
      <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-8">
        <div>
          <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
            Devlog
          </div>
          <h2 className="font-heading font-bold text-[clamp(28px,3.6vw,38px)] tracking-[-0.02em] m-0">
            Notes from the workbench
          </h2>
        </div>
        <Link
          href="/blog"
          className="font-mono text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
        >
          View all posts →
        </Link>
      </Reveal>

      <Reveal className="border border-line rounded-card overflow-hidden bg-card shadow-soft-sm">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`flex items-center justify-between gap-5 px-7 py-6 no-underline text-inherit flex-wrap transition-[background,padding] duration-200 hover:bg-paper hover:pl-8 ${
              i < posts.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <div className="flex items-baseline gap-[22px] flex-1 basis-[320px] min-w-0">
              <span className="font-mono text-[12px] font-medium text-accent shrink-0 w-[60px]">
                {shortDate(post.date)}
              </span>
              <span className="font-heading font-semibold text-[18px] text-ink tracking-[-0.01em]">
                {post.title}
              </span>
            </div>
            <span className="font-mono text-[12px] font-medium text-ink/45 shrink-0">
              {post.readingTime} →
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

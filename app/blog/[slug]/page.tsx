import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import MarkdownBody from "@/components/MarkdownBody";
import TagPill from "@/components/TagPill";
import { monthYear } from "@/components/BlogCard";
import type { Post } from "@/lib/types";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

async function load(slug: string): Promise<Post | null> {
  try {
    return await getPostBySlug(slug);
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
  const post = await load(slug);
  if (!post) return {};
  return { title: `${post.title} — Alejandro Endo`, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();

  return (
    <main className="max-w-[760px] mx-auto px-7 pt-16 pb-24">
      <Link
        href="/blog"
        className="font-mono text-[12px] font-medium text-ink/55 no-underline hover:text-accent transition-colors"
      >
        ← Back to the devlog
      </Link>

      <article className="mt-8">
        <div className="font-mono text-[12px] font-medium uppercase tracking-[0.05em] text-ink/50 mb-4">
          {monthYear(post.date)} · {post.readingTime}
        </div>
        <h1 className="font-heading font-bold text-[clamp(30px,5vw,46px)] leading-[1.05] tracking-[-0.02em] m-0 mb-5">
          {post.title}
        </h1>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-[7px] mb-9">
            {post.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
        <MarkdownBody html={post.contentHtml} />
      </article>
    </main>
  );
}

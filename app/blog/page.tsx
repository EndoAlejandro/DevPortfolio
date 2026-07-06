import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import BlogCard from "@/components/BlogCard";
import BlogFeaturedCard from "@/components/BlogFeaturedCard";

export const metadata: Metadata = {
  title: "Devlog - Alejandro Endo",
  description:
    "Notes from the workbench - how the games get made: systems, tooling, VR, and game feel.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="max-w-[1180px] mx-auto px-7 pt-[74px] pb-24">
      {/* Masthead */}
      <header className="mb-10 max-w-[720px]">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
          Devlog
        </div>
        <h1 className="font-heading font-bold text-[clamp(38px,6vw,64px)] leading-[1.0] tracking-[-0.025em] m-0 mb-4">
          Notes from the workbench
        </h1>
        <p className="text-[clamp(16px,1.6vw,18px)] leading-[1.6] text-ink/70 m-0">
          How these games actually get made - the systems, the tooling, the VR
          experiments, and the pursuit of game feel.
        </p>
      </header>

      {featured && (
        <div className="mb-8">
          <BlogFeaturedCard post={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <>
          <div className="font-mono text-[13px] font-medium tracking-[0.14em] uppercase text-ink/50 mb-6">
            All posts
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

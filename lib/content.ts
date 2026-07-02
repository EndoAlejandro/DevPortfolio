import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import type { Post, Project, SiteContent } from "./types";

const contentDir = path.join(process.cwd(), "content");
const projectsDir = path.join(contentDir, "projects");
const blogDir = path.join(contentDir, "blog");

/** Render a Markdown string to an HTML string. */
async function renderMarkdown(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

/** List the slugs (filenames without .md) in a content folder. */
function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// --- Projects ---

export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  // Front-matter fields; slug falls back to the filename.
  return { ...(data as Omit<Project, "contentHtml">), slug: data.slug ?? slug, contentHtml };
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    listSlugs(projectsDir).map((slug) => getProjectBySlug(slug)),
  );
  // Manual `order` first (lower = earlier), then newest year, then featured.
  return projects.sort((a, b) => {
    const ao = a.order ?? 999;
    const bo = b.order ?? 999;
    if (ao !== bo) return ao - bo;
    if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
    return Number(b.featured ?? false) - Number(a.featured ?? false);
  });
}

// --- Blog posts ---

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(blogDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  return {
    ...(data as Omit<Post, "contentHtml" | "readingTime">),
    slug: data.slug ?? slug,
    readingTime: readingTime(content).text, // e.g. "8 min read"
    contentHtml,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    listSlugs(blogDir).map((slug) => getPostBySlug(slug)),
  );
  // Newest first by date.
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// --- Global site content ---

export function getSite(): SiteContent {
  const fullPath = path.join(contentDir, "site.json");
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

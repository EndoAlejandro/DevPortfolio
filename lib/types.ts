// Front-matter schemas for file-based content.
// These mirror the YAML at the top of each Markdown file in /content.

// "selected" = the big Selected Games cards; "shelf" = compact
// "More from the shelf" prototype cards.
export type ProjectCategory = "selected" | "shelf";

export interface ProjectLinks {
  /** itch.io "Play in browser" link. */
  play?: string;
  /** itch.io page ("View page ↗"). */
  page?: string;
  /** Optional source repo. */
  source?: string;
}

/** A game/project. One Markdown file per project in content/projects/. */
export interface Project {
  title: string;
  slug: string;
  year?: number;
  /** Genre badge, e.g. "Survival", "Roguelite". Optional. */
  genre?: string;
  /** Free-text credit line, e.g. "Solo · Unity · Play free in browser". */
  role?: string;
  summary: string;
  tags: string[];
  /** true = credited to Lost Medium Games → also shows on /studio. */
  studio: boolean;
  /** Which homepage section: big "Selected games" vs compact "shelf" grid. */
  category: ProjectCategory;
  /** Cover image path under /public, e.g. "/images/projects/foo-cover.jpg". */
  cover: string;
  /** Optional YouTube URL (watch/youtu.be/embed) - shown as a play miniature. */
  video?: string;
  /** Optional custom thumbnail for the video miniature; defaults to YouTube's. */
  videoThumbnail?: string;
  /** Optional extra images shown on the project's own page. */
  gallery?: string[];
  links?: ProjectLinks;
  /** Optional highlight flag for the homepage. */
  featured?: boolean;
  /** Manual display order within a section (lower = first). */
  order?: number;
  /** Rendered HTML of the Markdown body (filled in by the content reader). */
  contentHtml: string;
}

/** A devlog/blog post. One Markdown file per post in content/blog/. */
export interface Post {
  title: string;
  slug: string;
  /** ISO date string, e.g. "2026-05-14". */
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  /** true = shown as the large featured post at the top of /blog. */
  featured?: boolean;
  /** Computed at read time from the body word count, e.g. "8 min read". */
  readingTime: string;
  contentHtml: string;
}

// --- Global site content (content/site.json) ---

export interface SiteLink {
  label: string;
  href: string;
  /** Open in a new tab (external links). */
  external?: boolean;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface Employer {
  name: string;
  /** Optional logo image path under /public; falls back to the name. */
  logo?: string;
  href?: string;
}

export interface StudioMember {
  name: string;
  role: string;
  /** Optional avatar image path under /public. */
  photo?: string;
}

export type StudioLang = "en" | "es";

/** All translatable studio-page copy for one language. */
export interface StudioLocale {
  label: string;
  tagline: string;
  description: string[];
  founded: string;
  location: string;
  teamHeading: string;
  gamesHeading: string;
  members: StudioMember[];
}

export interface SiteContent {
  hero: {
    badge: string;
    /** Headline text shown before the highlighted phrase. */
    heading: string;
    /** Emphasized phrase, rendered in the accent color. */
    highlight: string;
    subcopy: string;
    socials: SiteLink[];
  };
  skills: {
    heading: string;
    subcopy: string;
    categories: SkillCategory[];
  };
  about: {
    heading: string;
    paragraphs: string[];
    stats: SiteStat[];
  };
  employers: {
    heading: string;
    subcopy?: string;
    items: Employer[];
  };
  studio: {
    /** Big display title, e.g. "LOST MEDIUM" (same in every language). */
    title: string;
    /** Translatable copy per language; the /studio page toggles via ?lang=. */
    en: StudioLocale;
    es: StudioLocale;
  };
  contact: {
    heading: string;
    subcopy: string;
    /** Primary CTA (e.g. LinkedIn message). */
    primary: SiteLink;
    resumeHref: string;
    socials: SiteLink[];
  };
}

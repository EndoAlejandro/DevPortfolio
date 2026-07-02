# Lost Medium Portfolio — Development Plan

**Purpose of this document:** This is a build brief for an AI coding assistant (e.g. Claude Code) to implement the portfolio site described below. It defines the stack, content model, routing, and step-by-step build order. Follow it in order — later phases depend on earlier ones.

---

## 0. Decisions already made

| Decision | Choice |
|---|---|
| Framework | Next.js (App Router), hosted on Vercel |
| Content editing | Git-based — content lives as files in the repo, edited via GitHub's web UI (or locally), no login/CMS/database |
| Images | Stored in the repo (`/public`), no cloud storage service |
| Game studio view | A filtered route on the *same* site (`/studio`), not a separate site |
| Blog posts | Written in Markdown |
| Source design | Two existing static mockups: homepage (`index_clean.html`) and blog index (`blog_clean.html`) — visual/copy source of truth |

**Why this stack for someone with little front/backend experience:** No database, no auth, no CMS account to manage. "Publishing" a new project or post is just adding a text file to the GitHub repo and committing — Vercel auto-deploys on every push to `main`. This is the lowest-maintenance option available. The tradeoff (noted for the future) is that adding content requires comfort editing a file with front-matter in the correct format — not a friendly form UI. If that becomes annoying later, migrating to a headless CMS (e.g. Sanity) on top of this same architecture is a small, isolated change (see §9).

---

## 1. Tech stack

- **Framework:** Next.js 14+, App Router, TypeScript
- **Styling:** CSS Modules or Tailwind CSS (recommend Tailwind — the mockup uses a consistent design-token system of colors/spacing/shadows that maps cleanly to a Tailwind theme config). *Open question for the builder: confirm with the user before locking in Tailwind vs CSS Modules if not already decided.*
- **Markdown/content processing:**
  - `gray-matter` — parses front-matter (metadata block) out of Markdown files
  - `next-mdx-remote` **or** `remark` + `remark-html` — renders Markdown body to HTML/React. Use `next-mdx-remote` if the user may want embedded custom components in blog posts later (e.g. image galleries, callout boxes); use plain `remark` if posts will only ever be plain text/images.
- **Images:** `next/image` for optimization, sourced from `/public/images/...`
- **Fonts:** Google Fonts `Fredoka` and `JetBrains Mono` (already referenced in the mockup), loaded via `next/font/google`
- **Deployment:** Vercel, connected to the GitHub repo, auto-deploy on push to `main`
- **No database. No auth. No API routes required for content** (content is filesystem-based, read at build time).

---

## 2. Content model

All content lives under a top-level `/content` directory in the repo, as Markdown files with YAML front-matter. Next.js reads these at **build time** using static generation (`generateStaticParams`), so every new file triggers a full rebuild on deploy — this is expected and fine at this scale.

### 2.1 Folder structure

```
/content
  /projects
    hollow-tide.md
    paper-districts.md
    null-signal.md
    gravity-cafe.md
    ...
  /blog
    building-a-diegetic-map.md
    shipping-solo-without-burning-out.md
    ...
/public
  /images
    /projects
      hollow-tide-cover.jpg
      hollow-tide-01.jpg
    /blog
      diegetic-map-cover.jpg
    /site
      portrait.jpg
      about-photo.jpg
```

### 2.2 Project front-matter schema

```yaml
---
title: "Hollow Tide"
slug: "hollow-tide"          # used for /projects/[slug] — must be unique
year: 2024
role: "Lost Medium · team of 5 · Godot · Steam"   # free-text credit line shown under title
summary: "Lost Medium's debut — an atmospheric underwater metroidvania about a diver mapping a drowned city."
tags: ["gameplay-lead", "systems", "tools", "team-of-5"]
studio: true                 # true = made under Lost Medium -> appears on /studio
category: "shipped"          # "shipped" | "jam"  — controls which homepage section it appears in
cover: "/images/projects/hollow-tide-cover.jpg"
gallery:                     # optional extra images shown on the project's own page
  - "/images/projects/hollow-tide-01.jpg"
links:
  play: "https://store.steampowered.com/..."     # optional
  trailer: "https://youtube.com/..."              # optional
  source: ""                                       # optional
stats: "★ 96% · 40k+ players"   # optional free-text line, shown if present
featured: true                 # optional, controls homepage ordering/highlighting
---

Full write-up of the project goes here in Markdown. This is shown on the
project's individual page (/projects/hollow-tide) below the header info,
gallery, and links.
```

**Notes on fields:**
- `studio` (boolean) is what powers the `/studio` filtered view — not a tag, to keep the filter logic unambiguous. Tags remain free-text for display (`Gameplay lead`, `Systems`, etc.).
- `category` distinguishes "Shipped games" vs "Jams & experiments" sections on the homepage, matching the two sections already in the mockup. Jam entries in the mockup are compact cards with less info — the schema still supports them, but the project detail page and card component should degrade gracefully when `role`, `links`, `stats`, or `gallery` are missing.

### 2.3 Blog post front-matter schema

```yaml
---
title: "Building a fully diegetic map in Hollow Tide"
slug: "diegetic-map-hollow-tide"
date: "2026-05-14"
readingTime: "8 min read"     # can be entered manually or computed at build time from word count (builder's choice — flag this decision to the user if computing automatically)
excerpt: "No HUD, no pause menu — the player draws the world as they explore it."
tags: ["Godot", "Tools", "Design"]
cover: "/images/blog/diegetic-map-cover.jpg"
featured: false                # true = shown as the large featured post at top of /blog
---

Full post body in Markdown here.
```

### 2.4 Site-wide/global content

A single non-collection file for text that isn't a project or post — hero copy, about section, stats, contact links, skills lists. Two reasonable options; **ask the user which they prefer**:
- `/content/site.json` (or `.yaml`) — one file holding hero text, about text, stats (5 years / 3 titles / 60k+ players), skills categories, and social links.
- Hardcoded directly into the React components, since this content changes rarely.

Recommendation: use `/content/site.json` for anything the user is likely to update occasionally (bio, stats, social links), and hardcode only truly static layout text.

---

## 3. Routing / pages (App Router)

| Route | Purpose | Data source |
|---|---|---|
| `/` | Homepage — hero, shipped games, jams, skills, about, contact (mirrors `index_clean.html`) | `content/projects/*.md` (filtered/sorted by `category`), `content/site.json` |
| `/projects/[slug]` | Individual project page — cover, gallery, full write-up, links | One file from `content/projects/` |
| `/studio` | Filtered view showing only projects where `studio: true` | `content/projects/*.md` filtered |
| `/blog` | Blog index — featured post + grid (mirrors `blog_clean.html`) | `content/blog/*.md` |
| `/blog/[slug]` | Individual blog post — rendered Markdown | One file from `content/blog/` |

All routes are statically generated (`generateStaticParams` + default static rendering) since content only changes on deploy.

---

## 4. Component breakdown

Reusable components to extract from the mockup (both HTML files share nav/footer):

- `Nav` — sticky top nav, same on every page (links to `#work`, `#skills`, `#about`, `/blog`, `#contact`)
- `Footer` — same on every page
- `Hero` — homepage only
- `ProjectCard` — used in "Shipped games" section (large, image + full details) — note the mockup alternates image-left/image-right per card, handle via a prop or index parity
- `JamCard` — compact card used in "Jams & experiments" grid and reused for jam-style entries
- `SkillsGrid` — the four-category skill card grid
- `AboutSection`
- `ContactSection`
- `BlogFeaturedCard` — large featured post card on `/blog`
- `BlogCard` — grid post card on `/blog`
- `TagPill` — small colored tag chip, reused across project cards and blog cards
- `MarkdownBody` — wraps rendered Markdown content for project/post detail pages with consistent typography

Reuse `ProjectCard`/`JamCard` on both `/` and `/studio` (same component, different filtered data).

---

## 5. Design tokens (from the mockup — carry over exactly)

- Colors: background `#FFF8E8`, ink `#24211A`, accent `#005C45` (Forest) / `#282F7D` (Navy, alt theme), lime `#B0E66C`, blue `#89CCFF`
- Fonts: `Fredoka` (headings/UI), `JetBrains Mono` (labels, tags, meta text), body text `Mulish` (referenced but not in the font-face list you attached — **confirm with the user** whether Mulish should be added via Google Fonts or swapped for a font actually being loaded)
- Signature visual style: thick `2.5px` dark borders, hard drop shadows (`6px 6px 0 #24211A`), rounded corners (`18–26px`), slight rotation on stickers/badges — treat these as a mini design system, not one-off inline styles

**Recommendation:** Convert these into a Tailwind theme (`tailwind.config.ts`) or a CSS variables file (`:root { --accent: ...; }`) rather than inline styles, so the whole site theme can be changed in one place — the original mockup already uses a CSS-variable pattern (`--accent`, `--hero-bg`, etc.) for exactly this reason.

---

## 6. Adding new content (the actual "posting" workflow)

Since there's no admin panel, publishing works like this:

1. Add a new Markdown file to `content/projects/` or `content/blog/` following the schema in §2, including a new cover image in `public/images/...`.
2. Commit and push to `main` (via GitHub's web UI "Add file" → "Create new file", or locally with git).
3. Vercel detects the push and redeploys automatically — new content is live in ~1–2 minutes.

**Recommended addition:** a short `CONTRIBUTING.md` or `content/README.md` in the repo with a copy-pasteable front-matter template for both projects and posts, so the user doesn't need to remember the schema each time.

---

## 7. Build phases (order of implementation)

1. **Scaffold:** `create-next-app` (TypeScript, App Router, Tailwind if chosen), set up fonts, base layout, CSS variables/theme.
2. **Content utilities:** functions to read/parse all files in `content/projects` and `content/blog` using `gray-matter` (+ Markdown renderer of choice), with TypeScript types for the front-matter schemas in §2.
3. **Static components:** `Nav`, `Footer`, `TagPill` — shared everywhere.
4. **Homepage (`/`):** Hero, marquee, Shipped games (`ProjectCard` list filtered `category: "shipped"`), Jams (`JamCard` grid filtered `category: "jam"`), Skills, About, Contact — port section by section from `index_clean.html`.
5. **Project detail (`/projects/[slug]`):** header, gallery, links, rendered Markdown body.
6. **Studio view (`/studio`):** same card components, filtered `studio: true`, plus a short intro header explaining this is Lost Medium's work.
7. **Blog index (`/blog`):** featured post card + grid, port from `blog_clean.html`.
8. **Blog post detail (`/blog/[slug]`):** rendered Markdown body with typography styling.
9. **Seed real content:** convert the placeholder projects/posts already in the mockup (Hollow Tide, Paper Districts, Null Signal, Gravity Café, Bitloom, Lumen, StateKit, and the 5 sample blog posts) into actual `.md` files as a working example set.
10. **Polish:** responsive check against original breakpoints, image optimization, metadata/SEO tags per page, favicon (already defined as inline SVG in the mockup — carry over or replace).
11. **Deploy:** connect repo to Vercel, verify production build, confirm auto-deploy on push.

---

## 8. Open questions / things to confirm before or during the build

These weren't fully specified and should be confirmed with the user (Mateo) rather than assumed:

1. **Styling approach:** Tailwind CSS vs CSS Modules/plain CSS — recommended Tailwind, needs confirmation.
2. **Mulish font:** referenced as body font in the mockup but no font-face for it was found in the decoded files — confirm it should be added via Google Fonts, or pick a replacement.
3. **Real content:** all copy (bio, project descriptions, blog posts), real images, and real links (Steam, itch.io, GitHub, YouTube, LinkedIn, résumé PDF) are currently placeholders in the mockup and need to be supplied.
4. **Résumé/CV:** the "Download résumé (PDF)" button — should this link to the attached `Endo_CV_ES_2025_03_27.pdf`, a different file, or a URL?
5. **Domain:** is there a custom domain to connect on Vercel, or is a `*.vercel.app` URL fine for now?
6. **Accent theme toggle:** the mockup has a "Forest vs Navy" accent and "Ink vs Cream" hero style as configurable options (originally editor-only props) — should the live site support switching these (e.g. as a settings toggle), or should one combination be picked permanently?
7. **Newsletter subscribe form** on `/blog`: the mockup has a non-functional email input. Does the user want this wired up (e.g. to Buttondown, Mailchimp, or a simple Vercel-compatible service), or left as a static/disabled element for now?
8. **Reading time:** manually written per post, or computed automatically at build time from word count?

---

## 9. Future upgrade path (not part of this build)

If editing raw Markdown files via GitHub ever becomes tedious, the git-based content model can be swapped for a headless CMS (e.g. Sanity, or a Git-backed CMS like Decap CMS which adds a form-based UI on top of the *same* Markdown files) without changing the routing, components, or design. This is worth knowing but is explicitly **out of scope** for this build.

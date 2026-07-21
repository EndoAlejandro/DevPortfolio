# Alejandro Endo — Portfolio

Personal portfolio + devlog for **Alejandro Endo**, a Unity game developer.
Built by someone with limited front-end experience — favor clarity over cleverness.

## Identity
- Site brand = **Alejandro Endo** (personal). His name is the logo/wordmark/footer/metadata.
- **Lost Medium** is a studio Alejandro co-founded (a team) — it's one of his projects, surfaced on `/studio`, NOT the site brand.
- A project is studio work when its front-matter has `studio: true` (then it appears on `/studio`). Solo work stays personal.

## Stack
- **Next.js 16** (App Router) + TypeScript, **React 19**, **Tailwind CSS v4**. Deployed on Vercel (auto-deploy on push to `main`).
- Content is **file-based**: Markdown + front-matter in `/content`, read at build time. No DB, no CMS, no auth.
- Content libs: `gray-matter` (front-matter), `remark` + `remark-html` (Markdown → HTML), `reading-time` (auto reading time).

## How to publish content (the whole workflow)
1. Add a Markdown file to `content/projects/` or `content/blog/` (see `content/README.md` for the template) + a cover image under `public/images/...`.
2. Commit + push to `main`. Vercel redeploys automatically (~1–2 min).

## Architecture
- `content/projects/*.md`, `content/blog/*.md`, `content/site.json` — all content.
- `lib/content.ts` — filesystem readers (`getAllProjects` / `getProjectBySlug` / `getAllPosts` / `getPostBySlug` / `getSite`). Reuse these; don't read files ad hoc in pages.
- `lib/types.ts` — front-matter TypeScript types.
- `components/` — shared UI (Nav, Footer, ProjectCard, JamCard, BlogCard, TagPill, MarkdownBody, ...).
- `app/` — routes `/`, `/projects/[slug]`, `/studio`, `/blog`, `/blog/[slug]`. All statically generated.

## Design system (from `mockups/portfolio-v2.clean.html` — the current source of truth)
- Colors: paper `#EEEEEE` (page bg), ink `#1A1A1A` (text + dark sections), accent raspberry `#CB2957`, card `#FCFCFC`, hairline border `#DDDDDD`.
- **Tailwind v4: design tokens live in `app/globals.css` inside `@theme { ... }`** (there is no `tailwind.config.ts`). Change colors/shadows/radii there, not inline. Tokens become utilities like `bg-paper`, `text-ink`, `text-accent`, `shadow-soft`, `border-line`.
- Signature look: clean/editorial — thin `1px #DDDDDD` borders, soft shadows (`0 8px 26px rgba(0,0,0,.06)`), rounded corners 9–22px, subtle hovers (opacity / translateY). Dark sections (hero, skills, footer) flip to ink bg with paper text.
- Fonts: Stack Sans Headline (`font-heading` — headings/UI), Google Sans Flex (`font-label` — labels, tags, meta lines), Mulish (body), JetBrains Mono (`font-mono` — Markdown code blocks only). Loaded via `next/font/google` in `app/layout.tsx` as CSS variables. (The mockups still show Space Grotesk + JetBrains Mono everywhere; the site has moved on.)
- NOTE: editing `@theme` tokens in `app/globals.css` can leave the dev server serving stale CSS even across a restart — if a token change doesn't show up, delete `.next` and restart.
- NOTE: the older `mockups/index.clean.html` / `blog.clean.html` (cream + forest, thick borders, hard shadows) are superseded — do not use them.

## Key rules
- `studio: true` → shows on `/studio` (games credited to Lost Medium Games). `category: "selected" | "shelf"` → which homepage section a project appears in ("Selected games" big cards vs "More from the shelf" compact grid).
- Games link out to itch.io (`links.play` / `links.page`); each also has an internal `/projects/[slug]` page.
- Cards must degrade gracefully when optional fields (`links` / `gallery` / `role` / `genre`) are missing.
- Homepage "Log" section is an on-page devlog list (date · title · read time) that links into `/blog`; individual posts live at `/blog/[slug]`.
- No newsletter feature anywhere (explicitly removed).
- After content/component changes, run `npm run build` to catch front-matter/type errors before pushing.

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build (run before pushing)
- `npm run lint` — ESLint

## Reference
- Current design mockup (source of truth): `mockups/portfolio-v2.clean.html`.
- Superseded early mockups: `mockups/index.clean.html`, `mockups/blog.clean.html` (do not use).
- Full build plan: `.claude/plans/i-m-a-unity-game-zazzy-piglet.md` (in the user's home `.claude`, not the repo).

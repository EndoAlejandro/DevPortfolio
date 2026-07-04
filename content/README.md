# Adding content

This site is **file-based**. To publish, add or edit a Markdown file in this
folder and push to `main` — Vercel redeploys automatically (~1–2 min).

- Games → `content/projects/*.md`
- Devlog posts → `content/blog/*.md`
- Site-wide copy (hero, skills, about, employers, studio, contact) → `content/site.json`
- Images → `public/images/...` (referenced by path, e.g. `/images/projects/noisy-boat.jpg`)

The **filename becomes the URL slug**, so `noisy-boat.md` → `/projects/noisy-boat`.
Keep filenames lowercase-with-dashes.

After any change, run `npm run build` locally to catch mistakes before pushing.

---

## Add a game

Create `content/projects/<slug>.md`:

```markdown
---
title: "Noisy Boat"
slug: "noisy-boat"            # must match the filename
genre: "Survival"             # optional — shown as a badge
role: "Solo · Unity · Play free in browser"   # optional credit line
summary: "One or two sentences shown on the card and project page."
tags: ["Design", "Code", "Game feel"]         # small chips
studio: false                 # true = also shows on /studio (Lost Medium)
category: "selected"          # "selected" = big cards · "shelf" = small grid
order: 1                      # lower = appears first within its section
cover: "/images/projects/noisy-boat.jpg"      # key art (put file in public/)
video: "https://youtu.be/XXXXXXXXXXX"          # optional YouTube gameplay
videoThumbnail: "/images/projects/noisy-boat-clip.jpg"  # optional (defaults to YouTube's)
gallery:                                        # optional extra screenshots
  - "/images/projects/noisy-boat-01.jpg"
links:
  play: "https://alejandroendo.itch.io/noisy-boat"   # "Play in browser"
  page: "https://alejandroendo.itch.io/noisy-boat"   # "View on itch.io"
  source: ""                                          # optional repo link
featured: true                # optional highlight flag
---

Full write-up in **Markdown** goes here — shown on the game's own
`/projects/<slug>` page under the video/cover. Headings, lists, links, and
images all work.
```

Notes:
- Only `title`, `slug`, `summary`, `tags`, `studio`, `category`, and `cover` are
  required. Everything else is optional and the card/page adapts if it's missing.
- **`video`** accepts any YouTube URL (`watch?v=`, `youtu.be/`, `embed/`, or a
  bare id). It shows up as a **play miniature in the gallery**; clicking it opens
  the video full-screen. The top of the page always shows the `cover` image.
  Set **`videoThumbnail`** to use your own capture as the miniature (otherwise it
  uses YouTube's thumbnail).
- **`category`**: `"selected"` → the big "Selected games" cards on the homepage;
  `"shelf"` → the compact "More from the shelf" grid.
- **`studio: true`** → the game also appears on `/studio` (Lost Medium Games).

---

## Add a devlog post

Create `content/blog/<slug>.md`:

```markdown
---
title: "Tuning the wave curve in Wind Shear"
slug: "tuning-the-wave-curve-in-wind-shear"   # must match the filename
date: "2026-05-12"            # YYYY-MM-DD — used for ordering + display
excerpt: "One sentence shown on the blog cards and the homepage log list."
tags: ["Design", "Game feel"]
cover: "/images/blog/wave-curve.jpg"          # optional cover image
featured: false               # true = the large featured post at /blog
---

Full post body in **Markdown**.
```

Notes:
- **Reading time is automatic** (computed from word count) — don't set it.
- Newest `date` sorts first. The homepage "Log" list shows the latest few and
  links to the full post at `/blog/<slug>`.
- `featured: true` promotes the post to the big card at the top of `/blog`
  (if several are featured, the newest wins).

---

## Add images

Put files under `public/images/` and reference them by path (leading `/`):

```
public/images/projects/noisy-boat.jpg   →  cover: "/images/projects/noisy-boat.jpg"
public/images/blog/wave-curve.jpg        →  cover: "/images/blog/wave-curve.jpg"
public/images/site/portrait.jpg          →  used in site.json / components
```

Use reasonably sized images (e.g. cover art ~1600px wide). Next.js optimizes
them automatically.

---

## Edit site-wide copy

`content/site.json` holds the non-repeating text:

- `hero` — badge, headline + highlighted phrase, subcopy, social links
- `skills` — the four skill categories
- `about` — heading, paragraphs, the three stat numbers
- `employers` — the "Where I've worked" logos/names (`items`: `name`, optional `logo`, `href`)
- `studio` — the Lost Medium page copy, in **`en` and `es`** (label, tagline,
  description, founded, location, section headings, and team `members`)
- `contact` — heading, subcopy, primary button, résumé link, social links

Just edit the strings; the layout stays the same.

---

## Look & feel

Not content, but handy: colors, corner radius, and shadows live in
`app/globals.css` inside the `@theme { ... }` block, and fonts are set in
`app/layout.tsx`. Change them there — never with inline styles.

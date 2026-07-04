# Content authoring guide (for AI agents)

This file tells an AI agent **exactly how to create the three kinds of content** on
this site: a **Project post** (a game), a **Blog post** (a devlog), and a
**Gamejam post**. It also covers what to do when a game is **playable in the
browser** vs. **published on the Google Play Store**.

Read this before hand-writing any Markdown file. The authoritative field types
live in [`lib/types.ts`](../lib/types.ts); the reader logic is in
[`lib/content.ts`](../lib/content.ts). If this guide and `lib/types.ts` ever
disagree, `lib/types.ts` wins.

---

## Ground rules (apply to every post)

1. **File location decides the type:**
   - Games / projects / jam entries → `content/projects/<slug>.md`
   - Devlog posts → `content/blog/<slug>.md`
2. **Filename = URL slug.** `noisy-boat.md` → `/projects/noisy-boat`. Use
   **lowercase-with-dashes**, no spaces, no capitals. The `slug:` field inside
   the file **must match the filename** (minus `.md`).
3. **Front-matter is YAML** between two `---` lines at the very top. Quote all
   string values. The Markdown body goes below the closing `---`.
4. **Images** go under `public/images/...` and are referenced by an absolute
   path starting with `/` (e.g. `/images/projects/noisy-boat.jpg`). The image
   file must actually exist in `public/` or the build has a broken image.
5. **Do not set computed fields.** Blog `readingTime` is auto-generated — never
   write it. `contentHtml` is generated from the body — never write it.
6. **After writing, always run `npm run build`** to catch front-matter/type
   errors, then commit + push to `main` (Vercel auto-deploys in ~1–2 min).
7. **Attribution:** `studio: true` credits the work to **Lost Medium Games** and
   also surfaces it on `/studio`. Use it only for studio/team projects. Solo work
   is `studio: false`. (Site brand is always **Alejandro Endo** personally.)

---

## 1. Project post (a game)

File: `content/projects/<slug>.md`

### Field reference

| Field       | Required | Type / values | Notes |
|-------------|----------|---------------|-------|
| `title`     | ✅ | string | Display name. |
| `slug`      | ✅ | string | Must equal the filename. |
| `summary`   | ✅ | string | 1–2 sentences, shown on cards + project page. |
| `tags`      | ✅ | string[] | Small chips, e.g. `["Code", "Proc-gen"]`. |
| `studio`    | ✅ | boolean | `true` = Lost Medium (also shows on `/studio`). |
| `category`  | ✅ | `"selected"` \| `"shelf"` | `selected` = big homepage cards; `shelf` = compact grid. |
| `cover`     | ✅ | string | `/images/projects/<file>` — must exist in `public/`. |
| `year`      | ⬜ | number | Used for sort order. |
| `genre`     | ⬜ | string | Badge, e.g. `"Roguelite"`. |
| `role`      | ⬜ | string | Credit line, e.g. `"Solo · Unity · C# · Play free in browser"`. |
| `video`     | ⬜ | string | Any YouTube URL/id; renders a player instead of the cover. |
| `gallery`   | ⬜ | string[] | Extra screenshots on the project page. |
| `links`     | ⬜ | object | `play`, `page`, `source` — see below. |
| `featured`  | ⬜ | boolean | Homepage highlight flag. |
| `order`     | ⬜ | number | Manual sort within a section (lower = first). |

### Template

```markdown
---
title: "Noisy Boat"
slug: "noisy-boat"                 # must match filename
year: 2026
genre: "Survival"                  # optional badge
role: "Solo · Unity · Play free in browser"   # optional credit line
summary: "One or two sentences shown on the card and project page."
tags: ["Design", "Code", "Game feel"]
studio: false                      # true = Lost Medium Games (also on /studio)
category: "selected"               # "selected" (big) or "shelf" (compact)
order: 1
cover: "/images/projects/noisy-boat.jpg"
video: "https://youtu.be/XXXXXXXXXXX"   # optional YouTube trailer
gallery:
  - "/images/projects/noisy-boat-01.jpg"
links:
  play: "https://alejandroendo.itch.io/noisy-boat"
  page: "https://alejandroendo.itch.io/noisy-boat"
  source: ""                       # optional repo link
featured: true
---

Full write-up in **Markdown**. Headings, lists, links, and images all work.
This renders on the game's own /projects/<slug> page, under the video or cover.
```

---

## 2. Blog post (a devlog)

File: `content/blog/<slug>.md`

### Field reference

| Field       | Required | Type / values | Notes |
|-------------|----------|---------------|-------|
| `title`     | ✅ | string | Post title. |
| `slug`      | ✅ | string | Must equal the filename. |
| `date`      | ✅ | string | `YYYY-MM-DD`. Newest date sorts first. |
| `excerpt`   | ✅ | string | One sentence, shown on blog cards + homepage Log list. |
| `tags`      | ✅ | string[] | Topic chips. |
| `cover`     | ⬜ | string | `/images/blog/<file>` — optional. |
| `featured`  | ⬜ | boolean | `true` = big featured post at top of `/blog` (newest featured wins). |

**Do NOT set `readingTime`** — it is computed automatically from the body word count.

### Template

```markdown
---
title: "Tuning the wave curve in Wind Shear"
slug: "tuning-the-wave-curve-in-wind-shear"   # must match filename
date: "2026-05-12"
excerpt: "One sentence shown on the blog cards and the homepage Log list."
tags: ["Design", "Game feel"]
cover: "/images/blog/wave-curve.jpg"          # optional
featured: false
---

Full post body in **Markdown**.
```

---

## 3. Gamejam post

**Important:** there is **no separate "gamejam" content type**. A gamejam entry
is a **Project post** (`content/projects/<slug>.md`) using the schema in section 1.
What makes it a jam entry is convention, not a different file type:

- Set `category: "shelf"` so it lands in the compact **"More from the shelf"**
  grid rather than the big Selected Games cards (jam builds are usually quick
  prototypes, not headline projects). Use `"selected"` only if the jam game is a
  standout you want featured large.
- Put the jam context in `role` and/or `genre`, e.g.
  `role: "48h Game Jam · Unity · Team of 3"` or `genre: "Jam"`.
- Set `studio` correctly: `true` if it was made under **Lost Medium**, else `false`.
- Add `year` and a short `summary` mentioning the jam (name/theme/placement).
- Use `links` for where to play it (usually the itch.io jam entry — see section 4).

### Template (a jam entry)

```markdown
---
title: "Signal Lost"
slug: "signal-lost"
year: 2026
genre: "Jam"
role: "Ludum Dare 55 · Unity · 72h · Team of 3"
summary: "Made in 72 hours for Ludum Dare 55 (theme: Summoning). Placed top 10% in Fun."
tags: ["Jam", "Game feel", "Code"]
studio: false
category: "shelf"
cover: "/images/projects/signal-lost.jpg"
links:
  play: "https://alejandroendo.itch.io/signal-lost"
  page: "https://alejandroendo.itch.io/signal-lost"
---

Built in a weekend for Ludum Dare 55. Notes on what we scoped, cut, and shipped.
```

---

## 4. Where a game is played: browser vs. Google Play

The project page renders up to three action buttons from the `links` object.
**How each link is currently labeled is hardcoded** in
[`app/projects/[slug]/page.tsx`](../app/projects/[slug]/page.tsx):

| `links` field | Button shown | Intended for |
|---------------|--------------|--------------|
| `play` | **"Play in browser"** (solid dark button) | itch.io / web builds playable in the browser |
| `page` | **"View on itch.io ↗"** (accent underline) | The itch.io project page |
| `source` | **"Source ↗"** | Optional code repo |

### A. Game is playable in the browser (itch.io / WebGL)

This is the normal case. Set:

```yaml
role: "Solo · Unity · Play free in browser"
links:
  play: "https://alejandroendo.itch.io/<game>"   # → "Play in browser" button
  page: "https://alejandroendo.itch.io/<game>"   # → "View on itch.io ↗"
```

- Use `play` for the URL that opens the actual playable build.
- `page` is optional; include it if there's a separate storefront/page to view.

### B. Game is on the Google Play Store

⚠️ **There is currently no dedicated Play Store field or button in the schema.**
`play` says "Play in browser" and `page` says "View on itch.io ↗" — neither label
fits a Play Store link. So do one of the following:

**Option 1 — Recommended (no code change): link it in the body + `role`.**
Leave `links.play` empty (a Play Store app isn't browser-playable), and put the
store link inside the Markdown body as a normal link. Reflect availability in
`role`.

```yaml
role: "Solo · Unity · Android · On Google Play"
# no links.play (not browser-playable)
links:
  page: ""      # leave empty unless you accept the "View on itch.io" label
```

```markdown
Available now on Android — **[Get it on Google Play](https://play.google.com/store/apps/details?id=com.lostmedium.yourgame)**.
```

**Option 2 — Only if a code change is acceptable:** add a proper Play Store
button. That means extending `ProjectLinks` in [`lib/types.ts`](../lib/types.ts)
(e.g. a `store` field) and rendering a "Get it on Google Play" button in
`app/projects/[slug]/page.tsx`. **Do not silently reuse `page` for a Play Store
URL** — it will render the misleading text "View on itch.io ↗". If you take this
option, flag the code change to the user rather than doing it as part of routine
content authoring.

**Do NOT** put a Play Store URL in `links.play` — that button is labeled
"Play in browser" and Play Store apps are not browser-playable.

---

## Publish checklist (every time)

1. File is in the right folder (`content/projects/` or `content/blog/`).
2. Filename is lowercase-with-dashes and `slug:` matches it.
3. All **required** fields present; strings quoted.
4. Every referenced image exists under `public/images/...`.
5. For games: `category`, `studio`, and `links` are correct; Play Store handled
   per section 4B (never in `links.play`).
6. Run `npm run build` — fix any front-matter/type errors it reports.
7. Commit + push to `main`; Vercel auto-deploys.

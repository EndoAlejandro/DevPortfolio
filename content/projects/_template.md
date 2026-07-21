---
title: "Game title"
slug: "game-title"            # MUST match the filename (no leading _)
year: 2026                    # optional — shown on the project page
genre: "Survival"             # optional — shown as a badge + factsheet Genre row
role: "Solo · Unity · Play free in browser"   # optional credit line (hero)
tagline: "One short, punchy line."             # optional — hero line under the title
status: "Available now"        # optional — hero badge (e.g. "In development")
summary: "One or two sentences shown on the card and at the top of the page."
tags: ["Design", "Code", "Game feel"]         # small chips
studio: false                 # true = credited to Lost Medium Games, also shows on /studio
team:                         # optional — credits for the page's Team section
  - name: "Alejandro Endo"    #   omit to fall back to the Lost Medium roster
    role: "Design & Code"     #   (studio games) or just Alejandro (solo work)
  - name: "Collaborator"
    role: "Art & Audio"
category: "selected"          # "selected" = big homepage cards · "shelf" = compact grid
order: 1                      # lower = appears first within its section
cover: "/images/projects/game-title.jpg"      # key art (put file in public/)
video: "https://youtu.be/XXXXXXXXXXX"          # optional YouTube gameplay (play miniature)
videoThumbnail: "/images/projects/game-title-clip.jpg"  # optional (defaults to YouTube's)
gallery:                                        # optional extra screenshots
  - "/images/projects/game-title-01.jpg"
  - "/images/projects/game-title-02.jpg"
links:
  play: "https://alejandroendo.itch.io/game-title"   # primary button
  page: "https://alejandroendo.itch.io/game-title"   # secondary link
  source: ""                                          # optional repo link
  playLabel: ""   # optional — button text; auto-derived from the host otherwise
  pageLabel: ""   # optional — secondary link text
featured: true                # optional homepage highlight flag
# --- Factsheet (project page) — all optional, blank rows are hidden ---
platform: "Web · itch.io"     # optional — e.g. "Android · Google Play"
engine: "Unity"               # optional — factsheet defaults to "Unity"
releaseDate: "August 2024"    # optional — factsheet Release; falls back to `year`
developer: "Alejandro Endo"   # optional — factsheet Developer override
client: "DeJusticia"          # optional — factsheet Client (commissioned/freelance work)
---

<!--
  This is a TEMPLATE. It never appears on the site because its filename starts
  with "_". To publish a project:
    1. Copy this file, rename it to your slug (e.g. wind-shear.md — no "_").
    2. Set `slug:` above to the SAME name as the file.
    3. Only title, slug, summary, tags, studio, category, cover are REQUIRED —
       delete any optional field you don't use; the card/page adapts.
  Everything below the front-matter is the write-up shown on the project's own
  /projects/<slug> page, under the cover/video. Run `npm run build` before pushing.
-->

Open with what the game is and your role on it. **Bold**, _italic_, `inline
code`, and [links](https://alejandroendo.itch.io) all work.

## What I built

Describe the interesting problems. Lists work well for feature/credit breakdowns:

- Systems you designed or coded
- Tools or tech used
- What you'd do differently

> Pull out a nice quote or a design principle with a blockquote.

### Screenshot with a caption

Keep a blank line above and below the HTML block:

<figure>
  <img src="/images/projects/game-title-01.jpg" alt="Describe the screenshot" />
  <figcaption>What this screenshot shows.</figcaption>
</figure>

### Gameplay clip (self-hosted)

Put the file under `public/videos/...` and keep it small:

<video controls loop muted playsinline poster="/images/projects/clip-poster.jpg" width="100%">
  <source src="/videos/projects/game-title-clip.mp4" type="video/mp4" />
</video>

### Trailer (YouTube / Vimeo embed)

Responsive 16:9 embed — swap `VIDEO_ID` for your video's id:

<figure class="video-embed">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Trailer" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

Close with results, links, or credits.

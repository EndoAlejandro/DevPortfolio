---
title: "Post title shown as the big heading"
slug: "post-title-shown-as-the-big-heading"   # MUST match the filename (no leading _)
date: "2026-01-01"            # YYYY-MM-DD — used for ordering + display
excerpt: "One sentence shown on the blog cards and the homepage log list."
tags: ["Design", "Game feel"]
cover: "/images/blog/my-cover.jpg"            # optional cover image (put file in public/)
featured: false               # true = the large featured post at the top of /blog
---

<!--
  This is a TEMPLATE. It never appears on the site because its filename starts
  with "_". To publish a post:
    1. Copy this file, rename it to your slug (e.g. wave-curve.md — no "_").
    2. Set `slug:` above to the SAME name as the file.
    3. Delete the parts you don't need and write your post.
  Everything below the front-matter is normal Markdown. Run `npm run build`
  before pushing to catch mistakes.
-->

Open with a short paragraph. You can use **bold**, _italic_, `inline code`, and
[a link](https://alejandroendo.itch.io). These all work out of the box.

## A section heading

Use `##` for sections and `###` for sub-sections (the page already renders the
post title as the top heading, so start your body at `##`).

- Bullet lists work
- So do **numbered** lists (use `1.` `2.` ...)

> Blockquotes are styled with a raspberry accent bar — good for a pull quote.

### Inline image

A plain Markdown image sits between paragraphs and gets click-to-zoom for free:

![Describe the image for accessibility](/images/blog/my-shot.jpg)

### Animated GIF

A GIF is just an image — same syntax (prefer mp4/webm below for anything long,
they're far smaller for the same motion):

![Short looping clip](/images/blog/my-clip.gif)

### Image with a caption

Wrap it in a `<figure>` to add a caption. Keep a blank line above and below the
HTML block so Markdown treats it as raw HTML:

<figure>
  <img src="/images/blog/my-shot.jpg" alt="Describe the image" />
  <figcaption>A short caption under the image.</figcaption>
</figure>

### Self-hosted video clip

Put the file under `public/videos/...` and keep it small (a few MB — short muted
loops are ideal). `.mp4` plays everywhere:

<video controls loop muted playsinline poster="/images/blog/clip-poster.jpg" width="100%">
  <source src="/videos/blog/my-clip.mp4" type="video/mp4" />
</video>

### YouTube / Vimeo embed

For longer gameplay, embed instead of self-hosting. The `video-embed` wrapper
keeps it responsive (16:9 on every screen). Swap `VIDEO_ID` for your video's id:

<figure class="video-embed">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Gameplay clip" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

Close with a wrap-up paragraph. Reading time is calculated automatically — don't
set it.

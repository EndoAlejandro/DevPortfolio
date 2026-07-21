// Labels for the external project links (the big button + the secondary link).
//
// The text has to match where the link actually goes: itch.io browser builds,
// a Google Play listing, a Reddit thread... "Play in browser" is wrong for most
// of those. So the label is derived from the URL's host, and any project can
// override it in its front-matter with `links.playLabel` / `links.pageLabel`.

import type { ProjectLinks } from "./types";

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Text for the primary (filled) button — `links.play`. */
export function playLabel(links?: ProjectLinks): string {
  if (links?.playLabel) return links.playLabel;
  if (!links?.play) return "";

  const host = hostOf(links.play);
  if (host.endsWith("itch.io")) return "Play in browser";
  if (host === "play.google.com") return "Get it on Google Play";
  if (host === "apps.apple.com") return "Download on the App Store";
  if (host.endsWith("steampowered.com")) return "View on Steam";
  if (host.endsWith("gamejolt.com")) return "Play on Game Jolt";
  if (host.endsWith("reddit.com")) return "Read the thread";
  if (host.endsWith("youtube.com") || host === "youtu.be") return "Watch on YouTube";
  return host ? `View on ${host}` : "View the game";
}

/** Text for the secondary underlined link — `links.page`. The arrow is added by the caller. */
export function pageLabel(links?: ProjectLinks): string {
  if (links?.pageLabel) return links.pageLabel;
  if (!links?.page) return "";

  const host = hostOf(links.page);
  if (host.endsWith("itch.io")) return "View on itch.io";
  if (host === "play.google.com") return "View on Google Play";
  if (host === "apps.apple.com") return "View on the App Store";
  if (host.endsWith("reddit.com")) return "View on Reddit";
  return host ? `View on ${host}` : "View page";
}

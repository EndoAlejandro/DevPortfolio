// Extract the 11-char video id from any common YouTube URL form.
// Supports:  youtube.com/watch?v=ID · youtu.be/ID · youtube.com/embed/ID
// · youtube.com/shorts/ID · a bare id. Returns null if none is found.
export function youtubeId(input?: string): string | null {
  if (!input) return null;
  const raw = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*\bv=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = raw.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Privacy-friendly embed URL, or null. */
export function youtubeEmbedUrl(input?: string): string | null {
  const id = youtubeId(input);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

/** Thumbnail image URL for a YouTube video, or null. */
export function youtubeThumbnail(input?: string): string | null {
  const id = youtubeId(input);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

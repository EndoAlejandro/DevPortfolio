// Convert any common YouTube URL form to a privacy-friendly embed URL.
// Supports:  youtube.com/watch?v=ID  ·  youtu.be/ID  ·  youtube.com/embed/ID
// ·  youtube.com/shorts/ID  ·  bare 11-char video IDs.
// Returns null if no video id can be found.
export function youtubeEmbedUrl(input?: string): string | null {
  if (!input) return null;
  const raw = input.trim();

  // Already a bare 11-char id.
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return `https://www.youtube-nocookie.com/embed/${raw}`;
  }

  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*\bv=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = raw.match(re);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  }
  return null;
}

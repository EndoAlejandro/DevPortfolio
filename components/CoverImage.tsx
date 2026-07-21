import Image from "next/image";

// Renders a cover/key-art image that fills its (relative) parent, or a
// labeled placeholder when no image is set. The parent must be
// position:relative with a fixed aspect ratio and overflow-hidden.
export default function CoverImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
}: {
  src?: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${className}`.trim()}
      />
    );
  }
  return (
    <span className="font-label text-[11px] text-ink/40 uppercase tracking-[0.1em] px-4 text-center">
      {alt}
    </span>
  );
}

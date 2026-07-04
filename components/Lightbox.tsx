"use client";

import { useCallback, useEffect, useState } from "react";

type Opened =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; embed: string };

// Wraps a region and opens a full-screen popup when its media is clicked:
// - any <img> opens as a zoomed image
// - any element with a [data-video] attribute (a video miniature) opens the
//   YouTube player instead.
// Close via backdrop, ✕, or Esc. Works with next/image and Markdown images.
export default function Lightbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Opened | null>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const videoEl = target.closest("[data-video]") as HTMLElement | null;
    if (videoEl?.dataset.video) {
      setOpen({ type: "video", embed: videoEl.dataset.video });
      return;
    }
    if (target instanceof HTMLImageElement) {
      setOpen({ type: "image", src: target.currentSrc || target.src, alt: target.alt });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div onClick={handleClick} className="[&_img]:cursor-zoom-in">
      {children}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.type === "video" ? "Gameplay video" : "Image preview"}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 cursor-zoom-out animate-[lightboxFade_.15s_ease-out]"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-5 text-white/80 hover:text-white text-[34px] leading-none font-heading"
          >
            ×
          </button>

          {open.type === "video" ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[94vw] max-w-[1100px] aspect-video cursor-default"
            >
              <iframe
                src={open.embed}
                title="Gameplay video"
                className="absolute inset-0 w-full h-full rounded-card"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={open.src}
              alt={open.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[94vw] max-h-[90vh] object-contain rounded-card shadow-2xl cursor-default"
            />
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Wraps content so it slides + fades up the moment it scrolls into view.
 * Server-rendered children (cards, sections) can be passed straight through.
 *
 * - `delay` (ms) staggers neighbouring items — pass e.g. i * 70 in a grid.
 * - `className` is merged onto the wrapper (use it to keep grid/flex sizing).
 * - Respects prefers-reduced-motion: such users see content immediately.
 *
 * The hidden/visible/reduced-motion styling lives in globals.css (.reveal).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion is handled in CSS (.reveal is forced visible under
    // prefers-reduced-motion), so the observer can run unconditionally.
    // threshold 0 + a small negative bottom margin: reveal as soon as the
    // element's top edge scrolls ~60px into view. Eager enough that fast
    // scrolls never leave content stuck hidden.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

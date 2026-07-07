"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/types";
import Reveal from "./Reveal";

export default function Employers({
  employers,
}: {
  employers: SiteContent["employers"];
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (!employers?.items?.length) return null;

  return (
    <section className="max-w-[1180px] mx-auto px-7 pt-8 pb-16">
      <Reveal className="mb-8">
        <div className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
          {employers.heading}
        </div>
        {employers.subcopy && (
          <p className="font-body text-[15px] leading-[1.55] text-ink/60 max-w-[520px] m-0">
            {employers.subcopy}
          </p>
        )}
      </Reveal>

      <Reveal delay={80} className="flex flex-wrap items-center gap-x-12 gap-y-8">
        {employers.items.map((item) =>
          item.logo ? (
            <div
              key={item.name}
              className="h-14 w-[150px]"
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <span
              key={item.name}
              className="font-heading font-semibold text-[18px] text-ink/70"
            >
              {item.name}
            </span>
          )
        )}
      </Reveal>

      {hovered && (
        <div
          className="fixed z-50 pointer-events-none font-mono text-[12px] bg-ink text-paper rounded px-2 py-1 whitespace-nowrap"
          style={{ left: pos.x + 14, top: pos.y + 16 }}
        >
          {hovered}
        </div>
      )}
    </section>
  );
}

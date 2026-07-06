import type { ReactNode } from "react";

type TagVariant = "tag" | "genre";

const variantClasses: Record<TagVariant, string> = {
  // Soft gray chip used for role/discipline tags on light cards.
  tag: "text-ink/70 bg-paper border border-line",
  // Accent-colored genre badge.
  genre: "text-accent",
};

export default function TagPill({
  children,
  variant = "tag",
  className = "",
}: {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}) {
  const padding = variant === "genre" ? "px-[9px] py-[3px]" : "px-[10px] py-[4px]";
  return (
    <span
      className={`inline-block font-mono text-[11px] font-medium uppercase rounded-chip ${padding} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

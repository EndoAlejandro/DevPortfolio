import type { StudioMember } from "@/lib/types";

/** First letters of the first two words, e.g. "Alejandro Endo" -> "AE". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Team/credits grid for a project page (astero's closing section). Renders
 * one card per member with a monogram-avatar fallback when no photo is set.
 * Renders nothing when there are no members.
 */
export default function GameTeam({ members }: { members: StudioMember[] }) {
  if (members.length === 0) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
      {members.map((member) => (
        <div
          key={member.name}
          className="flex items-center gap-3 bg-card border border-line rounded-card px-3 py-[10px]"
        >
          <div className="shrink-0 grid place-items-center w-9 h-9 rounded-badge overflow-hidden bg-ink text-paper font-label text-[12px] font-medium">
            {member.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              initials(member.name)
            )}
          </div>
          <div className="min-w-0">
            <div className="font-heading font-semibold text-[13.5px] text-ink leading-tight truncate">
              {member.name}
            </div>
            <div className="font-label text-[10px] font-medium uppercase tracking-[0.04em] text-ink/50 mt-[3px] truncate">
              {member.role}
            </div>
            {member.bio && (
              <p className="text-[12.5px] text-ink/65 leading-snug mt-1 mb-0">{member.bio}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

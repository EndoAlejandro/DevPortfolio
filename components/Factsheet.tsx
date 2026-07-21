export interface FactRow {
  label: string;
  value: string;
}

/**
 * Astero-style key/value factsheet for a project page — rendered as a narrow
 * sidebar beside the write-up, so rows are stacked single-column (label above
 * value). Rows are pre-filtered for blank values by the caller; renders nothing
 * if empty. Mono uppercase labels, hairline dividers, square edges (per the
 * border-radius rule: text/rows stay rectangular).
 */
export default function Factsheet({ rows }: { rows: FactRow[] }) {
  if (rows.length === 0) return null;
  return (
    <dl className="border-t border-line m-0">
      {rows.map((row) => (
        <div key={row.label} className="py-3 border-b border-line">
          <dt className="font-label text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink/45">
            {row.label}
          </dt>
          <dd className="font-label text-[13px] text-ink m-0 mt-1">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

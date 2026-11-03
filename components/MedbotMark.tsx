import {
  MARK_RING_PATH,
  MARK_STRAND_PATHS,
  MARK_VIEWBOX,
} from '@/lib/brand-mark-paths';

/**
 * Medbot's woven trefoil: the teal ring with the amber strand crossing over
 * it. Decorative — it always sits beside the product name.
 */
export function MedbotMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} aria-hidden="true" className={className}>
      <g
        fill="none"
        strokeWidth={25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={MARK_RING_PATH} className="stroke-secondary" />
        {MARK_STRAND_PATHS.map((d) => (
          <path key={d} d={d} className="stroke-primary" />
        ))}
      </g>
    </svg>
  );
}

/** The mark and name, for the header and footer. */
export function MedbotLogo() {
  return (
    <span className="flex items-center gap-2">
      <MedbotMark />
      <span className="text-foreground text-lg font-semibold">
        Medbot Docs
      </span>
    </span>
  );
}

/**
 * Ornament: original line drawings after Persian rugs and khatam (inlay)
 * work. All decorative — every one is `aria-hidden` — and all thin, so they
 * read as detail rather than decoration competing with the products.
 *
 * Colours come from the faded rug palette in globals.css (`--gold`,
 * `--madder`, `--indigo`, `--turquoise`, `--rose`).
 */

/** The eight-point khatam star: two squares, one turned 45°. */
export function Star8({ className = "", color = "var(--gold)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden fill="none" stroke={color} strokeWidth="1">
      <rect x="4.5" y="4.5" width="11" height="11" />
      <rect x="4.5" y="4.5" width="11" height="11" transform="rotate(45 10 10)" />
      <circle cx="10" cy="10" r="1.4" fill={color} stroke="none" />
    </svg>
  );
}

/**
 * The thin gold arch drawn around the hero's arched frame. Uses the same
 * curve as the `--arch-mask` in globals.css, scaled to the frame.
 */
export function ArchOutline({ className = "arch-outline" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" preserveAspectRatio="none" className={className} aria-hidden fill="none">
      <path
        d="M0 140 V58 C0 30 26 18 44 6 Q50 1 56 6 C74 18 100 30 100 58 V140"
        stroke="var(--gold)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        opacity="0.7"
      />
    </svg>
  );
}

/** A short divider: hairline, star, hairline. */
export function StarRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-10 bg-[var(--gold)] opacity-50" />
      <Star8 className="h-3 w-3" />
      <span className="h-px w-10 bg-[var(--gold)] opacity-50" />
    </div>
  );
}

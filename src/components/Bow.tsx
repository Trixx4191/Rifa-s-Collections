/**
 * The brand's ribbon bow — a small, hand-drawn-feeling mark after the bow in
 * the linen inspiration. Original artwork, drawn as two loops, a knot and two
 * long tails. Inherits `currentColor` for its outline; the fill is transparent
 * by default and can be overridden.
 */
export default function Bow({
  className = "",
  fill = "transparent",
  tails = "short",
  title
}: {
  className?: string;
  fill?: string;
  /** "long" draws the trailing ribbons from the inspiration image. */
  tails?: "short" | "long";
  title?: string;
}) {
  const long = tails === "long";
  return (
    <svg
      viewBox={long ? "0 0 64 120" : "0 0 64 44"}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tails first, so the loops and knot sit over them. */}
      {long ? (
        <>
          <path
            d="M29 19c-3 10-6 22-8 36-2 15 1 28-3 44l-2 14 6-5 3 6c2-17 0-30 2-45 2-15 5-30 6-46Z"
            fill={fill}
          />
          <path
            d="M35 19c3 11 8 23 10 37 2 13 0 24 3 37l1 9-6-4-4 5c-1-14 1-25-1-38-2-14-6-29-7-44Z"
            fill={fill}
          />
        </>
      ) : (
        <>
          <path d="M29 20c-3 6-7 13-10 21l5-2 3 4c1-8 3-15 6-21Z" fill={fill} />
          <path d="M35 20c3 6 7 13 10 21l-5-2-3 4c-1-8-3-15-6-21Z" fill={fill} />
        </>
      )}
      {/* Left loop */}
      <path d="M29 17C22 8 9 2 4 7c-4 5 0 15 9 16 6 1 11-1 16-4Z" fill={fill} />
      <path d="M26 16c-5-3-11-6-15-5" opacity=".5" />
      {/* Right loop */}
      <path d="M35 17c7-9 20-15 25-10 4 5 0 15-9 16-6 1-11-1-16-4Z" fill={fill} />
      <path d="M38 16c5-3 11-6 15-5" opacity=".5" />
      {/* Knot */}
      <path d="M28 14.5c2-1.6 6-1.6 8 0 1 2 1 4.5 0 6.5-2 1.4-6 1.4-8 0-1-2-1-4.5 0-6.5Z" fill={fill} />
    </svg>
  );
}

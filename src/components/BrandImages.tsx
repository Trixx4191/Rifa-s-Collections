import Image from "next/image";

/**
 * The brand's own photography, as used around the storefront. Paths live here
 * so swapping an image is a one-line change. Files are in
 * /public/images/brand; the cut-out ones have transparent backgrounds so the
 * rug sits straight on the paper.
 */
export const BRAND_IMAGES = {
  /** Default homepage hero, used until one is set in /admin/homepage. */
  hero: "/images/brand/linen-bow.webp",
  /** In an arch on the About page. */
  aboutImage: "/images/brand/linen-bow.webp",
  /** In an arch beside sign-in and sign-up on wide screens. */
  authImage: "/images/brand/rug-ivory.webp",
  /** Khatam box — the empty bag and the "not found" page. */
  khatamBox: "/images/brand/khatam-box.webp",
  /** Small diamond rug — an empty category. */
  diamondRug: "/images/brand/rug-diamond.webp"
} as const;

/**
 * The ivory rug in an arched frame, beside the sign-in and sign-up forms on
 * wide screens. Hidden on phones, where the form is the whole page.
 */
export function AuthAside() {
  return (
    <div aria-hidden className="hidden items-center justify-center lg:flex">
      <div className="arch-frame relative aspect-[5/7] w-[min(26rem,calc((100svh-9rem)*0.71))]">
        <Image src={BRAND_IMAGES.authImage} alt="" fill sizes="26rem" className="object-cover" />
      </div>
    </div>
  );
}

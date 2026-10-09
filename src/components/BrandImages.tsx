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
  /** White-and-gold lily, leaning in beside the homepage image. */
  lily: "/images/brand/lily.webp",
  /** Gold birds, flying across the top of the homepage. */
  goldBirds: "/images/brand/gold-birds.webp",
  /** The gold bee: the brand mark beside the logo, and every empty state. */
  bee: "/images/brand/bee.webp",
  /** Shown beside the logo by day / by night, in the visitor's own time. */
  sun: "/images/brand/sun.webp",
  moon: "/images/brand/moon-crescent.webp",
  /** The flower vine threaded down both sides of the page on wide screens. */
  vine: "/images/brand/vine-vertical.webp",
  /** Doves on the About page. */
  doves: "/images/brand/doves.webp",
  /** Burgundy embossed flowers, in the arch beside sign-in and sign-up. */
  burgundyPattern: "/images/brand/pattern-burgundy.webp",
  /** Green and gold pattern, and the rose wax seal: the payment page. */
  greenPattern: "/images/brand/pattern-green.webp",
  waxSeal: "/images/brand/wax-seal.webp",
  /** Parchment with gold stars: the card every pop-up is written on. */
  parchment: "/images/brand/parchment.webp",
  /** Glitter magnolia: the order-confirmed page. */
  magnolia: "/images/brand/magnolia.webp",
  /** Cream swatch with a red flower: fragrance product pages. */
  creamSwatch: "/images/brand/cream-swatch.webp",
  /** Green-and-gold damask: the emblem above a product's name. */
  damask: "/images/brand/damask.webp"
} as const;

/**
 * The burgundy embossed-flower pattern in an arched frame, beside the sign-in
 * and sign-up forms on wide screens. Hidden on phones, where the form is the
 * whole page.
 */
export function AuthAside() {
  return (
    <div aria-hidden className="hidden items-center justify-center lg:flex">
      <div className="arch-frame relative aspect-[5/7] w-[min(26rem,calc((100svh-9rem)*0.71))]">
        <Image src={BRAND_IMAGES.burgundyPattern} alt="" fill sizes="26rem" className="object-cover" />
      </div>
    </div>
  );
}

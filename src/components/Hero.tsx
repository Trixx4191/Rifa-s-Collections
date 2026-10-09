import Image from "next/image";
import { BRAND_IMAGES } from "@/components/BrandImages";

/**
 * The homepage hero: one image, centred, on the paper, with nothing around it.
 *
 * It fills the first screen beneath the header — whose centred wordmark
 * is the label above it, so there is no second one — and it is contained, not
 * cropped: the whole image is always visible, floating like a product does.
 * No frame, no overlay, no headline over it, no buttons. Clicking it scrolls
 * down to the products, which is the only thing a hero is for here.
 *
 * Height is `svh`, not `vh`. On mobile Safari `vh` is measured with the
 * toolbars hidden, so a `100vh` hero is taller than the visible screen on load
 * and the products below it start further away than they look.
 */
export default function Hero({ src }: { src: string }) {
  return (
    <section aria-label="Rifa's Collections" className="relative">
      <a
        href="#shop"
        aria-label="Shop the collection"
        className="hero-enter relative block h-[calc(100svh-var(--header-h))] min-h-[420px] focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-8px] focus-visible:outline-black"
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          // Contained and inset, so the whole image floats with space on every
          // side. Percentage padding keeps that proportion at every width.
          className="object-contain p-[6%] sm:p-[5%]"
        />
      </a>

      {/* Decoration around the image, never over the middle of it: gold birds
          across the top right, a white-and-gold lily leaning in from the
          bottom left. Both ignore the pointer, so the whole hero stays one
          link. */}
      <div
        aria-hidden
        className="birds-drift pointer-events-none absolute right-[4%] top-[3%] aspect-[560/458] w-[30vw] max-w-[240px] sm:right-[10%] sm:top-[6%] sm:w-[22vw]"
      >
        <Image src={BRAND_IMAGES.goldBirds} alt="" fill sizes="240px" className="object-contain" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[1%] left-0 aspect-[336/560] h-[22%] sm:bottom-[4%] sm:left-[9%] sm:h-[58%]"
      >
        <Image src={BRAND_IMAGES.lily} alt="" fill sizes="(max-width: 640px) 30vw, 20vw" className="object-contain" />
      </div>
    </section>
  );
}

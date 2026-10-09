import type { Metadata } from "next";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import Image from "next/image";
import { SITE } from "@/content/site";
import { BRAND_IMAGES } from "@/components/BrandImages";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <InfoPage kicker="Rifa's Collections" title="About." intro={SITE.tagline}>
      {/* Three white doves in flight. */}
      <div aria-hidden className="relative mx-auto aspect-[352/480] w-[min(60%,14rem)]">
        <Image src={BRAND_IMAGES.doves} alt="" fill sizes="14rem" className="object-contain" />
      </div>

      <InfoSection title="What we make">
        <p>
          A short line of essentials, cut once and properly, from cloth chosen to age rather than fade.
          Fewer pieces, released when they are right, in colours that sit beside each other.
        </p>
      </InfoSection>

      <InfoSection title="Where we are">
        <p>
          {SITE.city}, {SITE.country}. Orders ship from here, priced in {SITE.currency}, payable by
          mobile money as readily as by card.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

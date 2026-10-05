import Image from "next/image";
import Link from "next/link";
import { BRAND_IMAGES } from "@/components/BrandImages";

/** A page that does not exist (or a product not yet released). */
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-h)-8rem)] flex-col items-center justify-center py-20 text-center">
      <div aria-hidden className="relative h-36 w-36">
        <Image src={BRAND_IMAGES.khatamBox} alt="" fill sizes="144px" className="object-contain" />
      </div>
      <h1 className="type-d2 mt-8 italic">Not found</h1>
      <p className="type-body mt-3">This page has wandered off.</p>
      <Link href="/" className="btn-quiet mt-8">
        Back to the shop
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";
import { Star8 } from "@/components/Ornaments";

/**
 * The help pages and the name, on a band of rose linen.
 *
 * Centred and stacked on a phone; on a wide screen the links sit at the left
 * and the name at the right.
 */
const LINKS = [
  { href: "/delivery", label: "Delivery" },
  { href: "/returns", label: "Returns" },
  { href: "/size-guide", label: "Size guide" },
  { href: "/contact", label: "Contact" }
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="linen-band relative z-[2]">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-5 px-[var(--gutter)] py-10 sm:flex-row sm:py-12">
        <nav aria-label="Help">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-micro text-[var(--cream)] opacity-90 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Computed, so it cannot be quietly wrong every January. */}
        <p className="flex items-center gap-2.5 text-[var(--cream)]">
          <Star8 className="h-3 w-3" color="var(--cream)" />
          <span className="font-serif text-lg italic leading-none">{SITE.name}</span>
          <span className="type-micro opacity-80">© {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}

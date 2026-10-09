"use client";

import { Fragment, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { isAdminRole } from "@/lib/roles";
import Image from "next/image";
import { Star8 } from "@/components/Ornaments";
import { SkyMark } from "@/components/Decor";
import { BRAND_IMAGES } from "@/components/BrandImages";

/**
 * The header: the wordmark, the account and the bag, and beneath them the
 * categories, all in view — nothing hidden behind a menu button.
 *
 * Wide screens: account at the left, wordmark centred, bag at the right, then
 * a centred row of categories separated by khatam stars.
 *
 * Phones: the same top row (account and bag as icons), then the categories
 * centred on two short lines — every one visible, nothing cut off at the edge.
 *
 * The help pages (delivery, returns, size guide, contact) are in the footer.
 *
 * Every link takes the gold shine on hover — see `.nav-shine` in globals.css.
 */

export type NavCategory = { name: string; slug: string };

/** Used when the database cannot be read, so the header is never empty. */
export const FALLBACK_CATEGORIES: NavCategory[] = [
  { name: "Abayas", slug: "abayas" },
  { name: "Dresses", slug: "dresses" },
  { name: "Hijabs", slug: "hijabs" },
  { name: "Fragrances", slug: "fragrances" },
  { name: "Accessories", slug: "accessories" }
];

export default function Navbar({ categories = FALLBACK_CATEGORIES }: { categories?: NavCategory[] }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const isAdmin = isAdminRole((session?.user as { role?: string } | undefined)?.role);

  if (pathname.startsWith("/admin")) return null;

  const accountHref = session ? (isAdmin ? "/admin" : "/account") : "/login";
  const accountLabel = session ? (isAdmin ? "Admin" : "Account") : "Sign in";

  return (
    <header className="paper sticky top-0 z-[70]">
      <div className="relative mx-auto flex h-16 max-w-container items-center justify-between px-[var(--gutter)]">
        <Link
          href={accountHref}
          aria-label={accountLabel}
          className="nav-shine -ml-2 flex items-center gap-2 p-2"
          data-active={pathname === accountHref || undefined}
        >
          {/* A person, drawn to match the bag. Text joins it on wide screens. */}
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden className="nav-icon">
            <circle cx="7.5" cy="4.6" r="3" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1.5 15c.4-3.4 2.9-5.6 6-5.6s5.6 2.2 6 5.6" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span className="nav-shine-text type-label hidden sm:inline">{accountLabel}</span>
        </Link>

        {/* The wordmark between its two marks: the gold bee, and the sun or
            moon for the visitor's time of day. */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 sm:gap-3.5">
          <span aria-hidden className="relative block h-[18px] w-[25px] sm:h-5 sm:w-7">
            <Image src={BRAND_IMAGES.bee} alt="" fill sizes="28px" className="object-contain" />
          </span>
          <Link href="/" aria-label="Rifa's Collections, home" className="brand-wordmark nav-shine">
            <span className="nav-shine-text">Rifa&rsquo;s</span>
            <span className="brand-wordmark-sub">Collections</span>
          </Link>
          <SkyMark className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        <Link
          href="/cart"
          aria-label={totalItems === 1 ? "Bag, 1 item" : `Bag, ${totalItems} items`}
          className="nav-shine -mr-2 flex items-center gap-2 p-2"
          data-active={pathname === "/cart" || undefined}
        >
          <span className="nav-shine-text type-label hidden sm:inline">Bag</span>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden className="nav-icon">
            <path d="M1.5 5h12l-.9 10H2.4L1.5 5Z" stroke="currentColor" strokeWidth="1.1" />
            <path d="M4.8 5V3.6a2.7 2.7 0 1 1 5.4 0V5" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          {/* Only when there is something to count. A "0" is noise. */}
          {totalItems > 0 && <span className="type-label tabular-nums">{totalItems}</span>}
        </Link>
      </div>

      {/* The category list reads the URL to mark the current one, which in
          Next has to sit inside a Suspense boundary. The fallback is the same
          list with nothing marked, so there is no flash of an empty row. */}
      <Suspense fallback={<CategoryNav categories={categories} active={null} />}>
        <CategoryNavWithActive categories={categories} />
      </Suspense>

      {/* A hairline of gold beneath the whole header, very faint. */}
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
    </header>
  );
}

function CategoryNavWithActive({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const onCatalog = pathname === "/" || pathname === "/products";
  const active = onCatalog ? params.get("category") || "all" : null;
  return <CategoryNav categories={categories} active={active} />;
}

function CategoryNav({ categories, active }: { categories: NavCategory[]; active: string | null }) {
  const items = [{ name: "All", slug: "all" }, ...categories];

  return (
    <nav aria-label="Shop" className="nav-strip mx-auto max-w-container">
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0 px-[var(--gutter)] pb-2 sm:gap-x-6 sm:pb-3 sm:pt-1">
        {items.map((item, index) => {
          const href = item.slug === "all" ? "/" : `/products?category=${item.slug}`;
          const isActive = active === item.slug;
          return (
            <Fragment key={item.slug}>
              {index > 0 && (
                <li aria-hidden className="hidden shrink-0 sm:block">
                  <Star8 className="h-2 w-2 opacity-70" />
                </li>
              )}
              <li className="shrink-0">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive || undefined}
                  className="nav-shine nav-underline type-label block whitespace-nowrap py-1.5 sm:py-2"
                >
                  <span className="nav-shine-text">{item.name}</span>
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}

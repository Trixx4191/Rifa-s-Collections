"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ProductGrid } from "@/components/luxury";
import Image from "next/image";
import { BRAND_IMAGES } from "@/components/BrandImages";
import { Product } from "@/types/product";
import { catalogHref, type ParsedCatalogQuery } from "@/lib/productQuery";

type Category = { name: string; slug: string };

/** Per-tile availability, decided on the server. */
export type TileAccess = "open" | "early-vip" | "early-locked";

/**
 * The catalog: the garments. (The category row that used to sit above the
 * grid is now in the header, on every page.)
 *
 * Removed: the filter drawer and its toggle, the search box, the sort select,
 * the "N pieces" count and the "Clear filters" link. With a catalog this size
 * the category row is the whole of the navigation anyone needs, and every
 * control above the grid was pushing the first product further down the page.
 *
 * `search` and `sort` still work as URL parameters — `parseCatalogParams`
 * validates them and the query builder honours them — so a link to a sorted
 * or searched view is not broken; there is simply no chrome for them.
 *
 * All state lives in the URL, which is what makes a filtered view shareable,
 * refresh-safe and back-button friendly.
 */
export default function ProductsBrowser({
  products,
  access = {},
  categories,
  query,
  totalPages
}: {
  products: Product[];
  access?: Record<string, TileAccess>;
  categories: Category[];
  query: ParsedCatalogQuery;
  total: number;
  totalPages: number;
}) {
  return (
    <>
      {/* The categories are in the header now, on every page. */}
      <div className="h-8 sm:h-12" />

      {products.length === 0 ? (
        <div className="flex flex-col items-center pb-40 pt-24">
          <div aria-hidden className="relative h-32 w-20">
            <Image src={BRAND_IMAGES.diamondRug} alt="" fill sizes="80px" className="object-contain" />
          </div>
          <p className="mt-8 text-center font-serif text-xl italic text-[var(--muted)]">Nothing here yet.</p>
        </div>
      ) : (
        <ProductGrid className="mt-2 sm:mt-6">
          {products.map((product, index) => (
            // Staggered by position within a row of six, not by overall index —
            // otherwise the thirtieth tile waits two seconds to appear.
            <Reveal key={product.id} delay={(index % 6) * 60}>
              <ProductCard product={product} priority={index < 6} access={access[product.id] ?? "open"} />
            </Reveal>
          ))}
        </ProductGrid>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-24 flex items-center justify-center gap-8">
          <PagerLink href={catalogHref({ ...query, page: query.page - 1 })} disabled={query.page <= 1}>
            Prev
          </PagerLink>
          <span className="type-label tabular-nums text-[var(--muted)]">
            {query.page} / {totalPages}
          </span>
          <PagerLink href={catalogHref({ ...query, page: query.page + 1 })} disabled={query.page >= totalPages}>
            Next
          </PagerLink>
        </nav>
      )}
    </>
  );
}

function PagerLink({ href, disabled, children }: { href: string; disabled: boolean; children: React.ReactNode }) {
  // A disabled control is a span, not a styled link — a link still takes focus
  // and still navigates on Enter.
  if (disabled) return <span className="type-label text-black/20">{children}</span>;
  return (
    <Link href={href} className="type-label transition-opacity hover:opacity-40">
      {children}
    </Link>
  );
}

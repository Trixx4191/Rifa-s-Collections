import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar, { FALLBACK_CATEGORIES, type NavCategory } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";
import { SideVines } from "@/components/Decor";
import NewsletterPopup from "@/components/NewsletterPopup";
import Providers from "@/components/Providers";
import "./globals.css";

/**
 * Two faces.
 *
 * Cormorant Garamond — a soft, high-contrast serif — carries the wordmark,
 * headings and product names: the feminine, editorial voice of the brand.
 * Jost — a light geometric sans — carries labels, prices and controls, small
 * and widely tracked, so the page stays minimal around the serif.
 */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Rifa's Collections",
    template: "%s — Rifa's Collections"
  },
  description: "Rifa's Collections. Ladies' wear, hijabs and fragrances, from Accra."
};

// In `viewport`, not `metadata` — Next warns on every build otherwise. Paints
// the mobile browser chrome the page's own paper.
export const viewport: Viewport = {
  themeColor: "#f3f0eb"
};

/**
 * The categories for the header, read from the database so a category added in
 * the admin appears in the navigation without a code change. Never throws: a
 * database that is asleep falls back to the default list rather than taking the
 * header (and so every page) down with it.
 */
async function loadNavCategories(): Promise<NavCategory[]> {
  try {
    const rows = await prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } });
    return rows.length > 0 ? rows : FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("[layout] could not load categories", error);
    return FALLBACK_CATEGORIES;
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await loadNavCategories();

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen">
        <Providers>
          <a
            href="#main"
            className="type-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
          >
            Skip to content
          </a>

          <Navbar categories={categories} />

          <SideVines />

          {/* On wide screens the page keeps a margin each side for the vines. */}
          <main id="main" className="relative mx-auto w-full max-w-container px-[var(--gutter)] pb-32 xl:px-[7rem]">
            <div className="page-enter">{children}</div>
          </main>

          <Footer />
          <NewsletterPopup />
        </Providers>
      </body>
    </html>
  );
}

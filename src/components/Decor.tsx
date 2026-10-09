"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND_IMAGES } from "@/components/BrandImages";

/**
 * The sun by day, the crescent moon by night — read from the visitor's own
 * clock, so a shopper in Accra at 9pm sees the moon wherever the server is.
 *
 * Day is 6:00 to 17:59. Nothing renders until the browser has mounted: the
 * server cannot know the visitor's time, and guessing would flash the wrong
 * one. A fixed-size box holds the space so the header does not shift.
 */
export function SkyMark({ className = "" }: { className?: string }) {
  const [isDay, setIsDay] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    };
    check();
    // Re-checked every few minutes, so a page left open across dusk changes.
    const timer = setInterval(check, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span aria-hidden className={`relative block h-6 w-6 ${className}`}>
      {isDay !== null && (
        <Image
          key={isDay ? "sun" : "moon"}
          src={isDay ? BRAND_IMAGES.sun : BRAND_IMAGES.moon}
          alt=""
          fill
          sizes="24px"
          className="sky-mark object-contain"
        />
      )}
    </span>
  );
}

/**
 * The flower vine, threaded down both sides of the page on wide screens
 * (1280px and up), in a margin the page keeps clear for it. The right-hand
 * vine is the left one mirrored. Hidden on smaller screens, where there is no
 * margin to hold it without crowding the products, and in the admin.
 */
export function SideVines() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <div aria-hidden className="side-vine side-vine--left" />
      <div aria-hidden className="side-vine side-vine--right" />
    </>
  );
}

/**
 * The parchment card every pop-up is written on: torn-edged paper with gold
 * stars. Content sits inside the paper, clear of the torn edges and the stars.
 * Use it for anything the site sends to a shopper — sign-up prompts, notices,
 * offers.
 */
export function Parchment({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`parchment ${className}`}>{children}</div>;
}

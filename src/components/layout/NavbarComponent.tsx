"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  PRODUCT_CATEGORIES,
  SERIES_SUMMARY,
  seriesHref,
  seriesName,
} from "@/lib/constants/ProductCategories";
import { ModeToggle } from "../ui/ThemeSwitcher";

const PAGES = [
  { name: "Heritage", path: "/heritage" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

const linkClass = (isActive: boolean) =>
  `text-sm tracking-wide transition-colors duration-200 ${
    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
  }`;

/**
 * The seven series, which are the whole catalogue. Listed in the header so a
 * buyer can tell which one fits their floor before opening a product page.
 */
const SeriesList = ({ onNavigate }: { onNavigate?: () => void }) => (
  <ul className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
    {PRODUCT_CATEGORIES.map((category) => (
      <li key={category}>
        <Link
          href={seriesHref(category)}
          onClick={onNavigate}
          className="group/series flex flex-col gap-0.5 rounded-sm px-3 py-2.5 transition-colors duration-200 hover:bg-primary/10 focus-visible:bg-primary/10"
        >
          <span className="font-serif text-lg text-foreground group-hover/series:text-primary">
            {seriesName(category)}
          </span>
          <span className="text-xs text-muted-foreground">{SERIES_SUMMARY[category]}</span>
        </Link>
      </li>
    ))}
  </ul>
);

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const seriesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Moving the pointer from the trigger to the panel crosses the gap between
  // them, which would otherwise read as leaving the menu. A short grace period
  // lets the pointer make the journey.
  const openSeries = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSeriesOpen(true);
  };

  const closeSeries = ({ immediate = false } = {}) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (immediate) {
      setSeriesOpen(false);
      return;
    }
    closeTimer.current = setTimeout(() => setSeriesOpen(false), 180);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    closeSeries({ immediate: true });
  }, [pathname]);

  // The menu covers the viewport, so the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!seriesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSeries({ immediate: true });
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      // The panel is rendered outside the trigger's wrapper, so closing on a
      // pointerdown inside it would unmount the link before the click landed.
      if (seriesRef.current?.contains(target) || target.closest("#series-panel")) return;
      closeSeries({ immediate: true });
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [seriesOpen]);

  const onProducts = pathname.startsWith("/products");

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
          scrolled
            ? "border-border/60 bg-background/90 backdrop-blur-xl"
            : "border-transparent bg-background/70 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6 md:h-24 lg:px-10">
          <Link href="/" aria-label="Stardom, home" className="shrink-0">
            <Image
              src="/images/logo.png"
              width={600}
              height={485}
              alt="Stardom"
              className="h-16 w-auto md:h-[72px] dark:hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              width={600}
              height={485}
              alt="Stardom"
              className="hidden h-16 w-auto md:h-[72px] dark:block"
              priority
            />
          </Link>

          <div
            ref={seriesRef}
            className="ml-auto hidden items-center gap-9 md:flex"
            onMouseLeave={() => closeSeries()}
          >
            <div className="relative">
              <button
                type="button"
                aria-expanded={seriesOpen}
                aria-controls="series-panel"
                onClick={() => (seriesOpen ? closeSeries({ immediate: true }) : openSeries())}
                onMouseEnter={openSeries}
                onFocus={openSeries}
                className={`flex items-center gap-1.5 ${linkClass(onProducts)}`}
              >
                Chairs
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    seriesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {PAGES.map((page) => (
              <Link key={page.path} href={page.path} className={linkClass(pathname === page.path)}>
                {page.name}
              </Link>
            ))}

            <ModeToggle />
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ModeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 text-foreground"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {seriesOpen && (
          <div
            id="series-panel"
            className="series-panel absolute inset-x-0 top-full hidden border-b border-border/60 bg-background/98 backdrop-blur-xl md:block"
            onMouseEnter={openSeries}
            onMouseLeave={() => closeSeries()}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:px-10">
              <div className="lg:w-64">
                <p className="font-serif text-2xl italic text-primary">Seven series</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Every Stardom chair belongs to one of seven ranges, named for the room it was
                  built for.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-block text-sm text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  See the whole catalogue
                </Link>
              </div>
              <div className="flex-1">
                <SeriesList onNavigate={() => closeSeries({ immediate: true })} />
              </div>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex h-20 shrink-0 items-center justify-between px-6">
            <Link href="/" aria-label="Stardom, home" onClick={() => setMenuOpen(false)}>
              <Image
                src="/images/logo.png"
                width={600}
                height={485}
                alt="Stardom"
                className="h-16 w-auto dark:hidden"
              />
              <Image
                src="/images/logo-dark.png"
                width={600}
                height={485}
                alt="Stardom"
                className="hidden h-16 w-auto dark:block"
              />
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-12">
            <SeriesList onNavigate={() => setMenuOpen(false)} />
            <ul className="mt-8 space-y-1 border-t border-border/60 pt-6">
              {PAGES.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 font-serif text-2xl ${
                      pathname === page.path ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;

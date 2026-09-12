"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LOGO_DIMENSIONS, MENU_ITEMS } from "@/lib/constants/NavbarConstants";
import type { MenuLinkProps } from "@/types/ComponentTypes";
import { ModeToggle } from "../ui/ThemeSwitcher";

const MenuLink = ({ item, isMobile = false }: MenuLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      aria-current={isActive ? "page" : undefined}
      className={`relative group px-2 py-1 font-sans transition-all duration-300 ${
        isActive ? "text-primary font-medium" : "text-foreground"
      } ${isMobile ? "block w-full p-4 rounded-lg hover:bg-primary/5" : ""}`}
    >
      <span className="relative">
        {item.name}
        <span
          className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </span>
    </Link>
  );
};

/**
 * Sticky site header. The logo swaps with the resolved theme, so it renders the
 * light asset until the theme is known on the client.
 */
const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const logoSrc = resolvedTheme === "dark" ? "/images/logo-dark.png" : "/images/logo.png";

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center gap-4 px-6">
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="sm:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="overflow-hidden">
          <Image
            src={logoSrc}
            width={LOGO_DIMENSIONS.width}
            height={LOGO_DIMENSIONS.height}
            alt="Stardom"
            className="transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>

        <ul className="hidden flex-1 justify-center gap-8 sm:flex">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <MenuLink item={item} />
            </li>
          ))}
        </ul>

        <div className="ml-auto sm:ml-0">
          <ModeToggle />
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="flex flex-col gap-2 border-t border-border/40 bg-background/95 px-6 py-6 backdrop-blur-xl sm:hidden">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <MenuLink item={item} isMobile />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default NavbarComponent;

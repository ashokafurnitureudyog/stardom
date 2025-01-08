"use client"
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { ModeToggle } from "../ui/ThemeSwitcher";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Heritage", path: "/heritage" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" }
];

const LOGO_DIMENSIONS = { width: 70, height: 100 };

interface MenuLinkProps {
  item: { name: string; path: string };
  index?: number;
  totalItems?: number;
  isMobile?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  item,
  index,
  totalItems = 0,
  isMobile = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  const getLinkColor = () => {
    if (typeof index === "undefined") return isActive ? "primary" : "foreground";
    return index === 2
      ? "primary"
      : index === totalItems - 1
      ? "danger"
      : "foreground";
  };

  return (
    <Link
      color={getLinkColor()}
      href={item.path}
      className={`
        relative
        ${isActive ? "font-medium" : "font-normal"}
        ${
          isMobile
            ? "w-full text-lg py-4 px-6 hover:bg-default-100 rounded-lg transition-all duration-300"
            : "group"
        }
        ${
          !isMobile
            ? `after:content-[""] after:absolute after:w-${
                isActive ? "full" : "0"
              } after:h-0.5 after:bg-primary/80 after:left-0 after:right-0 after:-bottom-1 after:mx-auto after:transition-all after:duration-300 hover:after:w-full`
            : ""
        }
        ${typeof index !== "undefined" ? "w-full" : ""}
      `}
      size={typeof index !== "undefined" ? "lg" : undefined}
    >
      {item.name}
    </Link>
  );
};

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/images/logo.png");
  const pathname = usePathname();

  useEffect(() => {
    // Use resolvedTheme to handle system theme preference
    const currentTheme = resolvedTheme || theme;
    setLogoSrc(
      currentTheme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"
    );
  }, [theme, resolvedTheme]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const DesktopMenu = () => (
    <NavbarContent className="hidden sm:flex gap-12" justify="center">
      {MENU_ITEMS.map((item) => (
        <NavbarItem key={item.path}>
          <MenuLink item={item} />
        </NavbarItem>
      ))}
    </NavbarContent>
  );

  const MobileMenu = () => (
    <NavbarMenu className="pt-6 bg-background/80 backdrop-blur-xl">
      <div className="flex flex-col gap-2 mt-4">
        {MENU_ITEMS.map((item, index) => (
          <NavbarMenuItem
            key={item.path}
            className="animate-slideIn"
            style={{
              animationDelay: `${index * 75}ms`,
              opacity: 0,
              animation: `slideIn 0.4s ease-out ${index * 75}ms forwards`,
            }}
          >
            <MenuLink
              item={item}
              index={index}
              totalItems={MENU_ITEMS.length}
              isMobile={true}
            />
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  );

  return (
    <>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          opacity: 0;
        }
      `}</style>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="font-sans lg:py-3 backdrop-blur-md bg-background/70"
        isMenuOpen={isMenuOpen}
        maxWidth="xl"
        position="sticky"
      >
        <NavbarContent className="gap-4">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/">
              <Image
                src={logoSrc}
                width={LOGO_DIMENSIONS.width}
                height={LOGO_DIMENSIONS.height}
                alt="Stardom Logo"
                className="transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <DesktopMenu />

        <NavbarContent justify="end">
          <NavbarItem>
            <ModeToggle />
          </NavbarItem>
        </NavbarContent>

        <MobileMenu />
      </Navbar>
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import Image from "next/image";
import { ModeToggle } from "../ui/ThemeSwitcher";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { MenuLinkProps } from "@/types/ComponentTypes";
import { LOGO_DIMENSIONS, MENU_ITEMS } from "@/lib/constants/NavbarConstants";

const MenuLink: React.FC<MenuLinkProps> = ({ item, isMobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const [isHovered, setIsHovered] = useState(false);

  const desktopStyles = !isMobile && (
    <>
      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
      <div className="absolute top-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
      <div
        className={`
          absolute 
          -left-2 
          top-1/2 
          -translate-y-1/2 
          opacity-0 
          transition-all 
          duration-300
          ${isHovered ? "opacity-100 -translate-x-1" : ""}
        `}
      >
        •
      </div>
      <div
        className={`
          absolute 
          -right-2 
          top-1/2 
          -translate-y-1/2 
          opacity-0 
          transition-all 
          duration-300
          ${isHovered ? "opacity-100 translate-x-1" : ""}
        `}
      >
        •
      </div>
    </>
  );

  return (
    <Link
      href={item.path}
      className={`
        relative
        group
        px-2
        py-1
        transition-all
        duration-300
        font-sans
        ${isActive ? "text-primary font-medium" : "text-foreground"}
        ${isMobile ? "w-full p-4 hover:bg-default-100 rounded-lg" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {desktopStyles}
      <span className="relative">
        {item.name}
        <span
          className={`
            absolute
            -bottom-1
            left-0
            w-full
            h-px
            bg-primary
            transform
            scale-x-0
            transition-transform
            duration-300
            ${isActive ? "scale-x-100" : ""}
          `}
        />
      </span>
    </Link>
  );
};

// Main component
const NavbarComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/images/logo.png");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentTheme = resolvedTheme || theme;
    setLogoSrc(
      currentTheme === "dark" ? "/images/logo-dark.png" : "/images/logo.png",
    );
  }, [theme, resolvedTheme]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`
        bg-background/80 
        backdrop-blur-xl 
        transition-all 
        duration-300
        ${scrolled ? "shadow-lg" : ""}
      `}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
    >
      {/* Left section with menu toggle and logo */}
      <NavbarContent className="gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <div className="overflow-hidden">
              <Image
                src={logoSrc}
                width={LOGO_DIMENSIONS.width}
                height={LOGO_DIMENSIONS.height}
                alt="Logo"
                className="transition-all duration-300 hover:scale-105"
                priority
              />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center section with navigation links */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {MENU_ITEMS.map((item) => (
          <NavbarItem key={item.path}>
            <MenuLink item={item} />
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right section with theme toggle */}
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="transition-transform hover:scale-105">
            <ModeToggle />
          </div>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="pt-6 gap-6 bg-background/95 backdrop-blur-xl">
        {MENU_ITEMS.map((item) => (
          <NavbarMenuItem key={item.path}>
            <MenuLink item={item} isMobile={true} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;

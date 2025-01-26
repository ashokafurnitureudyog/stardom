import { MenuItem } from "@/types/ComponentTypes";

export const MENU_ITEMS: MenuItem[] = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Heritage", path: "/heritage" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
] as const;

export const LOGO_DIMENSIONS = {
  width: 150,
  height: 100,
} as const;

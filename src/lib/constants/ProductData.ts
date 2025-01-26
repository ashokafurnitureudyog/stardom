import { Category, Product } from "@/types/ComponentTypes";

export const categories: Category[] = [
  {
    id: "all",
    name: "All Products",
    subcategories: [],
  },
  {
    id: "desks",
    name: "Desks",
    subcategories: [
      { id: "executive", name: "Executive Desks" },
      { id: "standing", name: "Standing Desks" },
      { id: "collaborative", name: "Collaborative Desks" },
    ],
  },
  {
    id: "chairs",
    name: "Chairs",
    subcategories: [
      { id: "executive", name: "Executive Chairs" },
      { id: "gaming", name: "Gaming Chairs" },
      { id: "conference", name: "Conference Chairs" },
    ],
  },
  {
    id: "tables",
    name: "Tables",
    subcategories: [
      { id: "conference", name: "Conference Tables" },
      { id: "meeting", name: "Meeting Tables" },
      { id: "reception", name: "Reception Tables" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "m1",
    name: "Executive Magnus Desk",
    subtitle: "Premium Italian Wood",
    mainCategory: "desks",
    subCategory: "executive",
    description: "Premium Italian wood crafted executive desk",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86",
    features: ["Italian Wood", "Smart Integration", "Cable Management"],
  },
  // Add more products...
];

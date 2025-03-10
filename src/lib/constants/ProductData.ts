import { Category } from "@/types/ComponentTypes";

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

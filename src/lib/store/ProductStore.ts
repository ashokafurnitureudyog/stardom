import { ProductFilters } from "@/types/ComponentTypes";
import { create } from "zustand";

interface ProductState {
  filters: ProductFilters;
  setFilter: (type: "category" | "collection", value: string) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  // State
  filters: {
    selectedCategory: "all",
    selectedCollection: "all",
  },

  // Actions
  setFilter: (type, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [type === "category" ? "selectedCategory" : "selectedCollection"]:
          value,
      },
    })),

  resetFilters: () =>
    set({
      filters: {
        selectedCategory: "all",
        selectedCollection: "all",
      },
    }),
}));

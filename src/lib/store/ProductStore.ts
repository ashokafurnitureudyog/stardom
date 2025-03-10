import { ProductFilters, SortOption } from "@/types/ComponentTypes";
import { create } from "zustand";

interface ProductState {
  filters: ProductFilters;
  searchQuery: string;
  sortOption: SortOption;
  setFilter: (type: "category" | "collection", value: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  // State
  filters: {
    selectedCategory: "all",
    selectedCollection: "all",
  },
  searchQuery: "",
  sortOption: "featured",

  // Actions
  setFilter: (type, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [type === "category" ? "selectedCategory" : "selectedCollection"]:
          value,
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSortOption: (option) => set({ sortOption: option }),

  resetFilters: () =>
    set({
      filters: {
        selectedCategory: "all",
        selectedCollection: "all",
      },
      searchQuery: "",
      sortOption: "featured",
    }),
}));

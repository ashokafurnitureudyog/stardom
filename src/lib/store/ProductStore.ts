import { ProductState } from "@/types/ComponentTypes";
import { create } from "zustand";

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

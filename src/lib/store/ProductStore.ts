/**
 * ProductStore - Zustand store for managing product filtering, sorting, and search state
 * @module ProductStore
 */
import { SortOption } from "@/types/ComponentTypes";
import { create } from "zustand";

/**
 * Filter types that can be updated in the store
 */
export type FilterType = "category" | "collection";

/**
 * Default values for store initialization
 */
export const PRODUCT_STORE_DEFAULTS = {
  CATEGORY: "all",
  COLLECTION: "all",
  SEARCH_QUERY: "",
  SORT_OPTION: "featured" as SortOption,
};

/**
 * Interface for the product filters state
 */
export interface ProductFilters {
  selectedCategory: string;
  selectedCollection: string;
}

/**
 * Interface for the product store state and actions
 */
export interface ProductState {
  // State
  filters: ProductFilters;
  searchQuery: string;
  sortOption: SortOption;

  // Actions
  /**
   * Sets a filter value by type
   * @param type - The filter type to update ("category" or "collection")
   * @param value - The new filter value
   */
  setFilter: (type: FilterType, value: string) => void;

  /**
   * Sets the search query
   * @param query - The search query to filter products by
   */
  setSearchQuery: (query: string) => void;

  /**
   * Sets the sort option
   * @param option - The sort option to use
   */
  setSortOption: (option: SortOption) => void;

  /**
   * Resets all filters to their default values
   */
  resetFilters: () => void;
}

/**
 * Zustand store for managing product filtering, sorting, and search state
 */
export const useProductStore = create<ProductState>((set) => ({
  // Initial state
  filters: {
    selectedCategory: PRODUCT_STORE_DEFAULTS.CATEGORY,
    selectedCollection: PRODUCT_STORE_DEFAULTS.COLLECTION,
  },
  searchQuery: PRODUCT_STORE_DEFAULTS.SEARCH_QUERY,
  sortOption: PRODUCT_STORE_DEFAULTS.SORT_OPTION,

  // Actions
  setFilter: (type: FilterType, value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        // Map filter type to the appropriate state property
        ...(type === "category"
          ? { selectedCategory: value }
          : { selectedCollection: value }),
      },
    })),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSortOption: (option: SortOption) => set({ sortOption: option }),

  resetFilters: () =>
    set({
      filters: {
        selectedCategory: PRODUCT_STORE_DEFAULTS.CATEGORY,
        selectedCollection: PRODUCT_STORE_DEFAULTS.COLLECTION,
      },
      searchQuery: PRODUCT_STORE_DEFAULTS.SEARCH_QUERY,
      sortOption: PRODUCT_STORE_DEFAULTS.SORT_OPTION,
    }),
}));

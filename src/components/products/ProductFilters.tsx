import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, ArrowUpDown } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SortOption } from "@/types/ComponentTypes";

export const ProductFilter = () => {
  const {
    categories,
    collections,
    filters: { selectedCategory, selectedCollection },
    searchQuery,
    sortOption,
    sortOptions,
    filterByCategory,
    filterByCollection,
    handleSearch,
    handleSort,
    resetFilters,
  } = useProducts();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Initialize and update the isDesktop state
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        handleSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, handleSearch, searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearch(localSearch);
  };

  // Reset search field
  const clearSearch = () => {
    setLocalSearch("");
    handleSearch("");
  };

  // Active filters count
  const activeFiltersCount = [
    selectedCategory !== "all" ? 1 : 0,
    selectedCollection !== "all" ? 1 : 0,
    searchQuery ? 1 : 0,
    sortOption !== "featured" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Handle filter reset
  const handleResetFilters = () => {
    resetFilters();
    setLocalSearch("");
    setSheetOpen(false);
  };

  // Filter options component - used in both desktop and mobile views
  const FilterOptions = () => (
    <Tabs defaultValue="categories" className="w-full">
      <div className="flex justify-center w-full mb-4">
        <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="categories" className="mt-2">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            onClick={() => filterByCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => filterByCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="collections" className="mt-2">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCollection === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            onClick={() => filterByCollection("all")}
          >
            All
          </button>
          {collections.map((collection) => (
            <button
              key={collection}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCollection === collection
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => filterByCollection(collection)}
            >
              {collection.charAt(0).toUpperCase() + collection.slice(1)}
            </button>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="w-full space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Bar */}
        <div className="relative flex-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Input
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 pr-10 h-10"
              aria-label="Search products"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
            {localSearch && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-2 h-6 w-6 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <button type="submit" className="sr-only">
              Search
            </button>
          </form>
        </div>

        <div className="flex gap-2">
          {/* Mobile Filter Sheet */}
          {!isDesktop && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 flex-1 sm:flex-none"
                  aria-label="Open filters"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 px-1.5 py-px text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-sm sm:max-w-md font-sans">
                <SheetHeader>
                  <SheetTitle className="font-serif">Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <FilterOptions />
                </div>
                <SheetFooter className="flex gap-2">
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset all filters
                  </Button>
                  <Button onClick={() => setSheetOpen(false)}>
                    Apply filters
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}

          {/* Sort Dropdown */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-shrink-0">
                  <Select
                    value={sortOption}
                    onValueChange={(value: SortOption) => handleSort(value)}
                  >
                    <SelectTrigger
                      className="w-[150px] sm:w-[180px] h-10"
                      aria-label="Sort options"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Sort products</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Desktop Filters */}
      {isDesktop && (
        <div className="hidden md:block">
          <FilterOptions />
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-y-2 pt-1 pb-3 border-b">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {selectedCategory !== "all" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1 py-1 flex items-center gap-1"
              >
                <span className="truncate max-w-[140px]">
                  Category: {selectedCategory}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-primary"
                  onClick={() => filterByCategory("all")}
                  aria-label={`Remove ${selectedCategory} category filter`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCollection !== "all" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1 py-1 flex items-center gap-1"
              >
                <span className="truncate max-w-[140px]">
                  Collection: {selectedCollection}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-primary"
                  onClick={() => filterByCollection("all")}
                  aria-label={`Remove ${selectedCollection} collection filter`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {searchQuery && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1 py-1 flex items-center gap-1"
              >
                <span className="truncate max-w-[140px]">
                  Search: {searchQuery}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-primary"
                  onClick={clearSearch}
                  aria-label="Clear search query"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {sortOption !== "featured" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1 py-1 flex items-center gap-1"
              >
                <span className="truncate max-w-[140px]">
                  Sort: {sortOptions.find((o) => o.value === sortOption)?.label}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-primary"
                  onClick={() => handleSort("featured")}
                  aria-label="Reset sort order"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="text-sm"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;

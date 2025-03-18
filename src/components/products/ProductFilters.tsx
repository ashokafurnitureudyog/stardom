import React, { useState } from "react";
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
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { SortOption } from "@/types/ComponentTypes";

export const ProductFilter: React.FC = () => {
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="mb-12 w-full">
      {/* Search and Sort Row */}
      <div className="fle</Tabs>x flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Input
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => {
              const newValue = e.target.value;
              setLocalSearch(newValue);
              handleSearch(newValue);
            }}
            className="pl-10 pr-10 w-full h-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          {localSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-2.5"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          <button type="submit" className="sr-only">
            Search
          </button>
        </form>

        {/* Filters Toggle for Mobile */}
        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {/* Sort Dropdown */}
        <div className="flex-shrink-0">
          <Select
            value={sortOption}
            onValueChange={(value: SortOption) => handleSort(value)}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Sort by" />
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
      </div>

      {/* Filters Section - Shown by default on desktop, toggleable on mobile */}
      <div
        className={`transition-all duration-300 ease-in-out ${filtersOpen ? "max-h-96" : "max-h-0 md:max-h-96"} overflow-hidden md:overflow-visible`}
      >
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
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
                  className={`px-4 py-2 rounded-full text-sm ${
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

          <TabsContent value="collections" className="mt-6">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
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
                  className={`px-4 py-2 rounded-full text-sm ${
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
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between mt-4 pb-4 border-b">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {selectedCategory !== "all" && (
              <Badge
                variant="secondary"
                className="pl-3 pr-1 py-1 flex items-center gap-1"
              >
                Category: {selectedCategory}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => filterByCategory("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCollection !== "all" && (
              <Badge
                variant="secondary"
                className="pl-3 pr-1 py-1 flex items-center gap-1"
              >
                Collection: {selectedCollection}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => filterByCollection("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {searchQuery && (
              <Badge
                variant="secondary"
                className="pl-3 pr-1 py-1 flex items-center gap-1"
              >
                Search: {searchQuery}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {sortOption !== "featured" && (
              <Badge
                variant="secondary"
                className="pl-3 pr-1 py-1 flex items-center gap-1"
              >
                Sort: {sortOptions.find((o) => o.value === sortOption)?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleSort("featured")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

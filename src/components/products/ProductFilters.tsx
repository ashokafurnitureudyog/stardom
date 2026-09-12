"use client";

import { ArrowUpDown, Filter, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCT_CATEGORIES } from "@/lib/constants/ProductCategories";
import type { SortOption } from "@/types/ComponentTypes";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
];

export interface ProductFilterState {
  category: string;
  collection: string;
  q: string;
  sort: SortOption;
}

const DEFAULTS: ProductFilterState = {
  category: "all",
  collection: "all",
  q: "",
  sort: "featured",
};

/**
 * Filter bar for the catalogue. The filters live in the URL, so the server
 * renders the matching products directly and a filtered view is shareable.
 * Selections apply optimistically while the new server render streams in.
 */
export const ProductFilter = ({
  filters,
  collections,
}: {
  filters: ProductFilterState;
  collections: string[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [optimistic, applyOptimistic] = useOptimistic(filters);
  const [search, setSearch] = useState(filters.q);
  const [sheetOpen, setSheetOpen] = useState(false);

  const setParams = (next: Partial<ProductFilterState>) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === DEFAULTS[key as keyof ProductFilterState]) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    startTransition(() => {
      applyOptimistic({ ...optimistic, ...next });
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  useEffect(() => {
    if (search === filters.q) return;
    const timer = setTimeout(() => setParams({ q: search }), 300);
    return () => clearTimeout(timer);
  }, [search, setParams, filters.q]);

  const activeFilters = [
    optimistic.category !== "all" && { key: "category" as const, label: optimistic.category },
    optimistic.collection !== "all" && {
      key: "collection" as const,
      label: optimistic.collection,
    },
    optimistic.q && { key: "q" as const, label: optimistic.q },
  ].filter(Boolean) as { key: keyof ProductFilterState; label: string }[];

  const chip = (label: string, value: string, active: boolean, onSelect: () => void) => (
    <button
      type="button"
      key={value}
      onClick={onSelect}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
      }`}
    >
      {label}
    </button>
  );

  const FilterOptions = () => (
    <Tabs defaultValue="categories" className="w-full">
      <div className="mb-4 flex w-full justify-center">
        <TabsList className="mx-auto grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="categories" className="mt-2">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {chip("All", "all", optimistic.category === "all", () => setParams({ category: "all" }))}
          {PRODUCT_CATEGORIES.map((category) =>
            chip(category, category, optimistic.category === category, () =>
              setParams({ category }),
            ),
          )}
        </div>
      </TabsContent>

      <TabsContent value="collections" className="mt-2">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {chip("All", "all", optimistic.collection === "all", () =>
            setParams({ collection: "all" }),
          )}
          {collections.map((collection) =>
            chip(collection, collection, optimistic.collection === collection, () =>
              setParams({ collection }),
            ),
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 pl-10 pr-10"
            aria-label="Search products"
          />
          {isPending ? (
            <div className="absolute left-3 top-2.5 h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          )}
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearch("")}
              className="absolute right-2 top-2 h-6 w-6 p-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-1 items-center gap-2 sm:flex-none md:hidden"
                aria-label="Open filters"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-px text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm font-sans sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-serif">Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <FilterOptions />
              </div>
              <SheetFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setParams(DEFAULTS);
                    setSheetOpen(false);
                  }}
                >
                  Reset all filters
                </Button>
                <Button onClick={() => setSheetOpen(false)}>Apply filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Select
            value={optimistic.sort}
            onValueChange={(value: SortOption) => setParams({ sort: value })}
          >
            <SelectTrigger className="h-10 w-[150px] sm:w-[180px]" aria-label="Sort products">
              <div className="flex items-center gap-2 truncate">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="hidden md:block">
        <FilterOptions />
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b pb-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map(({ key, label }) => (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1 py-1 pl-2.5 pr-1"
              >
                <span className="max-w-[140px] truncate">
                  {key === "q" ? "Search" : key}: {label}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4 p-0 hover:bg-transparent hover:text-primary"
                  onClick={() => {
                    if (key === "q") setSearch("");
                    setParams({ [key]: DEFAULTS[key] } as Partial<ProductFilterState>);
                  }}
                  aria-label={`Remove ${label} filter`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("");
              setParams(DEFAULTS);
            }}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, LayoutList } from "lucide-react";

export const SearchAndView = ({
  searchQuery,
  viewMode,
  onSearchChange,
  onViewChange
}: {
  searchQuery: string;
  viewMode: "grid" | "list";
  onSearchChange: (value: string) => void;
  onViewChange: (mode: "grid" | "list") => void;
}) => (
  <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
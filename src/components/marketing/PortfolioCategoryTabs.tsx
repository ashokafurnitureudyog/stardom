import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioCategory } from "@/types/ComponentTypes";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type CategoryTabsProps = {
  categories: PortfolioCategory[];
  selectedCategory: PortfolioCategory;
  onCategoryChange: (category: PortfolioCategory) => void;
};

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) => (
  <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
    <ScrollArea className="w-full whitespace-nowrap">
      <Tabs value={selectedCategory}>
        <TabsList className="justify-start mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/ComponentTypes";

export const CategoryFilters = ({
  categories,
  selectedMain,
  selectedSub,
  onMainSelect,
  onSubSelect,
}: {
  categories: Category[];
  selectedMain: string;
  selectedSub: string;
  onMainSelect: (id: string) => void;
  onSubSelect: (id: string) => void;
}) => {
  const currentCategory = categories.find((c) => c.id === selectedMain);

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <Tabs value={selectedMain} onValueChange={onMainSelect}>
            <TabsList className="h-12">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-6 text-lg"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {currentCategory?.subcategories?.length && (
          <ScrollArea className="w-full whitespace-nowrap">
            <Tabs value={selectedSub} onValueChange={onSubSelect}>
            <TabsList className="h-10">
              <TabsTrigger value="all" className="px-4">
                All {currentCategory.name}
              </TabsTrigger>
              {currentCategory.subcategories.map((sub) => (
                <TabsTrigger key={sub.id} value={sub.id} className="px-4">
                  {sub.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

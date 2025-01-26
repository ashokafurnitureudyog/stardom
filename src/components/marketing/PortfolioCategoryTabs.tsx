import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category } from "@/types/ComponentTypes"

type CategoryTabsProps = {
  categories: Category[]
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryTabsProps) => (
  <Tabs value={selectedCategory} className="w-full">
    <TabsList className="w-full justify-start mb-8">
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
)
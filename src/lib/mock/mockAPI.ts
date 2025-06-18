import { Product, SortOption } from "@/types/ComponentTypes";
import { mockProducts } from "../constants/Products";

export const productService = {
  // Fetch all products (simulating API call)
  getProducts: async (): Promise<Product[]> => {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockProducts;
  },

  // Get unique categories from products
  getCategories: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [...new Set(products.map((p) => p.category))];
  },

  // Get unique collections from products
  getCollections: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [
      ...new Set(
        products
          .map((p) => p.product_collection)
          .filter(
            (collection): collection is string => collection !== undefined,
          ),
      ),
    ];
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const products = await productService.getProducts();
    return products.find((p) => p.id === id);
  },

  getSimilarProducts: async (id: string): Promise<Product[]> => {
    const products = await productService.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return [];
    return products.filter(
      (p) => p.category === product.category && p.id !== product.id,
    );
  },

  // Get featured products (since no featured flag exists)
  getFeaturedProducts: async (): Promise<Product[]> => {
    const products = await productService.getProducts();
    const categories = [...new Set(products.map((p) => p.category))];

    // Strategy: Get one product from each category to showcase variety
    // (up to 4 categories for a balanced display)
    const featuredProducts: Product[] = [];

    // Get the first product from each category
    for (const category of categories.slice(0, 4)) {
      const categoryProduct = products.find((p) => p.category === category);
      if (categoryProduct) {
        featuredProducts.push(categoryProduct);
      }
    }

    return featuredProducts;
  },

  // Filter and sort products
  filterProducts: (
    products: Product[],
    category: string,
    collection: string,
    searchQuery: string,
    sortOption: SortOption,
  ): Product[] => {
    // First filter products
    const filtered = products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const collectionMatch =
        collection === "all" || product.product_collection === collection;

      // Search query matching
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.product_collection
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return categoryMatch && collectionMatch && searchMatch;
    });

    // Then sort filtered products
    return productService.sortProducts(filtered, sortOption);
  },

  // Sort products based on sort option
  sortProducts: (products: Product[], sortOption: SortOption): Product[] => {
    const sortedProducts = [...products];

    switch (sortOption) {
      case "name-a-z":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

      case "name-z-a":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

      case "featured":
      default:
        // Assuming id represents the natural "featured" order
        return sortedProducts.sort((a, b) => a.id.localeCompare(b.id));
    }
  },
};

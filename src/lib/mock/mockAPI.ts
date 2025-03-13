import { Product, SortOption } from "@/types/ComponentTypes";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ergonomic Executive Chair",
    description:
      "Premium ergonomic design with lumbar support and adjustable features for all-day comfort.",
    category: "chairs",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1505843490701-5be5d24ab61c?q=80&w=1000",
      "https://images.unsplash.com/photo-1589364222378-3e94f2cdf659?q=80&w=1000",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1000",
    ],
    features: [
      "Adjustable height",
      "Lumbar support",
      "Premium leather",
      "360° swivel",
    ],
    colors: ["Black", "Brown", "Navy"],
  },
  {
    id: "2",
    name: "Modern Conference Table",
    description:
      "Sleek design conference table ideal for corporate meetings and collaborative workspaces.",
    category: "tables",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1573497701240-345a300b8d36?q=80&w=1000",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1000",
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=1000",
    ],
    features: [
      "Power outlets",
      "Cable management",
      "Modular design",
      "Premium finish",
    ],
    colors: ["Oak", "Walnut", "Ebony"],
  },
  {
    id: "3",
    name: "Minimalist Workstation",
    description:
      "Clean, minimalist desk designed for productivity with smart storage solutions.",
    category: "desks",
    collection: "aesthetic",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000",
      "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000",
    ],
    features: [
      "Cable management",
      "Adjustable height",
      "Sustainable materials",
    ],
    colors: ["White", "Natural Oak", "Black"],
  },
  {
    id: "4",
    name: "Collaborative Lounge Set",
    description:
      "Versatile lounge furniture designed for informal meetings and collaborative work.",
    category: "lounges",
    collection: "collaborative",
    images: [
      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?q=80&w=1000",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1000",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000",
    ],
    features: [
      "Modular arrangement",
      "Acoustic properties",
      "Stain-resistant fabric",
    ],
    colors: ["Teal", "Gray", "Charcoal"],
  },
  {
    id: "5",
    name: "Acoustic Privacy Booth",
    description:
      "Self-contained privacy booth with acoustic properties for focused work or calls.",
    category: "booths",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1516705346105-4b6d739b1d61?q=80&w=1000",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000",
    ],
    features: [
      "Soundproof",
      "Integrated lighting",
      "Ventilation",
      "Power outlets",
    ],
    colors: ["Gray", "White", "Custom"],
  },
  {
    id: "6",
    name: "Scandinavian Office Chair",
    description:
      "Elegant wooden office chair inspired by Scandinavian design principles.",
    category: "chairs",
    collection: "aesthetic",
    images: [
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1000",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000",
    ],
    features: ["Wooden frame", "Ergonomic design", "Sustainable materials"],
    colors: ["Natural", "Black", "White"],
  },
  {
    id: "8",
    name: "Industrial Storage Cabinet",
    description:
      "Durable metal storage solution with industrial aesthetic for modern offices.",
    category: "storage",
    collection: "industrial",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000",
      "https://images.unsplash.com/photo-1605329540489-494d4cce8315?q=80&w=1000",
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=1000",
    ],
    features: ["Lockable", "Adjustable shelves", "Heavy duty"],
    colors: ["Black", "Gray", "White"],
  },
  {
    id: "9",
    name: "Executive L-Shaped Desk",
    description:
      "Spacious L-shaped executive desk with integrated storage and premium materials.",
    category: "desks",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
      "https://images.unsplash.com/photo-1568654360516-7a3aff4c3b4f?q=80&w=1000",
    ],
    features: [
      "L-shaped design",
      "Built-in storage",
      "Cable management",
      "Premium materials",
    ],
    colors: ["Mahogany", "Cherry", "Dark Walnut"],
  },
];

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
    return [...new Set(products.map((p) => p.collection))];
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
        collection === "all" || product.collection === collection;

      // Search query matching
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.collection.toLowerCase().includes(searchQuery.toLowerCase());

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

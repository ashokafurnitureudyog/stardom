import { LucideIcon } from "lucide-react";
import { MediaItem } from "./MediaTypes";

export interface CarouselProps {
  images: string[];
}

export interface StatisticProps {
  value: number;
  label: string;
}
export type MenuItem = {
  name: string;
  path: string;
};

export interface MenuLinkProps {
  item: MenuItem;
  isMobile?: boolean;
}
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  parentCompany: string;
  established: string;
  address: {
    street: string;
    city: string;
    Country: string;
    zip: string;
    coordinates: [number, number];
  };
  hours: {
    weekday: string;
    sunday: string;
  };
  phone: string;
  email: string;
  website: string;
  mapsLink: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  faqs: FAQ[];
}
export interface ShippingInfo {
  title: string;
  details: string;
}

export interface ShippingCategory {
  title: string;
  icon: React.ReactNode;
  info: ShippingInfo[];
}

export interface SocialLink {
  platform: string;
  url: string;
}
export interface ReturnInfo {
  title: string;
  details: string;
}

export interface ReturnCategory {
  title: string;
  icon: React.ReactNode;
  info: ReturnInfo[];
}
export interface CookieInfo {
  title: string;
  details: string;
}
export interface CookieCategory {
  title: string;
  icon: React.ReactNode;
  info: CookieInfo[];
}
export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
}
export interface PortfolioProject {
  id: string; // mismatch with the returns
  title: string;
  tags: string[];
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial: Testimonial;
  gallery: string[];
}
export interface Testimonial {
  quote: string;
  author: string;
  position: string;
}
export interface ProjectCardProps {
  project: PortfolioProject;
  onClick: () => void;
}

export interface ProjectDetailsProps {
  project: PortfolioProject | null;
  open: boolean;
  onClose: () => void;
}
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  mainCategory?: string;
  subCategory?: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}
export interface FacilityContentProps {
  facility: {
    highlight: string;
    description: string;
  };
}

export interface FacilityData {
  category: string;
  title: string;
  src: string;
  highlight: string;
  description: string;
  content: React.ReactNode;
}
export type PortfolioHeroProps = {
  mediaItems?: MediaItem[];
  slideDuration?: number;
  transitionDuration?: number;
  overlayOpacity?: number;
};
export interface BackgroundMediaProps {
  item: MediaItem;
  isActive: boolean;
}
export interface TestingTool {
  Icon: LucideIcon;
  name: string;
  description: string;
  detail: string;
}

export interface Product {
  id: string;
  $id?: string;
  name: string;
  description: string;
  category: string;
  product_collection: string;
  images: string[];
  features: string[];
  colors: string[];
  $createdAt?: string;
  $updatedAt?: string;
}

export type FilterType = "category" | "collection";

export interface ProductFilters {
  selectedCategory: string;
  selectedCollection: string;
}
export type SortOption = "featured" | "name-a-z" | "name-z-a";
export interface ProductState {
  filters: ProductFilters;
  searchQuery: string;
  sortOption: SortOption;
  setFilter: (type: "category" | "collection", value: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
  resetFilters: () => void;
}
export interface ClientTestimonial {
  id?: string;
  $id?: string;
  name: string;
  title: string;
  location: string;
  context: string;
  purchaseDate: string;
  verified: boolean;
  quote: string;
  img: string;
  $createdAt?: string;
  $updatedAt?: string;
}

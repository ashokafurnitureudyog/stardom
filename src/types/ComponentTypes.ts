import { LucideIcon } from "lucide-react";

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
    saturday: string;
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

export interface SocialLink {
  icon: LucideIcon;
  url: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export type PortfolioCategory =
  | "All Projects"
  | "Executive Offices"
  | "Conference Rooms"
  | "Lounges"
  | "Collaborative Spaces";
export interface Project {
  id: number;
  title: string;
  category: PortfolioCategory;
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
  project: Project;
  onClick: () => void;
}

export interface ProjectDetailsProps {
  project: Project | null;
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

export interface Product {
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

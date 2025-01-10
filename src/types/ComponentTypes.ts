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


export interface Product {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
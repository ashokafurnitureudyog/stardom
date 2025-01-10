
export interface MediaItem {
  type: "video" | "image";
  src: string;
  alt?: string;
}

export interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}
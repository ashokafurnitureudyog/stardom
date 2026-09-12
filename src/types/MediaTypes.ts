export interface MediaItem {
  id?: string;
  src: string;
  alt?: string;
  type: "image" | "video";
  poster?: string; // For video thumbnails
  preload?: boolean; // Flag to preload specific items
  webmSrc?: string; // WebM version of the video for better performance in supported browsers
  lowResSrc?: string; // Low-resolution version for faster initial load
}

export interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** A hero slide as stored, which always has a row id. */
export type HeroMedia = MediaItem & { id: string };

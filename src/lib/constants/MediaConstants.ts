import { MediaItem } from "@/types/MediaTypes";

export const HERO_SLIDE_DURATION = 8000;
export const HERO_TRANSITION_DURATION = 1000;

export const HERO_MEDIA_ITEMS: readonly MediaItem[] = [
  { type: "video", src: "/videos/store.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
    alt: "Modern office space",
  },
  { type: "video", src: "/videos/lady.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
    alt: "Contemporary workspace",
  },
  { type: "video", src: "/videos/sofa.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519974719765-e6559eac2575",
    alt: "Luxury furniture",
  },
  { type: "video", src: "/videos/home.webm" },
] as const;

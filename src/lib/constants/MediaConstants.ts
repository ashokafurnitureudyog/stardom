import { MediaItem } from "@/types/MediaTypes";

export const HERO_SLIDE_DURATION = 8000;
export const HERO_TRANSITION_DURATION = 1000;

export const HERO_MEDIA_ITEMS: readonly MediaItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1666718623430-da207b018ea3",
    alt: "Modern office space",
  },
  { type: "video", src: "/videos/office-blur.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1666718621210-e662947b5dc3",
    alt: "Modern office space",
  },
  { type: "video", src: "/videos/office-dark.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1666718622537-6748ca5322e2",
    alt: "Contemporary workspace",
  },
  { type: "video", src: "/videos/workstation.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600508773950-d522f5bb7606",
    alt: "Luxury furniture",
  },
  { type: "video", src: "/videos/aerial.mp4" },
] as const;

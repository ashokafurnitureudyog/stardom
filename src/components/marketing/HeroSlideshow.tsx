"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_SLIDE_DURATION } from "@/lib/constants/MediaConstants";
import type { MediaItem } from "@/types/MediaTypes";

const SlideMedia = ({
  item,
  isActive,
  shouldLoad,
  priority,
}: {
  item: MediaItem;
  isActive: boolean;
  shouldLoad: boolean;
  priority: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) video.play().catch(() => {});
    else video.pause();
  }, [isActive]);

  const className = `absolute inset-0 h-full w-full transition-all duration-1000 ${
    isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
  }`;

  if (!shouldLoad) return <div className={className} />;

  if (item.type === "video") {
    return (
      <div className={className}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          preload={priority ? "auto" : "none"}
          poster={item.poster || item.lowResSrc || undefined}
        >
          {item.webmSrc && <source src={item.webmSrc} type="video/webm" />}
          <source src={item.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={item.src}
        alt={item.alt || ""}
        fill
        className="object-cover"
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        quality={priority ? 90 : 75}
      />
    </div>
  );
};

/**
 * Cross-fading hero background. Only the current slide and the one after it are
 * ever loaded, so the page starts with one image request rather than ten.
 */
export const HeroSlideshow = ({ mediaItems }: { mediaItems: MediaItem[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (mediaItems.length < 2) return;
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % mediaItems.length),
      HERO_SLIDE_DURATION,
    );
    return () => clearInterval(timer);
  }, [mediaItems.length]);

  if (mediaItems.length === 0) return <div className="absolute inset-0 bg-black/80" />;

  const next = (current + 1) % mediaItems.length;

  return (
    <div className="absolute inset-0 h-full w-full">
      {mediaItems.map((item, index) => (
        <SlideMedia
          key={item.id ?? item.src}
          item={item}
          isActive={index === current}
          shouldLoad={index === current || index === next}
          priority={index === 0}
        />
      ))}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70"
        aria-hidden="true"
      />
    </div>
  );
};

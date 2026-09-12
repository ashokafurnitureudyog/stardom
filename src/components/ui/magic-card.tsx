"use client";

import type React from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
}

/**
 * Card with a spotlight that follows the pointer.
 *
 * The pointer position is written to CSS custom properties on the element, so
 * the gradient is composited by the browser and React never re-renders while
 * the mouse moves. The colours come from theme variables rather than a
 * `theme === "dark"` branch, which the server cannot evaluate and which made
 * every one of these cards mismatch on hydration.
 */
export function MagicCard({ children, className, gradientSize = 200, ...props }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top } = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - top}px`);
  };

  const resetSpotlight = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--spotlight-x", `-${gradientSize}px`);
    card.style.setProperty("--spotlight-y", `-${gradientSize}px`);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetSpotlight}
      className={cn("magic-card group relative flex size-full rounded-xl", className)}
      style={{ "--spotlight-size": `${gradientSize}px` } as React.CSSProperties}
      {...props}
    >
      <div className="absolute inset-px z-10 rounded-xl bg-background" />
      <div className="magic-card-border pointer-events-none absolute inset-0 rounded-xl" />
      <div className="magic-card-glow pointer-events-none absolute inset-px z-10 rounded-xl" />
      <div className="relative z-30">{children}</div>
    </div>
  );
}

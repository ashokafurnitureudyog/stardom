import { cn } from "@/lib/utils/utils";

/**
 * Dot-matrix reveal that sweeps out from the centre.
 *
 * The grid is one repeating radial-gradient and the sweep is a mask animation,
 * so the whole effect is composited by the GPU with no JavaScript. It replaces
 * a three.js shader that cost 848 KB of bundle to draw dots on one hover.
 */
export const DotRevealEffect = ({
  className,
  containerClassName,
  color = "rgb(0, 255, 255)",
  dotSize = 3,
  spacing = 12,
  durationMs = 700,
  showGradient = true,
}: {
  className?: string;
  containerClassName?: string;
  color?: string;
  dotSize?: number;
  spacing?: number;
  durationMs?: number;
  showGradient?: boolean;
}) => (
  <div className={cn("relative h-full w-full", containerClassName)}>
    <div
      className={cn("dot-reveal h-full w-full", className)}
      style={
        {
          "--dot-color": color,
          "--dot-size": `${dotSize}px`,
          "--dot-spacing": `${spacing}px`,
          "--dot-duration": `${durationMs}ms`,
        } as React.CSSProperties
      }
    />
    {showGradient && <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-84%" />}
  </div>
);

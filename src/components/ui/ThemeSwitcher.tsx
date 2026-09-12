"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEMES = ["light", "dark", "system"] as const;

const ICONS = { light: Sun, dark: Moon, system: Monitor };

const LABELS = {
  light: "Luminous Mode",
  dark: "Twilight Mode",
  system: "System Preference",
};

/**
 * Cycles light -> dark -> system. Renders the system icon until mounted, since
 * the resolved theme is only known in the browser.
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted && theme ? (theme as (typeof THEMES)[number]) : "system";
  const Icon = ICONS[current] ?? Monitor;
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Theme: ${LABELS[current]}. Switch to ${LABELS[next]}`}
      onClick={() => setTheme(next)}
      className="relative h-9 w-9 rounded-full text-foreground/70 transition-colors duration-200 hover:bg-transparent hover:text-primary"
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

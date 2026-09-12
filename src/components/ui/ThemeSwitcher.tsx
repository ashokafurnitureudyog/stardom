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
      className="relative w-12 h-12 rounded-xl border border-transparent transition-all duration-500 ease-in-out hover:bg-primary/10 hover:text-primary hover:border-primary/20"
    >
      <Icon className="h-5 w-5 transition-transform duration-500 ease-in-out hover:rotate-12" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

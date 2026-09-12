"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toast host. `theme="system"` lets sonner follow the OS preference through a
 * media query, rather than this component reading the resolved theme during
 * render, which the server cannot know.
 */
export function Toaster() {
  return <SonnerToaster theme="system" position="bottom-right" closeButton richColors />;
}

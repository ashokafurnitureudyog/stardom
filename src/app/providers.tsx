"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <QueryClientProvider client={queryClient}>
          {children}
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

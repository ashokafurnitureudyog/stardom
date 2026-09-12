"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import { CompanyDataProvider } from "@/lib/client/company-data-context";
import type { CompanyData } from "@/lib/server/content";

export function Providers({
  children,
  companyData,
}: {
  children: React.ReactNode;
  companyData: CompanyData;
}) {
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
    <NextThemesProvider attribute="class" defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <CompanyDataProvider value={companyData}>{children}</CompanyDataProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}

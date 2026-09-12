"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CompanyDataProvider } from "@/lib/client/company-data-context";
import type { CompanyData } from "@/lib/server/content";

export function Providers({
  children,
  companyData,
}: {
  children: React.ReactNode;
  companyData: CompanyData;
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <CompanyDataProvider value={companyData}>{children}</CompanyDataProvider>
    </NextThemesProvider>
  );
}

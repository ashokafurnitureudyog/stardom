"use client";

import { createContext, use } from "react";
import type { CompanyData } from "@/lib/server/content";

const EMPTY: CompanyData = { companyInfo: null, socialLinks: [], teamMembers: [] };

const CompanyDataContext = createContext<CompanyData>(EMPTY);

/**
 * Company details resolved once on the server and handed to the tree, so the
 * chrome that needs them (footer, contact blocks) never fetches them again.
 */
export const CompanyDataProvider = CompanyDataContext.Provider;

export const useCompanyData = () => use(CompanyDataContext);

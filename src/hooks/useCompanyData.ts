"use client";

import { useQuery } from "@tanstack/react-query";
import { CompanyInfo, SocialLink, TeamMember } from "@/types/ComponentTypes";

interface CompanyDataResponse {
  companyInfo: CompanyInfo;
  socialLinks: SocialLink[];
  teamMembers: TeamMember[];
}

export function useCompanyData() {
  const { data, isLoading, error, refetch } = useQuery<CompanyDataResponse>({
    queryKey: ["company-data"],
    queryFn: async () => {
      const response = await fetch("/api/company-info");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch company data");
      }

      return response.json();
    },
  });

  return {
    companyInfo: data?.companyInfo,
    socialLinks: data?.socialLinks,
    teamMembers: data?.teamMembers,
    isLoading,
    error,
    refetchCompanyData: refetch,
  };
}

"use client";
import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CompanyInfo, TeamMember } from "@/types/ComponentTypes";
import { Building2, RefreshCw, Trash, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CompanyDetailsCard } from "./company/CompanyDetailsCard";
import { TeamMembersCard } from "./company/TeamMembersCard";
import { SocialLinksCard } from "./company/SocialLinksCard";

type CompanyInfoData = {
  companyInfo: CompanyInfo | null;
  socialLinks: Array<{ platform: string; url: string; id?: string }>;
  teamMembers: TeamMember[];
};

export const CompanyInfoSection = () => {
  const [data, setData] = useState<CompanyInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State to handle the "Get Started" view
  const [showEmptySections, setShowEmptySections] = useState(false);

  const fetchCompanyInfo = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/protected/company-info", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!res.ok) throw new Error("Failed to fetch company information");

      const data = await res.json();
      setData(data);
    } catch (error: unknown) {
      console.error("Failed to fetch company information:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load company information",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyInfo();
  }, [fetchCompanyInfo]);

  const handleDeleteAll = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/protected/company-info", {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete company information");
      }

      fetchCompanyInfo();
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete company information",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
              Company Information
            </h2>
            <p className="text-muted-foreground">
              Manage your company details, team, and social media
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
            >
              <RefreshCw size={16} /> Refresh
            </Button>

            {/* Delete All button without disabled attribute */}
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 border-[#3C3120] text-red-400 hover:bg-neutral-900/70 hover:text-red-300 hover:border-red-900/50"
            >
              <Trash size={16} /> Delete All
            </Button>
          </div>
        </div>

        <Separator className="my-6 bg-[#3C3120]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Details Card Skeleton - 8 columns */}
          <div className="lg:col-span-8">
            <div className="h-[420px] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse" />
          </div>

          {/* Team Members Card Skeleton - 4 columns */}
          <div className="lg:col-span-4">
            <div className="h-[420px] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse" />
          </div>

          {/* Social Links Card Skeleton - 12 columns */}
          <div className="lg:col-span-12">
            <div className="h-[180px] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const hasData =
    data &&
    (data.companyInfo ||
      data.teamMembers.length > 0 ||
      data.socialLinks.length > 0);
  const shouldShowSections = hasData || showEmptySections;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Company Information
          </h2>
          <p className="text-muted-foreground">
            Manage your company details, team, and social media
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className="flex items-center gap-2 h-10 hover:bg-secondary"
            onClick={fetchCompanyInfo}
          >
            <RefreshCw size={16} /> Refresh
          </Button>

          {data?.companyInfo && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="flex items-center gap-2 h-10 border-[#3C3120] text-red-400 hover:bg-neutral-900/70 hover:text-red-300 hover:border-red-900/50"
                >
                  <Trash size={16} /> Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#171410] border-[#352b1c]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#A28B55]">
                    Delete All Company Information
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-400">
                    Are you sure you want to delete all company information?
                    This action cannot be undone and will permanently remove all
                    company details, team members and social links.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-950/30 text-red-400 hover:bg-red-950/50 border border-red-900/30 hover:border-red-500/50"
                    onClick={handleDeleteAll}
                  >
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <Separator className="my-6 bg-[#3C3120]" />

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={fetchCompanyInfo}
          >
            Try Again
          </Button>
        </div>
      )}

      {shouldShowSections ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Details - Wider (8 columns) */}
          <div className="lg:col-span-8">
            <CompanyDetailsCard
              companyInfo={data?.companyInfo || null}
              onRefresh={fetchCompanyInfo}
            />
          </div>

          {/* Team Members - Narrower (4 columns) */}
          <div className="lg:col-span-4">
            <TeamMembersCard
              teamMembers={data?.teamMembers || []}
              onRefresh={fetchCompanyInfo}
            />
          </div>

          {/* Social Links */}
          <div className="lg:col-span-12">
            <SocialLinksCard
              socialLinks={data?.socialLinks || []}
              onRefresh={fetchCompanyInfo}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <Building2 className="mx-auto h-16 w-16 text-[#A28B55]/30 mb-4" />
          <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
            No Company Information Yet
          </h3>
          <p className="text-neutral-500 mb-6">
            Get started by adding your company details, team members, and social
            links.
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
              onClick={() => setShowEmptySections(true)}
            >
              <Plus size={16} /> Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CompanyInfo, TeamMember } from "@/types/ComponentTypes";
import { BuildingIcon, Loader2, RefreshCw, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { EditBasicInfoDialog } from "./company/EditBasicInfoDialog";
import { EditSocialLinksDialog } from "./company/EditSocialLinksDialog";
import { EditTeamMembersDialog } from "./company/EditTeamMembersDialog";

type CompanyInfoData = {
  companyInfo: CompanyInfo | null;
  socialLinks: Array<{ platform: string; url: string; id?: string }>;
  teamMembers: TeamMember[];
};

export const CompanyInfoSection = () => {
  const [data, setData] = useState<CompanyInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (error: any) {
      console.error("Failed to fetch company information:", error);
      setError(error.message || "Failed to load company information");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyInfo();
  }, [fetchCompanyInfo]);

  const handleDeleteAll = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all company information? This cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      // Delete company info, social links, and team members
      const response = await fetch("/api/protected/company-info", {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete company information");
      }

      // Refresh data
      fetchCompanyInfo();
    } catch (error: any) {
      setError(error.message || "Failed to delete company information");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#A28B55] mb-4" />
        <p className="text-neutral-400">Loading company information...</p>
      </div>
    );
  }

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
            className="flex items-center gap-2 h-10 hover:bg-secondary bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
            onClick={fetchCompanyInfo}
          >
            <RefreshCw size={16} /> Refresh
          </Button>

          {data?.companyInfo && (
            <Button
              variant="outline"
              size="default"
              onClick={handleDeleteAll}
              className="flex items-center gap-2 h-10 bg-red-950/30 text-red-400 hover:bg-red-950/50 border-red-900/30 hover:border-red-500/50"
            >
              <Trash size={16} /> Delete All
            </Button>
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

      {data &&
      (data.companyInfo ||
        data.teamMembers.length > 0 ||
        data.socialLinks.length > 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Company Info */}
          <Card className="bg-black/40 border-[#3C3120] col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" /> Company Details
              </CardTitle>

              <EditBasicInfoDialog
                initialData={data?.companyInfo}
                onSuccess={fetchCompanyInfo}
              />
            </CardHeader>

            <CardContent className="pt-4">
              {data?.companyInfo ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-1">
                      {data.companyInfo.name}
                    </h4>
                    <p className="text-neutral-400">
                      {data.companyInfo.parentCompany}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Est. {data.companyInfo.established}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase text-neutral-500 mb-1">
                      Address
                    </h4>
                    <p className="text-neutral-300">
                      {data.companyInfo.address.street}
                    </p>
                    <p className="text-neutral-300">
                      {data.companyInfo.address.city},{" "}
                      {data.companyInfo.address.Country}{" "}
                      {data.companyInfo.address.zip}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase text-neutral-500 mb-1">
                      Hours
                    </h4>
                    <p className="text-neutral-300">
                      Weekdays: {data.companyInfo.hours.weekday}
                    </p>
                    <p className="text-neutral-300">
                      Sunday: {data.companyInfo.hours.sunday}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase text-neutral-500 mb-1">
                      Contact
                    </h4>
                    <p className="text-neutral-300">{data.companyInfo.phone}</p>
                    <p className="text-neutral-300">{data.companyInfo.email}</p>
                    {data.companyInfo.website && (
                      <a
                        href={data.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A28B55] hover:underline block mt-1"
                      >
                        {data.companyInfo.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-neutral-500 mb-4">
                    No company details added yet
                  </p>
                  <EditBasicInfoDialog
                    initialData={null}
                    onSuccess={fetchCompanyInfo}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team members */}
          <Card className="bg-black/40 border-[#3C3120] col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-[#A28B55]">
                Team Members
              </CardTitle>

              <EditTeamMembersDialog
                initialData={data.teamMembers}
                onSuccess={fetchCompanyInfo}
              />
            </CardHeader>

            <CardContent className="pt-4">
              {data.teamMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.teamMembers.map((member, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-neutral-900">
                        {member.image && (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://via.placeholder.com/64?text=Error";
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">{member.name}</h4>
                        <p className="text-[#A28B55]">{member.role}</p>
                        <p className="text-neutral-400 text-sm mt-1">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-neutral-500 mb-4">
                    No team members added yet
                  </p>
                  <EditTeamMembersDialog
                    initialData={[]}
                    onSuccess={fetchCompanyInfo}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-black/40 border-[#3C3120] col-span-1 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-[#A28B55]">
                Social Media Links
              </CardTitle>

              <EditSocialLinksDialog
                initialData={data.socialLinks}
                onSuccess={fetchCompanyInfo}
              />
            </CardHeader>

            <CardContent className="pt-4">
              {data.socialLinks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md border border-[#3C3120] bg-black/60 hover:bg-[#3C3120]/50 transition-colors"
                    >
                      <div className="capitalize">{link.platform}</div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-neutral-500 mb-4">
                    No social links added yet
                  </p>
                  <EditSocialLinksDialog
                    initialData={[]}
                    onSuccess={fetchCompanyInfo}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <BuildingIcon className="mx-auto h-12 w-12 text-[#A28B55] opacity-70 mb-4" />
          <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
            No Company Information Yet
          </h3>
          <p className="text-neutral-500 mb-6">
            Get started by adding your company details, team members, and social
            links.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <EditBasicInfoDialog
              initialData={null}
              onSuccess={fetchCompanyInfo}
            />
            <EditTeamMembersDialog
              initialData={[]}
              onSuccess={fetchCompanyInfo}
            />
            <EditSocialLinksDialog
              initialData={[]}
              onSuccess={fetchCompanyInfo}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #3c3120;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #a28b55;
        }
      `}</style>
    </div>
  );
};

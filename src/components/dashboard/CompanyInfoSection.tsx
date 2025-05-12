/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CompanyInfo, TeamMember } from "@/types/ComponentTypes";
import {
  BuildingIcon,
  Loader2,
  RefreshCw,
  Trash,
  Users,
  Link2,
  Eye,
  Mail,
  Phone,
  Clock,
  MapPin,
  Globe,
  Calendar,
  User,
  ChevronRight,
  Edit,
  Plus,
  PenSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import Image from "next/image";
import { EditBasicInfoDialog } from "./company/EditBasicInfoDialog";
import { EditSocialLinksDialog } from "./company/EditSocialLinksDialog";
import { EditTeamMembersDialog } from "./company/EditTeamMembersDialog";
import { cn } from "@/lib/utils";

type CompanyInfoData = {
  companyInfo: CompanyInfo | null;
  socialLinks: Array<{ platform: string; url: string; id?: string }>;
  teamMembers: TeamMember[];
};

export const CompanyInfoSection = () => {
  const [data, setData] = useState<CompanyInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean;
    type: "company" | "team" | "social" | null;
    memberId?: number;
  }>({
    open: false,
    type: null,
  });

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
    } catch (error: any) {
      setError(error.message || "Failed to delete company information");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render social platform icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return (
          <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            f
          </div>
        );
      case "instagram":
        return (
          <div className="h-5 w-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
        );
      case "twitter":
        return (
          <div className="h-5 w-5 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            X
          </div>
        );
      case "linkedin":
        return (
          <div className="h-5 w-5 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
            in
          </div>
        );
      case "youtube":
        return (
          <div className="h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
            ▶
          </div>
        );
      case "tiktok":
        return (
          <div className="h-5 w-5 bg-black rounded-full flex items-center justify-center text-white text-xs">
            ♫
          </div>
        );
      case "pinterest":
        return (
          <div className="h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            P
          </div>
        );
      default:
        return <div className="h-5 w-5 bg-gray-600 rounded-full"></div>;
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

  // Determine if we have any data or are in the "get started" mode
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
            className="flex items-center gap-2 h-10 hover:bg-neutral-900/70 bg-transparent border-[#3C3120] text-neutral-300 hover:border-[#A28B55]"
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
                  className="flex items-center gap-2 h-10 bg-red-950/30 text-red-400 hover:bg-red-950/50 border-red-900/30 hover:border-red-500/50"
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
                    className="bg-red-950/50 text-red-400 hover:bg-red-950/70 border-red-900/30 hover:border-red-500/50"
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
          <div className="relative group lg:col-span-8">
            <Card className="bg-black/40 border-[#3C3120] h-full group-hover:border-[#A28B55] transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5" /> Company Details
                </CardTitle>

                {/* Only show edit button in top right if there is company data */}
                {data?.companyInfo && (
                  <div className="flex space-x-2">
                    <Dialog
                      open={
                        detailsDialog.open && detailsDialog.type === "company"
                      }
                      onOpenChange={(open) =>
                        setDetailsDialog((prev) => ({
                          ...prev,
                          open,
                          type: open ? "company" : null,
                        }))
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#A28B55] hover:bg-[#A28B55]/10"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-semibold text-[#A28B55] mb-1">
                              {data.companyInfo?.name}
                            </h2>
                            <p className="text-neutral-400">
                              {data.companyInfo?.parentCompany}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">
                              Est. {data.companyInfo?.established}
                            </p>
                          </div>

                          <Separator className="bg-[#3C3120]" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-[#A28B55] font-medium flex items-center gap-2 mb-3">
                                <MapPin className="h-4 w-4" /> Address
                              </h3>
                              <p className="text-neutral-200">
                                {data.companyInfo?.address.street}
                              </p>
                              <p className="text-neutral-200">
                                {data.companyInfo?.address.city},{" "}
                                {data.companyInfo?.address.Country}{" "}
                                {data.companyInfo?.address.zip}
                              </p>

                              {data.companyInfo?.mapsLink && (
                                <a
                                  href={data.companyInfo.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[#A28B55] hover:underline mt-2 text-sm"
                                >
                                  <Globe className="h-3.5 w-3.5" /> View on Maps
                                </a>
                              )}
                            </div>

                            <div>
                              <h3 className="text-[#A28B55] font-medium flex items-center gap-2 mb-3">
                                <Clock className="h-4 w-4" /> Business Hours
                              </h3>
                              <p className="text-neutral-200">
                                Weekdays: {data.companyInfo?.hours.weekday}
                              </p>
                              <p className="text-neutral-200">
                                Sunday: {data.companyInfo?.hours.sunday}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-[#A28B55] font-medium flex items-center gap-2 mb-3">
                                <Phone className="h-4 w-4" /> Contact
                              </h3>
                              <p className="text-neutral-200">
                                {data.companyInfo?.phone}
                              </p>
                              <p className="text-neutral-200">
                                {data.companyInfo?.email}
                              </p>

                              {data.companyInfo?.website && (
                                <a
                                  href={data.companyInfo.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[#A28B55] hover:underline mt-1"
                                >
                                  <Globe className="h-3.5 w-3.5" /> Visit
                                  Website
                                </a>
                              )}
                            </div>

                            <div>
                              <h3 className="text-[#A28B55] font-medium flex items-center gap-2 mb-3">
                                <MapPin className="h-4 w-4" /> Coordinates
                              </h3>
                              <p className="text-neutral-200">
                                Latitude:{" "}
                                {data.companyInfo?.address.coordinates[0]}
                              </p>
                              <p className="text-neutral-200">
                                Longitude:{" "}
                                {data.companyInfo?.address.coordinates[1]}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Edit button at bottom of dialog */}
                        <div className="mt-6 flex justify-center">
                          <EditBasicInfoDialog
                            initialData={data?.companyInfo}
                            onSuccess={fetchCompanyInfo}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <EditBasicInfoDialog
                      initialData={data?.companyInfo}
                      onSuccess={fetchCompanyInfo}
                    />
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-4">
                {data?.companyInfo ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="col-span-1 md:col-span-2 mb-2">
                      <h3 className="text-lg font-medium text-white">
                        {data.companyInfo.name}
                      </h3>
                      <p className="text-neutral-400">
                        {data.companyInfo.parentCompany}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" /> Est.{" "}
                        {data.companyInfo.established}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase text-neutral-500 mb-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" /> Address
                      </h4>
                      <p className="text-neutral-300 text-sm truncate">
                        {data.companyInfo.address.street}
                      </p>
                      <p className="text-neutral-300 text-sm truncate">
                        {data.companyInfo.address.city},{" "}
                        {data.companyInfo.address.Country}{" "}
                        {data.companyInfo.address.zip}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase text-neutral-500 mb-1 flex items-center">
                        <Phone className="h-3 w-3 mr-1" /> Contact
                      </h4>
                      <p className="text-neutral-300 text-sm truncate">
                        {data.companyInfo.phone}
                      </p>
                      <p className="text-neutral-300 text-sm truncate">
                        {data.companyInfo.email}
                      </p>
                      {data.companyInfo.website && (
                        <a
                          href={data.companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A28B55] hover:underline text-sm mt-1 inline-block truncate max-w-full"
                        >
                          {data.companyInfo.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs uppercase text-neutral-500 mb-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Hours
                      </h4>
                      <p className="text-neutral-300 text-sm">
                        Weekdays: {data.companyInfo.hours.weekday}
                      </p>
                      <p className="text-neutral-300 text-sm">
                        Sunday: {data.companyInfo.hours.sunday}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[240px]">
                    <BuildingIcon className="h-16 w-16 text-[#A28B55]/30 mb-4" />
                    <p className="text-neutral-500 mb-5 text-center">
                      No company details added yet
                    </p>
                    <div className="relative group/edit">
                      {/* Fix: Use a button that opens the dialog separately */}
                      <Button
                        variant="outline"
                        className="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                        onClick={() => {
                          // Find and click the real dialog trigger (workaround)
                          const dialogTrigger = document.querySelector(
                            '[data-dialog="basic-info"]',
                          ) as HTMLButtonElement;
                          if (dialogTrigger) dialogTrigger.click();
                        }}
                      >
                        <PenSquare size={16} /> Add Company Details
                      </Button>

                      {/* Hidden actual dialog component */}
                      <div className="hidden">
                        <EditBasicInfoDialog
                          initialData={null}
                          onSuccess={fetchCompanyInfo}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Team Members - Narrower (4 columns) */}
          <div className="relative group lg:col-span-4">
            <Card className="bg-black/40 border-[#3C3120] h-full group-hover:border-[#A28B55] transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
                  <Users className="w-5 h-5" /> Team Members
                </CardTitle>

                {/* Only show edit button in top right if there are team members */}
                {data?.teamMembers && data.teamMembers.length > 0 && (
                  <EditTeamMembersDialog
                    initialData={data.teamMembers}
                    onSuccess={fetchCompanyInfo}
                  />
                )}
              </CardHeader>

              <CardContent className="pt-4">
                {data?.teamMembers && data.teamMembers.length > 0 ? (
                  <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
                    {data.teamMembers.map((member, index) => (
                      <Dialog
                        key={index}
                        open={
                          detailsDialog.open &&
                          detailsDialog.type === "team" &&
                          detailsDialog.memberId === index
                        }
                        onOpenChange={(open) =>
                          setDetailsDialog((prev) => ({
                            open,
                            type: open ? "team" : null,
                            memberId: open ? index : undefined,
                          }))
                        }
                      >
                        <DialogTrigger asChild>
                          <div className="group/member cursor-pointer bg-black/50 border border-[#3C3120] rounded-md p-3 hover:border-[#A28B55] hover:bg-black/80 transition-all duration-200">
                            <div className="flex gap-3 items-start">
                              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#3C3120]">
                                <img
                                  src={
                                    member.image ||
                                    `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`
                                  }
                                  alt={member.name}
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`;
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-base font-medium text-white truncate">
                                    {member.name}
                                  </h4>
                                  <ChevronRight className="h-4 w-4 text-[#A28B55] opacity-0 group-hover/member:opacity-100 transition-opacity duration-200" />
                                </div>
                                <p className="text-[#A28B55] text-sm truncate">
                                  {member.role}
                                </p>
                                <p className="text-neutral-400 text-xs line-clamp-1 mt-1">
                                  {member.bio}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>

                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
                          <div className="flex flex-col items-center text-center mb-6 pt-3">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#A28B55] mb-4">
                              <img
                                src={
                                  member.image ||
                                  `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`
                                }
                                alt={member.name}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`;
                                }}
                              />
                            </div>
                            <h2 className="text-xl font-semibold text-white">
                              {member.name}
                            </h2>
                            <p className="text-[#A28B55] mt-1">{member.role}</p>
                          </div>

                          <Separator className="bg-[#3C3120] my-4" />

                          <div>
                            <h3 className="text-[#A28B55] text-sm font-medium uppercase mb-2">
                              Bio
                            </h3>
                            <p className="text-neutral-300 whitespace-pre-line">
                              {member.bio}
                            </p>
                          </div>

                          {/* Edit button at bottom of dialog */}
                          <div className="mt-6 flex justify-center">
                            <EditTeamMembersDialog
                              initialData={data.teamMembers}
                              onSuccess={fetchCompanyInfo}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[240px]">
                    <Users className="h-16 w-16 text-[#A28B55]/30 mb-4" />
                    <p className="text-neutral-500 mb-5 text-center">
                      No team members added yet
                    </p>
                    {/* Fix: Use a button that opens the dialog separately */}
                    <Button
                      variant="outline"
                      className="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                      onClick={() => {
                        // Find and click the real dialog trigger (workaround)
                        const dialogTrigger = document.querySelector(
                          '[data-dialog="team-members"]',
                        ) as HTMLButtonElement;
                        if (dialogTrigger) dialogTrigger.click();
                      }}
                    >
                      <PenSquare size={16} /> Add Team Members
                    </Button>

                    {/* Hidden actual dialog component */}
                    <div className="hidden">
                      <EditTeamMembersDialog
                        initialData={[]}
                        onSuccess={fetchCompanyInfo}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="relative group lg:col-span-12">
            <Card className="bg-black/40 border-[#3C3120] group-hover:border-[#A28B55] transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
                  <Link2 className="w-5 h-5" /> Social Media Links
                </CardTitle>

                {/* Only show edit button in top right if there are social links */}
                {data?.socialLinks && data.socialLinks.length > 0 && (
                  <div className="flex space-x-2">
                    <Dialog
                      open={
                        detailsDialog.open && detailsDialog.type === "social"
                      }
                      onOpenChange={(open) =>
                        setDetailsDialog((prev) => ({
                          ...prev,
                          open,
                          type: open ? "social" : null,
                        }))
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#A28B55] hover:bg-[#A28B55]/10"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
                        <h2 className="text-xl font-semibold text-[#A28B55] mb-4">
                          Social Media Links
                        </h2>

                        <div className="space-y-3">
                          {data.socialLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-md border border-[#3C3120] bg-black/50 hover:bg-[#3C3120]/50 transition-colors group/link"
                            >
                              <div className="flex items-center gap-3">
                                {getSocialIcon(link.platform)}
                                <div>
                                  <p className="text-white capitalize">
                                    {link.platform}
                                  </p>
                                  <p className="text-xs text-neutral-400 truncate max-w-[280px]">
                                    {link.url}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-[#A28B55] opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                            </a>
                          ))}
                        </div>

                        {/* Edit button at bottom of dialog */}
                        <div className="mt-6 flex justify-center">
                          <EditSocialLinksDialog
                            initialData={data.socialLinks}
                            onSuccess={fetchCompanyInfo}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <EditSocialLinksDialog
                      initialData={data.socialLinks}
                      onSuccess={fetchCompanyInfo}
                    />
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-4">
                {data?.socialLinks && data.socialLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-3 max-h-[130px] overflow-y-auto pr-2">
                    {data.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-md border border-[#3C3120] bg-black/60 hover:bg-[#3C3120]/50 transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                        <span className="capitalize truncate">
                          {link.platform}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[130px]">
                    <Link2 className="h-16 w-16 text-[#A28B55]/30 mb-4" />
                    <p className="text-neutral-500 mb-5 text-center">
                      No social links added yet
                    </p>

                    {/* Fix: Use a button that opens the dialog separately */}
                    <Button
                      variant="outline"
                      className="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                      onClick={() => {
                        // Find and click the real dialog trigger (workaround)
                        const dialogTrigger = document.querySelector(
                          '[data-dialog="social-links"]',
                        ) as HTMLButtonElement;
                        if (dialogTrigger) dialogTrigger.click();
                      }}
                    >
                      <PenSquare size={16} /> Add Social Links
                    </Button>

                    {/* Hidden actual dialog component */}
                    <div className="hidden">
                      <EditSocialLinksDialog
                        initialData={[]}
                        onSuccess={fetchCompanyInfo}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <BuildingIcon className="mx-auto h-16 w-16 text-[#A28B55]/30 mb-4" />
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

      {/* Hidden dialog triggers that we'll click programmatically */}
      <div className="hidden">
        <span data-dialog="basic-info">
          <EditBasicInfoDialog
            initialData={null}
            onSuccess={fetchCompanyInfo}
          />
        </span>

        <span data-dialog="team-members">
          <EditTeamMembersDialog
            initialData={[]}
            onSuccess={fetchCompanyInfo}
          />
        </span>

        <span data-dialog="social-links">
          <EditSocialLinksDialog
            initialData={[]}
            onSuccess={fetchCompanyInfo}
          />
        </span>
      </div>

      <style jsx global>{`
        /* Scrollbar styling */
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

        /* Dialog overlay styling */
        [data-radix-popper-content-wrapper] {
          z-index: 50 !important;
        }

        .DialogOverlay {
          background-color: rgba(0, 0, 0, 0.5);
          position: fixed;
          inset: 0;
          animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(4px);
        }

        /* Dialog content styling */
        .DialogContent {
          background-color: #171410;
          border-radius: 6px;
          box-shadow:
            0px 10px 38px -10px rgba(22, 23, 24, 0.35),
            0px 10px 20px -15px rgba(22, 23, 24, 0.2);
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 450px;
          max-height: 85vh;
          padding: 25px;
          animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #352b1c;
        }

        @keyframes overlayShow {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes contentShow {
          from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditSocialLinksDialog } from "./EditSocialLinksDialog";
import {
  Link2,
  PenSquare,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { RiTwitterXFill } from "@remixicon/react";

interface SocialLinksCardProps {
  socialLinks: Array<{ platform: string; url: string; id?: string }>;
  onRefresh: () => Promise<void>;
}

export const SocialLinksCard = ({
  socialLinks,
  onRefresh,
}: SocialLinksCardProps) => {
  // Helper to render social platform icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case "instagram":
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case "x":
      case "twitter": // Keep for backward compatibility
        return <RiTwitterXFill className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case "youtube":
        return <Youtube className="h-5 w-5 text-red-600" />;
      default:
        return <Link2 className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="relative group">
      <Card className="bg-black/40 border-[#3C3120] group-hover:border-[#A28B55] transition-colors duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
            <Link2 className="w-5 h-5" /> Social Media Links
          </CardTitle>

          {/* Only show edit button in top right if there are social links */}
          {socialLinks && socialLinks.length > 0 && (
            <EditSocialLinksDialog
              initialData={socialLinks}
              onSuccess={onRefresh}
            />
          )}
        </CardHeader>

        <CardContent className="pt-4">
          {socialLinks && socialLinks.length > 0 ? (
            <>
              {/* Desktop/Tablet view - Horizontal scrolling */}
              <div className="hidden md:block overflow-x-auto pb-2">
                <div className="flex gap-3 flex-nowrap">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md border border-[#3C3120] bg-black/60 hover:bg-[#3C3120]/50 transition-colors whitespace-nowrap w-[130px] flex-shrink-0 hover:border-[#A28B55]"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="capitalize truncate">
                        {link.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile view - Vertical stacking */}
              <div className="block md:hidden max-h-[240px] overflow-y-auto pr-2">
                <div className="flex flex-col gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md border border-[#3C3120] bg-black/60 hover:bg-[#3C3120]/50 hover:border-[#A28B55] transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                      <div>
                        <p className="capitalize text-sm text-white">
                          {link.platform}
                        </p>
                        <p className="text-xs text-neutral-400 truncate">
                          {link.url}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[130px]">
              <Link2 className="h-16 w-16 text-[#A28B55]/30 mb-4" />
              <p className="text-neutral-500 mb-5 text-center">
                No social links added yet
              </p>

              <EditSocialLinksDialog
                initialData={[]}
                onSuccess={onRefresh}
                triggerClass="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                triggerContent={
                  <>
                    <PenSquare size={16} /> Add Social Links
                  </>
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

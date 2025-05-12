"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditSocialLinksDialog } from "./EditSocialLinksDialog";
import { Link2, PenSquare } from "lucide-react";

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

      <style jsx global>{`
        /* Show scrollbar when needed, but style it */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
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

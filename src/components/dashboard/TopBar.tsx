"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationDropdown } from "./NotificationDropdown";
import { LogOut, Settings } from "lucide-react";
import { signOutUser } from "@/lib/controllers/AuthControllers";
import dynamic from "next/dynamic";

const SecuritySettingsDialog = dynamic(
  () =>
    import("./SecuritySettingsDialog").then(
      (mod) => mod.SecuritySettingsDialog,
    ),
  { ssr: false },
);

export const TopBar = ({
  user,
}: {
  user: {
    name: string;
    email: string;
    $createdAt: string;
    $updatedAt: string;
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPasswordForm = searchParams.get("showPasswordForm") === "true";

  const handlePasswordChange = () => {
    const params = new URLSearchParams(searchParams);
    params.set("showPasswordForm", "true");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCloseForm = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("showPasswordForm");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <header className="h-16 border-b bg-card px-8 flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-[#171410] text-neutral-200"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-black border border-[#352b1c] text-neutral-200 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_6px_rgba(162,139,85,0.3)]"
              align="end"
            >
              <div className="px-2 py-1.5 text-sm font-medium border-b border-[#352b1c]">
                <p className="truncate text-[#A28B55]">{user.name}</p>
                <p className="text-xs text-neutral-400">Administrator</p>
              </div>

              <DropdownMenuItem
                onClick={handlePasswordChange}
                className="focus:bg-[#171410]/80 hover:bg-[#171410]/80 focus:text-[#A28B55]"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={signOutUser}
                className="focus:bg-[#171410]/80 hover:bg-[#171410]/80 focus:text-[#A28B55]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {showPasswordForm && (
        <SecuritySettingsDialog user={user} onClose={handleCloseForm} />
      )}
    </>
  );
};

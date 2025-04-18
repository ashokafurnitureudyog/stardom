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
import { LogOut, Lock } from "lucide-react";
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
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5 text-sm font-medium border-b">
                <p className="truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>

              <DropdownMenuItem onClick={handlePasswordChange}>
                <Lock className="w-4 h-4 mr-2" />
                Security Settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={signOutUser}>
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

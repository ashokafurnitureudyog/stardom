"use client";
import {
  Package,
  Star,
  MessageSquare,
  Image,
  Building2,
  Film,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOutUser } from "@/lib/controllers/AuthControllers";
import { StorageUsage } from "./StorageUsage";

interface SidebarItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

export const Sidebar = ({
  activeSection,
  setActiveSection,
  user,
  isMobile = false,
  onClose,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: {
    name: string;
    email: string;
    $createdAt: string;
    $updatedAt: string;
  };
  isMobile?: boolean;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handlePasswordChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("showPasswordForm", "true");
    router.replace(`?${params.toString()}`, { scroll: false });
    setShowUserMenu(false);
    if (onClose) onClose();
  };

  const sidebarItems: SidebarItem[] = [
    { id: "products", icon: Package, label: "Products" },
    { id: "featured", icon: Star, label: "Featured Items" },
    { id: "testimonials", icon: MessageSquare, label: "Testimonials" },
    { id: "portfolio", icon: Image, label: "Portfolio" },
    { id: "company", icon: Building2, label: "Company Info" },
    { id: "files", icon: Film, label: "Hero Files" },
  ];

  const handleSignOut = () => {
    setShowUserMenu(false);
    signOutUser();
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (onClose) onClose();
  };

  const sidebarClasses = isMobile
    ? "w-full p-4 bg-card flex flex-col h-full"
    : "w-64 min-w-[256px] bg-card border-r shadow-sm p-4 h-screen sticky top-0 flex flex-col";

  return (
    <div className={sidebarClasses}>
      <div className="mb-8 flex items-start gap-3">
        <LayoutDashboard className="w-12 h-12 text-primary" />
        <div className="flex flex-col">
          <h1 className="text-xl font-medium tracking-tight leading-tight">
            Admin
          </h1>
          <h1 className="text-xl font-medium tracking-tight leading-tight">
            Dashboard
          </h1>
        </div>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((sidebarItem) => (
          <button
            key={sidebarItem.id}
            onClick={() => handleSectionChange(sidebarItem.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeSection === sidebarItem.id
                ? "bg-primary/10 text-primary font-medium shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                : "text-muted-foreground hover:bg-secondary hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
            }`}
          >
            <sidebarItem.icon
              className={`w-5 h-5 transition-transform duration-200`}
            />
            <span>{sidebarItem.label}</span>
          </button>
        ))}
      </nav>

      {/* User profile at the bottom */}
      <div className="mt-auto pt-4 border-t border-[#3C3120] relative">
        {" "}
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-neutral-900/60 transition-all duration-150 active:scale-[0.98] active:bg-[#A28B55]/10"
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#A28B55]/90">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <span className="block text-sm font-medium">{user.name}</span>
              <span className="text-xs text-neutral-400">Administrator</span>
            </div>
          </div>
          {showUserMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {/* Custom user menu that appears above the user button */}
        {showUserMenu && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-[#171410] border border-[#3C3120] rounded-md shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_6px_rgba(162,139,85,0.3)] overflow-hidden">
            <div className="px-4 py-4 text-sm border-b border-[#3C3120]">
              <p className="font-medium text-[#A28B55]">{user.name}</p>
              <p className="text-xs text-neutral-400 mt-1">{user.email}</p>
            </div>

            {/* Storage usage component with more space */}
            <StorageUsage />

            <button
              onClick={handlePasswordChange}
              className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-neutral-950/60 transition-colors"
            >
              <Settings className="w-4 h-4 text-[#A28B55]" />
              <span className="text-neutral-300">Settings</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-neutral-950/60 transition-colors"
            >
              <LogOut className="w-4 h-4 text-[#A28B55]" />
              <span className="text-neutral-300">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

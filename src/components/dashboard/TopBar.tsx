"use client";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

const SecuritySettingsDialog = dynamic(
  () =>
    import("./SecuritySettingsDialog").then(
      (mod) => mod.SecuritySettingsDialog,
    ),
  { ssr: false },
);

export const TopBar = ({
  user,
  toggleSidebar,
}: {
  user: {
    name: string;
    email: string;
    $createdAt: string;
    $updatedAt: string;
  };
  toggleSidebar: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showPasswordForm = searchParams.get("showPasswordForm") === "true";

  const handleCloseForm = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("showPasswordForm");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <header className="h-16 border-b border-[#3C3120] bg-black flex items-center sticky top-0 z-30 w-full">
        <div className="w-full flex items-center justify-between px-4 md:justify-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-[#A28B55] hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xl tracking-wide font-light text-white">
              STARDOM
            </span>
            <span className="text-xl font-light text-[#A28B55]">
              Content Management
            </span>
          </div>

          {/* Empty div for flex spacing on mobile */}
          <div className="w-6 md:hidden"></div>
        </div>
      </header>

      {showPasswordForm && (
        <SecuritySettingsDialog user={user} onClose={handleCloseForm} />
      )}
    </>
  );
};

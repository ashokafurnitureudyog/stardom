"use client";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import Image from "next/image";

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
      <header className="h-16 border-b border-[#3C3120] bg-black flex items-center sticky top-0 z-30 w-full shadow-md">
        <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-8">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-[#A28B55] hover:text-white transition-colors duration-200 flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#2a2315]"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-center flex-grow">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-dark.png"
                alt="STARDOM Logo"
                className=""
                priority
                height={1}
                width={160}
              />

              <div className="h-8 md:h-10 w-px bg-[#3C3120]"></div>

              <span className="text-lg md:text-xl font-light text-[#A28B55]">
                Content Management
              </span>
            </div>
          </div>
        </div>
      </header>

      {showPasswordForm && (
        <SecuritySettingsDialog user={user} onClose={handleCloseForm} />
      )}
    </>
  );
};

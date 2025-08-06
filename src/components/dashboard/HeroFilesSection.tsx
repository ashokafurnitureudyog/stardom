"use client";
import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MediaItem } from "@/types/MediaTypes";
import { HeroMediaCard } from "./hero-media/HeroMediaCard";
import { AddHeroMediaDialog } from "./hero-media/AddHeroMediaDialog";
import { RefreshCw, Film, Loader2 } from "lucide-react";
import { AlertDialog } from "@/components/ui/alert-dialog";

type MediaItemWithId = MediaItem & { id: string };

export const HeroFilesSection = () => {
  const { toast } = useToast();
  const [data, setData] = useState<MediaItemWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHeroMedia = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/hero-media", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!res.ok) throw new Error("Failed to fetch hero media");

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch hero media");
      }

      setData(result.mediaItems || []);
    } catch (error: unknown) {
      console.error("Failed to fetch hero media:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load hero media",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroMedia();
  }, [fetchHeroMedia]);

  const handleDeleteMedia = async (id: string) => {
    try {
      setLoading(true);

      if (!id || id === "undefined" || id === "null") {
        throw new Error("Invalid media ID");
      }

      const response = await fetch(
        `/api/protected/hero-media?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete media item");
      }

      toast({
        title: "Media Deleted",
        description: "Hero media has been deleted successfully.",
        variant: "default",
      });

      fetchHeroMedia();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete media item";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
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
              Hero Media
            </h2>
            <p className="text-muted-foreground mb-1">
              Manage media files for the homepage hero section
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
            <AddHeroMediaDialog onSuccess={fetchHeroMedia} />
          </div>
        </div>

        <Separator className="my-6 bg-[#3C3120]" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-black/40 border border-[#3C3120]/50 rounded-md h-[280px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Hero Media
          </h2>
          <p className="text-muted-foreground mb-1">
            Manage media files for the homepage hero section
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className="flex items-center gap-2 h-10 hover:bg-neutral-900/70 bg-transparent border-[#3C3120] text-neutral-300 hover:border-[#A28B55]"
            onClick={fetchHeroMedia}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}{" "}
            Refresh
          </Button>

          <AddHeroMediaDialog onSuccess={fetchHeroMedia} />

          {data.length > 0 && (
            <AlertDialog>{/* Delete All dialog content */}</AlertDialog>
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
            onClick={fetchHeroMedia}
          >
            Try Again
          </Button>
        </div>
      )}

      {data.length === 0 ? (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <div className="flex flex-col items-center justify-center">
            <Film className="w-16 h-16 text-[#A28B55]/30 mb-4" />
            <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
              No Hero Media Added Yet
            </h3>
            <p className="text-neutral-500 mb-6 max-w-md mx-auto">
              Add images and videos to create an engaging hero section on your
              homepage.
            </p>
            <AddHeroMediaDialog onSuccess={fetchHeroMedia} />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <HeroMediaCard
                key={item.id}
                item={item}
                onDelete={handleDeleteMedia}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

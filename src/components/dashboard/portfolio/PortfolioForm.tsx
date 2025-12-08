"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { ImagesSection } from "./ImagesSection";
import { ProjectDetailsSection } from "./ProjectDetailsSection";
import { ChallengeSection } from "./ChallengeSection";
import { TestimonialSection } from "./TestimonialSection";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { useToast } from "@/hooks/use-toast";
import { PortfolioFormData } from "./portfolio/types";
import { useFileUpload } from "@/hooks/useFileUpload"; // Import the existing hook
import { Progress } from "@/components/ui/progress"; // Make sure this component exists

interface PortfolioFormProps {
  onSuccess: () => void;
  initialData?: PortfolioFormData;
  isEditing?: boolean;
}

export const PortfolioForm = ({
  onSuccess,
  initialData,
  isEditing = false,
}: PortfolioFormProps) => {
  const { toast } = useToast();
  const { uploadFile, uploadMultipleFiles, uploadStatus } = useFileUpload(); // Use the existing hook

  // Project details
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [impact, setImpact] = useState(initialData?.impact || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>(
    undefined,
  );

  // Tags
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  // Testimonial
  const [testimonialQuote, setTestimonialQuote] = useState(
    initialData?.testimonial?.quote || initialData?.testimonial_quote || "",
  );
  const [testimonialAuthor, setTestimonialAuthor] = useState(
    initialData?.testimonial?.author || initialData?.testimonial_author || "",
  );
  const [testimonialPosition, setTestimonialPosition] = useState(
    initialData?.testimonial?.position ||
      initialData?.testimonial_position ||
      "",
  );

  // Image handling
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    initialData?.thumbnail || "",
  );
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    initialData?.gallery || [],
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  // Track removed gallery URLs (only for editing)
  const [removedGalleryUrls, setRemovedGalleryUrls] = useState<string[]>([]);
  const [isThumbnailRemoved, setIsThumbnailRemoved] = useState(false);

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for cleanup
  const thumbnailObjectUrlRef = useRef<string | null>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (thumbnailObjectUrlRef.current) {
        URL.revokeObjectURL(thumbnailObjectUrlRef.current);
      }
    };
  }, []);

  // Image URL handling
  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && !galleryUrls.includes(newImageUrl.trim())) {
      setGalleryUrls([...galleryUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  // Gallery image removal handler
  const handleRemoveGalleryUrl = (index: number) => {
    const urlToRemove = galleryUrls[index];

    // If we're editing, track removed URLs
    if (isEditing && initialData?.gallery?.includes(urlToRemove)) {
      setRemovedGalleryUrls((prev) => [...prev, urlToRemove]);
    }

    setGalleryUrls(galleryUrls.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Validate required fields
      if (!title || !description) {
        throw new Error("Title and description are required");
      }

      // Validate thumbnail (not required if user removed it)
      if (!thumbnailFile && !thumbnailUrl && !isThumbnailRemoved) {
        throw new Error("A thumbnail image is required unless you removed it");
      }

      // Validate thumbnail URL length if it's from an external URL
      if (!thumbnailFile && thumbnailUrl && thumbnailUrl.length > 512) {
        throw new Error("Thumbnail URL is too long (maximum 512 characters)");
      }

      // Upload files directly to Appwrite first
      let finalThumbnailUrl = thumbnailUrl;
      let uploadedGalleryUrls: string[] = [];

      // 1. Upload thumbnail if it's a file
      if (thumbnailFile) {
        try {
          const uploadResult = await uploadFile(
            thumbnailFile,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
          );

          if (!uploadResult) {
            throw new Error("Failed to upload thumbnail");
          }

          finalThumbnailUrl = uploadResult;
        } catch (error) {
          throw new Error(
            `Thumbnail upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      // 2. Upload gallery images if there are any
      if (files.length > 0) {
        try {
          uploadedGalleryUrls = await uploadMultipleFiles(
            files,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
          );

          if (uploadedGalleryUrls.length !== files.length) {
            throw new Error("Some gallery images failed to upload");
          }
        } catch (error) {
          throw new Error(
            `Gallery images upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      // 3. Prepare the data for API request (JSON format)
      const portfolioData = {
        title,
        description,
        challenge,
        solution,
        impact,
        tags,
        thumbnail: isThumbnailRemoved ? "" : finalThumbnailUrl,
        // Combine existing gallery URLs with newly uploaded ones
        gallery: [...galleryUrls, ...uploadedGalleryUrls],
        testimonial_quote: testimonialQuote,
        testimonial_author: testimonialAuthor,
        testimonial_position: testimonialPosition,
        // For editing
        id:
          isEditing && initialData
            ? initialData.id || initialData.$id
            : undefined,
        thumbnailRemoved: isThumbnailRemoved,
        removedGalleryUrls:
          removedGalleryUrls.length > 0 ? removedGalleryUrls : undefined,
      };

      // 4. Send the data to the API
      const response = await fetch("/api/protected/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save portfolio project");
      }

      toast({
        title: "Success",
        description: isEditing
          ? "Portfolio project updated successfully"
          : "Portfolio project created successfully",
      });

      onSuccess();
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save portfolio project";
      console.error("Portfolio submission error:", error);
      setErrorMessage(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailChange = (file?: File, url?: string) => {
    // Clean up previous object URL if it exists
    if (thumbnailObjectUrlRef.current) {
      URL.revokeObjectURL(thumbnailObjectUrlRef.current);
      thumbnailObjectUrlRef.current = null;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      thumbnailObjectUrlRef.current = objectUrl;
      setThumbnailUrl(objectUrl);
      setThumbnailFile(file);
      setIsThumbnailRemoved(false);
    } else if (url) {
      // When setting a URL, make sure it's not longer than 512 chars
      if (url.length > 512) {
        toast({
          title: "URL too long",
          description:
            "The image URL exceeds the maximum allowed length of 512 characters",
          variant: "destructive",
        });
        return;
      }
      setThumbnailUrl(url);
      setThumbnailFile(undefined);
      setIsThumbnailRemoved(false);
    } else {
      setThumbnailUrl("");
      setThumbnailFile(undefined);

      // If editing and thumbnail is removed, mark it
      if (isEditing && initialData?.thumbnail) {
        setIsThumbnailRemoved(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[#A28B55]">
          {isEditing ? "Edit Portfolio Project" : "Add New Portfolio Project"}
        </h2>
        <Separator className="mb-6" />

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-900/50 text-red-400 p-4 rounded-md flex items-start gap-3 mb-6">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Basic Project Information */}
        <ProjectDetailsSection
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
        />

        <Separator className="my-6" />

        {/* Project Details */}
        <ChallengeSection
          challenge={challenge}
          setChallenge={setChallenge}
          solution={solution}
          setSolution={setSolution}
          impact={impact}
          setImpact={setImpact}
        />

        <Separator className="my-6" />

        {/* Testimonial */}
        <TestimonialSection
          testimonialQuote={testimonialQuote}
          setTestimonialQuote={setTestimonialQuote}
          testimonialAuthor={testimonialAuthor}
          setTestimonialAuthor={setTestimonialAuthor}
          testimonialPosition={testimonialPosition}
          setTestimonialPosition={setTestimonialPosition}
        />

        <Separator className="my-6" />

        {/* Thumbnail Image */}
        <ThumbnailUploader
          thumbnailUrl={thumbnailUrl}
          thumbnailFile={thumbnailFile}
          onChange={handleThumbnailChange}
        />

        <Separator className="my-6" />

        {/* Gallery Images */}
        <ImagesSection
          files={files}
          setFiles={setFiles}
          imageUrls={galleryUrls}
          setImageUrls={setGalleryUrls}
          newImageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          handleAddImageUrl={handleAddImageUrl}
          onRemoveImageUrl={handleRemoveGalleryUrl}
        />

        {/* Upload Progress Indicator */}
        {uploadStatus.uploading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-400">
                Uploading files...
              </span>
              <span className="text-sm text-neutral-400">
                {uploadStatus.progress}%
              </span>
            </div>
            <Progress value={uploadStatus.progress} className="h-2" />
          </div>
        )}

        <Separator className="my-6" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
            disabled={isSubmitting || uploadStatus.uploading}
            className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || uploadStatus.uploading}
            className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
          >
            {isSubmitting || uploadStatus.uploading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Check size={16} className="mr-2" /> Save Project
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

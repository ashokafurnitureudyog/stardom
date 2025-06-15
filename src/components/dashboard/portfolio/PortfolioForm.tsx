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

      // Validate thumbnail
      if (!thumbnailFile && !thumbnailUrl) {
        throw new Error("A thumbnail image is required");
      }

      // Validate thumbnail URL length if it's from an external URL
      if (!thumbnailFile && thumbnailUrl && thumbnailUrl.length > 512) {
        throw new Error("Thumbnail URL is too long (maximum 512 characters)");
      }

      // Create FormData object
      const formData = new FormData();

      // Basic project details
      formData.append("title", title);
      formData.append("description", description);
      formData.append("challenge", challenge);
      formData.append("solution", solution);
      formData.append("impact", impact);
      formData.append("tags", JSON.stringify(tags));

      // Thumbnail handling - Don't add to formData if it's a blob URL
      // The backend will handle the thumbnailFile separately
      if (thumbnailUrl && !thumbnailUrl.startsWith("blob:")) {
        formData.append("thumbnail", thumbnailUrl.substring(0, 512)); // Ensure within 512 char limit
      } else {
        // If no external URL, send an empty string - the backend will replace with the uploaded file's URL
        formData.append("thumbnail", "");
      }

      // Gallery URLs - Filter out any blob URLs
      const validGalleryUrls = galleryUrls
        .filter((url) => !url.startsWith("blob:"))
        .map((url) => url.substring(0, 512)); // Ensure within 512 char limit
      formData.append("gallery", JSON.stringify(validGalleryUrls));

      // Testimonial - use flat structure for Appwrite
      formData.append("testimonial_quote", testimonialQuote);
      formData.append("testimonial_author", testimonialAuthor);
      formData.append("testimonial_position", testimonialPosition);

      // If editing, include project ID
      if (isEditing && initialData) {
        formData.append("id", initialData.id || initialData.$id || "");
      }

      // Add files
      files.forEach((file) => formData.append("files", file));

      // Handle thumbnail file separately
      if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      }

      // Send request
      const response = await fetch("/api/protected/portfolio", {
        method: "POST",
        body: formData,
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
    } else {
      setThumbnailUrl("");
      setThumbnailFile(undefined);
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
        />

        <Separator className="my-6" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
            disabled={isSubmitting}
            className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
          >
            {isSubmitting ? (
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

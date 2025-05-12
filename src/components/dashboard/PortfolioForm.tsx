/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ImagesSection } from "./form-sections/images-section";
import { X, AlertCircle, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link, ImagePlus } from "lucide-react";
import Image from "next/image";
interface PortfolioFormProps {
  onSuccess: () => void;
  initialData?: any;
  isEditing?: boolean;
}

export const PortfolioForm = ({
  onSuccess,
  initialData,
  isEditing = false,
}: PortfolioFormProps) => {
  // Project details
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [impact, setImpact] = useState(initialData?.impact || "");
  // Add this with your other state variables
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>(
    undefined,
  );

  // Tags
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

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

  // Tag management
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

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
      if (!title || !description || !thumbnailUrl) {
        throw new Error("Title, description and thumbnail image are required");
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

      // Thumbnail and gallery
      formData.append("thumbnail", thumbnailUrl);
      formData.append("gallery", JSON.stringify(galleryUrls));

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
      if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      }
      // Send request
      const response = await fetch("/api/protected/portfolio", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to save portfolio project");
      }

      onSuccess();
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to save portfolio project");
    } finally {
      setIsSubmitting(false);
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
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-neutral-400">
              Project Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Modern Office Renovation for TechCorp"
              required
              className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-neutral-400">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the project (100-150 words recommended)"
              className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-neutral-400">
              Tags
            </Label>
            <div className="flex items-center gap-2 mb-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags (e.g. Residential, Interior, Office Space etc.)"
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
              <Button
                type="button"
                onClick={addTag}
                className="shrink-0 whitespace-nowrap bg-[#A28B55] text-neutral-900 hover:bg-[#A28B55]/80 transition-all duration-300"
              >
                Add Tag
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-neutral-800 hover:bg-neutral-800 text-[#A28B55] gap-1.5"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#A28B55]">
            Project Details
          </h3>

          <div>
            <Label htmlFor="challenge" className="text-neutral-400">
              Challenge
            </Label>
            <Textarea
              id="challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="Describe the specific challenges faced (space constraints, timeline, budget, etc."
              className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>

          <div>
            <Label htmlFor="solution" className="text-neutral-400">
              Solution
            </Label>
            <Textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="How did you address the challenges?"
              className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>

          <div>
            <Label htmlFor="impact" className="text-neutral-400">
              Impact
            </Label>
            <Textarea
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="Describe measurable outcomes (e.g., 30% more efficient space usage, increased foot traffic)?"
              className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Testimonial */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#A28B55]">
            Client Testimonial
          </h3>

          <div>
            <Label htmlFor="testimonial_quote" className="text-neutral-400">
              Quote
            </Label>
            <Textarea
              id="testimonial_quote"
              value={testimonialQuote}
              onChange={(e) => setTestimonialQuote(e.target.value)}
              placeholder="What did the client say about this project?"
              className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="testimonial_author" className="text-neutral-400">
                Author Name
              </Label>
              <Input
                id="testimonial_author"
                value={testimonialAuthor}
                onChange={(e) => setTestimonialAuthor(e.target.value)}
                placeholder="E.g., John Smith"
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
            <div>
              <Label
                htmlFor="testimonial_position"
                className="text-neutral-400"
              >
                Position/Title
              </Label>
              <Input
                id="testimonial_position"
                value={testimonialPosition}
                onChange={(e) => setTestimonialPosition(e.target.value)}
                placeholder="E.g., CEO, TechCorp Inc."
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Thumbnail Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#A28B55]">
            Thumbnail Image
          </h3>

          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
              <TabsTrigger
                value="upload"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
              >
                <Upload size={16} /> Upload Image
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
              >
                <Link size={16} /> Image URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-[#3C3120]/50 rounded-lg p-6 text-center hover:border-[#A28B55]/70 transition-colors">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      // Store the file for upload
                      setThumbnailFile(e.target.files[0]);
                      // Create a preview URL
                      setThumbnailUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <ImagePlus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-base font-medium">
                    Click to upload thumbnail
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                    Support for JPG, PNG, WEBP or GIF (Max 10MB)
                  </p>
                </label>
              </div>

              {thumbnailFile && (
                <div className="mt-6">
                  <div className="aspect-square w-40 mx-auto relative">
                    <Image
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 shadow-md"
                      onClick={() => {
                        setThumbnailFile(undefined);
                        setThumbnailUrl("");
                      }}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Enter URL for main project image"
                />
              </div>

              {thumbnailUrl && !thumbnailFile && (
                <div className="mt-4 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
                  <div className="relative aspect-square w-40 h-40 rounded-md overflow-hidden mx-auto">
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://via.placeholder.com/150?text=Error";
                      }}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

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

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Loader2, Check, Plus, Trash2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const EditSocialLinksDialog = ({
  initialData,
  onSuccess,
}: {
  initialData: Array<{ platform: string; url: string; id?: string }>;
  onSuccess: () => void;
  triggerClass?: string;
  triggerContent?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [links, setLinks] = useState<
    Array<{ platform: string; url: string; id?: string }>
  >(initialData.length > 0 ? initialData : [{ platform: "", url: "" }]);
  const { toast } = useToast();

  const PLATFORM_OPTIONS = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "x", label: "X" },
    { value: "youtube", label: "YouTube" },
  ];

  const handleAddLink = () => {
    setLinks([...links, { platform: "", url: "" }]);
    setValidationError(""); // Clear error when adding new link
  };

  const handleRemoveLink = (index: number) => {
    if (links.length <= 1) return;
    setLinks(links.filter((_, i) => i !== index));
    setValidationError(""); // Clear error when removing link
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    setLinks(updatedLinks);
    setValidationError(""); // Clear error when making changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    const hasEmptyFields = links.some((link) => !link.platform || !link.url);

    if (hasEmptyFields) {
      setValidationError("Please fill in all fields to submit the form");
      return;
    }

    setValidationError(""); // Clear validation error
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("section", "social");
      submitFormData.append("data", JSON.stringify(links));

      const response = await fetch("/api/protected/company-info", {
        method: "POST",
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update social links");
      }

      toast({
        title: "Success",
        description: "Social links updated successfully",
        duration: 3000,
      });

      onSuccess();
      setOpen(false);
    } catch (error: unknown) {
      console.error("Failed to update social links:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update social links",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#3C3120] text-[#A28B55] hover:bg-[#3C3120]/80 border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
        >
          <Edit size={16} /> Edit Links
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#A28B55] mb-2">
              Edit Social Media Links
            </h2>
            <p className="text-neutral-400">
              Update your company&apos;s social media profiles
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="border border-[#3C3120]/50 rounded-lg p-4 bg-black/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-[#A28B55]">
                      Link {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLink(index)}
                      className="text-[#A28B55] hover:text-[#A28B55] transform hover:scale-110 hover:bg-transparent"
                      style={{ background: "transparent" }}
                      disabled={links.length <= 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`platform-${index}`}
                        className="text-neutral-400"
                      >
                        Platform
                      </Label>
                      <Select
                        value={link.platform || ""}
                        onValueChange={(value) =>
                          handleLinkChange(index, "platform", value)
                        }
                      >
                        <SelectTrigger
                          id={`platform-${index}`}
                          className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                        >
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-[#3C3120]">
                          {PLATFORM_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-neutral-800 focus:text-white"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`url-${index}`}
                        className="text-neutral-400"
                      >
                        URL
                      </Label>
                      <Input
                        id={`url-${index}`}
                        value={link.url || ""}
                        onChange={(e) =>
                          handleLinkChange(index, "url", e.target.value)
                        }
                        placeholder="https://example.com/profile"
                        className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddLink}
                className="w-full bg-transparent border-dashed border-[#3C3120] text-[#A28B55] hover:bg-neutral-900 hover:border-[#A28B55]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </div>
          </div>

          {validationError && (
            <div className="bg-red-500/10 border border-red-900/50 text-red-400 p-3 rounded-md text-center">
              <AlertCircle className="h-4 w-4 inline-block mr-2" />
              {validationError}
            </div>
          )}

          <Separator className="bg-gradient-to-r from-transparent via-[#3C3120] to-transparent" />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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
                  <Check size={16} className="mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

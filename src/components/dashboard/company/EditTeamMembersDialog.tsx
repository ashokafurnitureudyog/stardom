/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Edit,
  Loader2,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Link as LinkIcon,
  UploadCloud,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/types/ComponentTypes";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/utils";

export const EditTeamMembersDialog = ({
  initialData,
  onSuccess,
  triggerClass,
  triggerContent,
}: {
  initialData: TeamMember[];
  onSuccess: () => void;
  triggerClass?: string;
  triggerContent?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<Record<number, boolean>>({});
  const [validationError, setValidationError] = useState("");
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [members, setMembers] = useState<TeamMember[]>(
    initialData.length > 0
      ? initialData
      : [{ name: "", role: "", bio: "", image: "" }],
  );
  const [imageTab, setImageTab] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleAddMember = () => {
    setMembers([...members, { name: "", role: "", bio: "", image: "" }]);
    // Clear validation error when adding a new member
    setValidationError("");
  };

  const handleRemoveMember = (index: number) => {
    if (members.length === 1) return;
    setMembers(members.filter((_, i) => i !== index));
    // Clear validation error when removing a member
    setValidationError("");
  };

  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
    // Clear validation error when making changes
    setValidationError("");
  };

  const handleImageTabChange = (index: number, value: string) => {
    setImageTab({ ...imageTab, [index]: value });
  };

  const handleFileUpload = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading({ ...uploading, [index]: true });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("section", "image-upload");

      const response = await fetch("/api/protected/company-info", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image");
      }

      const data = await response.json();
      handleMemberChange(index, "image", data.url);

      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload image",
        duration: 3000,
      });
    } finally {
      setUploading({ ...uploading, [index]: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields and invalid image URLs
    const hasInvalidData = members.some(
      (member) =>
        !member.name.trim() ||
        !member.role.trim() ||
        !member.bio.trim() ||
        !member.image ||
        (member.image &&
          !member.image.startsWith("http://") &&
          !member.image.startsWith("https://")),
    );

    if (hasInvalidData) {
      setValidationError("Please fill in all fields to submit the form");
      return;
    }

    // Clear validation error
    setValidationError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("section", "team");
      formData.append("data", JSON.stringify(members));

      const response = await fetch("/api/protected/company-info", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update team members");
      }

      toast({
        title: "Success",
        description: "Team members updated successfully",
        duration: 3000,
      });

      onSuccess();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update team members",
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
          <Edit size={16} /> Edit Team
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#A28B55] mb-2">
              Edit Team Members
            </h2>
            <p className="text-neutral-400">
              Update your company&apos;s team members
            </p>
          </div>

          <div className="space-y-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="border border-[#3C3120] rounded-lg p-4 space-y-4 bg-black/30"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[#A28B55]">
                    Team Member {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(index)}
                    disabled={members.length <= 1}
                    className="text-[#A28B55] hover:text-[#A28B55] transform hover:scale-110 hover:bg-transparent"
                    style={{ background: "transparent" }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`name-${index}`}
                      className="text-neutral-400"
                    >
                      Name
                    </Label>
                    <Input
                      id={`name-${index}`}
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      placeholder="Team member name"
                      className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`role-${index}`}
                      className="text-neutral-400"
                    >
                      Role / Position
                    </Label>
                    <Input
                      id={`role-${index}`}
                      value={member.role}
                      onChange={(e) =>
                        handleMemberChange(index, "role", e.target.value)
                      }
                      placeholder="Job title or role"
                      className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`bio-${index}`} className="text-neutral-400">
                    Bio
                  </Label>
                  <Textarea
                    id={`bio-${index}`}
                    value={member.bio}
                    onChange={(e) =>
                      handleMemberChange(index, "bio", e.target.value)
                    }
                    placeholder="Brief professional biography"
                    rows={3}
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] resize-none text-white"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-neutral-400">Profile Image</Label>

                  <Tabs
                    defaultValue="url"
                    value={imageTab[index] || "url"}
                    onValueChange={(value) =>
                      handleImageTabChange(index, value)
                    }
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
                      <TabsTrigger
                        value="upload"
                        className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1"
                      >
                        Upload
                      </TabsTrigger>
                      <TabsTrigger
                        value="url"
                        className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1"
                      >
                        URL
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload">
                      <div className="border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Label
                            htmlFor={`file-upload-${index}`}
                            className={cn(
                              "w-full h-24 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-[#3C3120] cursor-pointer hover:border-[#A28B55]",
                              uploading[index] &&
                                "opacity-50 pointer-events-none",
                            )}
                          >
                            {uploading[index] ? (
                              <>
                                <Loader2 className="h-6 w-6 text-[#A28B55] animate-spin mb-1" />
                                <p className="text-sm text-neutral-400">
                                  Uploading...
                                </p>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="h-6 w-6 text-[#A28B55] mb-1" />
                                <p className="text-sm text-neutral-400">
                                  Click to upload image
                                </p>
                                <p className="text-xs text-neutral-500 mt-1">
                                  PNG, JPG, WebP up to 2MB
                                </p>
                              </>
                            )}
                          </Label>

                          <input
                            id={`file-upload-${index}`}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={(e) => handleFileUpload(index, e)}
                            disabled={uploading[index]}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="url">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <LinkIcon size={14} className="text-neutral-400" />
                          <Label
                            htmlFor={`imageUrl-${index}`}
                            className="text-neutral-400"
                          >
                            Image URL
                          </Label>
                        </div>
                        <Input
                          id={`imageUrl-${index}`}
                          value={member.image}
                          onChange={(e) =>
                            handleMemberChange(index, "image", e.target.value)
                          }
                          placeholder="https://example.com/image.jpg"
                          className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Replace the existing member.image preview section */}
                  {member.image && (
                    <div className="mt-4 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
                      <div className="relative aspect-square w-16 h-16 rounded-full overflow-hidden mx-auto">
                        <img
                          src={member.image}
                          alt={member.name || "Team member"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://avatar.iran.liara.run/public/${(member.name?.length % 100 || index % 100) + 1}`;

                            // Set this member's image error state
                            const updatedErrors = { ...imgErrors };
                            updatedErrors[index] = true;
                            setImgErrors(updatedErrors);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddMember}
              className="w-full border-dashed border-[#3C3120] text-[#A28B55] hover:bg-neutral-900/50 hover:border-[#A28B55]"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Team Member
            </Button>
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

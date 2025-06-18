"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagsInput } from "./TagsInput";

interface ProjectDetailsSectionProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const ProjectDetailsSection = ({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
}: ProjectDetailsSectionProps) => {
  return (
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

      <TagsInput tags={tags} setTags={setTags} />
    </div>
  );
};

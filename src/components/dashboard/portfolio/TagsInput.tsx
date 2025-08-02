"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagsInput = ({ tags, setTags }: TagsInputProps) => {
  const [tagInput, setTagInput] = useState("");

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

  return (
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
  );
};

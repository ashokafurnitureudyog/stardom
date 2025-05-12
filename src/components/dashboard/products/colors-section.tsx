import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface ColorsSectionProps {
  colors: string[];
  setColors: (colors: string[]) => void;
}

export function ColorsSection({ colors, setColors }: ColorsSectionProps) {
  const [currentColor, setCurrentColor] = useState("");

  const handleAddColor = () => {
    if (currentColor.trim() && !colors.includes(currentColor.trim())) {
      setColors([...colors, currentColor.trim()]);
      setCurrentColor("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Colors</h3>
      <div className="flex gap-2">
        <Input
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          placeholder="Add color (e.g., Red, Blue, #FF5733)"
          className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddColor();
            }
          }}
        />
        <Button
          type="button"
          onClick={handleAddColor}
          className="shrink-0"
          size="icon"
        >
          <Plus size={16} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 min-h-[40px]">
        {colors.map((color, index) => (
          <Badge key={index} className="py-1.5" variant="secondary">
            {color}
            <button
              type="button"
              onClick={() => setColors(colors.filter((_, i) => i !== index))}
              className="ml-2 hover:bg-primary-foreground rounded-full"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        {colors.length === 0 && (
          <p className="text-sm text-muted-foreground">No colors added yet</p>
        )}
      </div>
    </div>
  );
}

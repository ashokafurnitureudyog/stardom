import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface FeaturesSectionProps {
  features: string[];
  setFeatures: (features: string[]) => void;
}

export function FeaturesSection({
  features,
  setFeatures,
}: FeaturesSectionProps) {
  const [currentFeature, setCurrentFeature] = useState("");

  const handleAddFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature.trim())) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Features</h3>
      <div className="flex gap-2">
        <Input
          value={currentFeature}
          onChange={(e) => setCurrentFeature(e.target.value)}
          placeholder="Add feature"
          className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddFeature();
            }
          }}
        />
        <Button
          type="button"
          onClick={handleAddFeature}
          className="shrink-0"
          size="icon"
        >
          <Plus size={16} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 min-h-[40px]">
        {features.map((feature, index) => (
          <Badge key={index} className="py-1.5">
            {feature}
            <button
              type="button"
              onClick={() =>
                setFeatures(features.filter((_, i) => i !== index))
              }
              className="ml-2 hover:bg-primary-foreground rounded-full"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        {features.length === 0 && (
          <p className="text-sm text-muted-foreground">No features added yet</p>
        )}
      </div>
    </div>
  );
}

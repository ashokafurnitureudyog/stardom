"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HeroMediaForm } from "./HeroMediaForm";
import { PlusCircle } from "lucide-react";

export const AddHeroMediaDialog = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default" className="flex items-center gap-2 h-10">
          <PlusCircle size={16} /> Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
        <HeroMediaForm
          onSuccess={() => {
            onSuccess();
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

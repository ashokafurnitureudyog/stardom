"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TestimonialSectionProps {
  testimonialQuote: string;
  setTestimonialQuote: (value: string) => void;
  testimonialAuthor: string;
  setTestimonialAuthor: (value: string) => void;
  testimonialPosition: string;
  setTestimonialPosition: (value: string) => void;
}

export const TestimonialSection = ({
  testimonialQuote,
  setTestimonialQuote,
  testimonialAuthor,
  setTestimonialAuthor,
  testimonialPosition,
  setTestimonialPosition,
}: TestimonialSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#A28B55]">Client Testimonial</h3>

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
          <Label htmlFor="testimonial_position" className="text-neutral-400">
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
  );
};

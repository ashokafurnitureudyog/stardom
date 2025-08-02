/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { PortfolioProjectType } from "./portfolio/types";

interface PortfolioProjectDetailsProps {
  project: PortfolioProjectType;
}

export function PortfolioProjectDetails({
  project,
}: PortfolioProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [project.thumbnail, ...(project.gallery || [])].filter(
    Boolean,
  );
  const totalImages = allImages.length;

  // Navigate to previous image
  const prevImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  // Navigate to next image
  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full overflow-auto md:overflow-hidden bg-neutral-900">
      {/* Image section with strict height constraints */}
      <div className="w-full h-[45vh] md:h-full flex-shrink-0 border-b md:border-b-0 md:border-r border-[#3C3120] relative">
        {/* Image container with adjusted height to account for nav */}
        <div className="absolute inset-0 bottom-14 p-4 flex items-center justify-center bg-black/30 overflow-hidden">
          <div className="w-[90%] h-[90%] relative rounded-md overflow-hidden">
            {allImages && allImages.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                <span className="text-neutral-600">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation section fixed at bottom */}
        {totalImages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/40 border-t border-[#3C3120] flex items-center justify-center px-6">
            <div className="flex items-center justify-between w-full max-w-xs">
              {/* Left arrow */}
              <button
                onClick={prevImage}
                className="w-9 h-9 rounded-full bg-black/50 border border-[#3C3120] flex items-center justify-center hover:bg-black/70 hover:border-[#A28B55] transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-[#A28B55]" />
              </button>

              {/* Center section with counter and dots */}
              <div className="flex flex-col items-center space-y-1.5">
                {/* Image counter */}
                <span className="text-sm text-[#A28B55] font-medium">
                  {currentImageIndex + 1}/{totalImages}
                </span>

                {/* Dot indicators */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalImages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "w-5 h-2.5 bg-[#A28B55]"
                          : "w-2.5 h-2.5 bg-neutral-600 hover:bg-neutral-400"
                      } rounded-full`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={nextImage}
                className="w-9 h-9 rounded-full bg-black/50 border border-[#3C3120] flex items-center justify-center hover:bg-black/70 hover:border-[#A28B55] transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-[#A28B55]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project details section */}
      <div className="w-full md:h-full md:overflow-auto">
        {/* Use ScrollArea only on desktop */}
        <div className="block md:hidden p-6 space-y-6">
          {/* Mobile: Regular div content */}
          <ProjectContent project={project} />
        </div>

        <div className="hidden md:block h-full">
          <ScrollArea className="h-full pr-4">
            <div className="p-6 space-y-6">
              {/* Desktop: ScrollArea content */}
              <ProjectContent project={project} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

// Helper component to avoid duplicating code
function ProjectContent({ project }: { project: PortfolioProjectType }) {
  return (
    <>
      {/* Project Title and Tags */}
      <div>
        <h2 className="text-2xl font-semibold text-[#A28B55] pr-2">
          {project.title}
        </h2>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm bg-neutral-800 text-[#A28B55] border-[#3C3120] hover:border-[#A28B55]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-[#A28B55]">Description</h3>
        <p className="text-neutral-400">{project.description}</p>
      </div>

      {/* Challenge */}
      {project.challenge && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#A28B55]">
              Challenge
            </h3>
            <p className="text-neutral-400">{project.challenge}</p>
          </div>
        </>
      )}

      {/* Solution */}
      {project.solution && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#A28B55]">
              Solution
            </h3>
            <p className="text-neutral-400">{project.solution}</p>
          </div>
        </>
      )}

      {/* Impact */}
      {project.impact && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#A28B55]">Impact</h3>
            <p className="text-neutral-400">{project.impact}</p>
          </div>
        </>
      )}

      {/* Testimonial */}
      {project.testimonial && project.testimonial.quote && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-[#A28B55] flex items-center gap-2">
              <MessageSquare size={18} /> Client Testimonial
            </h3>
            <div className="bg-neutral-900/70 border border-[#3C3120] rounded-md p-4">
              <Quote className="h-5 w-5 text-[#A28B55] mb-2" />
              <p className="text-neutral-300 italic mb-3">
                {project.testimonial.quote}
              </p>
              {project.testimonial.author && (
                <div className="text-right">
                  <p className="text-sm font-medium text-[#A28B55]">
                    {project.testimonial.author}
                  </p>
                  {project.testimonial.position && (
                    <p className="text-xs text-neutral-500">
                      {project.testimonial.position}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>

      {/* Project ID */}
      <div className="text-sm text-neutral-500">
        <p>ID: {project.id || project.$id}</p>
        {project.$createdAt && (
          <p>Added: {new Date(project.$createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </>
  );
}

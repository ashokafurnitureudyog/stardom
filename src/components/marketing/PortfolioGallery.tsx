"use client";

import { useState } from "react";
import type { PortfolioProject } from "@/types/ComponentTypes";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectGrid } from "./ProjectGrid";

/**
 * The project grid plus its details dialog. Only the selection is client state;
 * the projects themselves are rendered from server data.
 */
export const PortfolioGallery = ({ projects }: { projects: PortfolioProject[] }) => {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  return (
    <>
      <ProjectGrid projects={projects} onProjectSelect={setSelected} />
      <ProjectDetails
        project={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

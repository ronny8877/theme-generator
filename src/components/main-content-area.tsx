"use client";
import React from "react";
import TemplatePreview from "@/components/template-preview";
import ComponentsGallery from "@/components/components-gallery";
import { useStore } from "@nanostores/react";
import { $activeToolSel } from "@/store/nano-store";

interface MainContentAreaProps {
  className?: string;
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  className = "",
}) => {
  const activeTool = useStore($activeToolSel);

  // Replace template preview when "Components" tool is active
  const isComponents = activeTool === "app";

  return (
    <div className={className}>
      {isComponents ? (
        <TemplatePreview component={ComponentsGallery} />
      ) : (
        <TemplatePreview />
      )}
    </div>
  );
};

export default MainContentArea;

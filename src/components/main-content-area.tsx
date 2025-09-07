"use client";
import React from "react";
import TemplatePreview from "@/components/template-preview";

interface MainContentAreaProps {
  className?: string;
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  className = "",
}) => {
  // Always show template preview - tools will be floating panels
  return (
    <div className={className}>
      <TemplatePreview />
    </div>
  );
};

export default MainContentArea;

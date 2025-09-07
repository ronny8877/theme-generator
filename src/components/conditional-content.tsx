"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $activeToolSel } from "@/store/nano-store";
import TemplateSelector from "@/components/template-selector";
import GradientTool from "@/components/gradient-tool";
import TypographyTool from "@/components/typography-tool";

interface ConditionalContentProps {
  className?: string;
  isFullScreen?: boolean; // New prop to determine if it's replacing template preview
}

export const ConditionalContent: React.FC<ConditionalContentProps> = ({
  className = "",
  isFullScreen = false,
}) => {
  const activeTool = useStore($activeToolSel);

  // Full-screen tools (replace template preview)
  if (isFullScreen) {
    switch (activeTool) {
      case "gradient":
        return <GradientTool className={className} />;
      case "typography":
        return <TypographyTool className={className} />;
      default:
        return null; // Don't show anything for other tools in full-screen mode
    }
  }

  // Floating/sidebar tools (original behavior)
  // Show template selector for web tool only
  if (activeTool === "website") {
    return <TemplateSelector />;
  }

  // For other tools (app, poster, randomize), don't show template selector
  return null;
};

export default ConditionalContent;

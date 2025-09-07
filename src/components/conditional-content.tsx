"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $activePrimaryToolSel } from "@/store/nano-store";
import TemplateSelector from "@/components/template-selector";

interface ConditionalContentProps {
  className?: string;
}

export const ConditionalContent: React.FC<ConditionalContentProps> = () => {
  const activeTool = useStore($activePrimaryToolSel);

  // No full-screen aux tools; they float instead

  // Floating/sidebar tools (original behavior)
  // Show template selector for web tool only
  if (activeTool === "website") {
    return <TemplateSelector />;
  }

  // For other tools (app, poster, randomize), don't show template selector
  return null;
};

export default ConditionalContent;

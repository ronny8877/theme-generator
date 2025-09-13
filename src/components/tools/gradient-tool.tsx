"use client";

import React from "react";
import { EnhancedGradientTool } from "../enhanced-gradient-tool";

interface GradientToolProps {
  className?: string;
}

export function GradientTool({ className = "" }: GradientToolProps) {
  return <EnhancedGradientTool className={className} />;
}

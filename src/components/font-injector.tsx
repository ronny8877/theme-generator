"use client";

import { useStore } from "@nanostores/react";
import { $fontCSSVariables } from "@/store/font-store";
import { useEffect } from "react";

/**
 * FontInjector component that applies font CSS variables to the document
 * This ensures that all templates automatically use the selected fonts
 */
export const FontInjector = () => {
  const fontCSSVariables = useStore($fontCSSVariables);

  useEffect(() => {
    const root = document.documentElement;

    // Apply all font CSS variables to the root element
    Object.entries(fontCSSVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    return () => {
      // Cleanup function to remove font variables if component unmounts
      Object.keys(fontCSSVariables).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [fontCSSVariables]);

  return null; // This component doesn't render anything visible
};

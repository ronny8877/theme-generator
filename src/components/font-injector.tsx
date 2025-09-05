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
    const templateRoot = document.querySelector<HTMLElement>("#template-root");

    const apply = (el: HTMLElement) => {
      Object.entries(fontCSSVariables).forEach(([property, value]) => {
        el.style.setProperty(property, String(value));
      });
    };
    const cleanup = (el: HTMLElement) => {
      Object.keys(fontCSSVariables).forEach((property) => {
        el.style.removeProperty(property);
      });
    };

    apply(root);
    if (templateRoot) apply(templateRoot);

    return () => {
      cleanup(root);
      if (templateRoot) cleanup(templateRoot);
    };
  }, [fontCSSVariables]);

  return null; // This component doesn't render anything visible
};

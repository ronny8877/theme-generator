"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import {
  $isAutoThemeEnabled,
  applyScrollBasedTheme,
} from "@/store/homepage-store";

interface ScrollThemeWrapperProps {
  children: React.ReactNode;
}

export function ScrollThemeWrapper({ children }: ScrollThemeWrapperProps) {
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isAutoThemeEnabled) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Find all main sections
    const sections = Array.from(
      document.querySelectorAll("main > section, main > div")
    ) as HTMLElement[];
    sectionsRef.current = sections;

    if (sections.length === 0) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionIndex = sectionsRef.current.indexOf(
              entry.target as HTMLElement
            );
            if (sectionIndex !== -1) {
              applyScrollBasedTheme(sectionIndex);
            }
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [isAutoThemeEnabled]);

  return <>{children}</>;
}

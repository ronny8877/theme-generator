"use client";
import React from "react";
import DaisyThemeSelect from "@/components/landing/DaisyThemeSelect";
import { useAppActions } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $currentTheme } from "@/store";

/**
 * Inline theme selector for the navbar. Changes the app theme (document data-theme)
 * and persists it in localStorage. Templates are not affected by this directly.
 */
const NavThemeSelect: React.FC<{ className?: string }> = ({ className }) => {
  const current = useStore($currentTheme);
  const { setTheme } = useAppActions();
  // Map legacy values to new defaults on first render
  const effectiveCurrent =
    current === "light" ? "autumn" : current === "dark" ? "business" : current;

  function onSelect(theme: string) {
    // normalize legacy choices if any custom callers pass them
    const normalized =
      theme === "light" ? "autumn" : theme === "dark" ? "business" : theme;
    setTheme(normalized);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", normalized);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", normalized);
    }
  }

  return (
    <DaisyThemeSelect
      className={className}
      value={effectiveCurrent}
      onSelect={onSelect}
      size="sm"
      label="Theme"
    />
  );
};

export default NavThemeSelect;

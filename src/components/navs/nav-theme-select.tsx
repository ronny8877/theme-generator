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

  function onSelect(theme: string) {
    setTheme(theme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }

  return (
    <DaisyThemeSelect
      className={className}
      value={current}
      onSelect={onSelect}
      size="sm"
      label="Theme"
    />
  );
};

export default NavThemeSelect;

"use client";

import { Label } from "@/components/ui/label";
import { useStore } from "@nanostores/react";
import { $isAutoThemeEnabled, toggleAutoTheme } from "@/store/homepage-store";

export function AutoThemeToggle() {
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="auto-theme"
        checked={isAutoThemeEnabled}
        onChange={toggleAutoTheme}
        className="toggle toggle-primary"
      />
      <Label htmlFor="auto-theme" className="text-sm font-medium text-gray-700">
        Auto Theme
      </Label>
    </div>
  );
}

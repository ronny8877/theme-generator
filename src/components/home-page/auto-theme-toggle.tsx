"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useStore } from "@nanostores/react";
import { $isAutoThemeEnabled, toggleAutoTheme } from "@/store/homepage-store";

export function AutoThemeToggle() {
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="auto-theme"
        checked={isAutoThemeEnabled}
        onCheckedChange={toggleAutoTheme}
      />
      <Label htmlFor="auto-theme" className="text-sm">
        Auto Theme
      </Label>
    </div>
  );
}

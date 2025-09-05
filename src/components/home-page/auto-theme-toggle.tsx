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
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 border border-gray-400"
        style={{
          backgroundColor: isAutoThemeEnabled ? '#2563eb' : '#d1d5db',
          borderColor: '#9ca3af',
        }}
      />
      <Label htmlFor="auto-theme" className="text-sm font-medium text-gray-700">
        Auto Theme
      </Label>
    </div>
  );
}

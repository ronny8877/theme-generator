"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@nanostores/react";
import {
  $currentTheme,
  $isAutoThemeEnabled,
  $availableHomepageThemes,
  setHomepageTheme,
  type DaisyUITheme,
} from "@/store/homepage-store";

export function ThemeSelector() {
  const currentTheme = useStore($currentTheme);
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);
  const availableThemes = useStore($availableHomepageThemes);

  return (
    <Select
      value={currentTheme}
      onValueChange={(value) => setHomepageTheme(value as DaisyUITheme)}
      disabled={isAutoThemeEnabled}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {availableThemes.map((themeName) => (
          <SelectItem key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

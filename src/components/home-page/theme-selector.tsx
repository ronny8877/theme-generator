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
  setHomepageTheme,
  getLimitedScrollThemes,
  type DaisyUITheme,
} from "@/store/homepage-store";

interface ThemeSelectorProps {
  limit?: number;
}

export function ThemeSelector({ limit = 6 }: ThemeSelectorProps = {}) {
  const currentTheme = useStore($currentTheme);
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);

  // Get limited themes using the exported function with customizable limit
  const displayThemes = getLimitedScrollThemes(limit);

  return (
    <Select
      value={currentTheme}
      onValueChange={(value) => setHomepageTheme(value as DaisyUITheme)}
      disabled={isAutoThemeEnabled}
    >
      <SelectTrigger className="w-[140px] bg-white dark:bg-white text-gray-900 border-gray-300 hover:border-gray-400">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent className="z-[9999] bg-white dark:bg-white border border-gray-200 shadow-lg min-w-[140px]">
        {displayThemes.map((themeName) => (
          <SelectItem
            key={themeName}
            value={themeName}
            className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
          >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

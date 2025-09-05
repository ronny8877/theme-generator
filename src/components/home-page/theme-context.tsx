"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { THEMES } from "@/lib/constants/theme";

export type DaisyUITheme = (typeof THEMES)[number]["name"];

interface ThemeContextType {
  currentTheme: DaisyUITheme;
  setTheme: (theme: DaisyUITheme) => void;
  isAutoThemeEnabled: boolean;
  toggleAutoTheme: () => void;
  themes: DaisyUITheme[];
  previewTheme: DaisyUITheme | null;
  setPreviewTheme: (theme: DaisyUITheme | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeVariables(themeName: DaisyUITheme) {
  console.log("[v0] Applying theme:", themeName);
  const theme = THEMES.find((t) => t.name === themeName);
  if (!theme) {
    console.log("[v0] Theme not found:", themeName);
    return;
  }

  const root = document.documentElement;
  console.log("[v0] Found theme object:", theme);

  Object.entries(theme.colors).forEach(([key, value]) => {
    // Remove the --color- prefix and convert to proper DaisyUI variable names
    const cleanKey = key.replace("--color-", "");
    const cssVarName = `--${cleanKey}`;
    root.style.setProperty(cssVarName, value);
    console.log("[v0] Setting CSS var:", cssVarName, "=", value);
  });

  Object.entries(theme.radius).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });

  Object.entries(theme.misc).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value.toString());
  });

  console.log("[v0] Theme variables applied successfully");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<DaisyUITheme>("lemonade");
  const [isAutoThemeEnabled, setIsAutoThemeEnabled] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<DaisyUITheme | null>(null);

  const themes: DaisyUITheme[] = [
    "lemonade",
    "cyberpunk",
    "autumn",
    "business",
    "corporate",
    "retro",
  ];

  const setTheme = (theme: DaisyUITheme) => {
    console.log("[v0] setTheme called with:", theme);
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    applyThemeVariables(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleAutoTheme = () => {
    setIsAutoThemeEnabled(!isAutoThemeEnabled);
    localStorage.setItem("autoTheme", (!isAutoThemeEnabled).toString());
  };

  useEffect(() => {
    // Load saved theme and auto-theme preference
    const savedTheme = localStorage.getItem("theme") as DaisyUITheme;
    const savedAutoTheme = localStorage.getItem("autoTheme") === "true";

    if (savedTheme && themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      applyThemeVariables(savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "lemonade");
      applyThemeVariables("lemonade");
    }

    setIsAutoThemeEnabled(savedAutoTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        isAutoThemeEnabled,
        toggleAutoTheme,
        themes,
        previewTheme,
        setPreviewTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

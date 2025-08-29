"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useAppStore, useAppActions } from "@/store/hooks";
import { DAISY_UI_AVILABLE_THEMES } from "@/lib/constants";

// Theme display information with colors and emojis
const THEME_INFO = {
  light: {
    name: "Light",
    emoji: "☀️",
    colors: ["#ffffff", "#f3f4f6", "#3b82f6"],
  },
  dark: {
    name: "Dark",
    emoji: "🌙",
    colors: ["#1f2937", "#374151", "#60a5fa"],
  },
  cupcake: {
    name: "Cupcake",
    emoji: "🧁",
    colors: ["#faf7f5", "#e4c2a5", "#65c3c8"],
  },
  bumblebee: {
    name: "Bumblebee",
    emoji: "🐝",
    colors: ["#fffbeb", "#fbbf24", "#1f2937"],
  },
  emerald: {
    name: "Emerald",
    emoji: "💚",
    colors: ["#ecfdf5", "#10b981", "#374151"],
  },
  corporate: {
    name: "Corporate",
    emoji: "🏢",
    colors: ["#ffffff", "#3b82f6", "#1f2937"],
  },
  synthwave: {
    name: "Synthwave",
    emoji: "🌃",
    colors: ["#2d1b69", "#ff7ac6", "#bf95f9"],
  },
  retro: {
    name: "Retro",
    emoji: "📻",
    colors: ["#f9f7ed", "#e4a853", "#a4161a"],
  },
  cyberpunk: {
    name: "Cyberpunk",
    emoji: "🤖",
    colors: ["#ffee00", "#ff0080", "#00ff41"],
  },
  valentine: {
    name: "Valentine",
    emoji: "💕",
    colors: ["#f8e7e7", "#e96d7b", "#a991f7"],
  },
  halloween: {
    name: "Halloween",
    emoji: "🎃",
    colors: ["#1a1625", "#f28c18", "#6f2da8"],
  },
  garden: {
    name: "Garden",
    emoji: "🌿",
    colors: ["#e3f2fd", "#5c7f67", "#babf95"],
  },
  forest: {
    name: "Forest",
    emoji: "🌲",
    colors: ["#f4f6f5", "#1db584", "#19362d"],
  },
  aqua: {
    name: "Aqua",
    emoji: "🌊",
    colors: ["#dbeafe", "#0ea5e9", "#1e40af"],
  },
  lofi: {
    name: "Lo-Fi",
    emoji: "🎵",
    colors: ["#0f0f0f", "#262626", "#b8b8b8"],
  },
  pastel: {
    name: "Pastel",
    emoji: "🎨",
    colors: ["#f9fafb", "#fbbf24", "#fb7185"],
  },
  fantasy: {
    name: "Fantasy",
    emoji: "🧚",
    colors: ["#f8fafc", "#7c3aed", "#ec4899"],
  },
  wireframe: {
    name: "Wireframe",
    emoji: "📐",
    colors: ["#ffffff", "#000000", "#6b7280"],
  },
  black: {
    name: "Black",
    emoji: "⚫",
    colors: ["#000000", "#374151", "#ffffff"],
  },
  luxury: {
    name: "Luxury",
    emoji: "💎",
    colors: ["#09090b", "#d4af37", "#ffffff"],
  },
  dracula: {
    name: "Dracula",
    emoji: "🧛",
    colors: ["#282a36", "#bd93f9", "#ff79c6"],
  },
  cmyk: {
    name: "CMYK",
    emoji: "🖨️",
    colors: ["#ffffff", "#0ea5e9", "#ec4899"],
  },
  autumn: {
    name: "Autumn",
    emoji: "🍂",
    colors: ["#f7f3e9", "#a16207", "#dc2626"],
  },
  business: {
    name: "Business",
    emoji: "💼",
    colors: ["#ffffff", "#1e40af", "#374151"],
  },
  acid: {
    name: "Acid",
    emoji: "🧪",
    colors: ["#ff00ff", "#00ff00", "#ffff00"],
  },
  lemonade: {
    name: "Lemonade",
    emoji: "🍋",
    colors: ["#fefce8", "#eab308", "#65a30d"],
  },
  night: {
    name: "Night",
    emoji: "🌃",
    colors: ["#0f172a", "#38bdf8", "#f1f5f9"],
  },
  coffee: {
    name: "Coffee",
    emoji: "☕",
    colors: ["#1c1614", "#a78349", "#e7d2cc"],
  },
  winter: {
    name: "Winter",
    emoji: "❄️",
    colors: ["#f0f9ff", "#0284c7", "#1e40af"],
  },
} as const;

function FloatingThemeSelector() {
  const [isExpanded, setIsExpanded] = useState(false);
  const appStore = useAppStore();
  const { setTheme } = useAppActions();

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && DAISY_UI_AVILABLE_THEMES.includes(savedTheme as any)) {
        setTheme(savedTheme as (typeof DAISY_UI_AVILABLE_THEMES)[number]);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        // Set default theme
        document.documentElement.setAttribute(
          "data-theme",
          appStore.theme.current,
        );
      }
    }
  }, []);

  const handleThemeChange = (
    theme: (typeof DAISY_UI_AVILABLE_THEMES)[number],
  ) => {
    setTheme(theme);

    // Apply theme to document
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }

    setIsExpanded(false);
  };

  const currentTheme = appStore.theme.current;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Grid - Expanded State */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-80 max-h-96 bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-4 mb-2 transform transition-all duration-300 ease-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-base-content">
              Choose Theme
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto theme-scroll pr-2">
            {DAISY_UI_AVILABLE_THEMES.map((theme) => {
              const themeInfo = THEME_INFO[theme as keyof typeof THEME_INFO];
              const isActive = currentTheme === theme;

              return (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`relative p-3 rounded-xl transition-all duration-200 hover:scale-105 border ${
                    isActive
                      ? "bg-primary text-primary-content shadow-lg border-primary"
                      : "bg-base-200 hover:bg-base-300 text-base-content border-base-300 hover:border-primary/30"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xl">{themeInfo?.emoji || "🎨"}</span>
                    <span className="text-sm font-medium capitalize">
                      {themeInfo?.name || theme}
                    </span>

                    {themeInfo?.colors && (
                      <div className="flex gap-1">
                        {themeInfo.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-base-content/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`btn btn-circle w-14 h-14 shadow-xl transition-all duration-300 hover:scale-110 ${
          isExpanded ? "btn-secondary rotate-45" : "btn-primary"
        }`}
      >
        <Palette className="w-6 h-6" />
      </button>
    </div>
  );
}

export default FloatingThemeSelector;

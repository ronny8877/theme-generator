"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useAppActions } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $currentTheme } from "@/store";
import {
  DAISY_UI_AVILABLE_THEMES,
  THEME_INFO,
} from "@/lib/constants/constants";

function FloatingThemeSelector() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentTheme = useStore($currentTheme);
  const { setTheme } = useAppActions();

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") savedTheme = "autumn";
    if (savedTheme === "dark") savedTheme = "business";
    if (savedTheme && DAISY_UI_AVILABLE_THEMES.includes(savedTheme as never)) {
      setTheme(savedTheme as (typeof DAISY_UI_AVILABLE_THEMES)[number]);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // currentTheme derived from selector above

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

          <div className="grid grid-cols-2 gap-3 max-h-72  theme-scroll pr-2">
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

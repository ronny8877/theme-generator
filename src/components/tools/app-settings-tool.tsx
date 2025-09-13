"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { $currentTheme } from "@/store";
import { useAppActions } from "@/store/hooks";
import {
  DAISY_UI_AVILABLE_THEMES,
  THEME_INFO,
} from "@/lib/constants/constants";
import { Check, Palette } from "lucide-react";

export function AppSettingsTool() {
  const currentTheme = useStore($currentTheme);
  const { setTheme } = useAppActions();

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
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">App Theme</h3>
        </div>
        <p className="text-sm text-base-content/70 mb-4">
          Choose the visual theme for the application interface. This affects
          the overall look and feel of the app.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto theme-scroll pr-2">
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

      <div className="border-t border-base-300 pt-6">
        <h4 className="text-md font-semibold mb-2">About Theme Selection</h4>
        <div className="text-sm text-base-content/70 space-y-2">
          <p>
            App themes control the visual appearance of the interface elements
            like buttons, navigation, and panels. This is separate from the
            color themes you create for your designs.
          </p>
          <p>
            Your selected app theme will be saved and applied automatically when
            you return to the app.
          </p>
        </div>
      </div>
    </div>
  );
}

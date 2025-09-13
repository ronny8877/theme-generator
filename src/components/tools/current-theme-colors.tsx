"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { $themeColors } from "@/store/nano-store";
import { calculateContrast } from "@/lib/color-utils";
import { Badge } from "@/components/ui/badge";
import { Crown, Contrast, Palette, Copy } from "lucide-react";

export function CurrentThemeColors() {
  const themeColors = useStore($themeColors);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getContrastWithBackground = (color: string) => {
    return calculateContrast(
      color,
      themeColors["--color-base-100"] || "#ffffff",
    );
  };

  const getContrastWithText = (color: string) => {
    return calculateContrast(
      color,
      themeColors["--color-base-content"] || "#000000",
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Current Theme Colors</h3>
      </div>

      <div className="grid gap-3">
        {Object.entries(themeColors).map(([key, color]) => {
          const bgContrast = getContrastWithBackground(color);
          const textContrast = getContrastWithText(color);
          const colorName = key.replace("--color-", "").replace("-", " ");

          return (
            <div
              key={key}
              className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
            >
              <button
                onClick={() => copyToClipboard(color)}
                className="w-12 h-12 rounded-lg border-2 border-base-300 hover:border-primary/50 transition-all hover:scale-105 relative group"
                style={{ backgroundColor: color }}
                title={`Copy ${color}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-4 w-4 text-white drop-shadow-lg" />
                </div>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium capitalize truncate">
                    {colorName}
                  </h4>
                  <code className="text-xs bg-base-300 px-2 py-1 rounded font-mono">
                    {color}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  {bgContrast && (
                    <div className="flex items-center gap-1">
                      <Contrast className="h-3 w-3" />
                      <Badge
                        variant={
                          bgContrast.isAccessible ? "default" : "destructive"
                        }
                        className="text-xs px-1 py-0 h-5"
                      >
                        BG: {bgContrast.ratio} ({bgContrast.level})
                      </Badge>
                    </div>
                  )}

                  {textContrast && (
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={
                          textContrast.isAccessible ? "default" : "destructive"
                        }
                        className="text-xs px-1 py-0 h-5"
                      >
                        Text: {textContrast.ratio} ({textContrast.level})
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-base-200 rounded-lg border">
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Contrast Guidelines
        </h4>
        <div className="text-xs text-base-content/70 space-y-1">
          <div>
            <span className="font-semibold">AAA:</span> 7:1+ ratio - Best
            accessibility
          </div>
          <div>
            <span className="font-semibold">AA:</span> 4.5:1+ ratio - Good
            accessibility
          </div>
          <div>
            <span className="font-semibold">A:</span> 3:1+ ratio - Minimum for
            large text
          </div>
          <div>
            <span className="font-semibold">FAIL:</span> Below 3:1 - Poor
            accessibility
          </div>
        </div>
      </div>
    </div>
  );
}

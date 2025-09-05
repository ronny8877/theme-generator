"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import {
  $previewTheme,
  $isAutoThemeEnabled,
  setPreviewTheme,
  type DaisyUITheme,
} from "@/store/homepage-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { THEMES } from "@/lib//constants/theme";

export function ThemeShowcaseSection() {
  const previewTheme = useStore($previewTheme);
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);
  const [currentPreviewTheme, setCurrentPreviewTheme] = useState<DaisyUITheme>(
    previewTheme || THEMES[0].name
  );
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current && currentPreviewTheme) {
      const theme = THEMES.find((t) => t.name === currentPreviewTheme);
      if (theme) {
        const element = previewRef.current;

        Object.entries(theme.colors).forEach(([key, value]) => {
          element.style.setProperty(key, value);
        });

        // Apply radius and misc variables
        Object.entries(theme.radius).forEach(([key, value]) => {
          element.style.setProperty(key, value);
        });

        Object.entries(theme.misc).forEach(([key, value]) => {
          element.style.setProperty(key, value.toString());
        });
      }
    }
  }, [currentPreviewTheme]);

  useEffect(() => {
    if (previewTheme) {
      setCurrentPreviewTheme(previewTheme);
    }
  }, [previewTheme]);

  const themes = THEMES.map((theme) => ({
    name: theme.name,
    label: theme.name.charAt(0).toUpperCase() + theme.name.slice(1),
    description: getThemeDescription(theme.name),
    colors: getThemeColors(theme.colors),
  }));

  function getThemeDescription(themeName: string): string {
    const descriptions: Record<string, string> = {
      lemonade: "Fresh and vibrant",
      cyberpunk: "Neon futuristic",
      synthwave: "Retro 80s vibes",
      retro: "Vintage warmth",
      autumn: "Warm earth tones",
      winter: "Cool and crisp",
      acid: "Bold and electric",
      light: "Clean and minimal",
      dark: "Modern dark mode",
      cupcake: "Soft and sweet",
      bumblebee: "Bright and cheerful",
      emerald: "Nature inspired",
      corporate: "Professional look",
      valentine: "Romantic pink",
      halloween: "Spooky dark",
      garden: "Natural greens",
      forest: "Deep woodland",
      aqua: "Ocean inspired",
      lofi: "Minimalist mono",
      pastel: "Soft pastels",
      fantasy: "Magical purple",
      wireframe: "Clean lines",
      black: "Pure darkness",
      luxury: "Premium gold",
      dracula: "Gothic elegance",
      cmyk: "Print colors",
      business: "Corporate blue",
      night: "Deep night",
      coffee: "Warm browns",
      dim: "Subtle grays",
      nord: "Arctic cool",
      sunset: "Warm evening",
      caramellatte: "Creamy beige",
      abyss: "Deep ocean",
      silk: "Elegant cream",
    };
    return descriptions[themeName] || "Unique style";
  }

  function getThemeColors(colors: Record<string, string>): string[] {
    const oklchToHex = (oklchValue: string): string => {
      // Parse OKLCH values and convert to approximate hex colors
      const match = oklchValue.match(
        /oklch$$([\d.]+)%\s+([\d.]+)\s+([\d.]+)$$/
      );
      if (match) {
        const [, lightness, chroma, hue] = match;
        const l = Number.parseFloat(lightness) / 100;
        const c = Number.parseFloat(chroma);
        const h = Number.parseFloat(hue);

        // Simple OKLCH to RGB approximation for display purposes
        if (c < 0.02) {
          // Low chroma = grayscale
          const gray = Math.round(l * 255);
          return `rgb(${gray}, ${gray}, ${gray})`;
        }

        // Convert hue to RGB approximation
        const hueRad = (h * Math.PI) / 180;
        const r = Math.max(
          0,
          Math.min(255, Math.round(255 * (l + c * Math.cos(hueRad))))
        );
        const g = Math.max(
          0,
          Math.min(
            255,
            Math.round(255 * (l + c * Math.cos(hueRad + (2 * Math.PI) / 3)))
          )
        );
        const b = Math.max(
          0,
          Math.min(
            255,
            Math.round(255 * (l + c * Math.cos(hueRad + (4 * Math.PI) / 3)))
          )
        );

        return `rgb(${r}, ${g}, ${b})`;
      }
      return "#6366f1";
    };

    return [
      oklchToHex(colors["--color-primary"] || "oklch(58% 0.233 277.117)"),
      oklchToHex(colors["--color-secondary"] || "oklch(65% 0.241 354.308)"),
      oklchToHex(colors["--color-accent"] || "oklch(77% 0.152 181.912)"),
      oklchToHex(colors["--color-neutral"] || "oklch(30% 0.075 108.6)"),
    ];
  }

  const currentThemeIndex = themes.findIndex(
    (theme) => theme.name === currentPreviewTheme
  );

  const nextTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex].name as DaisyUITheme;
    setCurrentPreviewTheme(nextTheme);
    setPreviewTheme(nextTheme);
  };

  const prevTheme = () => {
    const prevIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
    const prevTheme = themes[prevIndex].name as DaisyUITheme;
    setCurrentPreviewTheme(prevTheme);
    setPreviewTheme(prevTheme);
  };

  const handleThemeClick = (themeName: DaisyUITheme) => {
    setCurrentPreviewTheme(themeName);
    setPreviewTheme(themeName);
  };

  return (
    <section id="showcase" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Live Preview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Interactive <span className="text-primary">Theme Showcase</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Experience how DaisyUI components look and feel across different
            themes. Click through to see the magic.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Theme Browser */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Browse Themes</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={prevTheme}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextTheme}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {themes[currentThemeIndex].label}
                  </h4>
                  <p className="text-gray-600">
                    {themes[currentThemeIndex].description}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 mb-6">
                {themes[currentThemeIndex].colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeClick(theme.name as DaisyUITheme)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      currentPreviewTheme === theme.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {theme.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {theme.description}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Live Component Preview</h3>

            {/* Mock Browser Window */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-background rounded px-3 py-1 text-sm text-muted-foreground">
                    https://yoursite.com
                  </div>
                </div>
              </div>

              <div
                ref={previewRef}
                className="p-8"
                style={{
                  backgroundColor: "var(--color-base-100)",
                  color: "var(--color-base-content)",
                }}
              >
                <div className="space-y-6">
                  {/* Navigation Preview */}
                  <div
                    className="flex items-center justify-between p-4 rounded-lg border"
                    style={{
                      backgroundColor: "var(--color-base-200)",
                      borderColor: "var(--color-base-300)",
                    }}
                  >
                    <div
                      className="font-bold"
                      style={{ color: "var(--color-base-content)" }}
                    >
                      YourSite
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                        style={{ color: "var(--color-base-content)" }}
                      >
                        Home
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                        style={{ color: "var(--color-base-content)" }}
                      >
                        About
                      </button>
                      <button
                        className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-primary-content)",
                        }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>

                  {/* Card Preview */}
                  <div
                    className="rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundColor: "var(--color-base-200)" }}
                  >
                    <div className="p-6">
                      <h2
                        className="text-lg font-bold mb-2"
                        style={{ color: "var(--color-base-content)" }}
                      >
                        Sample Card Component
                      </h2>
                      <p
                        className="mb-4 opacity-70"
                        style={{ color: "var(--color-base-content)" }}
                      >
                        This card automatically adapts to the selected theme
                        using DaisyUI&apos;s CSS variables.
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-primary-content)",
                          }}
                        >
                          Primary
                        </button>
                        <button
                          className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "var(--color-secondary-content)",
                          }}
                        >
                          Secondary
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Preview */}
                  <div
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: "var(--color-base-200)" }}
                  >
                    <h3
                      className="text-lg font-semibold mb-4"
                      style={{ color: "var(--color-base-content)" }}
                    >
                      Contact Form
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-3 py-2 rounded border"
                        style={{
                          backgroundColor: "var(--color-base-100)",
                          borderColor: "var(--color-base-300)",
                          color: "var(--color-base-content)",
                        }}
                        readOnly
                      />
                      <textarea
                        placeholder="Your message"
                        className="w-full px-3 py-2 rounded border resize-none"
                        style={{
                          backgroundColor: "var(--color-base-100)",
                          borderColor: "var(--color-base-300)",
                          color: "var(--color-base-content)",
                        }}
                        rows={3}
                        readOnly
                      />
                      <button
                        className="px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-accent-content)",
                        }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isAutoThemeEnabled && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Auto Theme Mode is enabled. The site theme changes
                    automatically as you scroll through the page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check, Palette } from "lucide-react";
import { toast } from "sonner";
import { useTemplateActions } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $activeTheme } from "@/store/nano-store";

interface GradientToolProps {
  className?: string;
}

// (types trimmed to reduce bundle; inline shapes used where necessary)

export const GradientTool: React.FC<GradientToolProps> = ({
  className = "",
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // Keep only actions we actually use to avoid pulling in extra code
  useTemplateActions();
  const activeTheme = useStore($activeTheme);

  // Generate gradients from the current active theme only
  const allGradients = useMemo(() => {
    const currentTheme = activeTheme;
    const primaryColor = currentTheme.colors["--color-primary"];
    const secondaryColor = currentTheme.colors["--color-secondary"];
    const accentColor = currentTheme.colors["--color-accent"];
    const baseColor = currentTheme.colors["--color-base-100"];
    const base200Color = currentTheme.colors["--color-base-200"];
    const base300Color = currentTheme.colors["--color-base-300"];
    const neutralColor = currentTheme.colors["--color-neutral"];

    // Helper function to create color variations (lighter/darker)
    const createColorVariation = (color: string, percentage: number) => {
      // Simple approach to lighten/darken colors
      const hex = color.replace("#", "");
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * percentage);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;
      return (
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    };

    // Create different gradient variations for the current theme
    const gradientVariations = [
      // Basic gradients
      {
        id: `${currentTheme.id}-primary-secondary`,
        name: `Primary → Secondary`,
        gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        colors: { primary: primaryColor, secondary: secondaryColor },
        cssGradient: `background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});`,
      },
      {
        id: `${currentTheme.id}-primary-accent`,
        name: `Primary → Accent`,
        gradient: `linear-gradient(45deg, ${primaryColor}, ${accentColor})`,
        colors: {
          primary: primaryColor,
          secondary: accentColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor}, ${accentColor});`,
      },

      // Color scale variations (100-300)
      {
        id: `${currentTheme.id}-base-100-200`,
        name: `Base 100 → 200`,
        gradient: `linear-gradient(135deg, ${baseColor}, ${base200Color})`,
        colors: { primary: baseColor, secondary: base200Color },
        cssGradient: `background: linear-gradient(135deg, ${baseColor}, ${base200Color});`,
      },
      {
        id: `${currentTheme.id}-base-200-300`,
        name: `Base 200 → 300`,
        gradient: `linear-gradient(45deg, ${base200Color}, ${base300Color})`,
        colors: { primary: base200Color, secondary: base300Color },
        cssGradient: `background: linear-gradient(45deg, ${base200Color}, ${base300Color});`,
      },
      {
        id: `${currentTheme.id}-base-100-300`,
        name: `Base 100 → 300`,
        gradient: `linear-gradient(90deg, ${baseColor}, ${base300Color})`,
        colors: { primary: baseColor, secondary: base300Color },
        cssGradient: `background: linear-gradient(90deg, ${baseColor}, ${base300Color});`,
      },

      // Primary variations
      {
        id: `${currentTheme.id}-primary-light`,
        name: `Primary → Light`,
        gradient: `linear-gradient(135deg, ${primaryColor}, ${createColorVariation(primaryColor, 20)})`,
        colors: {
          primary: primaryColor,
          secondary: createColorVariation(primaryColor, 20),
        },
        cssGradient: `background: linear-gradient(135deg, ${primaryColor}, ${createColorVariation(primaryColor, 20)});`,
      },
      {
        id: `${currentTheme.id}-primary-dark`,
        name: `Primary → Dark`,
        gradient: `linear-gradient(45deg, ${primaryColor}, ${createColorVariation(primaryColor, -20)})`,
        colors: {
          primary: primaryColor,
          secondary: createColorVariation(primaryColor, -20),
        },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor}, ${createColorVariation(primaryColor, -20)});`,
      },

      // Secondary variations
      {
        id: `${currentTheme.id}-secondary-light`,
        name: `Secondary → Light`,
        gradient: `linear-gradient(90deg, ${secondaryColor}, ${createColorVariation(secondaryColor, 25)})`,
        colors: {
          primary: secondaryColor,
          secondary: createColorVariation(secondaryColor, 25),
        },
        cssGradient: `background: linear-gradient(90deg, ${secondaryColor}, ${createColorVariation(secondaryColor, 25)});`,
      },
      {
        id: `${currentTheme.id}-secondary-dark`,
        name: `Secondary → Dark`,
        gradient: `linear-gradient(180deg, ${secondaryColor}, ${createColorVariation(secondaryColor, -25)})`,
        colors: {
          primary: secondaryColor,
          secondary: createColorVariation(secondaryColor, -25),
        },
        cssGradient: `background: linear-gradient(180deg, ${secondaryColor}, ${createColorVariation(secondaryColor, -25)});`,
      },

      // Advanced combinations
      {
        id: `${currentTheme.id}-secondary-accent`,
        name: `Secondary → Accent`,
        gradient: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
        colors: {
          primary: secondaryColor,
          secondary: accentColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(90deg, ${secondaryColor}, ${accentColor});`,
      },
      {
        id: `${currentTheme.id}-radial-primary`,
        name: `Radial Primary`,
        gradient: `radial-gradient(circle at center, ${primaryColor}, ${secondaryColor})`,
        colors: { primary: primaryColor, secondary: secondaryColor },
        cssGradient: `background: radial-gradient(circle at center, ${primaryColor}, ${secondaryColor});`,
      },
      {
        id: `${currentTheme.id}-three-color`,
        name: `Primary → Accent → Secondary`,
        gradient: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor})`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor});`,
      },
      {
        id: `${currentTheme.id}-diagonal`,
        name: `Diagonal Primary`,
        gradient: `linear-gradient(45deg, ${primaryColor}, ${baseColor})`,
        colors: { primary: primaryColor, secondary: baseColor },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor}, ${baseColor});`,
      },
      {
        id: `${currentTheme.id}-vertical`,
        name: `Vertical Blend`,
        gradient: `linear-gradient(180deg, ${primaryColor}, ${neutralColor})`,
        colors: { primary: primaryColor, secondary: neutralColor },
        cssGradient: `background: linear-gradient(180deg, ${primaryColor}, ${neutralColor});`,
      },
      {
        id: `${currentTheme.id}-radial-accent`,
        name: `Radial Accent`,
        gradient: `radial-gradient(ellipse at top, ${accentColor}, ${primaryColor})`,
        colors: {
          primary: accentColor,
          secondary: primaryColor,
          accent: accentColor,
        },
        cssGradient: `background: radial-gradient(ellipse at top, ${accentColor}, ${primaryColor});`,
      },

      // Multi-stop gradients with base colors
      {
        id: `${currentTheme.id}-base-spectrum`,
        name: `Base Spectrum`,
        gradient: `linear-gradient(135deg, ${baseColor}, ${base200Color}, ${base300Color})`,
        colors: {
          primary: baseColor,
          secondary: base200Color,
          accent: base300Color,
        },
        cssGradient: `background: linear-gradient(135deg, ${baseColor}, ${base200Color}, ${base300Color});`,
      },
      {
        id: `${currentTheme.id}-primary-to-base`,
        name: `Primary → Base 300`,
        gradient: `linear-gradient(45deg, ${primaryColor}, ${base300Color})`,
        colors: { primary: primaryColor, secondary: base300Color },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor}, ${base300Color});`,
      },

      // Additional creative gradients
      {
        id: `${currentTheme.id}-conic-primary`,
        name: `Conic Primary`,
        gradient: `conic-gradient(from 90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${primaryColor})`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: conic-gradient(from 90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${primaryColor});`,
      },
      {
        id: `${currentTheme.id}-radial-corner`,
        name: `Corner Radial`,
        gradient: `radial-gradient(circle at top left, ${accentColor}, ${neutralColor})`,
        colors: { primary: accentColor, secondary: neutralColor },
        cssGradient: `background: radial-gradient(circle at top left, ${accentColor}, ${neutralColor});`,
      },
      {
        id: `${currentTheme.id}-double-linear`,
        name: `Double Linear`,
        gradient: `linear-gradient(45deg, ${primaryColor} 0%, ${accentColor} 50%, ${secondaryColor} 100%)`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor} 0%, ${accentColor} 50%, ${secondaryColor} 100%);`,
      },
      {
        id: `${currentTheme.id}-rainbow-subtle`,
        name: `Subtle Rainbow`,
        gradient: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${neutralColor}, ${primaryColor})`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor}, ${neutralColor}, ${primaryColor});`,
      },
      {
        id: `${currentTheme.id}-angled-stripe`,
        name: `Angled Stripe`,
        gradient: `linear-gradient(120deg, ${primaryColor} 0%, ${baseColor} 50%, ${secondaryColor} 100%)`,
        colors: { primary: primaryColor, secondary: secondaryColor },
        cssGradient: `background: linear-gradient(120deg, ${primaryColor} 0%, ${baseColor} 50%, ${secondaryColor} 100%);`,
      },
      {
        id: `${currentTheme.id}-radial-burst`,
        name: `Radial Burst`,
        gradient: `radial-gradient(ellipse at bottom right, ${accentColor}, ${primaryColor}, ${base300Color})`,
        colors: {
          primary: accentColor,
          secondary: primaryColor,
          accent: base300Color,
        },
        cssGradient: `background: radial-gradient(ellipse at bottom right, ${accentColor}, ${primaryColor}, ${base300Color});`,
      },
      {
        id: `${currentTheme.id}-wave-like`,
        name: `Wave Pattern`,
        gradient: `linear-gradient(45deg, ${primaryColor} 25%, ${baseColor} 25%, ${baseColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 75%, ${accentColor} 75%)`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor} 25%, ${baseColor} 25%, ${baseColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 75%, ${accentColor} 75%);`,
      },
      {
        id: `${currentTheme.id}-soft-transition`,
        name: `Soft Transition`,
        gradient: `linear-gradient(135deg, ${createColorVariation(primaryColor, 20)}, ${primaryColor}, ${createColorVariation(secondaryColor, -10)})`,
        colors: { primary: primaryColor, secondary: secondaryColor },
        cssGradient: `background: linear-gradient(135deg, ${createColorVariation(primaryColor, 20)}, ${primaryColor}, ${createColorVariation(secondaryColor, -10)});`,
      },
      {
        id: `${currentTheme.id}-mirror-effect`,
        name: `Mirror Effect`,
        gradient: `linear-gradient(180deg, ${primaryColor}, ${accentColor}, ${primaryColor})`,
        colors: {
          primary: primaryColor,
          secondary: accentColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(180deg, ${primaryColor}, ${accentColor}, ${primaryColor});`,
      },
      {
        id: `${currentTheme.id}-radial-fade`,
        name: `Radial Fade`,
        gradient: `radial-gradient(circle at center, ${primaryColor} 0%, ${secondaryColor} 70%, ${neutralColor} 100%)`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: neutralColor,
        },
        cssGradient: `background: radial-gradient(circle at center, ${primaryColor} 0%, ${secondaryColor} 70%, ${neutralColor} 100%);`,
      },
      {
        id: `${currentTheme.id}-diagonal-split`,
        name: `Diagonal Split`,
        gradient: `linear-gradient(45deg, ${primaryColor} 50%, ${secondaryColor} 50%)`,
        colors: { primary: primaryColor, secondary: secondaryColor },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor} 50%, ${secondaryColor} 50%);`,
      },
      {
        id: `${currentTheme.id}-sunset-blend`,
        name: `Sunset Blend`,
        gradient: `linear-gradient(to top, ${secondaryColor}, ${accentColor}, ${createColorVariation(primaryColor, 15)})`,
        colors: {
          primary: secondaryColor,
          secondary: accentColor,
          accent: primaryColor,
        },
        cssGradient: `background: linear-gradient(to top, ${secondaryColor}, ${accentColor}, ${createColorVariation(primaryColor, 15)});`,
      },
    ];

    return gradientVariations;
  }, [activeTheme]);

  // Filter gradients based on search query
  const gradients = useMemo(() => {
    return allGradients;
  }, [allGradients]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  // Note: previously there was an applyColors helper referencing all THEMES.
  // It isn't used and pulled a large constants file; removed for performance.

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
            <Palette className="w-5 h-5 text-primary-content" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-base-content">
              {activeTheme.name}
            </h1>
            <p className="text-sm text-base-content/70">Gradient variations</p>
          </div>
        </div>
      </div>

      {/* Gradients Display */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3">
              {gradients.map((gradient) => (
                <div
                  key={gradient.id}
                  className="group relative overflow-hidden transition-all duration-200 hover:scale-[1.01] rounded-3xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md"
                >
                  {/* Gradient Preview */}
                  <div
                    className="h-44 w-full relative rounded-t-2xl"
                    style={{ background: gradient.gradient }}
                  >
                    {/* Gradient Overlay for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-xl" />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-base-content mb-2 truncate">
                          {gradient.name}
                        </h3>

                        {/* Color Pills */}
                        <div className="flex gap-1.5">
                          <div
                            className="w-4 h-4 rounded-full border border-base-300 shadow-sm"
                            style={{ backgroundColor: gradient.colors.primary }}
                            title={gradient.colors.primary}
                          />
                          {gradient.colors.accent && (
                            <div
                              className="w-4 h-4 rounded-full border border-base-300 shadow-sm"
                              style={{
                                backgroundColor: gradient.colors.accent,
                              }}
                              title={gradient.colors.accent}
                            />
                          )}
                          <div
                            className="w-4 h-4 rounded-full border border-base-300 shadow-sm"
                            style={{
                              backgroundColor: gradient.colors.secondary,
                            }}
                            title={gradient.colors.secondary}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() =>
                            copyToClipboard(gradient.cssGradient, gradient.id)
                          }
                          className="w-7 h-7 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content flex items-center justify-center transition-colors text-xs"
                          title="Copy CSS"
                        >
                          {copiedId === gradient.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-base-300 p-3">
        <div className="text-xs text-base-content/60 text-center">
          {gradients.length} variations • Click to copy CSS or apply colors
        </div>
      </div>
    </div>
  );
};

export default GradientTool;

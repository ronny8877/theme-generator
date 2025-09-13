"use client";

import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  Check,
  Palette,
  Plus,
  Sparkles,
  BookOpen,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { useTemplateActions } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $activeTheme } from "@/store/nano-store";
import { InteractiveGradientEditor } from "./gradient-editor/interactive-gradient-editor";
import {
  GradientConfig,
  createGradientStop,
  createPresetGradients,
} from "@/lib/gradient-utils";

interface EnhancedGradientToolProps {
  className?: string;
}

type TabType = "editor" | "presets" | "gallery";

export const EnhancedGradientTool: React.FC<EnhancedGradientToolProps> = ({
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("editor");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<GradientConfig | null>(
    null,
  );

  useTemplateActions();
  const activeTheme = useStore($activeTheme);

  // Generate theme-based gradients
  const themeGradients = useMemo(() => {
    const currentTheme = activeTheme;
    const primaryColor = currentTheme.colors["--color-primary"];
    const secondaryColor = currentTheme.colors["--color-secondary"];
    const accentColor = currentTheme.colors["--color-accent"];

    return [
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
        colors: { primary: primaryColor, secondary: accentColor },
        cssGradient: `background: linear-gradient(45deg, ${primaryColor}, ${accentColor});`,
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
        name: `Three Color Blend`,
        gradient: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor})`,
        colors: {
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        },
        cssGradient: `background: linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor});`,
      },
    ];
  }, [activeTheme]);

  // Get preset gradients
  const presetGradients = useMemo(() => createPresetGradients(), []);

  // Copy to clipboard
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

  // Load preset into editor
  const loadPresetIntoEditor = (gradientData: {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
    };
  }) => {
    // Convert theme gradient to GradientConfig format
    const gradientConfig: GradientConfig = {
      id: `preset-${Date.now()}`,
      name: gradientData.name,
      type: "linear",
      direction: 135,
      stops: [
        createGradientStop(gradientData.colors.primary, 0),
        createGradientStop(gradientData.colors.secondary, 100),
      ],
      createdAt: new Date(),
    };

    if (gradientData.colors.accent) {
      gradientConfig.stops.splice(
        1,
        0,
        createGradientStop(gradientData.colors.accent, 50),
      );
    }

    setSelectedPreset(gradientConfig);
    setActiveTab("editor");
  };

  return (
    <div className={`h-full flex flex-col bg-base-100 ${className}`}>
      {/* Header with Tab Navigation */}
      <div className="border-b border-base-300 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
            <Palette className="w-5 h-5 text-primary-content" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-base-content">
              Gradient Studio
            </h1>
            <p className="text-sm text-base-content/70">
              Create, customize, and explore gradients
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-base-200">
          <button
            onClick={() => setActiveTab("editor")}
            className={`tab ${activeTab === "editor" ? "tab-active" : ""}`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Editor
          </button>
          <button
            onClick={() => setActiveTab("presets")}
            className={`tab ${activeTab === "presets" ? "tab-active" : ""}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Theme
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`tab ${activeTab === "gallery" ? "tab-active" : ""}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Gallery
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "editor" && (
          <InteractiveGradientEditor
            className="h-full"
            initialGradient={selectedPreset || undefined}
            onGradientChange={() => {
              // Could save to local storage or sync with theme
            }}
          />
        )}

        {activeTab === "presets" && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">
                  Theme-Based Gradients
                </h2>
                <p className="text-sm text-base-content/70">
                  Gradients created from your current theme colors
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {themeGradients.map((gradient) => (
                  <div
                    key={gradient.id}
                    className="group relative overflow-hidden transition-all duration-200 hover:scale-[1.01] rounded-2xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md"
                  >
                    {/* Gradient Preview */}
                    <div
                      className="h-32 w-full relative"
                      style={{ background: gradient.gradient }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
                              style={{
                                backgroundColor: gradient.colors.primary,
                              }}
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
                            onClick={() => loadPresetIntoEditor(gradient)}
                            className="btn btn-ghost btn-sm"
                            title="Edit in Studio"
                          >
                            <Settings className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() =>
                              copyToClipboard(gradient.cssGradient, gradient.id)
                            }
                            className="btn btn-ghost btn-sm"
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
        )}

        {activeTab === "gallery" && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Preset Gallery</h2>
                <p className="text-sm text-base-content/70">
                  Beautiful gradients ready to use in your projects
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {presetGradients.map((preset) => (
                  <div
                    key={preset.id}
                    className="group relative overflow-hidden transition-all duration-200 hover:scale-[1.01] rounded-2xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md"
                  >
                    {/* Gradient Preview */}
                    <div
                      className="h-32 w-full relative"
                      style={{
                        background:
                          preset.type === "linear"
                            ? `linear-gradient(${preset.direction}deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                            : `radial-gradient(circle, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-base-content mb-2 truncate">
                            {preset.name}
                          </h3>
                          <div className="text-xs text-base-content/60 capitalize">
                            {preset.type} • {preset.stops.length} stops
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setSelectedPreset(preset);
                              setActiveTab("editor");
                            }}
                            className="btn btn-ghost btn-sm"
                            title="Edit in Studio"
                          >
                            <Settings className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              const css =
                                preset.type === "linear"
                                  ? `linear-gradient(${preset.direction}deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                                  : `radial-gradient(circle, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;
                              copyToClipboard(`background: ${css};`, preset.id);
                            }}
                            className="btn btn-ghost btn-sm"
                            title="Copy CSS"
                          >
                            {copiedId === preset.id ? (
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
        )}
      </div>

      {/* Footer Stats */}
      <div className="border-t border-base-300 p-3">
        <div className="text-xs text-base-content/60 text-center">
          {activeTab === "editor" &&
            "Interactive gradient editor with advanced controls"}
          {activeTab === "presets" &&
            `${themeGradients.length} theme-based gradients available`}
          {activeTab === "gallery" &&
            `${presetGradients.length} preset gradients available`}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGradientTool;

"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Palette,
  RotateCcw,
  Download,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  GradientConfig,
  GradientType,
  createGradientStop,
  generateGradientCSS,
  addGradientStop,
  removeGradientStop,
  updateGradientStop,
  reverseGradient,
  generateRandomGradient,
} from "@/lib/gradient-utils";
import GradientDirectionControls from "./gradient-direction-controls";
import { GradientStopColorPicker } from "./color-picker";

interface InteractiveGradientEditorProps {
  className?: string;
  initialGradient?: GradientConfig;
  onGradientChange?: (gradient: GradientConfig) => void;
}

export const InteractiveGradientEditor: React.FC<
  InteractiveGradientEditorProps
> = ({ className = "", initialGradient, onGradientChange }) => {
  // Initialize with a default gradient or use provided one
  const defaultGradient: GradientConfig = useMemo(
    () =>
      initialGradient || {
        id: `gradient-${Date.now()}`,
        name: "New Gradient",
        type: "linear",
        direction: 90,
        stops: [
          createGradientStop("#3B82F6", 0), // Blue
          createGradientStop("#EF4444", 100), // Red
        ],
        createdAt: new Date(),
      },
    [initialGradient],
  );

  const [gradient, setGradient] = useState<GradientConfig>(defaultGradient);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Handle gradient updates
  const updateGradient = useCallback(
    (newGradient: GradientConfig) => {
      setGradient(newGradient);
      onGradientChange?.(newGradient);
    },
    [onGradientChange],
  );

  // Generate CSS for preview
  const gradientCSS = useMemo(() => generateGradientCSS(gradient), [gradient]);

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  // Add new color stop
  const handleAddStop = useCallback(() => {
    const newPosition =
      gradient.stops.length > 0
        ? Math.max(
            0,
            Math.min(
              100,
              gradient.stops.reduce((sum, stop) => sum + stop.position, 0) /
                gradient.stops.length,
            ),
          )
        : 50;

    const newGradient = addGradientStop(gradient, "#6366F1", newPosition);
    updateGradient(newGradient);
  }, [gradient, updateGradient]);

  // Remove color stop
  const handleRemoveStop = useCallback(
    (stopId: string) => {
      if (gradient.stops.length <= 2) {
        toast.error("Gradient must have at least 2 color stops");
        return;
      }

      const newGradient = removeGradientStop(gradient, stopId);
      updateGradient(newGradient);

      if (selectedStopId === stopId) {
        setSelectedStopId(null);
      }
    },
    [gradient, updateGradient, selectedStopId],
  );

  // Update stop color
  const handleStopColorChange = useCallback(
    (stopId: string, color: string) => {
      const newGradient = updateGradientStop(gradient, stopId, { color });
      updateGradient(newGradient);
    },
    [gradient, updateGradient],
  );

  // Update stop position
  const handleStopPositionChange = useCallback(
    (stopId: string, position: number) => {
      const newGradient = updateGradientStop(gradient, stopId, { position });
      updateGradient(newGradient);
    },
    [gradient, updateGradient],
  );

  // Change gradient type
  const handleTypeChange = useCallback(
    (type: GradientType) => {
      const newGradient = { ...gradient, type };
      if (type === "linear") {
        newGradient.direction =
          typeof gradient.direction === "number" ? gradient.direction : 90;
      }
      updateGradient(newGradient);
    },
    [gradient, updateGradient],
  );

  // Reverse gradient
  const handleReverse = useCallback(() => {
    const newGradient = reverseGradient(gradient);
    updateGradient(newGradient);
  }, [gradient, updateGradient]);

  // Generate random gradient
  const handleRandomize = useCallback(() => {
    const randomGradient = generateRandomGradient(gradient.type);
    updateGradient({ ...randomGradient, id: gradient.id, name: gradient.name });
  }, [gradient, updateGradient]);

  return (
    <div className={`h-full flex flex-col bg-base-100 ${className}`}>
      {/* Header */}
      <div className="border-b border-base-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
              <Palette className="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-base-content">
                Gradient Editor
              </h1>
              <p className="text-sm text-base-content/70">
                Create custom gradients
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="btn btn-ghost btn-sm"
              title="Generate Random"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleReverse}
              className="btn btn-ghost btn-sm"
              title="Reverse Gradient"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gradient Type Selector */}
        <div className="flex gap-2 mb-4">
          <div className="tabs tabs-boxed bg-base-200">
            {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`tab tab-sm ${gradient.type === type ? "tab-active" : ""}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Live Gradient Preview */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="card-title text-base mb-3">Preview</h3>
                <div
                  className="w-full h-40 rounded-lg border border-base-300 shadow-inner"
                  style={{ background: gradientCSS }}
                />

                {/* CSS Output */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">CSS Code</span>
                    <button
                      onClick={() =>
                        copyToClipboard(`background: ${gradientCSS};`)
                      }
                      className="btn btn-ghost btn-xs"
                    >
                      {copiedText === `background: ${gradientCSS};` ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="mockup-code">
                    <pre className="text-xs overflow-x-auto">
                      <code>background: {gradientCSS};</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Controls */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="card-title text-base mb-3">
                  Direction & Settings
                </h3>
                <GradientDirectionControls
                  gradient={gradient}
                  onUpdate={updateGradient}
                />
              </div>
            </div>

            {/* Color Stops Editor */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="card-title text-base">Color Stops</h3>
                  <button
                    onClick={handleAddStop}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Stop
                  </button>
                </div>

                {/* Gradient Bar with Stop Indicators */}
                <div className="mb-6">
                  <div className="relative h-8 rounded-lg border border-base-300 overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{ background: gradientCSS }}
                    />

                    {/* Stop Indicators */}
                    {gradient.stops.map((stop) => (
                      <button
                        key={stop.id}
                        onClick={() => setSelectedStopId(stop.id)}
                        className={`absolute top-0 w-4 h-full transform -translate-x-1/2 border-2 rounded-sm cursor-pointer transition-all hover:scale-110 ${
                          selectedStopId === stop.id
                            ? "border-primary shadow-lg z-10"
                            : "border-base-content/30 hover:border-base-content/60"
                        }`}
                        style={{
                          left: `${stop.position}%`,
                          backgroundColor: stop.color,
                        }}
                        title={`Stop at ${stop.position}%: ${stop.color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stop List */}
                <div className="space-y-3">
                  {gradient.stops
                    .sort((a, b) => a.position - b.position)
                    .map((stop) => (
                      <div
                        key={stop.id}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedStopId === stop.id
                            ? "border-primary bg-primary/5"
                            : "border-base-300 hover:border-base-content/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Color Preview */}
                          <div
                            className="w-8 h-8 rounded-lg border border-base-300 shadow-sm cursor-pointer"
                            style={{ backgroundColor: stop.color }}
                            onClick={() => setSelectedStopId(stop.id)}
                          />

                          {/* Stop Controls */}
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="form-control">
                              <label className="label py-1">
                                <span className="label-text text-xs">
                                  Color
                                </span>
                              </label>
                              <GradientStopColorPicker
                                color={stop.color}
                                onColorChange={(color) =>
                                  handleStopColorChange(stop.id, color)
                                }
                              />
                            </div>

                            <div className="form-control">
                              <label className="label py-1">
                                <span className="label-text text-xs">
                                  Position: {stop.position}%
                                </span>
                              </label>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={stop.position}
                                onChange={(e) =>
                                  handleStopPositionChange(
                                    stop.id,
                                    Number(e.target.value),
                                  )
                                }
                                className="range range-xs range-primary mt-2"
                              />
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveStop(stop.id)}
                            disabled={gradient.stops.length <= 2}
                            className="btn btn-ghost btn-sm text-error hover:bg-error/10 disabled:opacity-30"
                            title="Remove Stop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="card-title text-base mb-3">Export</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    onClick={() => copyToClipboard(gradientCSS)}
                    className="btn btn-outline"
                  >
                    <Copy className="w-4 h-4" />
                    Copy CSS
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(`background: ${gradientCSS};`)
                    }
                    className="btn btn-outline"
                  >
                    <Download className="w-4 h-4" />
                    Full CSS Rule
                  </button>
                  <button
                    onClick={() => {
                      const variableName = `--gradient-${gradient.type}-${Date.now()}`;
                      copyToClipboard(
                        `${variableName}: ${gradientCSS};\n/* Usage: background: var(${variableName}); */`,
                      );
                    }}
                    className="btn btn-outline"
                  >
                    <Settings className="w-4 h-4" />
                    CSS Variable
                  </button>
                </div>

                {/* Theme Integration */}
                <div className="mt-4 p-3 bg-base-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Theme Integration
                  </h4>
                  <p className="text-xs text-base-content/70 mb-3">
                    Add this gradient to your theme&apos;s CSS variables for
                    consistent usage across your design system.
                  </p>
                  <button
                    onClick={() => {
                      const themeVar = `/* Add to your theme CSS */
:root {
  --gradient-${gradient.name.toLowerCase().replace(/\s+/g, "-")}: ${gradientCSS};
}

/* Usage in components */
.gradient-bg {
  background: var(--gradient-${gradient.name.toLowerCase().replace(/\s+/g, "-")});
}`;
                      copyToClipboard(themeVar);
                    }}
                    className="btn btn-ghost btn-sm w-full"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Theme Variables
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default InteractiveGradientEditor;

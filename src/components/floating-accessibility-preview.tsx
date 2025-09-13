"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  simulatePalette,
  getSimulationCategories,
  SIMULATION_INFO,
  type SimulationType,
} from "@/lib/accessibility-simulation";
import {
  Eye,
  EyeOff,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Monitor,
  Smartphone,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface FloatingAccessibilityPreviewProps {
  colors: string[];
  onColorsChange?: (colors: string[]) => void;
  className?: string;
}

export function FloatingAccessibilityPreview({
  colors,
  onColorsChange,
  className = "",
}: FloatingAccessibilityPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSimulation, setActiveSimulation] =
    useState<SimulationType | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [applyToTheme, setApplyToTheme] = useState(false);
  const [originalThemeColors, setOriginalThemeColors] = useState<
    string[] | null
  >(null);

  // Use refs to avoid infinite loops
  const onColorsChangeRef = useRef(onColorsChange);

  // Update refs
  onColorsChangeRef.current = onColorsChange;

  const categories = getSimulationCategories();
  const allSimulations = Object.values(categories).flat();

  // Get simulated colors for display - always use original colors for simulation
  const baseColors = originalThemeColors || colors;
  const displayColors = activeSimulation
    ? simulatePalette(baseColors, activeSimulation)
    : baseColors;

  // Save original colors when live preview starts
  useEffect(() => {
    if (applyToTheme && !originalThemeColors) {
      setOriginalThemeColors([...colors]);
    }
  }, [applyToTheme, originalThemeColors, colors]);

  // Reset original colors if user changes theme manually while live preview is off
  useEffect(() => {
    if (!applyToTheme && originalThemeColors) {
      setOriginalThemeColors(null);
    }
  }, [applyToTheme, originalThemeColors]);

  // Apply colors to theme when enabled
  useEffect(() => {
    if (
      applyToTheme &&
      activeSimulation &&
      onColorsChangeRef.current &&
      originalThemeColors
    ) {
      // Apply simulated colors based on original theme
      const simulatedColors = simulatePalette(
        originalThemeColors,
        activeSimulation,
      );
      onColorsChangeRef.current(simulatedColors);
    } else if (
      !applyToTheme &&
      onColorsChangeRef.current &&
      originalThemeColors
    ) {
      // Reset to original colors
      onColorsChangeRef.current(originalThemeColors);
      setOriginalThemeColors(null); // Clear backup
    }
  }, [applyToTheme, activeSimulation, originalThemeColors]); // Only depend on state changes, not on callback or colors

  // Cycle through simulations
  const currentIndex = activeSimulation
    ? allSimulations.findIndex((s) => s.type === activeSimulation)
    : -1;

  const nextSimulation = () => {
    if (currentIndex < allSimulations.length - 1) {
      setActiveSimulation(allSimulations[currentIndex + 1].type);
    } else {
      setActiveSimulation(allSimulations[0].type);
    }
  };

  const prevSimulation = () => {
    if (currentIndex > 0) {
      setActiveSimulation(allSimulations[currentIndex - 1].type);
    } else {
      setActiveSimulation(allSimulations[allSimulations.length - 1].type);
    }
  };

  const handleSimulationSelect = (type: SimulationType | null) => {
    setActiveSimulation(type);
    if (!type) {
      setIsExpanded(false);
      // Reset theme when simulation is turned off
      if (applyToTheme && onColorsChangeRef.current && originalThemeColors) {
        onColorsChangeRef.current(originalThemeColors);
      }
    }
  };

  const currentSimulationInfo = activeSimulation
    ? SIMULATION_INFO[activeSimulation]
    : null;

  if (!isOpen) {
    return (
      <div className={`fixed top-6 left-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-2xl w-14 h-14 shadow-xl bg-primary hover:bg-primary/90"
          title="Open Accessibility Preview"
        >
          <Eye className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed top-6 left-6 z-50 ${className}`}>
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-2xl max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm">Accessibility Preview</h3>
            {applyToTheme && activeSimulation && (
              <Badge variant="default" className="text-xs">
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {applyToTheme && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setApplyToTheme(false);
                  setActiveSimulation(null);
                  if (onColorsChangeRef.current && originalThemeColors) {
                    onColorsChangeRef.current(originalThemeColors);
                    setOriginalThemeColors(null);
                  }
                }}
                className="h-8 w-8 p-0"
                title="Reset to original colors"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setDeviceMode(deviceMode === "desktop" ? "mobile" : "desktop")
              }
              className="h-8 w-8 p-0"
              title={`Switch to ${deviceMode === "desktop" ? "mobile" : "desktop"} view`}
            >
              {deviceMode === "desktop" ? (
                <Monitor className="h-4 w-4" />
              ) : (
                <Smartphone className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Simulation Info */}
        {activeSimulation && currentSimulationInfo && (
          <div className="p-4 bg-base-200 border-b border-base-300">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">
                {currentSimulationInfo.name}
              </h4>
              <Badge
                variant={
                  currentSimulationInfo.severity === "severe"
                    ? "destructive"
                    : "default"
                }
                className="text-xs"
              >
                {currentSimulationInfo.severity}
              </Badge>
            </div>

            <p className="text-xs text-base-content/70 mb-2">
              {currentSimulationInfo.description}
            </p>

            {applyToTheme && originalThemeColors && (
              <div className="text-xs text-info bg-info/10 p-2 rounded mb-2">
                ℹ️ Simulation applied to original theme colors (prevents color
                drift)
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs">
                <Users className="h-3 w-3" />
                <span>{currentSimulationInfo.prevalence}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevSimulation}
                  className="h-6 w-6 p-0"
                  title="Previous simulation"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <span className="text-xs text-base-content/70 px-2">
                  {currentIndex + 1}/{allSimulations.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextSimulation}
                  className="h-6 w-6 p-0"
                  title="Next simulation"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Color Preview */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-xs font-medium text-base-content/80">
              Color Preview{" "}
              {activeSimulation ? `(${activeSimulation})` : "(Original)"}
              {originalThemeColors && (
                <span className="text-xs text-info ml-1">• Saved</span>
              )}
            </h5>
            {activeSimulation && (
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={applyToTheme}
                  onChange={(e) => setApplyToTheme(e.target.checked)}
                  className="checkbox checkbox-xs"
                />
                Apply Live
              </label>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {displayColors.slice(0, 8).map((color, index) => (
              <div
                key={index}
                className="aspect-square rounded border border-base-300 relative group"
                style={{ backgroundColor: color }}
                title={color}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded flex items-center justify-center">
                  <span className="text-[10px] text-white/0 group-hover:text-white/80 transition-colors font-mono">
                    {color.slice(0, 7)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {displayColors.length > 8 && (
            <div className="text-xs text-base-content/50 mt-1 text-center">
              +{displayColors.length - 8} more colors
            </div>
          )}
        </div>

        {/* Quick Controls */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant={activeSimulation ? "outline" : "default"}
              size="sm"
              onClick={() => handleSimulationSelect(null)}
              className="flex-1 text-xs"
            >
              <EyeOff className="h-3 w-3 mr-1" />
              Normal
            </Button>
            <Button
              variant={activeSimulation ? "default" : "outline"}
              size="sm"
              onClick={() =>
                handleSimulationSelect(activeSimulation || "deuteranomaly")
              }
              className="flex-1 text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              Simulate
            </Button>
          </div>

          {/* Quick Simulation Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              {
                type: "deuteranomaly" as SimulationType,
                label: "Red-Green",
                common: true,
              },
              {
                type: "protanopia" as SimulationType,
                label: "Protanopia",
                common: false,
              },
              {
                type: "tritanopia" as SimulationType,
                label: "Blue-Yellow",
                common: false,
              },
              {
                type: "achromatopsia" as SimulationType,
                label: "Grayscale",
                common: false,
              },
            ].map(({ type, label, common }) => (
              <button
                key={type}
                onClick={() =>
                  handleSimulationSelect(
                    activeSimulation === type ? null : type,
                  )
                }
                className={`p-2 rounded-lg border text-xs transition-all ${
                  activeSimulation === type
                    ? "bg-primary text-primary-content border-primary"
                    : "bg-base-100 hover:bg-base-200 border-base-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  {common && <AlertTriangle className="h-3 w-3 text-warning" />}
                </div>
              </button>
            ))}
          </div>

          {/* Expand for Full List */}
          {isExpanded && (
            <div className="space-y-3 border-t border-base-300 pt-3">
              {Object.entries(categories).map(([categoryName, simulations]) => (
                <div key={categoryName}>
                  <h5 className="text-xs font-medium text-base-content/70 mb-2">
                    {categoryName}
                  </h5>
                  <div className="grid grid-cols-1 gap-1">
                    {simulations.map(({ type, info }) => (
                      <button
                        key={type}
                        onClick={() =>
                          handleSimulationSelect(
                            activeSimulation === type ? null : type,
                          )
                        }
                        className={`p-2 rounded text-left text-xs transition-all ${
                          activeSimulation === type
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{info.name}</span>
                          <Badge
                            variant="outline"
                            className="text-xs px-1 py-0 h-4"
                          >
                            {info.severity}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Help Text */}
          {!activeSimulation && (
            <div className="text-xs text-base-content/60 bg-base-200 p-3 rounded-lg">
              Select a simulation to see how people with visual impairments
              would perceive this template&apos;s colors.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

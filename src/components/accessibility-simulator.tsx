"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  simulatePalette,
  getSimulationCategories,
  SIMULATION_INFO,
  type SimulationType,
} from "@/lib/accessibility-simulation";
import { Eye, Users, AlertTriangle, Info, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface AccessibilitySimulatorProps {
  colors: string[];
  onSimulationChange?: (
    simulatedColors: string[],
    simulationType: SimulationType | null,
  ) => void;
  className?: string;
}

export function AccessibilitySimulator({
  colors,
  onSimulationChange,
  className = "",
}: AccessibilitySimulatorProps) {
  const [activeSimulation, setActiveSimulation] =
    useState<SimulationType | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = getSimulationCategories();

  const handleSimulationSelect = (type: SimulationType | null) => {
    setActiveSimulation(type);

    if (type) {
      const simulatedColors = simulatePalette(colors, type);
      onSimulationChange?.(simulatedColors, type);
    } else {
      onSimulationChange?.(colors, null);
    }
  };

  const copySimulatedColors = () => {
    if (!activeSimulation) return;

    const simulatedColors = simulatePalette(colors, activeSimulation);
    const colorString = simulatedColors.join(", ");
    navigator.clipboard.writeText(colorString);
    toast.success("Simulated colors copied to clipboard");
  };

  const currentSimulationInfo = activeSimulation
    ? SIMULATION_INFO[activeSimulation]
    : null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Accessibility Simulation</h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="gap-2"
          >
            <Info className="h-4 w-4" />
            {showDetails ? "Hide" : "Show"} Details
          </Button>

          {activeSimulation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSimulationSelect(null)}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Current Simulation Info */}
      {activeSimulation && currentSimulationInfo && (
        <div className="p-4 bg-base-200 rounded-lg border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-lg">
                {currentSimulationInfo.name}
              </h4>
              <p className="text-sm text-base-content/70">
                {currentSimulationInfo.description}
              </p>
            </div>
            <Badge
              variant={
                currentSimulationInfo.severity === "severe"
                  ? "destructive"
                  : "default"
              }
              className="ml-2"
            >
              {currentSimulationInfo.severity}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Affects: {currentSimulationInfo.prevalence}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={copySimulatedColors}
              className="gap-1 h-6 px-2"
            >
              <Copy className="h-3 w-3" />
              Copy Colors
            </Button>
          </div>
        </div>
      )}

      {/* Simulation Type Selector */}
      <div className="grid gap-4">
        {Object.entries(categories).map(([categoryName, simulations]) => (
          <div key={categoryName} className="space-y-3">
            <h4 className="text-md font-semibold text-base-content/80">
              {categoryName}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {simulations.map(({ type, info }) => (
                <button
                  key={type}
                  onClick={() =>
                    handleSimulationSelect(
                      activeSimulation === type ? null : type,
                    )
                  }
                  className={`p-3 rounded-lg border transition-all text-left hover:scale-[1.02] ${
                    activeSimulation === type
                      ? "bg-primary text-primary-content border-primary shadow-lg"
                      : "bg-base-100 hover:bg-base-200 border-base-300 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-sm">{info.name}</h5>
                    <div className="flex items-center gap-1">
                      {info.severity === "severe" && (
                        <AlertTriangle className="h-3 w-3 text-warning" />
                      )}
                      <Badge
                        variant="outline"
                        className="text-xs px-1 py-0 h-4"
                      >
                        {info.severity}
                      </Badge>
                    </div>
                  </div>

                  {showDetails && (
                    <>
                      <p className="text-xs opacity-80 mb-2">
                        {info.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs opacity-70">
                        <Users className="h-3 w-3" />
                        {info.prevalence}
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      {!activeSimulation && (
        <div className="p-4 bg-base-200 rounded-lg border border-base-300">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Accessibility Simulation</p>
              <p className="text-base-content/70">
                Select a simulation type above to see how your colors appear to
                people with different visual impairments. This helps ensure your
                designs are accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

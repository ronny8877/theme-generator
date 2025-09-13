"use client";

import React from "react";
import {
  simulateColor,
  SIMULATION_INFO,
  type SimulationType,
} from "@/lib/accessibility-simulation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ColorComparisonProps {
  colors: string[];
  simulationType: SimulationType;
  className?: string;
}

export function ColorComparison({
  colors,
  simulationType,
  className = "",
}: ColorComparisonProps) {
  const simulationInfo = SIMULATION_INFO[simulationType];

  const copyColor = (color: string, label: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${label} color copied: ${color}`);
  };

  const copyAllOriginal = () => {
    const colorString = colors.join(", ");
    navigator.clipboard.writeText(colorString);
    toast.success("All original colors copied to clipboard");
  };

  const copyAllSimulated = () => {
    const simulatedColors = colors.map((color) =>
      simulateColor(color, simulationType),
    );
    const colorString = simulatedColors.join(", ");
    navigator.clipboard.writeText(colorString);
    toast.success("All simulated colors copied to clipboard");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Color Comparison</h3>
          <p className="text-sm text-base-content/70">
            Simulating {simulationInfo.name} ({simulationInfo.prevalence})
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAllOriginal}
            className="gap-2"
          >
            <Copy className="h-3 w-3" />
            Copy Original
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyAllSimulated}
            className="gap-2"
          >
            <Copy className="h-3 w-3" />
            Copy Simulated
          </Button>
        </div>
      </div>

      {/* Color Grid */}
      <div className="grid gap-4">
        {colors.map((originalColor, index) => {
          const simulatedColor = simulateColor(originalColor, simulationType);
          const isDifferent =
            originalColor.toLowerCase() !== simulatedColor.toLowerCase();

          return (
            <div key={index} className="p-4 bg-base-100 rounded-lg border">
              <div className="flex items-center gap-4">
                {/* Original Color */}
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Original</div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyColor(originalColor, "Original")}
                      className="w-16 h-16 rounded-lg border-2 border-base-300 hover:border-primary/50 transition-all hover:scale-105 relative group"
                      style={{ backgroundColor: originalColor }}
                      title={`Copy ${originalColor}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </button>
                    <div>
                      <code className="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                        {originalColor.toUpperCase()}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="h-5 w-5 text-base-content/50" />
                  {isDifferent ? (
                    <Badge variant="destructive" className="text-xs">
                      Changed
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs">
                      Same
                    </Badge>
                  )}
                </div>

                {/* Simulated Color */}
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">
                    As seen with {simulationInfo.name}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyColor(simulatedColor, "Simulated")}
                      className="w-16 h-16 rounded-lg border-2 border-base-300 hover:border-primary/50 transition-all hover:scale-105 relative group"
                      style={{ backgroundColor: simulatedColor }}
                      title={`Copy ${simulatedColor}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </button>
                    <div>
                      <code className="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                        {simulatedColor.toUpperCase()}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-4 bg-base-200 rounded-lg border">
        <div className="text-sm">
          <p className="font-medium mb-1">Simulation Summary</p>
          <p className="text-base-content/70">
            {
              colors.filter(
                (color) =>
                  color.toLowerCase() !==
                  simulateColor(color, simulationType).toLowerCase(),
              ).length
            }{" "}
            out of {colors.length} colors appear different to people with{" "}
            {simulationInfo.name}.
          </p>
          {simulationInfo.severity === "severe" && (
            <p className="text-warning text-xs mt-2">
              ⚠️ This is a severe condition that significantly affects color
              perception.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

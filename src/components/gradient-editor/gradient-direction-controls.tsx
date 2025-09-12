"use client";

import React from "react";
import { 
  GradientConfig, 
  RadialGradientConfig, 
  ConicGradientConfig 
} from "@/lib/gradient-utils";

interface GradientDirectionControlsProps {
  gradient: GradientConfig;
  onUpdate: (gradient: GradientConfig) => void;
}

export const GradientDirectionControls: React.FC<GradientDirectionControlsProps> = ({
  gradient,
  onUpdate,
}) => {
  if (gradient.type === "linear") {
    const angle = typeof gradient.direction === "number" ? gradient.direction : 90;
    
    return (
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Angle: {angle}°</span>
          </label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => onUpdate({ ...gradient, direction: Number(e.target.value) })}
            className="range range-primary"
          />
          <div className="w-full flex justify-between text-xs text-base-content/60 px-2 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>

        {/* Quick Direction Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "→", angle: 90, tooltip: "To Right" },
            { label: "↓", angle: 180, tooltip: "To Bottom" },
            { label: "←", angle: 270, tooltip: "To Left" },
            { label: "↑", angle: 0, tooltip: "To Top" },
          ].map(({ label, angle: quickAngle, tooltip }) => (
            <button
              key={quickAngle}
              onClick={() => onUpdate({ ...gradient, direction: quickAngle })}
              className={`btn btn-sm ${angle === quickAngle ? "btn-primary" : "btn-outline"}`}
              title={tooltip}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gradient.type === "radial") {
    const radialGradient = gradient as RadialGradientConfig;
    const shape = radialGradient.shape || "ellipse";
    const size = radialGradient.size || "farthest-corner";
    const position = radialGradient.position || { x: 50, y: 50 };

    return (
      <div className="space-y-4">
        {/* Shape Selection */}
        <div>
          <label className="label">
            <span className="label-text">Shape</span>
          </label>
          <div className="flex gap-2">
            {(["circle", "ellipse"] as const).map((shapeOption) => (
              <button
                key={shapeOption}
                onClick={() => {
                  const updatedGradient: RadialGradientConfig = {
                    ...radialGradient,
                    shape: shapeOption
                  };
                  onUpdate(updatedGradient);
                }}
                className={`btn btn-sm flex-1 ${shape === shapeOption ? "btn-primary" : "btn-outline"}`}
              >
                {shapeOption.charAt(0).toUpperCase() + shapeOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="label">
            <span className="label-text">Size</span>
          </label>
          <select
            value={size}
            onChange={(e) => {
              const updatedGradient: RadialGradientConfig = {
                ...radialGradient,
                size: e.target.value as RadialGradientConfig["size"]
              };
              onUpdate(updatedGradient);
            }}
            className="select select-bordered w-full"
          >
            <option value="closest-side">Closest Side</option>
            <option value="closest-corner">Closest Corner</option>
            <option value="farthest-side">Farthest Side</option>
            <option value="farthest-corner">Farthest Corner</option>
          </select>
        </div>

        {/* Position Controls */}
        <div>
          <label className="label">
            <span className="label-text">Position</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label py-1">
                <span className="label-text text-xs">X: {position.x}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={position.x}
                onChange={(e) => {
                  const updatedGradient: RadialGradientConfig = {
                    ...radialGradient,
                    position: { ...position, x: Number(e.target.value) }
                  };
                  onUpdate(updatedGradient);
                }}
                className="range range-primary range-sm"
              />
            </div>
            <div>
              <label className="label py-1">
                <span className="label-text text-xs">Y: {position.y}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={position.y}
                onChange={(e) => {
                  const updatedGradient: RadialGradientConfig = {
                    ...radialGradient,
                    position: { ...position, y: Number(e.target.value) }
                  };
                  onUpdate(updatedGradient);
                }}
                className="range range-primary range-sm"
              />
            </div>
          </div>
        </div>

        {/* Quick Position Presets */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Quick Positions</span>
          </label>
          <div className="grid grid-cols-3 gap-1 text-xs">
            {[
              { label: "↖", x: 0, y: 0, tooltip: "Top Left" },
              { label: "↑", x: 50, y: 0, tooltip: "Top" },
              { label: "↗", x: 100, y: 0, tooltip: "Top Right" },
              { label: "←", x: 0, y: 50, tooltip: "Left" },
              { label: "●", x: 50, y: 50, tooltip: "Center" },
              { label: "→", x: 100, y: 50, tooltip: "Right" },
              { label: "↙", x: 0, y: 100, tooltip: "Bottom Left" },
              { label: "↓", x: 50, y: 100, tooltip: "Bottom" },
              { label: "↘", x: 100, y: 100, tooltip: "Bottom Right" },
            ].map(({ label, x, y, tooltip }) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  const updatedGradient: RadialGradientConfig = {
                    ...radialGradient,
                    position: { x, y }
                  };
                  onUpdate(updatedGradient);
                }}
                className={`btn btn-xs ${position.x === x && position.y === y ? "btn-primary" : "btn-outline"}`}
                title={tooltip}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gradient.type === "conic") {
    const conicGradient = gradient as ConicGradientConfig;
    const angle = conicGradient.angle || 0;
    const position = conicGradient.position || { x: 50, y: 50 };

    return (
      <div className="space-y-4">
        {/* Angle Control */}
        <div>
          <label className="label">
            <span className="label-text">Start Angle: {angle}°</span>
          </label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => {
              const updatedGradient: ConicGradientConfig = {
                ...conicGradient,
                angle: Number(e.target.value)
              };
              onUpdate(updatedGradient);
            }}
            className="range range-primary"
          />
          <div className="w-full flex justify-between text-xs text-base-content/60 px-2 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>

        {/* Position Controls */}
        <div>
          <label className="label">
            <span className="label-text">Center Position</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label py-1">
                <span className="label-text text-xs">X: {position.x}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={position.x}
                onChange={(e) => {
                  const updatedGradient: ConicGradientConfig = {
                    ...conicGradient,
                    position: { ...position, x: Number(e.target.value) }
                  };
                  onUpdate(updatedGradient);
                }}
                className="range range-primary range-sm"
              />
            </div>
            <div>
              <label className="label py-1">
                <span className="label-text text-xs">Y: {position.y}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={position.y}
                onChange={(e) => {
                  const updatedGradient: ConicGradientConfig = {
                    ...conicGradient,
                    position: { ...position, y: Number(e.target.value) }
                  };
                  onUpdate(updatedGradient);
                }}
                className="range range-primary range-sm"
              />
            </div>
          </div>
        </div>

        {/* Quick Position Presets */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Quick Positions</span>
          </label>
          <div className="grid grid-cols-3 gap-1 text-xs">
            {[
              { label: "↖", x: 0, y: 0, tooltip: "Top Left" },
              { label: "↑", x: 50, y: 0, tooltip: "Top" },
              { label: "↗", x: 100, y: 0, tooltip: "Top Right" },
              { label: "←", x: 0, y: 50, tooltip: "Left" },
              { label: "●", x: 50, y: 50, tooltip: "Center" },
              { label: "→", x: 100, y: 50, tooltip: "Right" },
              { label: "↙", x: 0, y: 100, tooltip: "Bottom Left" },
              { label: "↓", x: 50, y: 100, tooltip: "Bottom" },
              { label: "↘", x: 100, y: 100, tooltip: "Bottom Right" },
            ].map(({ label, x, y, tooltip }) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  const updatedGradient: ConicGradientConfig = {
                    ...conicGradient,
                    position: { x, y }
                  };
                  onUpdate(updatedGradient);
                }}
                className={`btn btn-xs ${position.x === x && position.y === y ? "btn-primary" : "btn-outline"}`}
                title={tooltip}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GradientDirectionControls;
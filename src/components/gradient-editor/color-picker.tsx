"use client";

import React, { useState } from "react";
import { X, Palette } from "lucide-react";
import ColorLab from "@/components/editor/advance-editor/color-lab";

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialColor: string;
  onColorChange: (color: string) => void;
  title?: string;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  initialColor,
  onColorChange,
  title = "Pick Color",
}) => {
  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleColorChange = (colorData: {
    hex: string;
    h: number;
    s: number;
    l: number;
    a: number;
  }) => {
    setCurrentColor(colorData.hex);
  };

  const handleApply = () => {
    onColorChange(currentColor);
    onClose();
  };

  const handleCancel = () => {
    setCurrentColor(initialColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Palette className="w-4 h-4 text-primary-content" />
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <button
            onClick={handleCancel}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Color Lab */}
        <div className="p-4">
          <ColorLab
            initial={initialColor}
            onChange={handleColorChange}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-base-300">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-8 rounded border border-base-300"
              style={{ backgroundColor: currentColor }}
            />
            <span className="font-mono text-sm">{currentColor}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="btn btn-primary"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GradientStopColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export const GradientStopColorPicker: React.FC<GradientStopColorPickerProps> = ({
  color,
  onColorChange,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {/* Simple Color Input */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs">Quick</span>
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            disabled={disabled}
            className="w-full h-8 rounded border border-base-300 disabled:opacity-50"
          />
        </div>

        {/* Advanced Color Picker Button */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs">Advanced</span>
          </label>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={disabled}
            className="btn btn-outline btn-sm h-8 disabled:opacity-50"
            style={{ borderColor: color }}
          >
            <Palette className="w-3 h-3" />
          </button>
        </div>
      </div>

      <ColorPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialColor={color}
        onColorChange={onColorChange}
        title="Edit Gradient Stop Color"
      />
    </>
  );
};

export default GradientStopColorPicker;
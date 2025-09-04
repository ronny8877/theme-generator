"use client";

import { useState } from "react";
import { useBodyFont, useFontActions, observer } from "@/store";
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  getFontWeights,
} from "@/store/font-constants";
import { FontSelector } from "./font-selector";
import { Select } from "./select";
import { Text } from "lucide-react";

export const BodyFontCard = observer(() => {
  const bodyFont = useBodyFont();
  const { updateBodyFont } = useFontActions();
  const [bodyFontOpen, setBodyFontOpen] = useState(false);

  const bodyWeights = getFontWeights(bodyFont.family).map((weight) => ({
    label: weight,
    value: weight,
  }));

  return (
    <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Text />
        </div>
        <div>
          <h3 className="font-semibold text-base-content">Body Font</h3>
          <p className="text-sm text-base-content/60">
            Configure body text typography
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            Font Family
          </label>
          <FontSelector
            value={bodyFont.family}
            onChange={(family) => updateBodyFont({ family })}
            isOpen={bodyFontOpen}
            onToggle={() => setBodyFontOpen(!bodyFontOpen)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Weight
            </label>
            <Select
              value={bodyFont.weight}
              onChange={(weight) => updateBodyFont({ weight })}
              options={bodyWeights}
              placeholder="Select weight"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Size
            </label>
            <Select
              value={bodyFont.size}
              onChange={(size) => updateBodyFont({ size })}
              options={FONT_SIZES}
              placeholder="Select size"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Line Height
            </label>
            <Select
              value={bodyFont.lineHeight}
              onChange={(lineHeight) => updateBodyFont({ lineHeight })}
              options={LINE_HEIGHTS}
              placeholder="Select line height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Letter Spacing
            </label>
            <Select
              value={bodyFont.letterSpacing}
              onChange={(letterSpacing) => updateBodyFont({ letterSpacing })}
              options={LETTER_SPACINGS}
              placeholder="Select spacing"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-base-200 rounded-xl p-4 border border-base-300">
          <p className="text-xs text-base-content/60 mb-2">Preview</p>
          <p
            style={{
              fontFamily: `"${bodyFont.family}", sans-serif`,
              fontWeight: bodyFont.weight,
              fontSize: bodyFont.size,
              lineHeight: bodyFont.lineHeight,
              letterSpacing: bodyFont.letterSpacing,
            }}
            className="break-words overflow-hidden"
          >
            This is sample body text that demonstrates how your chosen font
            settings will look in actual content. It includes multiple sentences
            to show the line height and letter spacing effects.
          </p>
        </div>
      </div>
    </div>
  );
});

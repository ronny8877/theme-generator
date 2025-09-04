"use client";

import { useState } from "react";
import { useHeadingFont, useFontActions, observer } from "@/store";
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  getFontWeights,
} from "@/store/font-constants";
import { FontSelector } from "./font-selector";
import { Select } from "./select";

export const HeadingFontCard = observer(() => {
  const headingFont = useHeadingFont();
  const { updateHeadingFont } = useFontActions();
  const [headingFontOpen, setHeadingFontOpen] = useState(false);

  const headingWeights = getFontWeights(headingFont.family).map((weight) => ({
    label: weight,
    value: weight,
  }));

  return (
    <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-base-content">Heading Font</h3>
          <p className="text-sm text-base-content/60">
            Configure heading typography
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            Font Family
          </label>
          <FontSelector
            value={headingFont.family}
            onChange={(family) => updateHeadingFont({ family })}
            isOpen={headingFontOpen}
            onToggle={() => setHeadingFontOpen(!headingFontOpen)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Weight
            </label>
            <Select
              value={headingFont.weight}
              onChange={(weight) => updateHeadingFont({ weight })}
              options={headingWeights}
              placeholder="Select weight"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Size
            </label>
            <Select
              value={headingFont.size}
              onChange={(size) => updateHeadingFont({ size })}
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
              value={headingFont.lineHeight}
              onChange={(lineHeight) => updateHeadingFont({ lineHeight })}
              options={LINE_HEIGHTS}
              placeholder="Select line height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Letter Spacing
            </label>
            <Select
              value={headingFont.letterSpacing}
              onChange={(letterSpacing) => updateHeadingFont({ letterSpacing })}
              options={LETTER_SPACINGS}
              placeholder="Select spacing"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-base-200 rounded-xl p-4 border border-base-300">
          <p className="text-xs text-base-content/60 mb-2">Preview</p>
          <h2
            style={{
              fontFamily: `"${headingFont.family}", sans-serif`,
              fontWeight: headingFont.weight,
              fontSize: headingFont.size,
              lineHeight: headingFont.lineHeight,
              letterSpacing: headingFont.letterSpacing,
            }}
            className="break-words overflow-hidden"
          >
            Sample Heading Text
          </h2>
        </div>
      </div>
    </div>
  );
});

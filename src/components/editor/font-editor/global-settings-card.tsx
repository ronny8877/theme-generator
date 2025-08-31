"use client";

import { useStore } from "@nanostores/react";
import { $fontOverrides, updateFontOverrides } from "@/store/font-store";
import { Input } from "./input";

export const GlobalSettingsCard = () => {
  const fontOverrides = useStore($fontOverrides);

  return (
    <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-base-content">Global Settings</h3>
          <p className="text-sm text-base-content/60">
            Overall font controls and spacing
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Global Line Height
            </label>
            <Input
              value={fontOverrides.lineHeight}
              onChange={(lineHeight) => updateFontOverrides({ lineHeight })}
              placeholder="1.5"
              type="number"
              min={1}
              max={3}
              step={0.1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Global Letter Spacing
            </label>
            <Input
              value={fontOverrides.letterSpacing}
              onChange={(letterSpacing) =>
                updateFontOverrides({ letterSpacing })
              }
              placeholder="0em"
              suffix="em"
              type="number"
              min={-0.1}
              max={0.2}
              step={0.01}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Heading Margin Bottom
            </label>
            <Input
              value={fontOverrides.headingMarginBottom}
              onChange={(headingMarginBottom) =>
                updateFontOverrides({ headingMarginBottom })
              }
              placeholder="1rem"
              suffix="rem"
              type="number"
              min={0}
              max={5}
              step={0.25}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Body Margin Bottom
            </label>
            <Input
              value={fontOverrides.bodyMarginBottom}
              onChange={(bodyMarginBottom) =>
                updateFontOverrides({ bodyMarginBottom })
              }
              placeholder="1rem"
              suffix="rem"
              type="number"
              min={0}
              max={5}
              step={0.25}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Heading Min Margin
            </label>
            <Input
              value={fontOverrides.headingMinMargin}
              onChange={(headingMinMargin) =>
                updateFontOverrides({ headingMinMargin })
              }
              placeholder="0.5rem"
              suffix="rem"
              type="number"
              min={0}
              max={3}
              step={0.25}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Body Min Margin
            </label>
            <Input
              value={fontOverrides.bodyMinMargin}
              onChange={(bodyMinMargin) =>
                updateFontOverrides({ bodyMinMargin })
              }
              placeholder="0.25rem"
              suffix="rem"
              type="number"
              min={0}
              max={3}
              step={0.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

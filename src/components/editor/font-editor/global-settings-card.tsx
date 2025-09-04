"use client";

import { useFontOverrides, useFontActions, observer } from "@/store";
import { Input } from "./input";
import { Globe2 } from "lucide-react";

const DEFAULT_FONT_OVERRIDES = {
  lineHeight: "1.5",
  letterSpacing: "0em",
  headingMarginBottom: "1rem",
  bodyMarginBottom: "1rem",
  headingMinMargin: "0.5rem",
  bodyMinMargin: "0.25rem",
};

export const GlobalSettingsCard = observer(() => {
  const fontOverrides = useFontOverrides();
  const { updateFontOverrides } = useFontActions();

  return (
    <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Globe2 />
        </div>
        <div>
          <h3 className="font-semibold text-base-content">Global Settings</h3>
          <p className="text-sm text-base-content/60">
            Overall font controls and spacing
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
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
              max={5}
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
              max={5}
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
              max={10}
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
              max={10}
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
              max={5}
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
              max={5}
              step={0.25}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => updateFontOverrides(DEFAULT_FONT_OVERRIDES)}
          className="btn rounded-3xl w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
});

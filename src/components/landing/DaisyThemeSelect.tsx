"use client";
import React from "react";
import { DAISY_UI_AVILABLE_THEMES } from "@/lib/constants/constants";

export type DaisyThemeSelectProps = {
  value?: string;
  onSelect?: (theme: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const pretty = (t: string) => t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const DaisyThemeSelect: React.FC<DaisyThemeSelectProps> = React.memo(
  ({ value = "light", onSelect, className = "", size = "md", label = "Theme" }) => {
    return (
      <div className={`dropdown ${className}`}>
        <div tabIndex={0} role="button" className={`btn btn-${size} btn-ghost gap-2 rounded-box`}>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="opacity-70">{label}:</span>
            <span className="font-medium">{pretty(value)}</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
        </div>
        <div tabIndex={0} className="dropdown-content z-[1] shadow bg-base-100 rounded-box w-72 max-h-80 overflow-y-auto theme-scroll p-2">
          <div className="flex flex-col gap-1">
            {DAISY_UI_AVILABLE_THEMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`btn btn-ghost btn-sm justify-between w-full rounded-box ${t === value ? "bg-primary/10" : ""}`}
                onClick={() => onSelect?.(t)}
              >
                <span className="flex items-center gap-3">
                  <span className="kbd kbd-xs">{t.slice(0, 1).toUpperCase()}</span>
                  {pretty(t)}
                  {/* Live color swatches using the theme's own tokens */}
                  <span data-theme={t} className="ml-1 inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </span>
                </span>
                {t === value && <span className="badge badge-primary badge-sm px-3 py-2">Selected</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

DaisyThemeSelect.displayName = "DaisyThemeSelect";

export default DaisyThemeSelect;

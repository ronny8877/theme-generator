"use client";
import React from "react";
import { GOOGLE_FONTS } from "@/store/font-store";

export type FontSelectProps = {
  value?: string; // font family
  onSelect?: (family: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

export const FontSelect: React.FC<FontSelectProps> = React.memo(
  ({ value = "Inter", onSelect, className = "", size = "md", label = "Font" }) => {
    return (
      <div className={`dropdown ${className}`}>
        <div tabIndex={0} role="button" className={`btn btn-${size} btn-ghost gap-2`}>
          <span className="opacity-70">{label}:</span>
          <span className="font-medium" style={{ fontFamily: value }}>{value}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 max-h-80 overflow-y-auto theme-scroll">
          {GOOGLE_FONTS.map((f) => (
            <li key={f.family}>
              <button
                type="button"
                className={`justify-between ${f.family === value ? "active" : ""}`}
                onClick={() => onSelect?.(f.family)}
                style={{ fontFamily: f.family }}
              >
                {f.family}
                {f.family === value && <span className="badge badge-primary badge-sm">Selected</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

FontSelect.displayName = "FontSelect";

export default FontSelect;

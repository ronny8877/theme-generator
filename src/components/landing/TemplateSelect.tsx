"use client";
import React, { useMemo } from "react";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";

export type TemplateSelectProps = {
  value?: string; // template id
  onSelect?: (id: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const pretty = (s: string) => s;

const TemplateSelect: React.FC<TemplateSelectProps> = React.memo(
  ({ value, onSelect, className = "", size = "md", label = "Template" }) => {
    const items = TEMPLATES_ARRAY;
    const active = useMemo(
      () => items.find((t) => t.id === value) || items[0],
      [items, value],
    );

    return (
      <div className={`dropdown ${className}`}>
        <div
          tabIndex={0}
          role="button"
          className={`btn btn-${size} btn-ghost gap-2 rounded-box`}
          aria-label={`${label} selector`}
        >
          <span className="opacity-70">{label}:</span>
          <span className="font-medium truncate max-w-[14rem]">
            {pretty(active?.title || "")}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="opacity-60"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[100] shadow bg-base-100 rounded-box w-80 max-h-96 overflow-y-auto theme-scroll p-2"
        >
          <div className="flex flex-col gap-1">
            {items.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`btn btn-ghost btn-sm justify-between w-full rounded-box ${
                  t.id === active?.id ? "bg-primary/10" : ""
                }`}
                onClick={() => onSelect?.(t.id)}
                title={t.description}
              >
                <span className="flex items-center gap-3 text-left">
                  <span className="kbd kbd-xs">{t.title.slice(0, 1)}</span>
                  <span className="truncate max-w-[11rem]">{t.title}</span>
                </span>
                {t.id === active?.id && (
                  <span className="badge badge-primary badge-sm px-3 py-2">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

TemplateSelect.displayName = "TemplateSelect";

export default TemplateSelect;

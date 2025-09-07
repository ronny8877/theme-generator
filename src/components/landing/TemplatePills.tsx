"use client";
import React from "react";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";

export type TemplatePillsProps = {
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  limit?: number;
};

export const TemplatePills: React.FC<TemplatePillsProps> = React.memo(
  ({ activeId, onSelect, className = "", limit = 4 }) => {
    const items = TEMPLATES_ARRAY.slice(0, limit);
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {items.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect?.(t.id)}
            className={`btn btn-sm rounded-full ${
              activeId === t.id ? "btn-primary" : "btn-ghost"
            }`}
          > <a onClick={(e)=>{e.preventDefault()}} href={`/preview/${t.id}`}>
            {t.title}
            </a>
          </button>
        ))}
      </div>
    );
  },
);

TemplatePills.displayName = "TemplatePills";

export default TemplatePills;

"use client";

import React from "react";
import { parse } from "culori";
import {
  useHeadingFont,
  useBodyFont,
  useActiveThemeName,
  useIsThemeEdited,
  usePendingTemplateThemeName,
  useTemplateActions,
} from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $prominentColors } from "@/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Minimal typed shape for culori parse result to avoid `any` in this file
type ParsedColor = {
  r?: number;
  g?: number;
  b?: number;
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
  a?: number;
};

function ThemeInfoBase() {
  const themeName = useActiveThemeName();
  const colors = useStore($prominentColors);

  const heading = useHeadingFont();
  const body = useBodyFont();
  const isEdited = useIsThemeEdited();
  const pendingTemplateTheme = usePendingTemplateThemeName();
  const { applyThemeAndResetBaseline, saveEditedTheme } = useTemplateActions();
  const [open, setOpen] = React.useState(false);

  // local state to trigger small animations when theme changes

  if (!themeName) return null;

  return (
    <div className="absolute left-1/2   -translate-x-1/2 z-50">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved theme changes</AlertDialogTitle>
            <AlertDialogDescription>
              Save your edited theme or discard changes before applying the
              template&apos;s theme?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingTemplateTheme) return;
                applyThemeAndResetBaseline(pendingTemplateTheme);
                setOpen(false);
              }}
            >
              Discard & Apply
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                if (!pendingTemplateTheme) return;
                saveEditedTheme();
                applyThemeAndResetBaseline(pendingTemplateTheme);
                setOpen(false);
              }}
            >
              Save & Apply
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="group relative">
        {/* Pill */}
        <div
          className={`px-5 cursor-default py-1.5 rounded-full bg-base-200 border border-base-300 shadow-sm flex items-center gap-3`}
          aria-hidden
        >
          <div className="text-sm font-medium capitalize text-base-content">
            {themeName}
          </div>
          {isEdited && (
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/30">
              Edited
            </div>
          )}
          <div className="text-xs text-base-content/40">•</div>
          <div className="text-xs text-base-content/60 truncate max-w-[8rem]">
            {heading.family}
          </div>
          {pendingTemplateTheme && (
            <button
              className="ml-3 text-xs px-3 py-1 rounded-full border border-base-300 bg-base-100 hover:bg-base-200 transition-colors"
              onClick={() => {
                if (isEdited) setOpen(true);
                else applyThemeAndResetBaseline(pendingTemplateTheme);
              }}
              title={`Apply template theme: ${pendingTemplateTheme}`}
            >
              Apply “{pendingTemplateTheme}”
            </button>
          )}
        </div>

        {/* Hover panel */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-auto bg-base-100 border border-base-300 rounded-3xl shadow-lg p-5 opacity-0 scale-95 transform transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-base-content capitalize">
              {themeName}
            </div>
            <div className="text-xs text-base-content/60">Theme</div>
          </div>

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <div className="text-xs text-base-content/60 mb-1">Primary</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-6 rounded border transition-transform duration-300 ease-out transform`}
                  style={{ background: colors.primary }}
                />
                <div className="text-xs text-base-content/70">
                  {toHex(colors.primary)}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs text-base-content/60 mb-1">Base</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-6 rounded border transition-transform duration-300 ease-out transform
                 `}
                  style={{ background: colors.base }}
                />
                <div className="text-xs text-base-content/70">
                  {toHex(colors.base)}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs text-base-content/60 mb-1">Accent</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-6 rounded border transition-transform duration-300 ease-out transform`}
                  style={{ background: colors.accent }}
                />
                <div className="text-xs text-base-content/70">
                  {toHex(colors.accent)}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-base-300 pt-2">
            <div className="text-xs text-base-content/60 mb-1">Fonts</div>
            <div className="text-sm text-base-content space-y-2">
              <div className="truncate font-semibold">
                Heading: {heading.family} • {heading.weight} • {heading.size}
              </div>
              <div className="truncate text-xs text-base-content/70">
                Body: {body.family} • {body.weight} • {body.size}
              </div>

              {/* Small font previews */}
              <div className="mt-1 flex flex-col gap-1">
                <div className="text-xs text-base-content/70">Preview</div>
                <div className="flex gap-2 items-center">
                  <div
                    className="flex-1 text-sm truncate"
                    style={{ fontFamily: heading.family }}
                  >
                    Aa — {heading.family}
                  </div>
                  <div
                    className="flex-1 text-xs truncate text-base-content/70"
                    style={{ fontFamily: body.family }}
                  >
                    aa — {body.family}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ThemeInfo = React.memo(ThemeInfoBase);
export default ThemeInfo;

// Convert a color string (oklch, named, rgb, etc.) to hex (#rrggbb or #rrggbbaa)
const toHex = (value: string) => {
  try {
    const parsed = parse(value);
    if (!parsed) return value;

    // culori parses to srgb-like values in 0..1 for r/g/b and optional alpha
    const p = parsed as ParsedColor;
    const r = p.r ?? p.red ?? null;
    const g = p.g ?? p.green ?? null;
    const b = p.b ?? p.blue ?? null;
    const a = p.alpha ?? p.a ?? null;

    if (
      typeof r === "number" &&
      typeof g === "number" &&
      typeof b === "number"
    ) {
      const R = Math.round(Math.max(0, Math.min(1, r)) * 255);
      const G = Math.round(Math.max(0, Math.min(1, g)) * 255);
      const B = Math.round(Math.max(0, Math.min(1, b)) * 255);

      const hex =
        "#" +
        [R, G, B].map((v: number) => v.toString(16).padStart(2, "0")).join("");

      if (typeof a === "number" && a < 1) {
        const A = Math.round(Math.max(0, Math.min(1, a)) * 255);
        return hex + A.toString(16).padStart(2, "0");
      }

      return hex;
    }

    return value;
  } catch {
    return value;
  }
};

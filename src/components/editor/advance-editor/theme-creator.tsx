"use client";

import * as React from "react";
import { useStore } from "@nanostores/react";
import {
  $activeTheme,
  updateThemeColor,
  updateRadius,
  updateMiscConfig,
  saveCurrentThemeAs,
  initUserThemes,
} from "@/store/nano-store";
import { AdvancedColorPicker } from "./color-picker";

type ColorKey = keyof ReturnType<typeof useActiveColors>;

// Simple fun name pools for default theme names
const THEME_ADJECTIVES = [
  "Neon",
  "Solar",
  "Velvet",
  "Quantum",
  "Crystal",
  "Aurora",
  "Midnight",
  "Prismatic",
  "Retro",
  "Electric",
  "Lunar",
  "Pixel",
];

const THEME_NOUNS = [
  "Falcon",
  "Wave",
  "Blossom",
  "Pulse",
  "Forge",
  "Echo",
  "Nova",
  "Drift",
  "Spectrum",
  "Glide",
  "Breeze",
  "Matrix",
];

function defaultFakeName() {
  const adj =
    THEME_ADJECTIVES[Math.floor(Math.random() * THEME_ADJECTIVES.length)];
  const noun = THEME_NOUNS[Math.floor(Math.random() * THEME_NOUNS.length)];
  return `${adj} ${noun}`;
}

function useActiveColors() {
  const theme = useStore($activeTheme);
  // robust fallback so UI never crashes if a key is missing
  const c = theme?.colors ?? {};
  return {
    ["--color-base-100"]: c["--color-base-100"] ?? "#111827",
    ["--color-base-200"]: c["--color-base-200"] ?? "#374151",
    ["--color-base-300"]: c["--color-base-300"] ?? "#1f2937",
    ["--color-base-content"]: c["--color-base-content"] ?? "#ffffff",

    ["--color-primary"]: c["--color-primary"] ?? "#60a5fa",
    ["--color-primary-content"]: c["--color-primary-content"] ?? "#0b1220",

    ["--color-secondary"]: c["--color-secondary"] ?? "#93c5fd",
    ["--color-secondary-content"]: c["--color-secondary-content"] ?? "#0b1220",

    ["--color-accent"]: c["--color-accent"] ?? "#f59e0b",
    ["--color-accent-content"]: c["--color-accent-content"] ?? "#111827",

    ["--color-neutral"]: c["--color-neutral"] ?? "#374151",
    ["--color-neutral-content"]: c["--color-neutral-content"] ?? "#e5e7eb",

    ["--color-info"]: c["--color-info"] ?? "#0ea5e9",
    ["--color-info-content"]: c["--color-info-content"] ?? "#ffffff",

    ["--color-success"]: c["--color-success"] ?? "#22c55e",
    ["--color-success-content"]: c["--color-success-content"] ?? "#ffffff",

    ["--color-warning"]: c["--color-warning"] ?? "#d97706",
    ["--color-warning-content"]: c["--color-warning-content"] ?? "#0b1220",

    ["--color-error"]: c["--color-error"] ?? "#ef4444",
    ["--color-error-content"]: c["--color-error-content"] ?? "#ffffff",
  } as const;
}

function Swatch({
  color,
  bgColor,
  label,
  showLetter,
  active,
  onClick,
}: {
  color: string;
  bgColor?: string;
  label?: string;
  showLetter?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-11 h-11 min-w-11 sm:w-12 sm:h-12 rounded-xl border overflow-hidden shadow-sm hover:scale-[1.03] transition-transform ${
        active ? "border-primary ring-2 ring-primary/30" : "border-base-300"
      }`}
      style={{
        // If this is a text-content swatch (showLetter), fill the swatch with the text color itself
        // so changes are reflected on the full tile, not just the letter.
        background: showLetter ? color : (bgColor ?? color),
        // Let the letter color inherit; it's decorative and shouldn't hide the swatch color
        color: showLetter ? undefined : undefined,
      }}
      aria-label={label}
      title={label}
    >
      {label && (
        <span className="absolute top-1 left-1 text-[10px] font-medium px-1.5 rounded-full bg-black/35 text-white">
          {label}
        </span>
      )}
      {showLetter && (
        <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-black tracking-wider">
          A
        </span>
      )}
    </button>
  );
}

function ColorGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{
    key: ColorKey;
    label?: string;
    showLetter?: boolean;
    bgKey?: ColorKey;
  }>;
}) {
  const colors = useActiveColors();
  const [editing, setEditing] = React.useState<null | { key: ColorKey }>(null);
  // Debounced color update to avoid flooding store during slider drags
  const debouncedUpdate = React.useMemo(() => {
    let t: number | null = null;
    let lastKey: ColorKey | null = null;
    let lastHex = "";
    return (key: ColorKey, hex: string) => {
      lastKey = key;
      lastHex = hex;
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        if (lastKey) updateThemeColor(lastKey, lastHex);
      }, 60);
    };
  }, []);

  const open = !!editing;
  const currentKey = editing?.key ?? (items[0]?.key as ColorKey);
  const current = colors[currentKey];

  return (
    <div>
      <div className="flex gap-3">
        {items.map((it) => (
          <Swatch
            key={String(it.key)}
            color={colors[it.key]}
            bgColor={it.bgKey ? colors[it.bgKey] : undefined}
            label={it.label}
            showLetter={it.showLetter}
            active={editing?.key === it.key}
            onClick={() => setEditing({ key: it.key })}
          />
        ))}
      </div>
      <div className="text-xs mt-2 text-base-content/80">{title}</div>

      <AdvancedColorPicker
        open={open}
        onOpenChange={(v) => !v && setEditing(null)}
        value={current}
        onChange={(hex) => debouncedUpdate(currentKey, hex)}
        title={`Edit ${title}`}
        description={String(currentKey)}
      />
    </div>
  );
}

// -------------------- Radius & Misc helpers --------------------
function useActiveRadius() {
  const theme = useStore($activeTheme);
  const r = theme?.radius ?? {};
  return {
    ["--radius-box"]: r["--radius-box"] ?? "0.5rem",
    ["--radius-field"]: r["--radius-field"] ?? "0.5rem",
    ["--radius-selector"]: r["--radius-selector"] ?? "0.5rem",
  } as const;
}

// type RadiusKey = keyof ReturnType<typeof useActiveRadius>;

function useMisc() {
  const theme = useStore($activeTheme);
  const m = theme?.misc ?? {};
  // depth/noise are stored as numbers (0/1); border is string e.g. "1px"
  const borderNumber =
    typeof m["--border"] === "string" ? parseInt(m["--border"], 10) : 1;
  return {
    depth: Number(m["--depth"] ?? 0),
    noise: Number(m["--noise"] ?? 0),
    border: Number.isFinite(borderNumber) ? borderNumber : 1,
    sizeSelector: m["--size-selector"] ?? "0.25rem",
    sizeField: m["--size-field"] ?? "0.25rem",
  } as const;
}

// ...removed debounced helper to apply slider changes immediately

function MiscEditor() {
  const misc = useMisc();
  // no save UI here; focused on misc options only

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={misc.depth > 0}
            onChange={(e) =>
              updateMiscConfig({ "--depth": e.target.checked ? 1 : 0 })
            }
            className="toggle toggle-primary"
          />
          <div>
            <div className="font-medium">Depth Effect</div>
            <div className="text-xs text-base-content/70">
              3D depth on fields & selectors
            </div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={misc.noise > 0}
            onChange={(e) =>
              updateMiscConfig({ "--noise": e.target.checked ? 1 : 0 })
            }
            className="toggle toggle-primary"
          />
          <div>
            <div className="font-medium">Noise Effect</div>
            <div className="text-xs text-base-content/70">
              Noise pattern on fields & selectors
            </div>
          </div>
        </label>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">Border Width</div>
            <div className="text-xs text-base-content/70">All components</div>
          </div>
          <div className="text-sm font-semibold">{misc.border}px</div>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={misc.border}
          onChange={(e) =>
            updateMiscConfig({ "--border": `${Number(e.target.value)}px` })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>

      {/* Size selectors */}
      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">Selector Size</div>
            <div className="text-xs text-base-content/70">--size-selector</div>
          </div>
          <div className="text-sm font-semibold">{misc.sizeSelector}</div>
        </div>
        <input
          type="range"
          min={0.25}
          max={2.5}
          step={0.25}
          value={parseFloat(String(misc.sizeSelector).replace("rem", ""))}
          onChange={(e) =>
            updateMiscConfig({
              "--size-selector": `${Number(e.target.value)}rem`,
            })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">Field Size</div>
            <div className="text-xs text-base-content/70">--size-field</div>
          </div>
          <div className="text-sm font-semibold">{misc.sizeField}</div>
        </div>
        <input
          type="range"
          min={0.25}
          max={2.5}
          step={0.25}
          value={parseFloat(String(misc.sizeField).replace("rem", ""))}
          onChange={(e) =>
            updateMiscConfig({ "--size-field": `${Number(e.target.value)}rem` })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>
    </div>
  );
}

export function ThemeCreator() {
  const [name, setName] = React.useState(() => defaultFakeName());
  React.useEffect(() => {
    initUserThemes();
  }, []);

  return (
    <div className="space-y-6">
      {/* Save theme UI at top */}
      <div className="card bg-base-100 border border-base-300 rounded-2xl p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Theme name (optional)"
            className="input input-bordered input-sm flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm rounded-full px-4"
            onClick={() => saveCurrentThemeAs(name)}
            title="Save your current theme to local storage"
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-base font-semibold">Change Colors</div>
        <div className="h-px bg-base-300 flex-1" />
      </div>
      {/* Base: 100, 200, 300, content */}
      <div className="grid grid-cols-4 gap-3">
        <ColorGroup
          title="base"
          items={[
            { key: "--color-base-100", label: "100" },
            { key: "--color-base-200", label: "200" },
            { key: "--color-base-300", label: "300" },
            {
              key: "--color-base-content",
              showLetter: true,
              label: "A",
              bgKey: "--color-base-300",
            },
          ]}
        />
      </div>

      {/* Two-column rows: primary/secondary, accent/neutral, info/success, warning/error */}
      <div className="grid grid-cols-2 gap-6">
        <ColorGroup
          title="primary"
          items={[
            { key: "--color-primary" },
            {
              key: "--color-primary-content",
              showLetter: true,
              bgKey: "--color-primary",
            },
          ]}
        />
        <ColorGroup
          title="secondary"
          items={[
            { key: "--color-secondary" },
            {
              key: "--color-secondary-content",
              showLetter: true,
              bgKey: "--color-secondary",
            },
          ]}
        />

        <ColorGroup
          title="accent"
          items={[
            { key: "--color-accent" },
            {
              key: "--color-accent-content",
              showLetter: true,
              bgKey: "--color-accent",
            },
          ]}
        />
        <ColorGroup
          title="neutral"
          items={[
            { key: "--color-neutral" },
            {
              key: "--color-neutral-content",
              showLetter: true,
              bgKey: "--color-neutral",
            },
          ]}
        />

        <ColorGroup
          title="info"
          items={[
            { key: "--color-info" },
            {
              key: "--color-info-content",
              showLetter: true,
              bgKey: "--color-info",
            },
          ]}
        />
        <ColorGroup
          title="success"
          items={[
            { key: "--color-success" },
            {
              key: "--color-success-content",
              showLetter: true,
              bgKey: "--color-success",
            },
          ]}
        />

        <ColorGroup
          title="warning"
          items={[
            { key: "--color-warning" },
            {
              key: "--color-warning-content",
              showLetter: true,
              bgKey: "--color-warning",
            },
          ]}
        />
        <ColorGroup
          title="error"
          items={[
            { key: "--color-error" },
            {
              key: "--color-error-content",
              showLetter: true,
              bgKey: "--color-error",
            },
          ]}
        />
      </div>

      {/* Radius (sliders 0–6) */}
      <div className="flex items-center gap-3 pt-2">
        <div className="text-base font-semibold">Radius</div>
        <div className="h-px bg-base-300 flex-1" />
      </div>
      <RadiusSliders />

      {/* Misc */}
      <div className="flex items-center gap-3 pt-2">
        <div className="text-base font-semibold">Effects & Misc</div>
        <div className="h-px bg-base-300 flex-1" />
      </div>
      <MiscEditor />
    </div>
  );
}

// New component: Three sliders for radius (0 to 6rem)
function RadiusSliders() {
  const radii = useActiveRadius();
  const toNum = (v?: string) => {
    const n = parseFloat(String(v ?? "0").replace("rem", ""));
    return Number.isFinite(n) ? n : 0;
  };
  // apply radius updates immediately (no debounce)
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">--radius-box</div>
            <div className="text-xs text-base-content/70">
              Boxes (card, modal, alert)
            </div>
          </div>
          <div className="text-sm font-semibold">{radii["--radius-box"]}</div>
        </div>
        <input
          type="range"
          min={0}
          max={6}
          step={0.25}
          value={toNum(radii["--radius-box"])}
          onChange={(e) =>
            updateRadius({ "--radius-box": `${Number(e.target.value)}rem` })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">--radius-field</div>
            <div className="text-xs text-base-content/70">
              Fields (button, input, select, tab)
            </div>
          </div>
          <div className="text-sm font-semibold">{radii["--radius-field"]}</div>
        </div>
        <input
          type="range"
          min={0}
          max={6}
          step={0.25}
          value={toNum(radii["--radius-field"])}
          onChange={(e) =>
            updateRadius({ "--radius-field": `${Number(e.target.value)}rem` })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-medium">--radius-selector</div>
            <div className="text-xs text-base-content/70">
              Selectors (checkbox, toggle, badge)
            </div>
          </div>
          <div className="text-sm font-semibold">
            {radii["--radius-selector"]}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={6}
          step={0.25}
          value={toNum(radii["--radius-selector"])}
          onChange={(e) =>
            updateRadius({
              "--radius-selector": `${Number(e.target.value)}rem`,
            })
          }
          className="range range-primary mt-3 w-full"
        />
      </div>
    </div>
  );
}

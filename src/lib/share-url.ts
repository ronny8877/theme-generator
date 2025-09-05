import { $activeTemplateIdAtom, $themeColors } from "@/store/nano-store";
import type { ColorScheme } from "@/store/nano-store";
import { $headingFont, $bodyFont } from "@/store/font-store";
import type { ToolVariant } from "@/store/nano-store";
import { compressToBase64, decompressFromBase64 } from "lz-string";

// Fixed order for compact color packing
export const COLOR_KEYS: (keyof ColorScheme)[] = [
  "--color-base-100",
  "--color-base-200",
  "--color-base-300",
  "--color-base-content",
  "--color-primary",
  "--color-primary-content",
  "--color-secondary",
  "--color-secondary-content",
  "--color-accent",
  "--color-accent-content",
  "--color-neutral",
  "--color-neutral-content",
  "--color-info",
  "--color-info-content",
  "--color-success",
  "--color-success-content",
  "--color-warning",
  "--color-warning-content",
  "--color-error",
  "--color-error-content",
];

// Base64 URL-safe helpers
function toBase64Url(b64: string) {
  return b64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function fromBase64Url(b64url: string) {
  let s = b64url.replaceAll("-", "+").replaceAll("_", "/");
  // pad
  while (s.length % 4) s += "=";
  return s;
}

export type EncodedState = {
  tool: ToolVariant;
  templateId: string;
  colorsCsv: string; // comma-separated color strings in COLOR_KEYS order
  fonts: {
    headingFamily: string;
    headingWeight: string;
    bodyFamily: string;
    bodyWeight: string;
  };
};

export function captureCurrentState(
  templateId: string,
  tool: ToolVariant,
): EncodedState {
  const colors = $themeColors.get();
  const heading = $headingFont.get();
  const body = $bodyFont.get();
  const colorsCsv = COLOR_KEYS.map((k) => colors[k]).join(",");
  return {
    tool,
    templateId,
    colorsCsv,
    fonts: {
      headingFamily: heading.family,
      headingWeight: heading.weight,
      bodyFamily: body.family,
      bodyWeight: body.weight,
    },
  };
}

export function encodeStateToParam(state: EncodedState): string {
  // Compact string format, not JSON: k=v pairs joined by | to reduce braces
  const raw = [
    `v=1`,
    `tool=${encodeURIComponent(state.tool)}`,
    `t=${encodeURIComponent(state.templateId)}`,
    // colors as-is (oklch strings), comma-separated
    `c=${encodeURIComponent(state.colorsCsv)}`,
    // fonts h=family:weight;b=family:weight
    `f=${encodeURIComponent(
      `${state.fonts.headingFamily}:${state.fonts.headingWeight};${state.fonts.bodyFamily}:${state.fonts.bodyWeight}`,
    )}`,
  ].join("|");

  const b64 = compressToBase64(raw);
  return toBase64Url(b64);
}

export function decodeParamToState(param: string): EncodedState | null {
  try {
    const b64 = fromBase64Url(param);
    const raw = decompressFromBase64(b64);
    if (!raw) return null;
    const parts = raw.split("|");
    const map = new Map<string, string>();
    for (const p of parts) {
      const i = p.indexOf("=");
      if (i === -1) continue;
      const k = p.slice(0, i);
      const v = p.slice(i + 1);
      map.set(k, decodeURIComponent(v));
    }
    const tool = map.get("tool") as ToolVariant;
    const templateId = map.get("t") || $activeTemplateIdAtom.get() || "landing";
    const colorsCsv = map.get("c") || "";
    const f = map.get("f") || ":;:";
    const [h, b] = f.split(";");
    const [headingFamily = "", headingWeight = "400"] = h.split(":");
    const [bodyFamily = "", bodyWeight = "400"] = b.split(":");
    return {
      tool,
      templateId,
      colorsCsv,
      fonts: { headingFamily, headingWeight, bodyFamily, bodyWeight },
    };
  } catch {
    return null;
  }
}

export function colorsFromCsv(
  csv: string,
  base?: Partial<ColorScheme>,
): ColorScheme | null {
  const parts = csv.split(",");
  if (parts.length < COLOR_KEYS.length) return null;
  const out: Partial<ColorScheme> = { ...(base || {}) };
  for (let i = 0; i < COLOR_KEYS.length; i++) {
    const key = COLOR_KEYS[i];
    (out as Record<keyof ColorScheme, string>)[key] = parts[i] as string;
  }
  return out as ColorScheme;
}

export function buildPreviewUrl(origin: string, state: EncodedState) {
  const encoded = encodeStateToParam(state);
  const path = `/preview/${encodeURIComponent(state.templateId)}?theme=${encoded}`;
  return origin.replace(/\/$/, "") + path;
}

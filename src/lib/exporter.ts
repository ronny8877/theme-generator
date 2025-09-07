import type { ThemeConfig } from "@/store/nano-store";

export type ExportPreset =
  | "tailwind-v4"
  | "tailwind-v3"
  | "styled-components"
  | "daisyui"
  | "shadcn";

export type ExportBundle = Record<ExportPreset, string>;

function pick(obj: Record<string, string>, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) out[k] = obj[k];
  return out;
}

function toThemeTokens(theme: ThemeConfig) {
  const c = theme.colors;
  return {
    primary: c["--color-primary"],
    primaryContent: c["--color-primary-content"],
    secondary: c["--color-secondary"],
    secondaryContent: c["--color-secondary-content"],
    accent: c["--color-accent"],
    accentContent: c["--color-accent-content"],
    neutral: c["--color-neutral"],
    neutralContent: c["--color-neutral-content"],
    base100: c["--color-base-100"],
    base200: c["--color-base-200"],
    base300: c["--color-base-300"],
    baseContent: c["--color-base-content"],
    info: c["--color-info"],
    infoContent: c["--color-info-content"],
    success: c["--color-success"],
    successContent: c["--color-success-content"],
    warning: c["--color-warning"],
    warningContent: c["--color-warning-content"],
    error: c["--color-error"],
    errorContent: c["--color-error-content"],
  };
}

type Transformer = (theme: ThemeConfig) => string;

function parseCssLength(input: string): { value: number; unit: string } {
  // supports e.g. "2rem", "8px", "0.5em"
  const m = String(input)
    .trim()
    .match(/^(\d*\.?\d+)([a-z%]*)$/i);
  if (!m) return { value: 0, unit: "rem" };
  const value = parseFloat(m[1]);
  const unit = m[2] || "rem";
  return { value, unit };
}

function toRadiusScale(maxStr: string) {
  const { value: max, unit } = parseCssLength(maxStr);
  // Divide into 10 steps (sm ~ 1 step, 2xl = max)
  const step = max / 10 || 0;
  const v = (n: number) => `${+(n * step).toFixed(4)}${unit}`;
  return {
    none: `0${unit}`,
    sm: v(1),
    DEFAULT: v(2),
    md: v(3),
    lg: v(4),
    xl: v(5),
    "2xl": v(10),
    "3xl": v(10),
  } as const;
}

const transformTailwindV3: Transformer = (theme) => {
  const t = toThemeTokens(theme);
  const r = toRadiusScale(theme.radius["--radius-box"]);
  return `/** tailwind.config.{js,ts} snippet */
// Add under theme.extend
export default {
  theme: {
    extend: {
      colors: {
        primary: "${t.primary}",
        "primary-content": "${t.primaryContent}",
        secondary: "${t.secondary}",
        "secondary-content": "${t.secondaryContent}",
        accent: "${t.accent}",
        "accent-content": "${t.accentContent}",
        neutral: "${t.neutral}",
        "neutral-content": "${t.neutralContent}",
        base: {
          100: "${t.base100}",
          200: "${t.base200}",
          300: "${t.base300}",
          content: "${t.baseContent}",
        },
        info: "${t.info}",
        "info-content": "${t.infoContent}",
        success: "${t.success}",
        "success-content": "${t.successContent}",
        warning: "${t.warning}",
        "warning-content": "${t.warningContent}",
        error: "${t.error}",
        "error-content": "${t.errorContent}",
      },
      borderRadius: {
        none: "${r.none}",
        sm: "${r.sm}",
        DEFAULT: "${r.DEFAULT}",
        md: "${r.md}",
        lg: "${r.lg}",
        xl: "${r.xl}",
        "2xl": "${r["2xl"]}",
        "3xl": "${r["3xl"]}",
      },
    },
  },
}`;
};

const transformTailwindV4: Transformer = (theme) => {
  const t = toThemeTokens(theme);
  const r = toRadiusScale(theme.radius["--radius-box"]);
  return `/** CSS @theme (Tailwind v4) */
@theme {
  --color-primary: ${t.primary};
  --color-primary-content: ${t.primaryContent};
  --color-secondary: ${t.secondary};
  --color-secondary-content: ${t.secondaryContent};
  --color-accent: ${t.accent};
  --color-accent-content: ${t.accentContent};
  --color-neutral: ${t.neutral};
  --color-neutral-content: ${t.neutralContent};
  --color-base-100: ${t.base100};
  --color-base-200: ${t.base200};
  --color-base-300: ${t.base300};
  --color-base-content: ${t.baseContent};
  --color-info: ${t.info};
  --color-info-content: ${t.infoContent};
  --color-success: ${t.success};
  --color-success-content: ${t.successContent};
  --color-warning: ${t.warning};
  --color-warning-content: ${t.warningContent};
  --color-error: ${t.error};
  --color-error-content: ${t.errorContent};
  /* border radius scale used by rounded-* utilities */
  --radius-none: ${r.none};
  --radius-sm: ${r.sm};
  --radius: ${r.DEFAULT};
  --radius-md: ${r.md};
  --radius-lg: ${r.lg};
  --radius-xl: ${r.xl};
  --radius-2xl: ${r["2xl"]};
  --radius-3xl: ${r["3xl"]};
}
/* Use like text-[--color-primary] bg-[--color-base-200] */`;
};

const transformStyledComponents: Transformer = (theme) => {
  const t = toThemeTokens(theme);
  return `// theme.ts
export const theme = {
  colors: ${JSON.stringify(t, null, 2)}
} as const;

// usage
// <ThemeProvider theme={theme}>
//   ...
// </ThemeProvider>
`;
};

const transformDaisyUI: Transformer = (theme) => {
  const t = toThemeTokens(theme);
  const r = theme.radius;
  const m = theme.misc;
  return `@plugin "daisyui/theme" {
  name: "${theme.name}";
  default: true;
  prefersdark: true;
  color-scheme: "dark";
  --color-base-100: ${t.base100};
  --color-base-200: ${t.base200};
  --color-base-300: ${t.base300};
  --color-base-content: ${t.baseContent};
  --color-primary: ${t.primary};
  --color-primary-content: ${t.primaryContent};
  --color-secondary: ${t.secondary};
  --color-secondary-content: ${t.secondaryContent};
  --color-accent: ${t.accent};
  --color-accent-content: ${t.accentContent};
  --color-neutral: ${t.neutral};
  --color-neutral-content: ${t.neutralContent};
  --color-info: ${t.info};
  --color-info-content: ${t.infoContent};
  --color-success: ${t.success};
  --color-success-content: ${t.successContent};
  --color-warning: ${t.warning};
  --color-warning-content: ${t.warningContent};
  --color-error: ${t.error};
  --color-error-content: ${t.errorContent};
  --radius-selector: ${r["--radius-selector"]};
  --radius-field: ${r["--radius-field"]};
  --radius-box: ${r["--radius-box"]};
  --size-selector: ${m["--size-selector"]};
  --size-field: ${m["--size-field"]};
  --border: ${m["--border"]};
  --depth: ${m["--depth"]};
  --noise: ${m["--noise"]};
}`;
};

const transformShadcn: Transformer = (theme) => {
  const t = toThemeTokens(theme);
  const r = theme.radius;
  return `/* shadcn/ui CSS variables */
:root {
  --background: ${t.base100};
  --foreground: ${t.baseContent};
  --card: ${t.base100};
  --card-foreground: ${t.baseContent};
  --popover: ${t.base100};
  --popover-foreground: ${t.baseContent};
  --primary: ${t.primary};
  --primary-foreground: ${t.primaryContent};
  --secondary: ${t.secondary};
  --secondary-foreground: ${t.secondaryContent};
  --muted: ${t.base200};
  --muted-foreground: ${t.baseContent};
  --accent: ${t.accent};
  --accent-foreground: ${t.accentContent};
  --destructive: ${t.error};
  --destructive-foreground: ${t.errorContent};
  --border: ${t.base300};
  --input: ${t.base300};
  --ring: ${t.primary};
  --radius: ${r["--radius-box"]};
}
/* Paste in globals.css. Matches the standard shadcn variables */`;
};

const TRANSFORMERS: Record<ExportPreset, Transformer> = {
  "tailwind-v4": transformTailwindV4,
  "tailwind-v3": transformTailwindV3,
  "styled-components": transformStyledComponents,
  daisyui: transformDaisyUI,
  shadcn: transformShadcn,
};

export function exportTheme(theme: ThemeConfig): ExportBundle {
  return Object.fromEntries(
    Object.entries(TRANSFORMERS).map(([k, fn]) => [k, fn(theme)]),
  ) as ExportBundle;
}

export function flattenColors(theme: ThemeConfig) {
  const keys = [
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
  return pick(theme.colors as unknown as Record<string, string>, keys);
}

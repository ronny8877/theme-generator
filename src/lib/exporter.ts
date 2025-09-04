import type { IThemeConfig } from "@/store";

export type ExportPreset =
  | "tailwind-v4"
  | "tailwind-v3"
  | "styled-components"
  | "daisyui"
  | "empty-components";

export type ExportBundle = Record<ExportPreset, string>;

function pick(obj: Record<string, string>, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) out[k] = obj[k];
  return out;
}

function toThemeTokens(theme: IThemeConfig) {
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

export function exportTheme(theme: IThemeConfig): ExportBundle {
  const t = toThemeTokens(theme);

  const tailwindV3 = `/** tailwind.config.{js,ts} snippet */
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
    },
  },
}`;

  const tailwindV4 = `/** CSS @theme (Tailwind v4) */
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
}
/* Use like text-[--color-primary] bg-[--color-base-200] */`;

  const styledComponents = `// theme.ts
export const theme = {
  colors: ${JSON.stringify(t, null, 2)}
} as const;

// usage
// <ThemeProvider theme={theme}>
//   ...
// </ThemeProvider>
`;

  const daisyui = `// daisyUI custom theme
export const myTheme = {
  primary: "${t.primary}",
  "primary-content": "${t.primaryContent}",
  secondary: "${t.secondary}",
  "secondary-content": "${t.secondaryContent}",
  accent: "${t.accent}",
  "accent-content": "${t.accentContent}",
  neutral: "${t.neutral}",
  "neutral-content": "${t.neutralContent}",
  "base-100": "${t.base100}",
  "base-200": "${t.base200}",
  "base-300": "${t.base300}",
  "base-content": "${t.baseContent}",
  info: "${t.info}",
  "info-content": "${t.infoContent}",
  success: "${t.success}",
  "success-content": "${t.successContent}",
  warning: "${t.warning}",
  "warning-content": "${t.warningContent}",
  error: "${t.error}",
  "error-content": "${t.errorContent}",
};
// tailwind.config: daisyui: { themes: [myTheme] }
`;

  const emptyComponents = `<!-- Ad / Empty component placeholders -->
<section class="w-full rounded-xl border border-base-300 bg-base-200 text-base-content p-6 animate-in fade-in duration-300" data-slot="ad-slot">
  <div class="text-sm opacity-70">Ad Placeholder</div>
  <div class="mt-2 h-24 w-full rounded-md bg-gradient-to-br from-base-300 to-base-100"></div>
  <div class="mt-3 text-xs opacity-60">Replace with your ad provider snippet</div>
  <!-- example sizes -->
  <div class="mt-3 grid grid-cols-3 gap-2">
    <div class="h-12 rounded bg-base-300"></div>
    <div class="h-12 rounded bg-base-300"></div>
    <div class="h-12 rounded bg-base-300"></div>
  </div>
  <!-- end -->
</section>`;

  return {
    "tailwind-v4": tailwindV4,
    "tailwind-v3": tailwindV3,
    "styled-components": styledComponents,
    daisyui,
    "empty-components": emptyComponents,
  } satisfies ExportBundle;
}

export function flattenColors(theme: IThemeConfig) {
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

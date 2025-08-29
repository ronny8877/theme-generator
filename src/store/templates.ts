import { atom, computed } from "nanostores";
import { THEMES } from "@/lib/constants";

// Types
export interface ColorScheme {
  "--color-base-100": string;
  "--color-base-200": string;
  "--color-base-300": string;
  "--color-base-content": string;
  "--color-primary": string;
  "--color-primary-content": string;
  "--color-secondary": string;
  "--color-secondary-content": string;
  "--color-accent": string;
  "--color-accent-content": string;
  "--color-neutral": string;
  "--color-neutral-content": string;
  "--color-info": string;
  "--color-info-content": string;
  "--color-success": string;
  "--color-success-content": string;
  "--color-warning": string;
  "--color-warning-content": string;
  "--color-error": string;
  "--color-error-content": string;
}

export interface RadiusConfig {
  "--radius-selector": string;
  "--radius-field": string;
  "--radius-box": string;
}

export interface MiscConfig {
  "--size-selector": string;
  "--size-field": string;
  "--border": string;
  "--depth": number;
  "--noise": number;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: ColorScheme;
  radius: RadiusConfig;
  misc: MiscConfig;
}

export interface TemplateState {
  active_theme: ThemeConfig;
  activeTemplateId: string | null;
}

// Initial state
const initialState: TemplateState = {
  active_theme: THEMES[0],
  activeTemplateId: "simple-blog-post",
};

// Core template store
export const $template = atom<TemplateState>(initialState);

// Computed values
export const $activeTheme = computed($template, (template) => template.active_theme);

export const $prominentColors = computed($activeTheme, (theme) => ({
  primary: theme.colors["--color-primary"],
  secondary: theme.colors["--color-secondary"],
  accent: theme.colors["--color-accent"],
  base: theme.colors["--color-base-100"],
}));

export const $cssVariables = computed($activeTheme, (theme) => ({
  ...theme.colors,
  ...theme.radius,
  ...theme.misc,
}));

// Actions
export function setActiveTemplate(templateId: string | null) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    activeTemplateId: templateId,
  });
}

export function setActiveTheme(theme_id: string) {
  const theme = THEMES.find((t) => t.id === theme_id);
  if (theme) {
    const currentTemplate = $template.get();
    $template.set({
      ...currentTemplate,
      active_theme: theme,
    });
  } else {
    console.warn("Theme not found:", theme_id);
  }
}

export function updateColorScheme(colors: Partial<ColorScheme>) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    active_theme: {
      ...currentTemplate.active_theme,
      colors: {
        ...currentTemplate.active_theme.colors,
        ...colors,
      },
    },
  });
}

export function updateRadius(radius: Partial<RadiusConfig>) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    active_theme: {
      ...currentTemplate.active_theme,
      radius: {
        ...currentTemplate.active_theme.radius,
        ...radius,
      },
    },
  });
}

export function updateMiscConfig(misc: Partial<MiscConfig>) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    active_theme: {
      ...currentTemplate.active_theme,
      misc: {
        ...currentTemplate.active_theme.misc,
        ...misc,
      },
    },
  });
}

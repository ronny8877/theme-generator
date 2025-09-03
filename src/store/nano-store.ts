import { atom, computed } from "nanostores";
import {
  AVILABLE_PREVIEW_DEVICES,
  TOOL_VARIANTS,
  THEMES,
  TEMPLATES_ARRAY,
} from "@/lib/constants";
import {
  $fontCSSVariables,
  updateHeadingFont,
  updateBodyFont,
  loadGoogleFont,
} from "./font-store";

// Types
export type PreviewDevice = (typeof AVILABLE_PREVIEW_DEVICES)[number];
export type ToolVariant = (typeof TOOL_VARIANTS)[number];
export type NotificationType = "success" | "error" | "warning" | "info";
export type Panel = "templates" | "editor" | "preview" | "settings";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

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

export interface AppState {
  theme: {
    current: string;
    options: string[];
  };
  activePreviewDevice: PreviewDevice | null;
  activeTool: ToolVariant;
  activeEditorTab: "themes" | "fonts" | "advanced";
  editor: {
    is_open: boolean;
    ui_type: "floating" | "default";
  };
  ui: {
    sidebarCollapsed: boolean;
    locked_ui: boolean;
    activePanel: Panel;
    isLoading: boolean;
    notifications: Notification[];
  };
}

export interface TemplateState {
  active_theme: ThemeConfig;
  activeTemplateId: string | null;
}

export interface HistoryEntry {
  snapshot: never;
  timestamp: Date;
  action: string;
  description: string;
}

export interface UndoRedoState {
  history: HistoryEntry[];
  currentIndex: number;
  maxHistorySize: number;
  isRecording: boolean;
}

// Initial states
const initialAppState: AppState = {
  theme: {
    current: "light",
    options: ["light", "dark", "cupcake", "bumblebee", "emerald"],
  },
  activePreviewDevice: "desktop",
  activeTool: "website",
  activeEditorTab: "themes",
  ui: {
    sidebarCollapsed: false,
    locked_ui: false,
    isLoading: false,
    notifications: [],
    activePanel: "templates",
  },
  editor: {
    is_open: true,
    ui_type: "default",
  },
};

const initialTemplateState: TemplateState = {
  active_theme: THEMES[0],
  activeTemplateId: "simple-blog-landing",
};

const initialUndoRedoState: UndoRedoState = {
  history: [],
  currentIndex: -1,
  maxHistorySize: 100,
  isRecording: true,
};

// Core stores
export const $app = atom<AppState>(initialAppState);
export const $template = atom<TemplateState>(initialTemplateState);
export const $undoRedo = atom<UndoRedoState>(initialUndoRedoState);
// User-saved themes
export const $userThemes = atom<ThemeConfig[]>([]);

const USER_THEMES_KEY = "user-themes";

// Computed values - App
export const $availableThemes = computed($app, (app) => app.theme.options);
export const $activeNotifications = computed($app, (app) =>
  app.ui.notifications.filter((n) => !n.dismissed),
);
export const $hasActiveNotifications = computed(
  $activeNotifications,
  (notifications) => notifications.length > 0,
);

// Computed values - Template
export const $activeTheme = computed(
  $template,
  (template) => template.active_theme,
);
export const $prominentColors = computed($activeTheme, (theme) => ({
  primary: theme.colors["--color-primary"],
  secondary: theme.colors["--color-secondary"],
  accent: theme.colors["--color-accent"],
  base: theme.colors["--color-base-100"],
}));
export const $cssVariables = computed(
  [$activeTheme, $fontCSSVariables],
  (theme, fontVars) => {
    return {
      ...theme.colors,
      ...theme.radius,
      ...theme.misc,
      ...fontVars,
    };
  },
);

// Computed values - Undo/Redo
export const $canUndo = computed($undoRedo, (state) => state.currentIndex > 0);
export const $canRedo = computed(
  $undoRedo,
  (state) => state.currentIndex < state.history.length - 1,
);

// Root store computed values
export const $currentTheme = computed($app, (app) => app.theme.current);
export const $activeTemplate = computed($template, (template) => template);

// App Actions
export function setTheme(theme: string) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    theme: {
      ...currentApp.theme,
      current: theme,
    },
  });
}

export function setActiveTool(tool: ToolVariant) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    activeTool: tool,
    activePreviewDevice: getDefaultDeviceForTool(tool),
  });
}

export function setActiveEditorTab(tab: "themes" | "fonts" | "advanced") {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    activeEditorTab: tab,
  });
}

export function setPreviewDevice(device: PreviewDevice) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    activePreviewDevice: device,
  });
}

export function toggleSidebar() {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    ui: {
      ...currentApp.ui,
      sidebarCollapsed: !currentApp.ui.sidebarCollapsed,
    },
  });
}

export function setActivePanel(panel: Panel) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    ui: {
      ...currentApp.ui,
      activePanel: panel,
    },
  });
}

export function addNotification(type: NotificationType, message: string) {
  const currentApp = $app.get();
  const notification: Notification = {
    id: Date.now().toString(),
    type,
    message,
    timestamp: new Date(),
    dismissed: false,
  };

  $app.set({
    ...currentApp,
    ui: {
      ...currentApp.ui,
      notifications: [...currentApp.ui.notifications, notification],
    },
  });
}

export function dismissNotification(id: string) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    ui: {
      ...currentApp.ui,
      notifications: currentApp.ui.notifications.map((n) =>
        n.id === id ? { ...n, dismissed: true } : n,
      ),
    },
  });
}

export function setLoading(isLoading: boolean) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    ui: {
      ...currentApp.ui,
      isLoading,
    },
  });
}

// Template Actions
export function setActiveTemplate(templateId: string | null) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    activeTemplateId: templateId,
  });
}

export function setActiveTheme(theme_id: string) {
  const theme = THEMES.find((t) => t.name === theme_id);
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

// Allow directly setting a ThemeConfig (used for user-saved themes)
export function setActiveThemeConfig(theme: ThemeConfig) {
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    active_theme: theme,
  });
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

// Update a single color variable on the active theme, e.g. "--color-primary"
export function updateThemeColor(key: keyof ColorScheme, value: string) {
  const currentTemplate = $template.get();
  const currentTheme = currentTemplate.active_theme;

  // Guard: ensure colors object exists
  const nextColors = {
    ...currentTheme.colors,
    [key]: value,
  } as ColorScheme;

  $template.set({
    ...currentTemplate,
    active_theme: {
      ...currentTheme,
      colors: nextColors,
    },
  });
}

// ---------- User themes persistence ----------
export function initUserThemes() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(USER_THEMES_KEY);
    const list: ThemeConfig[] = raw ? JSON.parse(raw) : [];
    if (Array.isArray(list)) $userThemes.set(list);
  } catch {}
}

export function saveCurrentThemeAs(name?: string) {
  if (typeof window === "undefined") return;
  const currentTemplate = $template.get();
  const active = currentTemplate.active_theme;

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const finalName = name && name.trim() ? name.trim() : `${active.name} copy`;
  const idBase = slugify(finalName);
  const uniqueId = `${idBase}-${Date.now()}`;

  const themeToSave: ThemeConfig = {
    ...active,
    id: uniqueId,
    name: finalName,
    // colors/radius/misc already present
  };

  const existing = $userThemes.get();
  const next = [...existing, themeToSave];
  $userThemes.set(next);
  try {
    localStorage.setItem(USER_THEMES_KEY, JSON.stringify(next));
  } catch {}
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

// Root store actions
export function switchTool(
  tool: "website" | "app" | "poster" | "typography" | "gradient",
) {
  setActiveTool(tool);
  // Open the floating editor when a tool is selected
  editEditorSettings({
    is_open: true,
    ui_type: "floating",
  });
}

export function setActiveTemplateById(templateId: string) {
  // Find the template in template array
  const template = TEMPLATES_ARRAY.find((t) => t.id === templateId);
  if (!template) {
    console.warn("Template not found:", templateId);
    return;
  }

  // 1) Set active template id
  const currentTemplate = $template.get();
  $template.set({
    ...currentTemplate,
    activeTemplateId: template.id,
  });

  // 2) Apply default theme by name
  if (template.theme_id) {
    setActiveTheme(template.theme_id);
  }

  // 3) Apply default fonts if provided
  try {
    type MaybeFonts = {
      fonts?: {
        heading?: { family?: string; weight?: string };
        body?: { family?: string; weight?: string };
      };
    };
    const withFonts = template as unknown as MaybeFonts;
    const headingFamily = withFonts?.fonts?.heading?.family;
    const headingWeight = withFonts?.fonts?.heading?.weight;
    const bodyFamily = withFonts?.fonts?.body?.family;
    const bodyWeight = withFonts?.fonts?.body?.weight;

    if (headingFamily) {
      loadGoogleFont(headingFamily).catch(() => {});
      updateHeadingFont({
        family: headingFamily,
        weight: headingWeight ?? "400",
      });
    }
    if (bodyFamily) {
      loadGoogleFont(bodyFamily).catch(() => {});
      updateBodyFont({ family: bodyFamily, weight: bodyWeight ?? "400" });
    }
  } catch (e) {
    console.warn("Failed applying template fonts:", e);
  }
}

export function deleteUserTheme(id: string) {
  if (typeof window === "undefined") return;
  const existing = $userThemes.get();
  const next = existing.filter((t) => t.id !== id);
  $userThemes.set(next);
  try {
    localStorage.setItem(USER_THEMES_KEY, JSON.stringify(next));
  } catch {}
}

export function updateTemplateTheme(
  templateId: string,
  themeUpdates: {
    colors?: never;
    radius?: never;
    misc?: never;
  },
) {
  if (themeUpdates.colors) updateColorScheme(themeUpdates.colors);
  if (themeUpdates.radius) updateRadius(themeUpdates.radius);
  if (themeUpdates.misc) updateMiscConfig(themeUpdates.misc);
}

// Helper function
function getDefaultDeviceForTool(tool: ToolVariant): PreviewDevice {
  switch (tool) {
    case "app":
      return "mobile";
    case "poster":
      return "tablet";
    default:
      return "desktop";
  }
}

export function editEditorSettings(settings: {
  is_open?: boolean;
  ui_type?: "floating" | "default";
}) {
  const currentApp = $app.get();
  $app.set({
    ...currentApp,
    editor: {
      ...currentApp.editor,
      ...settings,
    },
  });
}

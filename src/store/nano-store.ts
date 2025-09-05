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
  $headingFont,
  $bodyFont,
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

// A snapshot to determine if the current theme has unsaved edits
export interface ThemeBaselineSnapshot {
  colors: ColorScheme;
  radius: RadiusConfig;
  misc: MiscConfig;
  fonts: {
    heading: {
      family: string;
      weight: string;
      size: string;
      lineHeight: string;
      letterSpacing: string;
    };
    body: {
      family: string;
      weight: string;
      size: string;
      lineHeight: string;
      letterSpacing: string;
    };
  };
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
  activeTemplateId: "landing",
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

// Pending template theme (if user has unsaved edits, we don't auto-apply)
export const $pendingTemplateThemeName = atom<string | null>(null);

// Fine-grained template atoms for minimal re-renders
export const $themeMeta = atom<{ id: string; name: string }>({
  id: initialTemplateState.active_theme.id,
  name: initialTemplateState.active_theme.name,
});
export const $themeColors = atom<ColorScheme>(
  initialTemplateState.active_theme.colors,
);
export const $themeRadius = atom<RadiusConfig>(
  initialTemplateState.active_theme.radius,
);
export const $themeMisc = atom<MiscConfig>(
  initialTemplateState.active_theme.misc,
);
export const $activeTemplateIdAtom = atom<string | null>(
  initialTemplateState.activeTemplateId,
);

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
  [$themeMeta, $themeColors, $themeRadius, $themeMisc],
  (meta, colors, radius, misc) => ({
    id: meta.id,
    name: meta.name,
    colors,
    radius,
    misc,
  }),
);
export const $activeThemeId = computed($themeMeta, (m) => m.id);
export const $activeThemeName = computed($themeMeta, (m) => m.name);
export const $prominentColors = computed($activeTheme, (theme) => ({
  primary: theme.colors["--color-primary"],
  secondary: theme.colors["--color-secondary"],
  accent: theme.colors["--color-accent"],
  base: theme.colors["--color-base-100"],
}));
export const $cssVariables = computed(
  [$themeColors, $themeRadius, $themeMisc, $fontCSSVariables],
  (colors, radius, misc, fontVars) => {
    return {
      ...colors,
      ...radius,
      ...misc,
      ...fontVars,
    };
  },
);

// Baseline snapshot used to detect unsaved edits
const initialBaseline: ThemeBaselineSnapshot = {
  colors: initialTemplateState.active_theme.colors,
  radius: initialTemplateState.active_theme.radius,
  misc: initialTemplateState.active_theme.misc,
  fonts: {
    heading: $headingFont.get(),
    body: $bodyFont.get(),
  },
};

export const $themeBaseline = atom<ThemeBaselineSnapshot>(initialBaseline);

export const $isThemeEdited = computed(
  [
    $themeColors,
    $themeRadius,
    $themeMisc,
    $headingFont,
    $bodyFont,
    $themeBaseline,
  ],
  (colors, radius, misc, heading, body, base) => {
    const current = JSON.stringify({
      colors,
      radius,
      misc,
      fonts: { heading, body },
    });
    const baseline = JSON.stringify(base);
    return current !== baseline;
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
export const $activeTemplate = computed(
  [$activeTheme, $activeTemplateIdAtom],
  (theme, activeTemplateId) => ({ active_theme: theme, activeTemplateId }),
);
// Fine-grained selectors to minimize re-renders
export const $activeEditorTab = computed($app, (app) => app.activeEditorTab);
export const $activePreviewDeviceSel = computed(
  $app,
  (app) => app.activePreviewDevice,
);
export const $activeToolSel = computed($app, (app) => app.activeTool);
export const $editorUiType = computed($app, (app) => app.editor.ui_type);
export const $isEditorOpen = computed($app, (app) => app.editor.is_open);
export const $activeTemplateId = computed($activeTemplateIdAtom, (id) => id);

// App Actions
export function setTheme(theme: string) {
  const currentApp = $app.get();
  if (currentApp.theme.current === theme) return;
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
  if (currentApp.activeTool === tool) return;
  $app.set({
    ...currentApp,
    activeTool: tool,
    activePreviewDevice: getDefaultDeviceForTool(tool),
  });
}

export function setActiveEditorTab(tab: "themes" | "fonts" | "advanced") {
  const currentApp = $app.get();
  if (currentApp.activeEditorTab === tab) return;
  $app.set({
    ...currentApp,
    activeEditorTab: tab,
  });
}

export function setPreviewDevice(device: PreviewDevice) {
  const currentApp = $app.get();
  if (currentApp.activePreviewDevice === device) return;
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
  if (currentApp.ui.activePanel === panel) return;
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
  const curr = $activeTemplateIdAtom.get();
  if (curr === templateId) return;
  $activeTemplateIdAtom.set(templateId);
  // keep legacy store in sync for any old subscribers
  const t = $template.get();
  if (t.activeTemplateId !== templateId) {
    $template.set({ ...t, activeTemplateId: templateId });
  }
}

export function setActiveTheme(theme_id: string) {
  const theme = THEMES.find((t) => t.name === theme_id);
  if (theme) {
    const meta = $themeMeta.get();
    if (meta.name === theme.name) return;
    $themeMeta.set({ id: theme.id, name: theme.name });
    $themeColors.set(theme.colors);
    $themeRadius.set(theme.radius);
    $themeMisc.set(theme.misc);
    // sync legacy
    const t = $template.get();
    $template.set({ ...t, active_theme: theme });
  } else {
    console.warn("Theme not found:", theme_id);
  }
}

// Allow directly setting a ThemeConfig (used for user-saved themes)
export function setActiveThemeConfig(theme: ThemeConfig) {
  $themeMeta.set({ id: theme.id, name: theme.name });
  $themeColors.set(theme.colors);
  $themeRadius.set(theme.radius);
  $themeMisc.set(theme.misc);
  // sync legacy
  const t = $template.get();
  $template.set({ ...t, active_theme: theme });
}

export function updateColorScheme(colors: Partial<ColorScheme>) {
  const curr = $themeColors.get();
  const next = { ...curr, ...colors } as ColorScheme;
  if (JSON.stringify(next) === JSON.stringify(curr)) return;
  $themeColors.set(next);
  // sync legacy
  const t = $template.get();
  $template.set({
    ...t,
    active_theme: { ...t.active_theme, colors: next },
  });
}

// Update a single color variable on the active theme, e.g. "--color-primary"
export function updateThemeColor(key: keyof ColorScheme, value: string) {
  const curr = $themeColors.get();
  if (curr[key] === value) return;
  const next = { ...curr, [key]: value } as ColorScheme;
  $themeColors.set(next);
  // sync legacy
  const t = $template.get();
  $template.set({ ...t, active_theme: { ...t.active_theme, colors: next } });
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
  const curr = $themeRadius.get();
  const keys = Object.keys(radius) as Array<keyof RadiusConfig>;
  const changed = keys.some((k) => radius[k] !== curr[k]);
  if (!changed) return;
  const next = { ...curr, ...radius } as RadiusConfig;
  $themeRadius.set(next);
  // sync legacy
  const t = $template.get();
  $template.set({ ...t, active_theme: { ...t.active_theme, radius: next } });
}

export function updateMiscConfig(misc: Partial<MiscConfig>) {
  const curr = $themeMisc.get();
  const keys = Object.keys(misc) as Array<keyof MiscConfig>;
  const changed = keys.some((k) => misc[k] !== curr[k]);
  if (!changed) return;
  const next = { ...curr, ...misc } as MiscConfig;
  $themeMisc.set(next);
  // sync legacy
  const t = $template.get();
  $template.set({ ...t, active_theme: { ...t.active_theme, misc: next } });
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
  setActiveTemplate(template.id);

  // 2) Apply default theme by name, unless there are unsaved edits
  const isDirty = $isThemeEdited.get();
  if (template.theme_id) {
    if (isDirty) {
      // do not override current edited theme; remember template's desired theme
      $pendingTemplateThemeName.set(template.theme_id);
    } else {
      setActiveTheme(template.theme_id);
      $pendingTemplateThemeName.set(null);
      resetBaselineToCurrent();
    }
  } else {
    $pendingTemplateThemeName.set(null);
  }

  // 3) Apply default fonts if provided and not dirty; if dirty keep user's edited fonts
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
    if (!isDirty) {
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
      resetBaselineToCurrent();
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

// ---------- Unsaved edits helpers ----------
export function resetBaselineToCurrent() {
  $themeBaseline.set({
    colors: $themeColors.get(),
    radius: $themeRadius.get(),
    misc: $themeMisc.get(),
    fonts: {
      heading: $headingFont.get(),
      body: $bodyFont.get(),
    },
  });
}

export function applyThemeAndResetBaseline(theme_name: string) {
  setActiveTheme(theme_name);
  $pendingTemplateThemeName.set(null);
  resetBaselineToCurrent();
}

export function applyThemeConfigAndResetBaseline(theme: ThemeConfig) {
  setActiveThemeConfig(theme);
  $pendingTemplateThemeName.set(null);
  resetBaselineToCurrent();
}

export function saveEditedTheme(name?: string) {
  saveCurrentThemeAs(name);
  resetBaselineToCurrent();
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
  const next = {
    ...currentApp.editor,
    ...settings,
  };
  if (
    next.is_open === currentApp.editor.is_open &&
    next.ui_type === currentApp.editor.ui_type
  )
    return;
  $app.set({
    ...currentApp,
    editor: {
      ...next,
    },
  });
}

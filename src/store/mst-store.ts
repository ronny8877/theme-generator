import { types, Instance, getSnapshot } from "mobx-state-tree";
import {
  AVILABLE_PREVIEW_DEVICES,
  TOOL_VARIANTS,
  THEMES,
  TEMPLATES_ARRAY,
} from "@/lib/constants";

// Types for better TypeScript support
export type PreviewDevice = (typeof AVILABLE_PREVIEW_DEVICES)[number];
export type ToolVariant = (typeof TOOL_VARIANTS)[number];
export type NotificationType = "success" | "error" | "warning" | "info";
export type Panel = "templates" | "editor" | "preview" | "settings";

// Font Models
const FontConfig = types.model("FontConfig", {
  family: types.string,
  weight: types.string,
  size: types.string,
  lineHeight: types.string,
  letterSpacing: types.string,
});

const FontOverrides = types.model("FontOverrides", {
  lineHeight: types.string,
  letterSpacing: types.string,
  headingMarginBottom: types.string,
  bodyMarginBottom: types.string,
  headingMinMargin: types.string,
  bodyMinMargin: types.string,
});

const FontState = types
  .model("FontState", {
    heading: FontConfig,
    body: FontConfig,
    overrides: FontOverrides,
    loadedFonts: types.array(types.string),
  })
  .actions((self) => ({
    updateHeadingFont(updates: Partial<Instance<typeof FontConfig>>) {
      Object.assign(self.heading, updates);
    },
    updateBodyFont(updates: Partial<Instance<typeof FontConfig>>) {
      Object.assign(self.body, updates);
    },
    updateFontOverrides(updates: Partial<Instance<typeof FontOverrides>>) {
      Object.assign(self.overrides, updates);
    },
    addLoadedFont(fontFamily: string) {
      if (!self.loadedFonts.includes(fontFamily)) {
        self.loadedFonts.push(fontFamily);
      }
    },
  }))
  .actions((self) => ({
    loadGoogleFont(fontFamily: string): Promise<void> {
      // Check if font is already loaded
      if (self.loadedFonts.includes(fontFamily)) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        // Create link element for Google Fonts
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@300;400;500;600;700;800;900&display=swap`;
        link.rel = "stylesheet";

        link.onload = () => {
          self.addLoadedFont(fontFamily);
          resolve();
        };

        link.onerror = () => {
          reject(new Error(`Failed to load font: ${fontFamily}`));
        };

        document.head.appendChild(link);
      });
    },
  }))
  .views((self) => ({
    get fontCSSVariables() {
      // Determine if global overrides should be applied
      const useGlobalLineHeight = self.overrides.lineHeight !== "1.5"; // default value
      const useGlobalLetterSpacing = self.overrides.letterSpacing !== "0em"; // default value

      return {
        "--font-heading-family": `"${self.heading.family}", sans-serif`,
        "--font-heading-weight": self.heading.weight,
        "--font-heading-size": self.heading.size,
        "--font-heading-line-height": useGlobalLineHeight
          ? self.overrides.lineHeight
          : self.heading.lineHeight,
        "--font-heading-letter-spacing": useGlobalLetterSpacing
          ? self.overrides.letterSpacing
          : self.heading.letterSpacing,

        "--font-body-family": `"${self.body.family}", sans-serif`,
        "--font-body-weight": self.body.weight,
        "--font-body-size": self.body.size,
        "--font-body-line-height": useGlobalLineHeight
          ? self.overrides.lineHeight
          : self.body.lineHeight,
        "--font-body-letter-spacing": useGlobalLetterSpacing
          ? self.overrides.letterSpacing
          : self.body.letterSpacing,

        "--font-override-line-height": self.overrides.lineHeight,
        "--font-override-letter-spacing": self.overrides.letterSpacing,
        "--font-heading-margin-bottom": self.overrides.headingMarginBottom,
        "--font-body-margin-bottom": self.overrides.bodyMarginBottom,
        "--font-heading-min-margin": self.overrides.headingMinMargin,
        "--font-body-min-margin": self.overrides.bodyMinMargin,
      };
    },
  }));

// Color Models
const ColorScheme = types.model("ColorScheme", {
  "--color-base-100": types.string,
  "--color-base-200": types.string,
  "--color-base-300": types.string,
  "--color-base-content": types.string,
  "--color-primary": types.string,
  "--color-primary-content": types.string,
  "--color-secondary": types.string,
  "--color-secondary-content": types.string,
  "--color-accent": types.string,
  "--color-accent-content": types.string,
  "--color-neutral": types.string,
  "--color-neutral-content": types.string,
  "--color-info": types.string,
  "--color-info-content": types.string,
  "--color-success": types.string,
  "--color-success-content": types.string,
  "--color-warning": types.string,
  "--color-warning-content": types.string,
  "--color-error": types.string,
  "--color-error-content": types.string,
});

const RadiusConfig = types.model("RadiusConfig", {
  "--radius-selector": types.string,
  "--radius-field": types.string,
  "--radius-box": types.string,
});

const MiscConfig = types.model("MiscConfig", {
  "--size-selector": types.string,
  "--size-field": types.string,
  "--border": types.string,
  "--depth": types.number,
  "--noise": types.number,
});

const ThemeConfig = types.model("ThemeConfig", {
  id: types.string,
  name: types.string,
  default: types.optional(types.boolean, false),
  colors: ColorScheme,
  radius: RadiusConfig,
  misc: MiscConfig,
});

// Notification Model
const Notification = types.model("Notification", {
  id: types.string,
  type: types.enumeration("NotificationType", [
    "success",
    "error",
    "warning",
    "info",
  ]),
  message: types.string,
  timestamp: types.Date,
  dismissed: types.boolean,
});

// UI Models
const UIState = types.model("UIState", {
  sidebarCollapsed: types.boolean,
  locked_ui: types.boolean,
  activePanel: types.enumeration("Panel", [
    "templates",
    "editor",
    "preview",
    "settings",
  ]),
  isLoading: types.boolean,
  notifications: types.array(Notification),
});

const EditorState = types.model("EditorState", {
  is_open: types.boolean,
  ui_type: types.enumeration("EditorUIType", ["floating", "default"]),
});

const ThemeState = types.model("ThemeState", {
  current: types.string,
  options: types.array(types.string),
});

// Main App State
const AppState = types
  .model("AppState", {
    theme: ThemeState,
    activePreviewDevice: types.maybeNull(
      types.enumeration("PreviewDevice", AVILABLE_PREVIEW_DEVICES)
    ),
    activeTool: types.enumeration("ToolVariant", TOOL_VARIANTS),
    activeEditorTab: types.enumeration("EditorTab", [
      "themes",
      "fonts",
      "advanced",
    ]),
    editor: EditorState,
    ui: UIState,
  })
  .views((self) => ({
    get availableThemes() {
      return self.theme.options;
    },
    get activeNotifications() {
      return self.ui.notifications.filter((n) => !n.dismissed);
    },
    get hasActiveNotifications() {
      return this.activeNotifications.length > 0;
    },
    getDefaultDeviceForTool(tool: ToolVariant): PreviewDevice {
      switch (tool) {
        case "app":
          return "mobile";
        case "poster":
          return "tablet";
        default:
          return "desktop";
      }
    },
  }))
  .actions((self) => ({
    setTheme(theme: string) {
      self.theme.current = theme;
    },
    setActiveTool(tool: ToolVariant) {
      self.activeTool = tool;
      self.activePreviewDevice = self.getDefaultDeviceForTool(tool);
    },
    setActiveEditorTab(tab: "themes" | "fonts" | "advanced") {
      self.activeEditorTab = tab;
    },
    setPreviewDevice(device: PreviewDevice) {
      self.activePreviewDevice = device;
    },
    toggleSidebar() {
      self.ui.sidebarCollapsed = !self.ui.sidebarCollapsed;
    },
    setActivePanel(panel: Panel) {
      self.ui.activePanel = panel;
    },
    addNotification(type: NotificationType, message: string) {
      const notification = {
        id: Date.now().toString(),
        type,
        message,
        timestamp: new Date(),
        dismissed: false,
      };
      self.ui.notifications.push(notification);
    },
    dismissNotification(id: string) {
      const notification = self.ui.notifications.find((n) => n.id === id);
      if (notification) {
        notification.dismissed = true;
      }
    },
    setLoading(isLoading: boolean) {
      self.ui.isLoading = isLoading;
    },
    editEditorSettings(settings: {
      is_open?: boolean;
      ui_type?: "floating" | "default";
    }) {
      if (settings.is_open !== undefined) {
        self.editor.is_open = settings.is_open;
      }
      if (settings.ui_type !== undefined) {
        self.editor.ui_type = settings.ui_type;
      }
    },
  }));

// Template State
const TemplateState = types
  .model("TemplateState", {
    active_theme: ThemeConfig,
    activeTemplateId: types.maybeNull(types.string),
    userThemes: types.array(ThemeConfig),
  })
  .actions((self) => ({
    setActiveTemplate(templateId: string | null) {
      self.activeTemplateId = templateId;
    },
    setActiveTheme(theme_id: string) {
      const theme = THEMES.find((t) => t.name === theme_id);
      if (theme) {
        self.active_theme = theme;
      } else {
        console.warn("Theme not found:", theme_id);
      }
    },
    setActiveThemeConfig(theme: Instance<typeof ThemeConfig>) {
      self.active_theme = theme;
    },
    updateColorScheme(colors: Partial<Instance<typeof ColorScheme>>) {
      Object.assign(self.active_theme.colors, colors);
    },
    updateThemeColor(key: keyof Instance<typeof ColorScheme>, value: string) {
      switch (key) {
        case "--color-base-100":
          self.active_theme.colors["--color-base-100"] = value;
          break;
        case "--color-base-200":
          self.active_theme.colors["--color-base-200"] = value;
          break;
        case "--color-base-300":
          self.active_theme.colors["--color-base-300"] = value;
          break;
        case "--color-base-content":
          self.active_theme.colors["--color-base-content"] = value;
          break;
        case "--color-primary":
          self.active_theme.colors["--color-primary"] = value;
          break;
        case "--color-primary-content":
          self.active_theme.colors["--color-primary-content"] = value;
          break;
        case "--color-secondary":
          self.active_theme.colors["--color-secondary"] = value;
          break;
        case "--color-secondary-content":
          self.active_theme.colors["--color-secondary-content"] = value;
          break;
        case "--color-accent":
          self.active_theme.colors["--color-accent"] = value;
          break;
        case "--color-accent-content":
          self.active_theme.colors["--color-accent-content"] = value;
          break;
        case "--color-neutral":
          self.active_theme.colors["--color-neutral"] = value;
          break;
        case "--color-neutral-content":
          self.active_theme.colors["--color-neutral-content"] = value;
          break;
        case "--color-info":
          self.active_theme.colors["--color-info"] = value;
          break;
        case "--color-info-content":
          self.active_theme.colors["--color-info-content"] = value;
          break;
        case "--color-success":
          self.active_theme.colors["--color-success"] = value;
          break;
        case "--color-success-content":
          self.active_theme.colors["--color-success-content"] = value;
          break;
        case "--color-warning":
          self.active_theme.colors["--color-warning"] = value;
          break;
        case "--color-warning-content":
          self.active_theme.colors["--color-warning-content"] = value;
          break;
        case "--color-error":
          self.active_theme.colors["--color-error"] = value;
          break;
        case "--color-error-content":
          self.active_theme.colors["--color-error-content"] = value;
          break;
      }
    },
    updateRadius(radius: Partial<Instance<typeof RadiusConfig>>) {
      Object.assign(self.active_theme.radius, radius);
    },
    updateMiscConfig(misc: Partial<Instance<typeof MiscConfig>>) {
      Object.assign(self.active_theme.misc, misc);
    },
    saveCurrentThemeAs(name?: string) {
      if (typeof window === "undefined") return;

      const slugify = (s: string) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      const finalName =
        name && name.trim() ? name.trim() : `${self.active_theme.name} copy`;
      const idBase = slugify(finalName);
      const uniqueId = `${idBase}-${Date.now()}`;

      const themeToSave = {
        ...getSnapshot(self.active_theme),
        id: uniqueId,
        name: finalName,
      };

      self.userThemes.push(themeToSave);
      this.persistUserThemes();
    },
    deleteUserTheme(id: string) {
      const index = self.userThemes.findIndex((t) => t.id === id);
      if (index !== -1) {
        self.userThemes.splice(index, 1);
        this.persistUserThemes();
      }
    },
    initUserThemes() {
      if (typeof window === "undefined") return;
      try {
        const raw = localStorage.getItem("user-themes");
        const list = raw ? JSON.parse(raw) : [];
        if (Array.isArray(list)) {
          self.userThemes.replace(list);
        }
      } catch {}
    },
    persistUserThemes() {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(
          "user-themes",
          JSON.stringify(getSnapshot(self.userThemes))
        );
      } catch {}
    },
  }))
  .views((self) => ({
    get prominentColors() {
      return {
        primary: self.active_theme.colors["--color-primary"],
        secondary: self.active_theme.colors["--color-secondary"],
        accent: self.active_theme.colors["--color-accent"],
        base: self.active_theme.colors["--color-base-100"],
      };
    },
  }));

// Root Store
const RootStore = types
  .model("RootStore", {
    app: AppState,
    template: TemplateState,
    font: FontState,
  })
  .actions((self) => ({
    switchTool(tool: "website" | "app" | "poster" | "typography" | "gradient") {
      self.app.setActiveTool(tool);
      // Open the floating editor when a tool is selected
      self.app.editEditorSettings({
        is_open: true,
        ui_type: "floating",
      });
    },
    setActiveTemplateById(templateId: string) {
      // Find the template in template array
      const template = TEMPLATES_ARRAY.find((t) => t.id === templateId);
      if (!template) {
        console.warn("Template not found:", templateId);
        return;
      }

      // 1) Set active template id
      self.template.setActiveTemplate(template.id);

      // 2) Apply default theme by name
      if (template.theme_id) {
        self.template.setActiveTheme(template.theme_id);
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
          self.font.loadGoogleFont(headingFamily).catch(() => {});
          self.font.updateHeadingFont({
            family: headingFamily,
            weight: headingWeight ?? "400",
          });
        }
        if (bodyFamily) {
          self.font.loadGoogleFont(bodyFamily).catch(() => {});
          self.font.updateBodyFont({
            family: bodyFamily,
            weight: bodyWeight ?? "400",
          });
        }
      } catch (e) {
        console.warn("Failed applying template fonts:", e);
      }
    },
  }))
  .views((self) => ({
    get cssVariables() {
      return {
        ...self.template.active_theme.colors,
        ...self.template.active_theme.radius,
        ...self.template.active_theme.misc,
        ...self.font.fontCSSVariables,
      };
    },
  }));

// Create the root store instance
export const rootStore = RootStore.create({
  app: {
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
  },
  template: {
    active_theme: THEMES[0],
    activeTemplateId: "simple-blog-landing",
    userThemes: [],
  },
  font: {
    heading: {
      family: "Ubuntu",
      weight: "400",
      size: "24px",
      lineHeight: "1.2",
      letterSpacing: "-0.025em",
    },
    body: {
      family: "Montserrat",
      weight: "400",
      size: "16px",
      lineHeight: "1.625",
      letterSpacing: "0.025em",
    },
    overrides: {
      lineHeight: "1.5",
      letterSpacing: "0em",
      headingMarginBottom: "1rem",
      bodyMarginBottom: "1rem",
      headingMinMargin: "0.5rem",
      bodyMinMargin: "0.25rem",
    },
    loadedFonts: ["Ubuntu", "Montserrat"], // Default fonts
  },
});

// Initialize user themes on client side
if (typeof window !== "undefined") {
  rootStore.template.initUserThemes();
}

// Export types
export type IRootStore = Instance<typeof RootStore>;
export type IAppState = Instance<typeof AppState>;
export type ITemplateState = Instance<typeof TemplateState>;
export type IFontState = Instance<typeof FontState>;
export type IThemeConfig = Instance<typeof ThemeConfig>;
export type IColorScheme = Instance<typeof ColorScheme>;
export type IRadiusConfig = Instance<typeof RadiusConfig>;
export type IMiscConfig = Instance<typeof MiscConfig>;

import { THEMES } from "@/lib/constants";
import { types, Instance, getSnapshot } from "mobx-state-tree";

// Color scheme model for templates
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

// Radius configuration model
const RadiusConfig = types.model("RadiusConfig", {
  "--radius-selector": types.string,
  "--radius-field": types.string,
  "--radius-box": types.string,
});

// Miscellaneous configuration model
const MiscConfig = types.model("MiscConfig", {
  "--size-selector": types.string,
  "--size-field": types.string,
  "--border": types.string,
  "--depth": types.number,
  "--noise": types.number,
});

// Theme configuration model
export const ThemeConfig = types
  .model("ThemeConfig", {
    id: types.identifier,
    name: types.string,
    colors: ColorScheme,
    radius: RadiusConfig,
    misc: MiscConfig,
  })
  .views((self) => ({
    get prominentColors() {
      return {
        primary: self.colors["--color-primary"],
        secondary: self.colors["--color-secondary"],
        accent: self.colors["--color-accent"],
        base: self.colors["--color-base-100"],
      };
    },

    get CssVariables() {
      return {
        ...self.colors,
        ...self.radius,
        ...self.misc,
      };
    },
  }))
  .actions((self) => ({
    updateColorScheme(colors: Partial<typeof self.colors>) {
      Object.entries(colors).forEach(([key, value]) => {
        if (key in self.colors && value) {
          (self.colors as any)[key] = value;
        }
      });
    },

    updateRadius(radius: Partial<typeof self.radius>) {
      Object.entries(radius).forEach(([key, value]) => {
        if (key in self.radius && value) {
          (self.radius as any)[key] = value;
        }
      });
    },

    updateMiscConfig(misc: Partial<typeof self.misc>) {
      Object.entries(misc).forEach(([key, value]) => {
        if (key in self.misc && value !== undefined) {
          (self.misc as any)[key] = value;
        }
      });
    },
  }));

// Template model
// const Template = types
//   .model("Template", {
//     id: types.identifier,
//     name: types.string,
//     description: types.string,
//     preview_image: types.optional(types.string, ""),
//     preview_url: types.optional(types.string, ""),
//     tags: types.array(types.string),
//     created_at: types.optional(types.Date, () => new Date()),
//     updated_at: types.optional(types.Date, () => new Date()),
//     active_theme_id: types.string,
//   })
//   .views((self) => ({
//     get formattedTags() {
//       return self.tags.join(", ");
//     },
//     get isRecent() {
//       const oneDayAgo = new Date();
//       oneDayAgo.setDate(oneDayAgo.getDate() - 1);
//       return self.updated_at > oneDayAgo;
//     },
//   }))

// Template Store
export const TemplateStore = types
  .model("TemplateStore", {
    active_theme: ThemeConfig,
    activeTemplateId: types.maybe(types.string),
  })
  .actions((self) => ({
    setActiveTemplate(templateId: string | null) {
      self.activeTemplateId = templateId || undefined;
    },
    setActiveTheme(theme_id: string) {
      const theme: any = THEMES.find((t) => t.id === theme_id);
      if (theme) {
        self.active_theme = theme;
      } else {
        console.warn("Theme not found:", theme_id);
      }
    },
  }));

export type TemplateStoreInstance = Instance<typeof TemplateStore>;

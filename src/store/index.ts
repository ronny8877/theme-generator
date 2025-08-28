import { types, Instance, onSnapshot } from "mobx-state-tree";
import { AppStore } from "./app-store";
import { UndoRedoStore } from "./undo-redo";
import { TEMPLATES_ARRAY, THEMES } from "@/lib/constants";
import { TemplateStore } from "./template";

// Root Store that combines all stores
export const RootStore = types
  .model("RootStore", {
    app: AppStore,
    template: TemplateStore,
    undoRedo: UndoRedoStore,
  })
  .views((self) => ({
    get currentTheme() {
      return self.app.theme.current;
    },

    get activeTemplate() {
      return self.template;
    },

    get canUndo() {
      return self.undoRedo.canUndo;
    },

    get canRedo() {
      return self.undoRedo.canRedo;
    },
  }))
  .actions((self) => ({
    setActiveTemplate(templateId: string) {
      //finding the template in template array
      const template = TEMPLATES_ARRAY.find((t) => t.id === templateId);
      if (template) {
        //find the active theme for the template
        self.template.setActiveTemplate(template.theme_id);
      } else {
        console.warn("Template not found:", templateId);
      }
    },

    updateTemplateTheme(
      templateId: string,
      themeUpdates: {
        colors?: any;
        radius?: any;
        misc?: any;
      },
    ) {
      if (!self.template) {
        self.app.addNotification("error", "Template not found");
        return;
      }

      if (themeUpdates.colors)
        self.template.active_theme.updateColorScheme(themeUpdates.colors);
      if (themeUpdates.radius)
        self.template.active_theme.updateRadius(themeUpdates.radius);
      if (themeUpdates.misc)
        self.template.active_theme.updateMiscConfig(themeUpdates.misc);
    },

    // App state actions
    switchTool(tool: "website" | "app" | "poster" | "typography" | "gradient") {
      self.app.setActiveTool(tool);
    },
  }));

// Create store instance
export function createRootStore() {
  return RootStore.create({
    app: {
      theme: {
        current: "light",
        options: ["light", "dark", "cupcake", "bumblebee", "emerald"],
      },
      activeTool: "website",
      toolConfigs: [],
      ui: {
        notifications: [],
      },
    },
    template: {
      active_theme: THEMES[0],
      activeTemplateId: "simple-blog-post",
    },
    undoRedo: {},
  });
}

export type RootStoreInstance = Instance<typeof RootStore>;

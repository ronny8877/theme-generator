import { types, Instance, onSnapshot } from "mobx-state-tree";
import { AppStore } from "./app-store";
import { TemplateStore } from "./template";
import { UndoRedoStore } from "./undo-redo";
import { TEMPLATES } from "@/lib/constants";

// Root Store that combines all stores
export const RootStore = types
  .model("RootStore", {
    app: AppStore,
    templates: TemplateStore,
    undoRedo: UndoRedoStore,
  })
  .views((self) => ({
    get currentTheme() {
      return self.app.theme.current;
    },

    get activeTemplate() {
      return self.templates.activeTemplate;
    },

    get canUndo() {
      return self.undoRedo.canUndo;
    },

    get canRedo() {
      return self.undoRedo.canRedo;
    },
  }))
  .actions((self) => ({
    // Initialize the store with default data
    initialize() {
      // Load templates from constants
      self.templates.importTemplates(TEMPLATES);

      // Record initial state
      self.undoRedo.recordState(self.templates, "initialize", "Initial state");
    },

    // Undo functionality with automatic state management
    undo() {
      const success = self.undoRedo.undo(self.templates);
      if (success) {
        self.app.addNotification("info", "Action undone");
      }
      return success;
    },

    // Redo functionality with automatic state management
    redo() {
      const success = self.undoRedo.redo(self.templates);
      if (success) {
        self.app.addNotification("info", "Action redone");
      }
      return success;
    },

    // Template actions with automatic history recording
    createTemplate(templateData: {
      name: string;
      description: string;
      preview_image?: string;
      preview_url?: string;
      tags: string[];
      theme: any;
    }) {
      const template = self.templates.addTemplate(templateData);
      self.undoRedo.recordState(
        self.templates,
        "create_template",
        `Created template: ${templateData.name}`,
      );
      self.app.addNotification(
        "success",
        `Template "${templateData.name}" created successfully`,
      );
      return template;
    },

    updateTemplate(
      templateId: string,
      updates: {
        name?: string;
        description?: string;
        preview_image?: string;
        tags?: string[];
      },
    ) {
      const template = self.templates.templates.find(
        (t) => t.id === templateId,
      );
      if (!template) {
        self.app.addNotification("error", "Template not found");
        return;
      }

      const oldName = template.name;

      if (updates.name) template.updateName(updates.name);
      if (updates.description) template.updateDescription(updates.description);
      if (updates.preview_image)
        template.updatePreviewImage(updates.preview_image);
      if (updates.tags) {
        template.tags.clear();
        updates.tags.forEach((tag) => template.addTag(tag));
      }

      self.undoRedo.recordState(
        self.templates,
        "update_template",
        `Updated template: ${oldName}`,
      );
      self.app.addNotification(
        "success",
        `Template "${template.name}" updated successfully`,
      );
    },

    updateTemplateTheme(
      templateId: string,
      themeUpdates: {
        colors?: any;
        radius?: any;
        misc?: any;
      },
    ) {
      const template = self.templates.templates.find(
        (t) => t.id === templateId,
      );
      if (!template) {
        self.app.addNotification("error", "Template not found");
        return;
      }

      if (themeUpdates.colors) template.updateColorScheme(themeUpdates.colors);
      if (themeUpdates.radius) template.updateRadius(themeUpdates.radius);
      if (themeUpdates.misc) template.updateMiscConfig(themeUpdates.misc);

      self.undoRedo.recordState(
        self.templates,
        "update_template_theme",
        `Updated theme for: ${template.name}`,
      );
      self.app.addNotification(
        "success",
        `Theme updated for "${template.name}"`,
      );
    },

    deleteTemplate(templateId: string) {
      const template = self.templates.templates.find(
        (t) => t.id === templateId,
      );
      if (!template) {
        self.app.addNotification("error", "Template not found");
        return;
      }

      const templateName = template.name;
      self.templates.removeTemplate(templateId);
      self.undoRedo.recordState(
        self.templates,
        "delete_template",
        `Deleted template: ${templateName}`,
      );
      self.app.addNotification(
        "success",
        `Template "${templateName}" deleted successfully`,
      );
    },

    duplicateTemplate(templateId: string) {
      const duplicated = self.templates.duplicateTemplate(templateId);
      if (duplicated) {
        self.undoRedo.recordState(
          self.templates,
          "duplicate_template",
          `Duplicated template: ${duplicated.name}`,
        );
        self.app.addNotification(
          "success",
          `Template duplicated as "${duplicated.name}"`,
        );
      } else {
        self.app.addNotification("error", "Failed to duplicate template");
      }
      return duplicated;
    },

    // App state actions
    switchTool(tool: "website" | "app" | "poster" | "typography" | "gradient") {
      self.app.setActiveTool(tool);
      self.app.addNotification("info", `Switched to ${tool} tool`);
    },

    // Export/Import functionality
    exportProject() {
      return {
        templates: self.templates.exportTemplates(),
        appSettings: {
          theme: self.app.theme.current,
          activeTool: self.app.activeTool,
        },
        timestamp: new Date().toISOString(),
      };
    },

    importProject(projectData: any) {
      try {
        if (projectData.templates) {
          self.templates.importTemplates(projectData.templates);
        }

        if (projectData.appSettings) {
          if (projectData.appSettings.theme) {
            self.app.setTheme(projectData.appSettings.theme);
          }
          if (projectData.appSettings.activeTool) {
            self.app.setActiveTool(projectData.appSettings.activeTool);
          }
        }

        self.undoRedo.recordState(
          self.templates,
          "import_project",
          "Imported project",
        );
        self.app.addNotification("success", "Project imported successfully");
      } catch (error) {
        self.app.addNotification("error", "Failed to import project");
        console.error("Import error:", error);
      }
    },
  }))
  .actions((self) => ({
    afterCreate() {
      // Set up automatic history recording for template changes
      onSnapshot(self.templates, () => {
        // Only record if we're not in the middle of an undo/redo operation
        if (self.undoRedo.isRecording) {
          // Debounce rapid changes
          setTimeout(() => {
            if (self.undoRedo.isRecording) {
              self.undoRedo.recordState(
                self.templates,
                "auto_save",
                "Auto-saved changes",
              );
            }
          }, 500);
        }
      });

      // Initialize the store
      self.initialize();
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
    templates: {
      templates: [],
      selectedTags: [],
    },
    undoRedo: {},
  });
}

export type RootStoreInstance = Instance<typeof RootStore>;

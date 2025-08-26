import { types, Instance, getSnapshot } from "mobx-state-tree";
import { AVILABLE_THEMES } from "@/lib/constants";

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
const ThemeConfig = types.model("ThemeConfig", {
  colors: ColorScheme,
  radius: RadiusConfig,
  misc: MiscConfig,
});

// Template model
const Template = types
  .model("Template", {
    id: types.identifier,
    name: types.string,
    description: types.string,
    preview_image: types.optional(types.string, ""),
    preview_url: types.optional(types.string, ""),
    tags: types.array(types.string),
    theme: ThemeConfig,
    created_at: types.optional(types.Date, () => new Date()),
    updated_at: types.optional(types.Date, () => new Date()),
  })
  .views((self) => ({
    get prominentColors() {
      return {
        primary: self.theme.colors["--color-primary"],
        secondary: self.theme.colors["--color-secondary"],
        accent: self.theme.colors["--color-accent"],
        base: self.theme.colors["--color-base-100"],
      };
    },

    get getTheme() {
      //Composing themes
      return {
        ...self.theme.colors,
        ...self.theme.radius,
        ...self.theme.misc,
      };
    },

    get formattedTags() {
      return self.tags.join(", ");
    },

    get templateTheme() {
      return self.theme;
    },

    get isRecent() {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      return self.updated_at > oneDayAgo;
    },
  }))
  .actions((self) => ({
    updateName(name: string) {
      self.name = name;
      self.updated_at = new Date();
    },

    updateDescription(description: string) {
      self.description = description;
      self.updated_at = new Date();
    },

    updatePreviewImage(url: string) {
      self.preview_image = url;
      self.updated_at = new Date();
    },

    addTag(tag: string) {
      if (!self.tags.includes(tag)) {
        self.tags.push(tag);
        self.updated_at = new Date();
      }
    },

    removeTag(tag: string) {
      const index = self.tags.indexOf(tag);
      if (index > -1) {
        self.tags.splice(index, 1);
        self.updated_at = new Date();
      }
    },

    updateColorScheme(colors: Partial<typeof self.theme.colors>) {
      Object.entries(colors).forEach(([key, value]) => {
        if (key in self.theme.colors && value) {
          (self.theme.colors as any)[key] = value;
        }
      });
      self.updated_at = new Date();
    },

    updateRadius(radius: Partial<typeof self.theme.radius>) {
      Object.entries(radius).forEach(([key, value]) => {
        if (key in self.theme.radius && value) {
          (self.theme.radius as any)[key] = value;
        }
      });
      self.updated_at = new Date();
    },

    updateMiscConfig(misc: Partial<typeof self.theme.misc>) {
      Object.entries(misc).forEach(([key, value]) => {
        if (key in self.theme.misc && value !== undefined) {
          (self.theme.misc as any)[key] = value;
        }
      });
      self.updated_at = new Date();
    },
  }));

// Template Store
export const TemplateStore = types
  .model("TemplateStore", {
    templates: types.array(Template),
    activeTemplateId: types.maybe(types.string),
    searchQuery: types.optional(types.string, ""),
    selectedTags: types.array(types.string),
  })
  .views((self) => ({
    get activeTemplate() {
      return self.templates.find((t) => t.id === self.activeTemplateId) || null;
    },

    get filteredTemplates() {
      return self.templates.filter((template) => {
        const matchesSearch =
          !self.searchQuery ||
          template.name
            .toLowerCase()
            .includes(self.searchQuery.toLowerCase()) ||
          template.description
            .toLowerCase()
            .includes(self.searchQuery.toLowerCase());

        const matchesTags =
          self.selectedTags.length === 0 ||
          self.selectedTags.every((tag) => template.tags.includes(tag));

        return matchesSearch && matchesTags;
      });
    },

    get allTags() {
      const allTags = new Set<string>();
      self.templates.forEach((template) => {
        template.tags.forEach((tag) => allTags.add(tag));
      });
      return Array.from(allTags).sort();
    },

    get recentTemplates() {
      return self.templates
        .filter((t) => t.isRecent)
        .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
    },
  }))
  .actions((self) => ({
    setActiveTemplate(templateId: string | null) {
      self.activeTemplateId = templateId || undefined;
    },

    setSearchQuery(query: string) {
      self.searchQuery = query;
    },

    toggleTagFilter(tag: string) {
      const index = self.selectedTags.indexOf(tag);
      if (index > -1) {
        self.selectedTags.splice(index, 1);
      } else {
        self.selectedTags.push(tag);
      }
    },

    clearTagFilters() {
      self.selectedTags.clear();
    },
    addTemplate(templateData: {
      name: string;
      description: string;
      preview_image?: string;
      preview_url?: string;
      tags: string[];
      theme: any;
    }) {
      const newTemplate = Template.create({
        id: `template-${Date.now()}`,
        name: templateData.name,
        description: templateData.description,
        preview_image: templateData.preview_image || "",
        preview_url: templateData.preview_url || "",
        tags: templateData.tags,
        theme: templateData.theme,
      });

      self.templates.push(newTemplate);
      self.activeTemplateId = newTemplate.id;
      return newTemplate;
    },

    duplicateTemplate(templateId: string) {
      const template = self.templates.find((t) => t.id === templateId);
      if (!template) return null;

      const snapshot = getSnapshot(template);
      const duplicatedTemplate = Template.create({
        ...snapshot,
        id: `template-${Date.now()}`,
        name: `${template.name} (Copy)`,
        created_at: new Date(),
        updated_at: new Date(),
      });

      self.templates.push(duplicatedTemplate);
      return duplicatedTemplate;
    },

    removeTemplate(templateId: string) {
      const index = self.templates.findIndex((t) => t.id === templateId);
      if (index > -1) {
        if (self.activeTemplateId === templateId) {
          self.activeTemplateId = undefined;
        }
        self.templates.splice(index, 1);
      }
    },

    importTemplates(templates: any[]) {
      templates.forEach((templateData) => {
        const template = Template.create({
          ...templateData,
          id: templateData.id || `template-${Date.now()}-${Math.random()}`,
        });
        self.templates.push(template);
      });
    },

    exportTemplates() {
      return self.templates.map((template) => getSnapshot(template));
    },
  }));

export type TemplateStoreInstance = Instance<typeof TemplateStore>;
export type TemplateInstance = Instance<typeof Template>;

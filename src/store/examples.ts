// Example usage of the new elegant store structure

import { createRootStore } from "@/store";

// Create the store instance
const store = createRootStore();

// Example: Working with app state
function exampleAppUsage() {
  // Change app theme
  store.app.setTheme("dark");

  // Switch to app tool (automatically sets mobile as default preview device)
  store.switchTool("app");

  // Change preview device (only allowed devices for current tool)
  store.app.setPreviewDevice("tablet");

  // Show/hide sidebar
  store.app.toggleSidebar();

  // Add notification
  store.app.addNotification("success", "Theme changed successfully!");

  // Access current tool configuration
  const currentConfig = store.app.currentToolConfig;
  console.log("Allowed devices:", currentConfig?.allowedDevices);
}

// Example: Working with templates
function exampleTemplateUsage() {
  // Create a new template
  const newTemplate = store.createTemplate({
    name: "Modern Blog",
    description: "A clean, modern blog template",
    tags: ["blog", "modern", "minimal"],
    theme: {
      colors: {
        "--color-primary": "oklch(58% 0.233 277.117)",
        "--color-secondary": "oklch(65% 0.241 354.308)",
        // ... other colors
      },
      radius: {
        "--radius-selector": "0.5rem",
        "--radius-field": "0.25rem",
        "--radius-box": "0.5rem",
      },
      misc: {
        "--size-selector": "0.25rem",
        "--size-field": "0.25rem",
        "--border": "1px",
        "--depth": 1,
        "--noise": 0,
      },
    },
  });

  // Set as active template
  store.templates.setActiveTemplate(newTemplate.id);

  // Update template properties
  store.updateTemplate(newTemplate.id, {
    name: "Updated Blog Template",
    description: "An updated description",
    tags: ["blog", "modern", "updated"],
  });

  // Update template theme colors
  store.updateTemplateTheme(newTemplate.id, {
    colors: {
      "--color-primary": "oklch(70% 0.2 180)",
      "--color-accent": "oklch(80% 0.15 90)",
    },
  });

  // Search templates
  store.templates.setSearchQuery("blog");

  // Filter by tags
  store.templates.toggleTagFilter("modern");

  // Get filtered results
  const filteredTemplates = store.templates.filteredTemplates;
  console.log("Found templates:", filteredTemplates.length);

  // Duplicate template
  const duplicated = store.duplicateTemplate(newTemplate.id);

  // Access template properties
  const activeTemplate = store.activeTemplate;
  if (activeTemplate) {
    console.log("Active template colors:", activeTemplate.prominentColors);
    console.log("Template tags:", activeTemplate.formattedTags);
    console.log("Is recent:", activeTemplate.isRecent);
  }
}

// Example: Undo/Redo functionality
function exampleUndoRedoUsage() {
  // Make some changes
  const template = store.createTemplate({
    name: "Test Template",
    description: "Test description",
    tags: ["test"],
    theme: {
      /* theme config */
    },
  });

  store.updateTemplate(template.id, { name: "Updated Test Template" });

  // Undo last action
  if (store.canUndo) {
    store.undo();
    console.log("Action undone");
  }

  // Redo
  if (store.canRedo) {
    store.redo();
    console.log("Action redone");
  }

  // Check history
  const historySummary = store.undoRedo.getHistorySummary();
  console.log("History:", historySummary);
}

// Example: Import/Export
function exampleImportExport() {
  // Export current project
  const projectData = store.exportProject();
  console.log("Exported project:", projectData);

  // Import project (e.g., from file)
  store.importProject(projectData);
}

// Example: Tool-specific configurations
function exampleToolConfiguration() {
  // Update tool configuration
  store.app.updateToolConfig("website", {
    allowedDevices: ["mobile", "tablet", "desktop"],
    defaultDevice: "desktop",
  });

  store.app.updateToolConfig("app", {
    allowedDevices: ["mobile", "tablet"],
    defaultDevice: "mobile",
  });

  // Switch tools and see device changes
  store.switchTool("website"); // Will set to desktop
  console.log("Current device:", store.app.activePreviewDevice);

  store.switchTool("app"); // Will set to mobile
  console.log("Current device:", store.app.activePreviewDevice);
}

// Example: Reactive UI updates
function exampleReactiveUI() {
  // Listen to store changes (in React component)
  /*
  import { observer } from "mobx-react-lite";
  
  const TemplateList = observer(() => {
    const { templates } = useStore();
    
    return (
      <div>
        <input 
          value={templates.searchQuery}
          onChange={(e) => templates.setSearchQuery(e.target.value)}
          placeholder="Search templates..."
        />
        
        {templates.filteredTemplates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template}
            isActive={template.id === templates.activeTemplateId}
            onClick={() => templates.setActiveTemplate(template.id)}
          />
        ))}
      </div>
    );
  });
  */
}

export {
  exampleAppUsage,
  exampleTemplateUsage,
  exampleUndoRedoUsage,
  exampleImportExport,
  exampleToolConfiguration,
  exampleReactiveUI,
};

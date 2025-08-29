// Example usage of the nanostores

import { 
  setTheme, 
  setActiveTool, 
  setPreviewDevice, 
  toggleSidebar,
  setActiveTemplate,
  updateColorScheme,
  $app,
  $template 
} from "@/store/nano-store";

// Example: Working with app state
export function exampleAppUsage() {
  // Change app theme
  setTheme("dark");

  // Switch to app tool (automatically sets mobile as default preview device)
  setActiveTool("app");

  // Change preview device
  setPreviewDevice("tablet");

  // Show/hide sidebar
  toggleSidebar();

  // Get current app state
  const currentApp = $app.get();
  console.log("Current theme:", currentApp.theme.current);
}

// Example: Working with template state  
export function exampleTemplateUsage() {
  // Set active template
  setActiveTemplate("simple-blog-post");

  // Update colors
  updateColorScheme({
    "--color-primary": "#3b82f6",
    "--color-secondary": "#8b5cf6",
  });

  // Get current template state
  const currentTemplate = $template.get();
  console.log("Active template:", currentTemplate.activeTemplateId);
}

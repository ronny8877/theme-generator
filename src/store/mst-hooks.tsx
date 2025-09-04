import { observer } from "mobx-react-lite";
import { rootStore } from "./mst-store";

// Export the root store for direct access
export { rootStore };

// Hook to access the full store (use sparingly, prefer specific hooks)
export const useRootStore = () => rootStore;

// App Store Hooks
export const useAppStore = () => rootStore.app;
export const useTheme = () => rootStore.app.theme;
export const useActivePreviewDevice = () => rootStore.app.activePreviewDevice;
export const useActiveTool = () => rootStore.app.activeTool;
export const useActiveEditorTab = () => rootStore.app.activeEditorTab;
export const useEditor = () => rootStore.app.editor;
export const useUI = () => rootStore.app.ui;
export const useAvailableThemes = () => rootStore.app.availableThemes;
export const useActiveNotifications = () => rootStore.app.activeNotifications;
export const useHasActiveNotifications = () =>
  rootStore.app.hasActiveNotifications;

// Template Store Hooks
export const useTemplateStore = () => rootStore.template;
export const useActiveTheme = () => rootStore.template.active_theme;
export const useActiveTemplateId = () => rootStore.template.activeTemplateId;
export const useUserThemes = () => rootStore.template.userThemes;
export const useProminentColors = () => rootStore.template.prominentColors;

// Font Store Hooks
export const useFontStore = () => rootStore.font;
export const useHeadingFont = () => rootStore.font.heading;
export const useBodyFont = () => rootStore.font.body;
export const useFontOverrides = () => rootStore.font.overrides;
export const useLoadedFonts = () => rootStore.font.loadedFonts;
export const useFontCSSVariables = () => rootStore.font.fontCSSVariables;

// Root Store Computed Hooks
export const useCssVariables = () => rootStore.cssVariables;

// App Actions
export const useAppActions = () => ({
  setTheme: rootStore.app.setTheme,
  setActiveTool: rootStore.app.setActiveTool,
  setActiveEditorTab: rootStore.app.setActiveEditorTab,
  setPreviewDevice: rootStore.app.setPreviewDevice,
  toggleSidebar: rootStore.app.toggleSidebar,
  setActivePanel: rootStore.app.setActivePanel,
  addNotification: rootStore.app.addNotification,
  dismissNotification: rootStore.app.dismissNotification,
  setLoading: rootStore.app.setLoading,
  editEditorSettings: rootStore.app.editEditorSettings,
});

// Template Actions
export const useTemplateActions = () => ({
  setActiveTemplate: rootStore.template.setActiveTemplate,
  setActiveTheme: rootStore.template.setActiveTheme,
  setActiveThemeConfig: rootStore.template.setActiveThemeConfig,
  updateColorScheme: rootStore.template.updateColorScheme,
  updateThemeColor: rootStore.template.updateThemeColor,
  updateRadius: rootStore.template.updateRadius,
  updateMiscConfig: rootStore.template.updateMiscConfig,
  saveCurrentThemeAs: rootStore.template.saveCurrentThemeAs,
  deleteUserTheme: rootStore.template.deleteUserTheme,
});

// Font Actions
export const useFontActions = () => ({
  updateHeadingFont: rootStore.font.updateHeadingFont,
  updateBodyFont: rootStore.font.updateBodyFont,
  updateFontOverrides: rootStore.font.updateFontOverrides,
  loadGoogleFont: rootStore.font.loadGoogleFont,
});

// Root Store Actions
export const useRootActions = () => ({
  switchTool: rootStore.switchTool,
  setActiveTemplateById: rootStore.setActiveTemplateById,
});

// Higher-order component to make components reactive to MST changes
export { observer };

// Utility hook to create reactive components
export const useObserver = () => observer;

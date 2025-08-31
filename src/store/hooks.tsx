import { useStore } from "@nanostores/react";
import {
  $app,
  $template,
  $undoRedo,
  $availableThemes,
  $activeNotifications,
  $hasActiveNotifications,
  $activeTheme,
  $prominentColors,
  $cssVariables,
  $canUndo,
  $canRedo,
  setTheme,
  setActiveTool,
  setActiveEditorTab,
  setPreviewDevice,
  toggleSidebar,
  setActivePanel,
  addNotification,
  setActiveTemplate,
  updateColorScheme,
  updateRadius,
  updateMiscConfig,
  switchTool,
} from "./nano-store";
import {
  $fontStore,
  $headingFont,
  $bodyFont,
  $fontOverrides,
  $fontCSSVariables,
  updateHeadingFont,
  updateBodyFont,
  updateFontOverrides,
  loadGoogleFont,
} from "./font-store";

// Hook to access app store
export const useAppStore = () => {
  return useStore($app);
};

// Hook to access template store
export const useTemplateStore = () => {
  return useStore($template);
};

// Hook to access undo-redo store
export const useUndoRedoStore = () => {
  return useStore($undoRedo);
};

// Hook for computed values
export const useAvailableThemes = () => useStore($availableThemes);
export const useActiveNotifications = () => useStore($activeNotifications);
export const useHasActiveNotifications = () =>
  useStore($hasActiveNotifications);
export const useActiveTheme = () => useStore($activeTheme);
export const useProminentColors = () => useStore($prominentColors);
export const useCssVariables = () => useStore($cssVariables);
export const useCanUndo = () => useStore($canUndo);
export const useCanRedo = () => useStore($canRedo);

// Font store hooks
export const useFontStore = () => useStore($fontStore);
export const useHeadingFont = () => useStore($headingFont);
export const useBodyFont = () => useStore($bodyFont);
export const useFontOverrides = () => useStore($fontOverrides);
export const useFontCSSVariables = () => useStore($fontCSSVariables);

// Hook for app actions
export const useAppActions = () => {
  return {
    setTheme,
    switchTool,
    setPreviewDevice,
    toggleSidebar,
    setActivePanel,
    addNotification,
    setActiveTool,
    setActiveEditorTab,
  };
};

// Hook for template actions
export const useTemplateActions = () => {
  return {
    setActiveTemplate,
    updateColorScheme,
    updateRadius,
    updateMiscConfig,
  };
};

// Hook for font actions
export const useFontActions = () => {
  return {
    updateHeadingFont,
    updateBodyFont,
    updateFontOverrides,
    loadGoogleFont,
  };
};

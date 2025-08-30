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

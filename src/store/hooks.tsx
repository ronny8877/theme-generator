import React, { createContext, useContext, ReactNode } from "react";
import { createRootStore, RootStoreInstance } from "./index";

// Create store context
const StoreContext = createContext<RootStoreInstance | null>(null);

// Store provider component
interface StoreProviderProps {
  children: ReactNode;
  store?: RootStoreInstance;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  store = createRootStore(),
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// Hook to access the store
export const useStore = (): RootStoreInstance => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};

// Convenience hooks for specific stores
export const useAppStore = () => {
  const { app } = useStore();
  return app;
};

export const useTemplateStore = () => {
  const { templates } = useStore();
  return templates;
};

export const useUndoRedoStore = () => {
  const { undoRedo } = useStore();
  return undoRedo;
};

// Hook for undo/redo functionality
export const useUndoRedo = () => {
  const store = useStore();
  return {
    canUndo: store.canUndo,
    canRedo: store.canRedo,
    undo: store.undo,
    redo: store.redo,
    history: store.undoRedo.getHistorySummary(),
  };
};

// Hook for template management
export const useTemplateActions = () => {
  const store = useStore();
  return {
    createTemplate: store.createTemplate,
    updateTemplate: store.updateTemplate,
    updateTemplateTheme: store.updateTemplateTheme,
    deleteTemplate: store.deleteTemplate,
    duplicateTemplate: store.duplicateTemplate,
  };
};

// Hook for app actions
export const useAppActions = () => {
  const store = useStore();
  return {
    setTheme: store.app.setTheme,
    switchTool: store.switchTool,
    setPreviewDevice: store.app.setPreviewDevice,
    toggleSidebar: store.app.toggleSidebar,
    setActivePanel: store.app.setActivePanel,
    addNotification: store.app.addNotification,
  };
};

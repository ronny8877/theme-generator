import { types, Instance } from "mobx-state-tree";
import { AVILABLE_PREVIEW_DEVICES, TOOL_VARIANTS } from "@/lib/constants";

// Preview device configuration for each tool
const ToolPreviewConfig = types.model("ToolPreviewConfig", {
  toolName: types.enumeration("ToolVariant", TOOL_VARIANTS),
  allowedDevices: types.array(
    types.enumeration("PreviewDevice", AVILABLE_PREVIEW_DEVICES),
  ),
  defaultDevice: types.enumeration("PreviewDevice", AVILABLE_PREVIEW_DEVICES),
});

// App theme configuration
const AppTheme = types.model("AppTheme", {
  current: types.string,
  options: types.array(types.string),
});

// UI state management
const UIState = types.model("UIState", {
  sidebarCollapsed: types.optional(types.boolean, false),
  locked_ui: types.optional(types.boolean, false), //if ads are disabled we lock the UI
  activePanel: types.optional(
    types.enumeration("Panel", ["templates", "editor", "preview", "settings"]),
    "templates",
  ),
  isLoading: types.optional(types.boolean, false),
  notifications: types.array(
    types.model("Notification", {
      id: types.identifier,
      type: types.enumeration("NotificationType", [
        "success",
        "error",
        "warning",
        "info",
      ]),
      message: types.string,
      timestamp: types.Date,
      dismissed: types.optional(types.boolean, false),
    }),
  ),
});

// App Store - Main application state
export const AppStore = types
  .model("AppStore", {
    theme: AppTheme,
    activePreviewDevice: types.maybe(
      types.enumeration("PreviewDevice", AVILABLE_PREVIEW_DEVICES),
    ),
    activeTool: types.enumeration("ToolVariant", TOOL_VARIANTS),
    toolConfigs: types.array(ToolPreviewConfig),
    ui: UIState,
  })
  .views((self) => ({
    get availableThemes() {
      return self.theme.options;
    },

    get currentToolConfig() {
      return self.toolConfigs.find(
        (config) => config.toolName === self.activeTool,
      );
    },

    get allowedPreviewDevices() {
      return this.currentToolConfig?.allowedDevices || [];
    },

    get activeNotifications() {
      return self.ui.notifications.filter((n) => !n.dismissed);
    },

    get hasActiveNotifications() {
      return this.activeNotifications.length > 0;
    },
  }))
  .actions((self) => ({
    // Theme management
    setTheme(theme: string) {
      self.theme.current = theme;
    },

    // Tool and device management
    setActiveTool(tool: (typeof TOOL_VARIANTS)[number]) {
      self.activeTool = tool;

      // Set default preview device based on tool configuration
      const toolConfig = self.toolConfigs.find(
        (config) => config.toolName === tool,
      );
      if (toolConfig) {
        self.activePreviewDevice = toolConfig.defaultDevice;
      }
    },

    setPreviewDevice(device: (typeof AVILABLE_PREVIEW_DEVICES)[number]) {
      const currentToolConfig = self.toolConfigs.find(
        (config) => config.toolName === self.activeTool,
      );
      const allowedDevices = currentToolConfig?.allowedDevices;
      if (allowedDevices && allowedDevices.some((d) => d === device)) {
        self.activePreviewDevice = device;
      }
    },

    // Tool configuration management
    updateToolConfig(
      toolName: (typeof TOOL_VARIANTS)[number],
      config: {
        allowedDevices?: (typeof AVILABLE_PREVIEW_DEVICES)[number][];
        defaultDevice?: (typeof AVILABLE_PREVIEW_DEVICES)[number];
      },
    ) {
      const existingConfig = self.toolConfigs.find(
        (c) => c.toolName === toolName,
      );
      if (existingConfig) {
        if (config.allowedDevices) {
          existingConfig.allowedDevices.replace(config.allowedDevices as any);
        }
        if (config.defaultDevice) {
          existingConfig.defaultDevice = config.defaultDevice;
        }
      }
    },

    // UI state management
    toggleSidebar() {
      self.ui.sidebarCollapsed = !self.ui.sidebarCollapsed;
    },

    setSidebarCollapsed(collapsed: boolean) {
      self.ui.sidebarCollapsed = collapsed;
    },

    setActivePanel(panel: "templates" | "editor" | "preview" | "settings") {
      self.ui.activePanel = panel;
    },

    setLoading(loading: boolean) {
      self.ui.isLoading = loading;
    },

    // Notification management
    addNotification(
      type: "success" | "error" | "warning" | "info",
      message: string,
    ) {
      const notification = {
        id: `notification-${Date.now()}`,
        type,
        message,
        timestamp: new Date(),
        dismissed: false,
      };
      self.ui.notifications.push(notification);

      // Auto-dismiss success and info notifications after 5 seconds
      if (type === "success" || type === "info") {
        setTimeout(() => {
          this.dismissNotification(notification.id);
        }, 5000);
      }
    },

    dismissNotification(id: string) {
      const notification = self.ui.notifications.find((n) => n.id === id);
      if (notification) {
        notification.dismissed = true;
      }
    },

    clearNotifications() {
      self.ui.notifications.clear();
    },

    // Initialize default tool configurations
    initializeToolConfigs() {
      const defaultConfigs = [
        {
          toolName: "website" as const,
          allowedDevices: ["mobile", "tablet", "desktop"] as const,
          defaultDevice: "desktop" as const,
        },
        {
          toolName: "app" as const,
          allowedDevices: ["mobile", "tablet"] as const,
          defaultDevice: "mobile" as const,
        },
        {
          toolName: "poster" as const,
          allowedDevices: ["desktop"] as const,
          defaultDevice: "desktop" as const,
        },
        {
          toolName: "typography" as const,
          allowedDevices: ["desktop"] as const,
          defaultDevice: "desktop" as const,
        },
        {
          toolName: "gradient" as const,
          allowedDevices: ["desktop"] as const,
          defaultDevice: "desktop" as const,
        },
      ];

      defaultConfigs.forEach((config) => {
        const existing = self.toolConfigs.find(
          (c) => c.toolName === config.toolName,
        );
        if (!existing) {
          self.toolConfigs.push(ToolPreviewConfig.create(config));
        }
      });
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.initializeToolConfigs();
    },
  }));

export type AppStoreInstance = Instance<typeof AppStore>;

# Elegant Store Architecture

This project implements a clean, modular store architecture using MobX State Tree (MST) following clean code principles. The store is divided into separate, manageable pieces with clear responsibilities.

## Store Structure

### 🏗️ Architecture Overview

```
RootStore
├── AppStore (app-store.ts) - Application-level state
├── TemplateStore (template.ts) - Template management
└── UndoRedoStore (undo-redo.ts) - Undo/Redo functionality
```

### 📁 File Organization

- **`index.ts`** - Root store that combines all stores
- **`app-store.ts`** - App theme, tools, UI state, notifications
- **`template.ts`** - Template CRUD operations, search, filtering
- **`undo-redo.ts`** - Undo/redo functionality with history management
- **`hooks.tsx`** - React hooks for easy store access
- **`examples.ts`** - Usage examples and patterns
- **`app.ts`** - Legacy file (refactored, exports new stores)

## Key Features

### ✨ Clean Code Principles

1. **Single Responsibility**: Each store handles one domain
2. **Separation of Concerns**: Clear boundaries between app state and template state
3. **Modularity**: Easy to extend and maintain
4. **Type Safety**: Full TypeScript support with proper typing

### 🎯 Template Management

- **CRUD Operations**: Create, read, update, delete templates
- **Theme Management**: Color schemes, radius, misc configurations
- **Search & Filtering**: By name, description, tags
- **Tagging System**: Flexible tagging with filtering
- **Metadata**: Creation/update timestamps, preview images

### 🔄 Undo/Redo System

- **Automatic History**: Records state changes automatically
- **Manual Recording**: For specific actions
- **History Limits**: Configurable max history size
- **Debounced Recording**: Prevents excessive history entries

### 🛠️ Tool-Specific Configuration

- **Dynamic Device Lists**: Each tool can have different allowed preview devices
- **Auto-Configuration**: Tools automatically set appropriate devices
- **Flexible Constraints**: Easy to modify device restrictions per tool

### 📱 UI State Management

- **Sidebar State**: Collapsible sidebar with persistence
- **Panel Management**: Active panel tracking
- **Loading States**: Global loading state management
- **Notifications**: Toast-style notifications with auto-dismiss

## Usage Examples

### Basic Setup

```typescript
import { StoreProvider } from "@/store/hooks";
import { createRootStore } from "@/store";

function App() {
  const store = createRootStore();

  return (
    <StoreProvider store={store}>
      <YourApp />
    </StoreProvider>
  );
}
```

### Using Hooks

```typescript
import { useStore, useTemplateActions, useAppActions } from "@/store/hooks";
import { observer } from "mobx-react-lite";

const TemplateEditor = observer(() => {
  const store = useStore();
  const { createTemplate, updateTemplateTheme } = useTemplateActions();
  const { switchTool } = useAppActions();

  const activeTemplate = store.activeTemplate;

  const handleCreateTemplate = () => {
    createTemplate({
      name: "New Template",
      description: "A new template",
      tags: ["new"],
      theme: { /* theme config */ }
    });
  };

  return (
    <div>
      <button onClick={handleCreateTemplate}>
        Create Template
      </button>
      {activeTemplate && (
        <div>
          <h2>{activeTemplate.name}</h2>
          <p>Colors: {JSON.stringify(activeTemplate.prominentColors)}</p>
        </div>
      )}
    </div>
  );
});
```

### Template Operations

```typescript
// Create a new template
const template = store.createTemplate({
  name: "Blog Template",
  description: "Modern blog design",
  tags: ["blog", "modern"],
  theme: {
    colors: {
      /* color config */
    },
    radius: {
      /* radius config */
    },
    misc: {
      /* misc config */
    },
  },
});

// Update template properties
store.updateTemplate(template.id, {
  name: "Updated Blog Template",
  tags: ["blog", "modern", "updated"],
});

// Update template theme
store.updateTemplateTheme(template.id, {
  colors: {
    "--color-primary": "oklch(70% 0.2 180)",
  },
});

// Search and filter
store.templates.setSearchQuery("blog");
store.templates.toggleTagFilter("modern");
const results = store.templates.filteredTemplates;
```

### Undo/Redo

```typescript
// Automatic undo/redo
store.undo(); // Undoes last action
store.redo(); // Redoes last undone action

// Check availability
if (store.canUndo) {
  store.undo();
}

// History inspection
const history = store.undoRedo.getHistorySummary();
console.log("History:", history);
```

### Tool Management

```typescript
// Switch tools (automatically configures preview devices)
store.switchTool("app"); // Sets mobile as default
store.switchTool("website"); // Sets desktop as default

// Check current configuration
const config = store.app.currentToolConfig;
console.log("Allowed devices:", config?.allowedDevices);

// Update tool configuration
store.app.updateToolConfig("poster", {
  allowedDevices: ["desktop"],
  defaultDevice: "desktop",
});
```

## State Flow

### Template Lifecycle

1. **Creation**: `createTemplate()` → Records in history → Shows notification
2. **Modification**: `updateTemplate()`/`updateTemplateTheme()` → Auto-records → Updates timestamp
3. **Deletion**: `deleteTemplate()` → Records in history → Shows notification

### Tool Switching

1. **Tool Change**: `switchTool()` → Finds tool config → Sets default device → Shows notification
2. **Device Change**: `setPreviewDevice()` → Validates against allowed devices → Updates if valid

### Undo/Redo Flow

1. **Action**: Any template modification
2. **Recording**: Debounced snapshot creation
3. **History**: Maintains circular buffer with max size
4. **Playback**: Applies snapshots during undo/redo

## Benefits

### 🎯 For Developers

- **Predictable**: Clear state flow and updates
- **Debuggable**: MobX dev tools support
- **Testable**: Each store can be tested independently
- **Scalable**: Easy to add new stores or features

### 🚀 For Users

- **Responsive**: Reactive UI updates
- **Reliable**: Undo/redo for safety
- **Intuitive**: Tool-specific configurations
- **Informative**: Clear notifications and feedback

## Extension Points

### Adding New Tools

1. Add tool to `TOOL_VARIANTS` in constants
2. Add default configuration in `initializeToolConfigs()`
3. Implement tool-specific logic if needed

### New Template Properties

1. Extend `Template` model in `template.ts`
2. Add corresponding actions for updates
3. Update import/export logic

### Custom Notifications

1. Extend notification types in `UIState`
2. Add custom notification actions
3. Implement UI rendering for new types

This architecture provides a solid foundation that's easy to understand, maintain, and extend while following clean code principles.

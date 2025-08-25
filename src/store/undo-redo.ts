import { types, Instance, getSnapshot, applySnapshot } from "mobx-state-tree";

// History entry model
const HistoryEntry = types.model("HistoryEntry", {
  snapshot: types.frozen(),
  timestamp: types.Date,
  action: types.string,
  description: types.optional(types.string, ""),
});

// Undo/Redo Store
export const UndoRedoStore = types
  .model("UndoRedoStore", {
    history: types.array(HistoryEntry),
    currentIndex: types.optional(types.number, -1),
    maxHistorySize: types.optional(types.number, 100),
    isRecording: types.optional(types.boolean, true),
  })
  .views((self) => ({
    get canUndo() {
      return self.currentIndex > 0;
    },

    get canRedo() {
      return self.currentIndex < self.history.length - 1;
    },

    get currentEntry() {
      return self.history[self.currentIndex] || null;
    },

    get nextEntry() {
      return self.history[self.currentIndex + 1] || null;
    },

    get previousEntry() {
      return self.history[self.currentIndex - 1] || null;
    },

    get historySize() {
      return self.history.length;
    },
  }))
  .actions((self) => ({
    // Record a new state in history
    recordState(target: any, action: string, description?: string) {
      if (!self.isRecording) return;

      const snapshot = getSnapshot(target);
      const entry = HistoryEntry.create({
        snapshot,
        timestamp: new Date(),
        action,
        description: description || action,
      });

      // Remove any history entries after current index
      if (self.currentIndex < self.history.length - 1) {
        self.history.splice(self.currentIndex + 1);
      }

      // Add new entry
      self.history.push(entry);
      self.currentIndex = self.history.length - 1;

      // Maintain max history size
      if (self.history.length > self.maxHistorySize) {
        self.history.splice(0, self.history.length - self.maxHistorySize);
        self.currentIndex = self.history.length - 1;
      }
    },

    // Undo the last action
    undo(target: any) {
      if (self.currentIndex <= 0) return false;

      self.isRecording = false;
      self.currentIndex -= 1;

      const entry = self.history[self.currentIndex];
      if (entry) {
        applySnapshot(target, entry.snapshot);
      }

      self.isRecording = true;
      return true;
    },

    // Redo the next action
    redo(target: any) {
      if (self.currentIndex >= self.history.length - 1) return false;

      self.isRecording = false;
      self.currentIndex += 1;

      const entry = self.history[self.currentIndex];
      if (entry) {
        applySnapshot(target, entry.snapshot);
      }

      self.isRecording = true;
      return true;
    },

    // Clear all history
    clearHistory() {
      self.history.clear();
      self.currentIndex = -1;
    },

    // Set maximum history size
    setMaxHistorySize(size: number) {
      self.maxHistorySize = Math.max(1, size);

      // Trim history if needed
      if (self.history.length > self.maxHistorySize) {
        const removeCount = self.history.length - self.maxHistorySize;
        self.history.splice(0, removeCount);
        self.currentIndex = Math.max(0, self.currentIndex - removeCount);
      }
    },

    // Temporarily disable recording
    pauseRecording() {
      self.isRecording = false;
    },

    // Resume recording
    resumeRecording() {
      self.isRecording = true;
    },

    // Get history summary for debugging
    getHistorySummary() {
      return self.history.map((entry, index) => ({
        index,
        action: entry.action,
        description: entry.description,
        timestamp: entry.timestamp,
        isCurrent: index === self.currentIndex,
      }));
    },
  }));

export type UndoRedoStoreInstance = Instance<typeof UndoRedoStore>;

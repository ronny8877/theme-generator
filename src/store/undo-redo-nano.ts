/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, computed } from "nanostores";

// Types
export interface HistoryEntry {
  snapshot: any;
  timestamp: Date;
  action: string;
  description: string;
}

export interface UndoRedoState {
  history: HistoryEntry[];
  currentIndex: number;
  maxHistorySize: number;
  isRecording: boolean;
}

// Initial state
const initialState: UndoRedoState = {
  history: [],
  currentIndex: -1,
  maxHistorySize: 100,
  isRecording: true,
};

// Core undo-redo store
export const $undoRedo = atom<UndoRedoState>(initialState);

// Computed values
export const $canUndo = computed($undoRedo, (state) => state.currentIndex > 0);

export const $canRedo = computed(
  $undoRedo,
  (state) => state.currentIndex < state.history.length - 1,
);

export const $currentEntry = computed(
  $undoRedo,
  (state) => state.history[state.currentIndex] || null,
);

export const $nextEntry = computed(
  $undoRedo,
  (state) => state.history[state.currentIndex + 1] || null,
);

export const $previousEntry = computed(
  $undoRedo,
  (state) => state.history[state.currentIndex - 1] || null,
);

export const $historySize = computed(
  $undoRedo,
  (state) => state.history.length,
);

// Actions
export function recordState(target: any, action: string, description?: string) {
  const state = $undoRedo.get();
  if (!state.isRecording) return;

  const snapshot = JSON.parse(JSON.stringify(target));
  const entry: HistoryEntry = {
    snapshot,
    timestamp: new Date(),
    action,
    description: description || action,
  };

  // Remove any history entries after current index
  let newHistory = [...state.history];
  if (state.currentIndex < newHistory.length - 1) {
    newHistory = newHistory.slice(0, state.currentIndex + 1);
  }

  // Add new entry
  newHistory.push(entry);
  let newCurrentIndex = newHistory.length - 1;

  // Maintain max history size
  if (newHistory.length > state.maxHistorySize) {
    const removeCount = newHistory.length - state.maxHistorySize;
    newHistory = newHistory.slice(removeCount);
    newCurrentIndex = newHistory.length - 1;
  }

  $undoRedo.set({
    ...state,
    history: newHistory,
    currentIndex: newCurrentIndex,
  });
}

export function undo(applySnapshot: (snapshot: any) => void): boolean {
  const state = $undoRedo.get();
  if (state.currentIndex <= 0) return false;

  const newCurrentIndex = state.currentIndex - 1;
  const entry = state.history[newCurrentIndex];

  if (entry) {
    $undoRedo.set({
      ...state,
      currentIndex: newCurrentIndex,
      isRecording: false,
    });

    applySnapshot(entry.snapshot);

    $undoRedo.set({
      ...$undoRedo.get(),
      isRecording: true,
    });
  }

  return true;
}

export function redo(applySnapshot: (snapshot: any) => void): boolean {
  const state = $undoRedo.get();
  if (state.currentIndex >= state.history.length - 1) return false;

  const newCurrentIndex = state.currentIndex + 1;
  const entry = state.history[newCurrentIndex];

  if (entry) {
    $undoRedo.set({
      ...state,
      currentIndex: newCurrentIndex,
      isRecording: false,
    });

    applySnapshot(entry.snapshot);

    $undoRedo.set({
      ...$undoRedo.get(),
      isRecording: true,
    });
  }

  return true;
}

export function clearHistory() {
  const state = $undoRedo.get();
  $undoRedo.set({
    ...state,
    history: [],
    currentIndex: -1,
  });
}

export function setMaxHistorySize(size: number) {
  const state = $undoRedo.get();
  const maxHistorySize = Math.max(1, size);

  let newHistory = [...state.history];
  let newCurrentIndex = state.currentIndex;

  // Trim history if needed
  if (newHistory.length > maxHistorySize) {
    const removeCount = newHistory.length - maxHistorySize;
    newHistory = newHistory.slice(removeCount);
    newCurrentIndex = Math.max(0, newCurrentIndex - removeCount);
  }

  $undoRedo.set({
    ...state,
    history: newHistory,
    currentIndex: newCurrentIndex,
    maxHistorySize,
  });
}

export function pauseRecording() {
  const state = $undoRedo.get();
  $undoRedo.set({
    ...state,
    isRecording: false,
  });
}

export function resumeRecording() {
  const state = $undoRedo.get();
  $undoRedo.set({
    ...state,
    isRecording: true,
  });
}

export function getHistorySummary() {
  const state = $undoRedo.get();
  return state.history.map((entry, index) => ({
    index,
    action: entry.action,
    description: entry.description,
    timestamp: entry.timestamp,
    isCurrent: index === state.currentIndex,
  }));
}

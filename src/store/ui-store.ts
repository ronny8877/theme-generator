import { atom } from "nanostores";

export const $exportOpen = atom(false);
export function setExportOpen(v: boolean) {
  $exportOpen.set(v);
}
export function openExport() {
  $exportOpen.set(true);
}
export function closeExport() {
  $exportOpen.set(false);
}

// Share modal state
export const $shareOpen = atom(false);
export function setShareOpen(v: boolean) {
  $shareOpen.set(v);
}
export function openShare() {
  $shareOpen.set(true);
}
export function closeShare() {
  $shareOpen.set(false);
}

// Settings modal state
export const $settingsOpen = atom(false);
export const $settingsActiveTab = atom<'color-lab' | 'palette' | 'gradient' | 'about'>('color-lab');

export function setSettingsOpen(v: boolean) {
  $settingsOpen.set(v);
}
export function openSettings() {
  $settingsOpen.set(true);
}
export function closeSettings() {
  $settingsOpen.set(false);
}
export function setSettingsActiveTab(tab: 'color-lab' | 'palette' | 'gradient' | 'about') {
  $settingsActiveTab.set(tab);
}

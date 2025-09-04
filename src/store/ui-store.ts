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

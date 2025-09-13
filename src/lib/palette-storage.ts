import { ColorPalette } from "./palette-utils";

const STORAGE_KEY = "saved-palettes";
const TAGS_KEY = "palette-tags";

export interface SavedPaletteData {
  palettes: ColorPalette[];
  tags: string[];
}

/**
 * Save a palette to local storage
 */
export function savePalette(palette: ColorPalette): void {
  try {
    const saved = getSavedPalettes();

    // Check if palette already exists (by id)
    const existingIndex = saved.palettes.findIndex((p) => p.id === palette.id);

    if (existingIndex >= 0) {
      // Update existing palette
      saved.palettes[existingIndex] = { ...palette, createdAt: new Date() };
    } else {
      // Add new palette
      saved.palettes.push(palette);
    }

    // Update tags
    if (palette.tags) {
      palette.tags.forEach((tag) => {
        if (!saved.tags.includes(tag)) {
          saved.tags.push(tag);
        }
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.palettes));
    localStorage.setItem(TAGS_KEY, JSON.stringify(saved.tags));
  } catch (error) {
    console.error("Failed to save palette:", error);
    throw new Error("Failed to save palette to local storage");
  }
}

/**
 * Get all saved palettes from local storage
 */
export function getSavedPalettes(): SavedPaletteData {
  try {
    const palettesData = localStorage.getItem(STORAGE_KEY);
    const tagsData = localStorage.getItem(TAGS_KEY);

    const palettes: ColorPalette[] = palettesData
      ? JSON.parse(palettesData)
      : [];
    const tags: string[] = tagsData ? JSON.parse(tagsData) : [];

    // Convert date strings back to Date objects
    palettes.forEach((palette) => {
      if (typeof palette.createdAt === "string") {
        palette.createdAt = new Date(palette.createdAt);
      }
    });

    return { palettes, tags };
  } catch (error) {
    console.error("Failed to load saved palettes:", error);
    return { palettes: [], tags: [] };
  }
}

/**
 * Delete a palette from local storage
 */
export function deletePalette(paletteId: string): void {
  try {
    const saved = getSavedPalettes();
    saved.palettes = saved.palettes.filter((p) => p.id !== paletteId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.palettes));
  } catch (error) {
    console.error("Failed to delete palette:", error);
    throw new Error("Failed to delete palette from local storage");
  }
}

/**
 * Search palettes by name or tags
 */
export function searchPalettes(
  query: string,
  filterTags?: string[],
): ColorPalette[] {
  const saved = getSavedPalettes();
  const searchTerm = query.toLowerCase();

  return saved.palettes.filter((palette) => {
    // Search in name
    const nameMatch = palette.name.toLowerCase().includes(searchTerm);

    // Search in tags
    const tagMatch =
      palette.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ??
      false;

    // Search in color names
    const colorMatch = palette.colors.some(
      (color) => color.name?.toLowerCase().includes(searchTerm) ?? false,
    );

    const queryMatch = searchTerm === "" || nameMatch || tagMatch || colorMatch;

    // Filter by tags if provided
    const tagFilter =
      !filterTags ||
      filterTags.length === 0 ||
      filterTags.some((tag) => palette.tags?.includes(tag));

    return queryMatch && tagFilter;
  });
}

/**
 * Get palettes by specific tags
 */
export function getPalettesByTags(tags: string[]): ColorPalette[] {
  const saved = getSavedPalettes();

  return saved.palettes.filter((palette) =>
    tags.some((tag) => palette.tags?.includes(tag)),
  );
}

/**
 * Get all unique tags from saved palettes
 */
export function getAllTags(): string[] {
  return getSavedPalettes().tags;
}

/**
 * Update tags for a palette
 */
export function updatePaletteTags(paletteId: string, tags: string[]): void {
  try {
    const saved = getSavedPalettes();
    const palette = saved.palettes.find((p) => p.id === paletteId);

    if (palette) {
      palette.tags = tags;

      // Update global tags list
      tags.forEach((tag) => {
        if (!saved.tags.includes(tag)) {
          saved.tags.push(tag);
        }
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.palettes));
      localStorage.setItem(TAGS_KEY, JSON.stringify(saved.tags));
    }
  } catch (error) {
    console.error("Failed to update palette tags:", error);
    throw new Error("Failed to update palette tags");
  }
}

/**
 * Export all saved palettes
 */
export function exportAllPalettes(): string {
  const saved = getSavedPalettes();
  return JSON.stringify(saved, null, 2);
}

/**
 * Import palettes from JSON
 */
export function importPalettes(jsonData: string): void {
  try {
    const imported = JSON.parse(jsonData) as SavedPaletteData;

    if (!imported.palettes || !Array.isArray(imported.palettes)) {
      throw new Error("Invalid palette data format");
    }

    const saved = getSavedPalettes();

    // Merge imported palettes (avoid duplicates by id)
    imported.palettes.forEach((importedPalette) => {
      const existingIndex = saved.palettes.findIndex(
        (p) => p.id === importedPalette.id,
      );

      if (existingIndex >= 0) {
        // Update existing
        saved.palettes[existingIndex] = importedPalette;
      } else {
        // Add new
        saved.palettes.push(importedPalette);
      }
    });

    // Merge tags
    if (imported.tags && Array.isArray(imported.tags)) {
      imported.tags.forEach((tag) => {
        if (!saved.tags.includes(tag)) {
          saved.tags.push(tag);
        }
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.palettes));
    localStorage.setItem(TAGS_KEY, JSON.stringify(saved.tags));
  } catch (error) {
    console.error("Failed to import palettes:", error);
    throw new Error("Failed to import palettes");
  }
}

/**
 * Clear all saved palettes
 */
export function clearAllPalettes(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TAGS_KEY);
  } catch (error) {
    console.error("Failed to clear palettes:", error);
    throw new Error("Failed to clear saved palettes");
  }
}

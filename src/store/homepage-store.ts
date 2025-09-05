import { atom, computed } from "nanostores";
import { THEMES } from "@/lib/constants/theme";

export type DaisyUITheme = (typeof THEMES)[number]["name"];

interface HomepageThemeState {
  currentTheme: DaisyUITheme;
  isAutoThemeEnabled: boolean;
  previewTheme: DaisyUITheme | null;
}

// Initial state
const initialState: HomepageThemeState = {
  currentTheme: "lemonade",
  isAutoThemeEnabled: false,
  previewTheme: null,
};

// Core store
export const $homepageTheme = atom<HomepageThemeState>(initialState);

// Computed values
export const $currentTheme = computed(
  $homepageTheme,
  (state) => state.currentTheme
);
export const $isAutoThemeEnabled = computed(
  $homepageTheme,
  (state) => state.isAutoThemeEnabled
);
export const $previewTheme = computed(
  $homepageTheme,
  (state) => state.previewTheme
);

// Available themes
export const $availableHomepageThemes = computed($homepageTheme, () =>
  THEMES.map((theme) => theme.name)
);

// Theme application function
function applyThemeVariables(themeName: DaisyUITheme) {
  console.log("[ThemeForge] Applying theme:", themeName);
  const theme = THEMES.find((t) => t.name === themeName);
  if (!theme) {
    console.log("[ThemeForge] Theme not found:", themeName);
    return;
  }

  const root = document.documentElement;
  console.log("[ThemeForge] Found theme object:", theme);

  // Apply DaisyUI theme data attribute
  root.setAttribute("data-theme", themeName);

  // Apply custom CSS variables for components that need them
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
    console.log("[ThemeForge] Setting CSS var:", key, "=", value);
  });

  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  Object.entries(theme.misc).forEach(([key, value]) => {
    root.style.setProperty(key, value.toString());
  });

  console.log("[ThemeForge] Theme variables applied successfully");
}

// Actions
export function setHomepageTheme(theme: DaisyUITheme) {
  console.log("[ThemeForge] setTheme called with:", theme);
  const current = $homepageTheme.get();

  $homepageTheme.set({
    ...current,
    currentTheme: theme,
  });

  // Apply theme to DOM
  if (typeof window !== "undefined") {
    applyThemeVariables(theme);
    localStorage.setItem("homepage-theme", theme);
  }
}

export function toggleAutoTheme() {
  const current = $homepageTheme.get();
  const newAutoThemeState = !current.isAutoThemeEnabled;

  $homepageTheme.set({
    ...current,
    isAutoThemeEnabled: newAutoThemeState,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("homepage-auto-theme", newAutoThemeState.toString());
  }
}

export function setPreviewTheme(theme: DaisyUITheme | null) {
  const current = $homepageTheme.get();

  $homepageTheme.set({
    ...current,
    previewTheme: theme,
  });
}

// Initialize store from localStorage
export function initHomepageTheme() {
  if (typeof window === "undefined") return;

  try {
    const savedTheme = localStorage.getItem("homepage-theme") as DaisyUITheme;
    const savedAutoTheme =
      localStorage.getItem("homepage-auto-theme") === "true";

    const availableThemes = THEMES.map((t) => t.name);
    const themeToUse =
      savedTheme && availableThemes.includes(savedTheme)
        ? savedTheme
        : "lemonade";

    $homepageTheme.set({
      currentTheme: themeToUse,
      isAutoThemeEnabled: savedAutoTheme,
      previewTheme: null,
    });

    // Apply the theme immediately
    applyThemeVariables(themeToUse);
  } catch (error) {
    console.error("Failed to initialize homepage theme:", error);
    applyThemeVariables("lemonade");
  }
}

// Auto theme cycling for scroll-based theme changes
const scrollThemes: DaisyUITheme[] = [
  "lemonade",
  "cyberpunk",
  "autumn",
  "business",
  "retro",
  "winter",
];

export function applyScrollBasedTheme(sectionIndex: number) {
  const current = $homepageTheme.get();
  if (!current.isAutoThemeEnabled) return;

  const themeIndex = sectionIndex % scrollThemes.length;
  const theme = scrollThemes[themeIndex];

  // Only update if it's different from current theme
  if (theme !== current.currentTheme) {
    console.log("[ThemeForge] Auto-applying scroll theme:", theme);
    applyThemeVariables(theme);

    // Update store without saving to localStorage (temporary for scroll)
    $homepageTheme.set({
      ...current,
      currentTheme: theme,
    });
  }
}

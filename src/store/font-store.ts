import { atom, computed } from "nanostores";

// Types
export interface FontConfig {
  family: string;
  weight: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface FontOverrides {
  lineHeight: string;
  letterSpacing: string;
  headingMarginBottom: string;
  bodyMarginBottom: string;
  headingMinMargin: string;
  bodyMinMargin: string;
}

export interface FontState {
  heading: FontConfig;
  body: FontConfig;
  overrides: FontOverrides;
  loadedFonts: Set<string>;
}

// Google Fonts list - popular fonts for web design
export const GOOGLE_FONTS = [
  // Sans Serif
  {
    family: "Inter",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Roboto",
    category: "sans-serif",
    weights: ["300", "400", "500", "700", "900"],
  },
  {
    family: "Poppins",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Montserrat",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Open Sans",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Lato",
    category: "sans-serif",
    weights: ["300", "400", "700", "900"],
  },
  {
    family: "Source Sans Pro",
    category: "sans-serif",
    weights: ["300", "400", "600", "700", "900"],
  },
  {
    family: "Nunito",
    category: "sans-serif",
    weights: ["300", "400", "600", "700", "800", "900"],
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Figtree",
    category: "sans-serif",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },

  // Serif
  {
    family: "Playfair Display",
    category: "serif",
    weights: ["400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Merriweather",
    category: "serif",
    weights: ["300", "400", "700", "900"],
  },
  { family: "Crimson Text", category: "serif", weights: ["400", "600", "700"] },
  { family: "Lora", category: "serif", weights: ["400", "500", "600", "700"] },
  { family: "PT Serif", category: "serif", weights: ["400", "700"] },
  {
    family: "Source Serif Pro",
    category: "serif",
    weights: ["300", "400", "600", "700", "900"],
  },
  {
    family: "Cormorant Garamond",
    category: "serif",
    weights: ["300", "400", "500", "600", "700"],
  },

  // Display
  {
    family: "Oswald",
    category: "display",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Raleway",
    category: "display",
    weights: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Dancing Script",
    category: "handwriting",
    weights: ["400", "500", "600", "700"],
  },
  { family: "Pacifico", category: "handwriting", weights: ["400"] },

  // Monospace
  {
    family: "JetBrains Mono",
    category: "monospace",
    weights: ["300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Fira Code",
    category: "monospace",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Source Code Pro",
    category: "monospace",
    weights: ["300", "400", "600", "700", "900"],
  },
];

// Font size presets
export const FONT_SIZES = [
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
  { label: "60px", value: "60px" },
  { label: "72px", value: "72px" },
];

// Line height presets
export const LINE_HEIGHTS = [
  { label: "Tight", value: "1.2" },
  { label: "Snug", value: "1.375" },
  { label: "Normal", value: "1.5" },
  { label: "Relaxed", value: "1.625" },
  { label: "Loose", value: "1.75" },
];

// Letter spacing presets
export const LETTER_SPACINGS = [
  { label: "Tighter", value: "-0.05em" },
  { label: "Tight", value: "-0.025em" },
  { label: "Normal", value: "0em" },
  { label: "Wide", value: "0.025em" },
  { label: "Wider", value: "0.05em" },
  { label: "Widest", value: "0.1em" },
];

// Initial state
const initialFontState: FontState = {
  heading: {
    family: "Fira Code",
    weight: "400",
    size: "24px",
    lineHeight: "1.2",
    letterSpacing: "-0.025em",
  },
  body: {
    family: "Montserrat",
    weight: "400",
    size: "16px",
    lineHeight: "1.625",
    letterSpacing: "0.025em",
  },
  overrides: {
    lineHeight: "1.5",
    letterSpacing: "0em",
    headingMarginBottom: "1rem",
    bodyMarginBottom: "1rem",
    headingMinMargin: "0.5rem",
    bodyMinMargin: "0.25rem",
  },
  loadedFonts: new Set(["Fira Code", "Montserrat"]), // Default fonts
};

// Store
export const $fontStore = atom<FontState>(initialFontState);

// Computed values
export const $headingFont = computed($fontStore, (store) => store.heading);
export const $bodyFont = computed($fontStore, (store) => store.body);
export const $fontOverrides = computed($fontStore, (store) => store.overrides);
export const $loadedFonts = computed($fontStore, (store) => store.loadedFonts);

// Actions
export function updateHeadingFont(updates: Partial<FontConfig>) {
  const current = $fontStore.get();
  $fontStore.set({
    ...current,
    heading: {
      ...current.heading,
      ...updates,
    },
  });
}

export function updateBodyFont(updates: Partial<FontConfig>) {
  const current = $fontStore.get();
  $fontStore.set({
    ...current,
    body: {
      ...current.body,
      ...updates,
    },
  });
}

export function updateFontOverrides(updates: Partial<FontOverrides>) {
  const current = $fontStore.get();
  $fontStore.set({
    ...current,
    overrides: {
      ...current.overrides,
      ...updates,
    },
  });
}

export function loadGoogleFont(fontFamily: string) {
  const current = $fontStore.get();

  // Check if font is already loaded
  if (current.loadedFonts.has(fontFamily)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    // Create link element for Google Fonts
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@300;400;500;600;700;800;900&display=swap`;
    link.rel = "stylesheet";

    link.onload = () => {
      // Add to loaded fonts set
      const updated = $fontStore.get();
      const newLoadedFonts = new Set(updated.loadedFonts);
      newLoadedFonts.add(fontFamily);

      $fontStore.set({
        ...updated,
        loadedFonts: newLoadedFonts,
      });

      resolve();
    };

    link.onerror = () => {
      reject(new Error(`Failed to load font: ${fontFamily}`));
    };

    document.head.appendChild(link);
  });
}

// CSS Variables computed
export const $fontCSSVariables = computed($fontStore, (store) => {
  // Determine if global overrides should be applied
  const useGlobalLineHeight = store.overrides.lineHeight !== "1.5"; // default value
  const useGlobalLetterSpacing = store.overrides.letterSpacing !== "0em"; // default value

  return {
    "--font-heading-family": `"${store.heading.family}", sans-serif`,
    "--font-heading-weight": store.heading.weight,
    "--font-heading-size": store.heading.size,
    "--font-heading-line-height": useGlobalLineHeight
      ? store.overrides.lineHeight
      : store.heading.lineHeight,
    "--font-heading-letter-spacing": useGlobalLetterSpacing
      ? store.overrides.letterSpacing
      : store.heading.letterSpacing,

    "--font-body-family": `"${store.body.family}", sans-serif`,
    "--font-body-weight": store.body.weight,
    "--font-body-size": store.body.size,
    "--font-body-line-height": useGlobalLineHeight
      ? store.overrides.lineHeight
      : store.body.lineHeight,
    "--font-body-letter-spacing": useGlobalLetterSpacing
      ? store.overrides.letterSpacing
      : store.body.letterSpacing,

    "--font-override-line-height": store.overrides.lineHeight,
    "--font-override-letter-spacing": store.overrides.letterSpacing,
    "--font-heading-margin-bottom": store.overrides.headingMarginBottom,
    "--font-body-margin-bottom": store.overrides.bodyMarginBottom,
    "--font-heading-min-margin": store.overrides.headingMinMargin,
    "--font-body-min-margin": store.overrides.bodyMinMargin,
  };
});

// Utility function to get font category
export function getFontCategory(fontFamily: string) {
  const font = GOOGLE_FONTS.find((f) => f.family === fontFamily);
  return font?.category || "sans-serif";
}

// Utility function to get available weights for a font
export function getFontWeights(fontFamily: string) {
  const font = GOOGLE_FONTS.find((f) => f.family === fontFamily);
  return font?.weights || ["400", "600", "700"];
}

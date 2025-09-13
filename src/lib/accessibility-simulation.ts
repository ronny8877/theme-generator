import { converter, parse } from "culori";

// Color blindness simulation types
export type ColorBlindnessType =
  | "protanopia"
  | "protanomaly"
  | "deuteranopia"
  | "deuteranomaly"
  | "tritanopia"
  | "tritanomaly"
  | "achromatopsia"
  | "achromatomaly"
  | "blue-yellow"
  | "red-green"
  | "monochromacy";

// Other visual impairments
export type VisualImpairmentType =
  | "low-contrast"
  | "light-sensitivity"
  | "tunnel-vision"
  | "central-vision-loss"
  | "peripheral-vision-loss"
  | "glaucoma"
  | "cataracts"
  | "diabetic-retinopathy";

export type SimulationType = ColorBlindnessType | VisualImpairmentType;

export interface SimulationInfo {
  name: string;
  description: string;
  prevalence: string;
  category: "color-blindness" | "visual-impairment";
  severity: "mild" | "moderate" | "severe";
}

// Simulation metadata
export const SIMULATION_INFO: Record<SimulationType, SimulationInfo> = {
  // Color blindness types
  protanopia: {
    name: "Protanopia",
    description:
      "Complete absence of red cone cells. Difficulty distinguishing reds and greens.",
    prevalence: "1% of males",
    category: "color-blindness",
    severity: "severe",
  },
  protanomaly: {
    name: "Protanomaly",
    description:
      "Reduced sensitivity to red light. Mild red-green color confusion.",
    prevalence: "1% of males",
    category: "color-blindness",
    severity: "mild",
  },
  deuteranopia: {
    name: "Deuteranopia",
    description:
      "Complete absence of green cone cells. Difficulty distinguishing reds and greens.",
    prevalence: "1% of males",
    category: "color-blindness",
    severity: "severe",
  },
  deuteranomaly: {
    name: "Deuteranomaly",
    description:
      "Reduced sensitivity to green light. Most common form of color blindness.",
    prevalence: "6% of males",
    category: "color-blindness",
    severity: "moderate",
  },
  tritanopia: {
    name: "Tritanopia",
    description:
      "Complete absence of blue cone cells. Difficulty distinguishing blues and yellows.",
    prevalence: "0.002% of population",
    category: "color-blindness",
    severity: "severe",
  },
  tritanomaly: {
    name: "Tritanomaly",
    description:
      "Reduced sensitivity to blue light. Mild blue-yellow color confusion.",
    prevalence: "0.01% of population",
    category: "color-blindness",
    severity: "mild",
  },
  achromatopsia: {
    name: "Achromatopsia",
    description: "Complete color blindness. Only sees in grayscale.",
    prevalence: "0.003% of population",
    category: "color-blindness",
    severity: "severe",
  },
  achromatomaly: {
    name: "Achromatomaly",
    description:
      "Severely reduced color perception. Limited color discrimination.",
    prevalence: "0.001% of population",
    category: "color-blindness",
    severity: "severe",
  },
  "blue-yellow": {
    name: "Blue-Yellow Color Blindness",
    description: "General term for tritanopia and tritanomaly conditions.",
    prevalence: "0.01% of population",
    category: "color-blindness",
    severity: "moderate",
  },
  "red-green": {
    name: "Red-Green Color Blindness",
    description:
      "General term for protanopia, protanomaly, deuteranopia, and deuteranomaly.",
    prevalence: "8% of males, 0.5% of females",
    category: "color-blindness",
    severity: "moderate",
  },
  monochromacy: {
    name: "Monochromacy",
    description: "Seeing only in shades of one color, typically grayscale.",
    prevalence: "0.003% of population",
    category: "color-blindness",
    severity: "severe",
  },

  // Visual impairments
  "low-contrast": {
    name: "Low Contrast Sensitivity",
    description: "Difficulty distinguishing between similar colors and tones.",
    prevalence: "10% of population over 65",
    category: "visual-impairment",
    severity: "mild",
  },
  "light-sensitivity": {
    name: "Light Sensitivity (Photophobia)",
    description: "Discomfort or pain when exposed to bright lights.",
    prevalence: "5-20% of population",
    category: "visual-impairment",
    severity: "moderate",
  },
  "tunnel-vision": {
    name: "Tunnel Vision",
    description: "Loss of peripheral vision, seeing only a small central area.",
    prevalence: "2% of population",
    category: "visual-impairment",
    severity: "severe",
  },
  "central-vision-loss": {
    name: "Central Vision Loss",
    description: "Loss of central vision, affecting detailed sight.",
    prevalence: "1% of population",
    category: "visual-impairment",
    severity: "severe",
  },
  "peripheral-vision-loss": {
    name: "Peripheral Vision Loss",
    description: "Loss of side vision while maintaining central vision.",
    prevalence: "3% of population",
    category: "visual-impairment",
    severity: "moderate",
  },
  glaucoma: {
    name: "Glaucoma",
    description: "Gradual loss of peripheral vision due to optic nerve damage.",
    prevalence: "3% of population over 40",
    category: "visual-impairment",
    severity: "severe",
  },
  cataracts: {
    name: "Cataracts",
    description: "Clouding of the lens causing blurred and dim vision.",
    prevalence: "50% of population over 80",
    category: "visual-impairment",
    severity: "moderate",
  },
  "diabetic-retinopathy": {
    name: "Diabetic Retinopathy",
    description: "Damage to blood vessels in the retina due to diabetes.",
    prevalence: "30% of diabetics",
    category: "visual-impairment",
    severity: "severe",
  },
};

/**
 * Convert RGB to LMS color space for color blindness simulation
 */
function rgbToLms(r: number, g: number, b: number): [number, number, number] {
  // Convert to linear RGB first
  const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // RGB to LMS transformation matrix
  const l = 0.31399022 * linearR + 0.63951294 * linearG + 0.04649755 * linearB;
  const m = 0.15537241 * linearR + 0.75789446 * linearG + 0.08670142 * linearB;
  const s = 0.01775239 * linearR + 0.10944209 * linearG + 0.87256922 * linearB;

  return [l, m, s];
}

/**
 * Convert LMS back to RGB color space
 */
function lmsToRgb(l: number, m: number, s: number): [number, number, number] {
  // LMS to RGB transformation matrix
  const linearR = 5.47221206 * l - 4.6419601 * m + 0.16963708 * s;
  const linearG = -1.1252419 * l + 2.29317094 * m - 0.1678952 * s;
  const linearB = 0.02980165 * l - 0.19318073 * m + 1.16364789 * s;

  // Convert back to sRGB
  const r =
    linearR <= 0.0031308
      ? 12.92 * linearR
      : 1.055 * Math.pow(linearR, 1 / 2.4) - 0.055;
  const g =
    linearG <= 0.0031308
      ? 12.92 * linearG
      : 1.055 * Math.pow(linearG, 1 / 2.4) - 0.055;
  const b =
    linearB <= 0.0031308
      ? 12.92 * linearB
      : 1.055 * Math.pow(linearB, 1 / 2.4) - 0.055;

  return [
    Math.max(0, Math.min(1, r)),
    Math.max(0, Math.min(1, g)),
    Math.max(0, Math.min(1, b)),
  ];
}

/**
 * Simulate color blindness by applying transformation matrices in LMS space
 */
function simulateColorBlindness(
  l: number,
  m: number,
  s: number,
  type: ColorBlindnessType,
): [number, number, number] {
  switch (type) {
    case "protanopia":
      // Remove L (long wavelength) cone response
      return [0, m, s];

    case "protanomaly":
      // Reduce L cone response
      return [l * 0.567, m, s];

    case "deuteranopia":
      // Remove M (medium wavelength) cone response
      return [l, 0, s];

    case "deuteranomaly":
      // Reduce M cone response
      return [l, m * 0.558, s];

    case "tritanopia":
      // Remove S (short wavelength) cone response
      return [l, m, 0];

    case "tritanomaly":
      // Reduce S cone response
      return [l, m, s * 0.242];

    case "achromatopsia":
    case "monochromacy":
      // Complete color blindness - convert to grayscale
      const gray = 0.299 * l + 0.587 * m + 0.114 * s;
      return [gray, gray, gray];

    case "achromatomaly":
      // Severely reduced color perception
      const grayAchroma = 0.299 * l + 0.587 * m + 0.114 * s;
      return [
        l * 0.2 + grayAchroma * 0.8,
        m * 0.2 + grayAchroma * 0.8,
        s * 0.2 + grayAchroma * 0.8,
      ];

    case "red-green":
      // Combination of protanomaly and deuteranomaly
      return [l * 0.4, m * 0.4, s];

    case "blue-yellow":
      // Combination of tritanopia effects
      return [l, m, s * 0.1];

    default:
      return [l, m, s];
  }
}

/**
 * Simulate a color with the specified color blindness type
 */
export function simulateColorBlindnessColor(
  color: string,
  type: ColorBlindnessType,
): string {
  try {
    const parsed = parse(color);
    if (!parsed) return color;

    const rgb = converter("rgb")(parsed);
    if (!rgb) return color;

    const r = rgb.r ?? 0;
    const g = rgb.g ?? 0;
    const b = rgb.b ?? 0;

    // Convert to LMS
    const [l, m, s] = rgbToLms(r, g, b);

    // Apply color blindness simulation
    const [newL, newM, newS] = simulateColorBlindness(l, m, s, type);

    // Convert back to RGB
    const [newR, newG, newB] = lmsToRgb(newL, newM, newS);

    // Convert to hex
    const toHex = (val: number) =>
      Math.round(val * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  } catch (error) {
    console.error("Error simulating color blindness:", error);
    return color;
  }
}

/**
 * Simulate visual impairments by adjusting color properties
 */
export function simulateVisualImpairment(
  color: string,
  type: VisualImpairmentType,
): string {
  try {
    const parsed = parse(color);
    if (!parsed) return color;

    const hsl = converter("hsl")(parsed);
    if (!hsl) return color;

    let h = hsl.h ?? 0;
    let s = hsl.s ?? 0;
    let l = hsl.l ?? 0;

    switch (type) {
      case "low-contrast":
        // Reduce contrast by moving colors toward middle gray
        l = l * 0.7 + 0.5 * 0.3;
        s = s * 0.6;
        break;

      case "light-sensitivity":
        // Darken bright colors significantly
        if (l > 0.5) {
          l = l * 0.4;
        }
        s = s * 0.8;
        break;

      case "cataracts":
        // Add yellowish tint and reduce contrast
        h = h + (h < 180 ? 20 : -20);
        l = l * 0.8 + 0.2;
        s = s * 0.5;
        break;

      case "diabetic-retinopathy":
        // Darken and reduce saturation
        l = l * 0.6;
        s = s * 0.4;
        break;

      default:
        // For other types, just reduce contrast slightly
        l = l * 0.9 + 0.1;
        s = s * 0.9;
        break;
    }

    // Ensure values are within valid ranges
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(1, s));
    l = Math.max(0, Math.min(1, l));

    // Convert back to hex
    const rgb = converter("rgb")({ mode: "hsl", h, s, l });
    if (!rgb) return color;

    const toHex = (val: number) =>
      Math.round((val ?? 0) * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  } catch (error) {
    console.error("Error simulating visual impairment:", error);
    return color;
  }
}

/**
 * Main simulation function that handles both color blindness and visual impairments
 */
export function simulateColor(color: string, type: SimulationType): string {
  const info = SIMULATION_INFO[type];

  if (info.category === "color-blindness") {
    return simulateColorBlindnessColor(color, type as ColorBlindnessType);
  } else {
    return simulateVisualImpairment(color, type as VisualImpairmentType);
  }
}

/**
 * Simulate an entire color palette
 */
export function simulatePalette(
  colors: string[],
  type: SimulationType,
): string[] {
  return colors.map((color) => simulateColor(color, type));
}

/**
 * Get all available simulation types grouped by category
 */
export function getSimulationCategories() {
  const categories: Record<
    string,
    { type: SimulationType; info: SimulationInfo }[]
  > = {};

  Object.entries(SIMULATION_INFO).forEach(([type, info]) => {
    const category =
      info.category === "color-blindness"
        ? "Color Blindness"
        : "Visual Impairments";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push({ type: type as SimulationType, info });
  });

  return categories;
}

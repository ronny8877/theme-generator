import {
  parse,
  formatHex,
  converter,
  random,
  differenceEuclidean,
} from "culori";
import {
  calculateContrast,
  getComplementaryColor,
  getTriadicColors,
} from "./color-utils";

export interface PaletteColor {
  id: string;
  hex: string;
  name?: string;
  locked?: boolean;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: PaletteColor[];
  createdAt: Date;
  tags?: string[];
}

export interface WCAGRating {
  grade: "AAA" | "AA" | "A" | "B" | "C" | "D";
  level: string;
  class: string;
  desc: string;
}

export interface PaletteAnalysis {
  averageContrast: number;
  contrastPairs: {
    color1: string;
    color2: string;
    ratio: number;
    rating: WCAGRating;
    accessible: boolean; // Keep for backward compatibility
  }[];
  harmony:
    | "monochromatic"
    | "analogous"
    | "complementary"
    | "triadic"
    | "tetradic"
    | "split-complementary"
    | "custom";
  diversity: number; // 0-1 score of color diversity
}

export type PaletteGenerationMode =
  | "random"
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "triadic"
  | "tetradic"
  | "split-complementary";

/**
 * Get WCAG rating based on contrast ratio
 */
export function getWCAGRating(ratio: number): WCAGRating {
  if (ratio >= 7)
    return {
      grade: "AAA",
      level: "Enhanced",
      class: "badge-success",
      desc: "Perfect for all text sizes",
    };
  if (ratio >= 4.5)
    return {
      grade: "AA",
      level: "Standard",
      class: "badge-info",
      desc: "Good for normal text",
    };
  if (ratio >= 3)
    return {
      grade: "A",
      level: "Large Text",
      class: "badge-warning",
      desc: "Only for large text (18pt+)",
    };
  if (ratio >= 2)
    return {
      grade: "B",
      level: "Poor",
      class: "badge-warning",
      desc: "Below accessibility standards",
    };
  if (ratio >= 1.5)
    return {
      grade: "C",
      level: "Very Poor",
      class: "badge-error",
      desc: "Very poor contrast",
    };
  return {
    grade: "D",
    level: "Fail",
    class: "badge-error",
    desc: "Completely inaccessible",
  };
}

/**
 * Generate a random color palette
 */
export function generateRandomPalette(count: number = 5): PaletteColor[] {
  const colors: PaletteColor[] = [];

  for (let i = 0; i < count; i++) {
    const color = random();
    colors.push({
      id: `color-${i}`,
      hex: formatHex(color),
    });
  }

  return colors;
}

/**
 * Generate a monochromatic palette from a base color
 */
export function generateMonochromaticPalette(
  baseColor: string,
  count: number = 5,
): PaletteColor[] {
  const parsed = parse(baseColor);
  if (!parsed) return [];

  const hsl = converter("hsl")(parsed);
  const colors: PaletteColor[] = [];

  for (let i = 0; i < count; i++) {
    const lightness = Math.max(
      0.1,
      Math.min(0.9, 0.2 + (i * 0.6) / (count - 1)),
    );
    const color = {
      ...hsl,
      l: lightness,
    };

    colors.push({
      id: `mono-${i}`,
      hex: formatHex(color),
    });
  }

  return colors;
}

/**
 * Generate an analogous color palette
 */
export function generateAnalogousPalette(
  baseColor: string,
  count: number = 5,
): PaletteColor[] {
  const parsed = parse(baseColor);
  if (!parsed) return [];

  const hsl = converter("hsl")(parsed);
  const colors: PaletteColor[] = [];
  const hueStep = 30; // degrees between colors

  for (let i = 0; i < count; i++) {
    const hueOffset = (i - Math.floor(count / 2)) * hueStep;
    const color = {
      ...hsl,
      h: ((hsl.h || 0) + hueOffset + 360) % 360,
    };

    colors.push({
      id: `analog-${i}`,
      hex: formatHex(color),
    });
  }

  return colors;
}

/**
 * Generate a complementary palette
 */
export function generateComplementaryPalette(
  baseColor: string,
): PaletteColor[] {
  const complementary = getComplementaryColor(baseColor);
  if (!complementary) return [];

  return [
    { id: "base", hex: baseColor },
    { id: "complement", hex: complementary },
  ];
}

/**
 * Generate a triadic palette
 */
export function generateTriadicPalette(baseColor: string): PaletteColor[] {
  const triadic = getTriadicColors(baseColor);

  return [
    { id: "base", hex: baseColor },
    { id: "triadic-1", hex: triadic[0] },
    { id: "triadic-2", hex: triadic[1] },
  ];
}

/**
 * Generate a tetradic (square) palette
 */
export function generateTetradicPalette(baseColor: string): PaletteColor[] {
  const parsed = parse(baseColor);
  if (!parsed) return [];

  const hsl = converter("hsl")(parsed);
  const colors: PaletteColor[] = [{ id: "base", hex: baseColor }];

  for (let i = 1; i < 4; i++) {
    const color = {
      ...hsl,
      h: ((hsl.h || 0) + i * 90) % 360,
    };

    colors.push({
      id: `tetradic-${i}`,
      hex: formatHex(color),
    });
  }

  return colors;
}

/**
 * Generate a split-complementary palette
 */
export function generateSplitComplementaryPalette(
  baseColor: string,
): PaletteColor[] {
  const parsed = parse(baseColor);
  if (!parsed) return [];

  const hsl = converter("hsl")(parsed);
  const complementaryHue = ((hsl.h || 0) + 180) % 360;

  const colors: PaletteColor[] = [
    { id: "base", hex: baseColor },
    {
      id: "split-1",
      hex: formatHex({
        ...hsl,
        h: (complementaryHue - 30 + 360) % 360,
      }),
    },
    {
      id: "split-2",
      hex: formatHex({
        ...hsl,
        h: (complementaryHue + 30) % 360,
      }),
    },
  ];

  return colors;
}

/**
 * Generate palette based on mode
 */
export function generatePalette(
  mode: PaletteGenerationMode,
  baseColor?: string,
  count: number = 5,
): PaletteColor[] {
  switch (mode) {
    case "random":
      return generateRandomPalette(count);
    case "monochromatic":
      return baseColor ? generateMonochromaticPalette(baseColor, count) : [];
    case "analogous":
      return baseColor ? generateAnalogousPalette(baseColor, count) : [];
    case "complementary":
      return baseColor ? generateComplementaryPalette(baseColor) : [];
    case "triadic":
      return baseColor ? generateTriadicPalette(baseColor) : [];
    case "tetradic":
      return baseColor ? generateTetradicPalette(baseColor) : [];
    case "split-complementary":
      return baseColor ? generateSplitComplementaryPalette(baseColor) : [];
    default:
      return [];
  }
}

/**
 * Analyze a color palette
 */
export function analyzePalette(colors: PaletteColor[]): PaletteAnalysis {
  const contrastPairs: PaletteAnalysis["contrastPairs"] = [];
  let totalContrast = 0;
  let pairCount = 0;

  // Calculate all contrast pairs
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const contrast = calculateContrast(colors[i].hex, colors[j].hex);
      if (contrast) {
        const rating = getWCAGRating(contrast.ratio);
        contrastPairs.push({
          color1: colors[i].hex,
          color2: colors[j].hex,
          ratio: contrast.ratio,
          rating,
          accessible: contrast.isAccessible,
        });
        totalContrast += contrast.ratio;
        pairCount++;
      }
    }
  }

  const averageContrast = pairCount > 0 ? totalContrast / pairCount : 0;

  // Calculate diversity (average distance between colors)
  let totalDistance = 0;
  let distanceCount = 0;

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const color1 = parse(colors[i].hex);
      const color2 = parse(colors[j].hex);
      if (color1 && color2) {
        const distance = differenceEuclidean()(color1, color2);
        totalDistance += distance;
        distanceCount++;
      }
    }
  }

  const diversity =
    distanceCount > 0 ? Math.min(1, totalDistance / distanceCount) : 0;

  // Determine harmony type (simplified heuristic)
  const harmony = determineHarmony(colors);

  return {
    averageContrast,
    contrastPairs,
    harmony,
    diversity,
  };
}

/**
 * Determine the harmony type of a palette
 */
function determineHarmony(colors: PaletteColor[]): PaletteAnalysis["harmony"] {
  if (colors.length < 2) return "custom";

  const hues = colors.map((color) => {
    const parsed = parse(color.hex);
    if (!parsed) return 0;
    const hsl = converter("hsl")(parsed);
    return hsl.h || 0;
  });

  // Check for monochromatic (all same hue, ±10 degrees)
  const firstHue = hues[0];
  const isMonochromatic = hues.every(
    (hue) => Math.abs(((hue - firstHue + 540) % 360) - 180) <= 10,
  );

  if (isMonochromatic) return "monochromatic";

  // Check for complementary (2 colors, 180° apart)
  if (colors.length === 2) {
    const hueDiff = Math.abs(((hues[1] - hues[0] + 540) % 360) - 180);
    if (hueDiff <= 20) return "complementary";
  }

  // Check for triadic (3 colors, 120° apart)
  if (colors.length === 3) {
    const sorted = [...hues].sort((a, b) => a - b);
    const diff1 = (sorted[1] - sorted[0] + 360) % 360;
    const diff2 = (sorted[2] - sorted[1] + 360) % 360;
    if (Math.abs(diff1 - 120) <= 20 && Math.abs(diff2 - 120) <= 20) {
      return "triadic";
    }
  }

  // Check for analogous (adjacent hues)
  const maxSpread = Math.max(...hues) - Math.min(...hues);
  if (maxSpread <= 60) return "analogous";

  return "custom";
}

/**
 * Adjust palette for better accessibility with more significant improvements
 */
export function improvePaletteAccessibility(
  colors: PaletteColor[],
): PaletteColor[] {
  const improved = [...colors];

  // Strategy 1: Ensure good contrast pairs
  for (let i = 0; i < improved.length; i++) {
    for (let j = i + 1; j < improved.length; j++) {
      const color1 = improved[i];
      const color2 = improved[j];
      const contrast = calculateContrast(color1.hex, color2.hex);

      if (!contrast || contrast.ratio < 4.5) {
        // Improve contrast by adjusting lightness more dramatically
        const parsed1 = parse(color1.hex);
        const parsed2 = parse(color2.hex);

        if (parsed1 && parsed2) {
          const hsl1 = converter("hsl")(parsed1);
          const hsl2 = converter("hsl")(parsed2);

          // Make one significantly lighter and one significantly darker
          if ((hsl1.l || 0.5) > (hsl2.l || 0.5)) {
            // Color1 is lighter, make it much lighter
            improved[i] = {
              ...color1,
              hex: formatHex({
                ...hsl1,
                l: Math.min(0.95, (hsl1.l || 0.5) + 0.4),
              }),
            };
            // Color2 is darker, make it much darker
            improved[j] = {
              ...color2,
              hex: formatHex({
                ...hsl2,
                l: Math.max(0.05, (hsl2.l || 0.5) - 0.4),
              }),
            };
          } else {
            // Color2 is lighter, make it much lighter
            improved[j] = {
              ...color2,
              hex: formatHex({
                ...hsl2,
                l: Math.min(0.95, (hsl2.l || 0.5) + 0.4),
              }),
            };
            // Color1 is darker, make it much darker
            improved[i] = {
              ...color1,
              hex: formatHex({
                ...hsl1,
                l: Math.max(0.05, (hsl1.l || 0.5) - 0.4),
              }),
            };
          }
        }
      }
    }
  }

  // Strategy 2: Ensure color diversity by adjusting hues
  improved.forEach((color, index) => {
    const parsed = parse(color.hex);
    if (!parsed) return;

    const hsl = converter("hsl")(parsed);

    // Redistribute hues more evenly across the spectrum
    const targetHue = (index * 360) / colors.length;
    const currentHue = hsl.h || 0;

    // If colors are too clustered, spread them out
    const hueDistance = Math.abs(targetHue - currentHue);
    if (hueDistance < 30 && colors.length > 2) {
      improved[index] = {
        ...color,
        hex: formatHex({
          ...hsl,
          h: (targetHue + (Math.random() - 0.5) * 60 + 360) % 360, // Add some randomness
          s: Math.max(0.6, hsl.s || 0.5), // Ensure good saturation
        }),
      };
    }
  });

  // Strategy 3: Ensure at least one very light and one very dark color for maximum contrast
  if (improved.length >= 2) {
    // Make first color very light
    const firstParsed = parse(improved[0].hex);
    if (firstParsed) {
      const firstHsl = converter("hsl")(firstParsed);
      improved[0] = {
        ...improved[0],
        hex: formatHex({
          ...firstHsl,
          l: 0.9,
          s: Math.min(0.8, (firstHsl.s || 0.5) + 0.2),
        }),
      };
    }

    // Make last color very dark
    const lastIndex = improved.length - 1;
    const lastParsed = parse(improved[lastIndex].hex);
    if (lastParsed) {
      const lastHsl = converter("hsl")(lastParsed);
      improved[lastIndex] = {
        ...improved[lastIndex],
        hex: formatHex({
          ...lastHsl,
          l: 0.15,
          s: Math.min(0.9, (lastHsl.s || 0.5) + 0.3),
        }),
      };
    }
  }

  return improved;
}

/**
 * Export palette to various formats
 */
export function exportPalette(
  palette: ColorPalette,
  format: "css" | "json" | "ase" | "gpl" | "tailwind" | "svg" | "png",
): string {
  switch (format) {
    case "css":
      return exportToCss(palette);
    case "json":
      return JSON.stringify(palette, null, 2);
    case "ase":
      return exportToAse(palette);
    case "gpl":
      return exportToGpl(palette);
    case "tailwind":
      return exportToTailwind(palette);
    case "svg":
      return exportToSvg(palette);
    case "png":
      return exportToPng(palette);
    default:
      return "";
  }
}

function exportToCss(palette: ColorPalette): string {
  let css = `:root {\n`;
  css += `  /* ${palette.name} */\n`;

  palette.colors.forEach((color, index) => {
    const name = color.name || `color-${index + 1}`;
    css += `  --${name.toLowerCase().replace(/\s+/g, "-")}: ${color.hex};\n`;
  });

  css += `}\n`;
  return css;
}

function exportToAse(palette: ColorPalette): string {
  // Adobe Swatch Exchange format (simplified)
  return `Adobe Swatch Exchange file would be generated here for: ${palette.name}`;
}

function exportToGpl(palette: ColorPalette): string {
  // GIMP Palette format
  let gpl = `GIMP Palette\n`;
  gpl += `Name: ${palette.name}\n`;
  gpl += `Columns: ${palette.colors.length}\n`;
  gpl += `#\n`;

  palette.colors.forEach((color) => {
    const parsed = parse(color.hex);
    if (parsed) {
      const rgb = converter("rgb")(parsed);
      const r = Math.round((rgb.r || 0) * 255);
      const g = Math.round((rgb.g || 0) * 255);
      const b = Math.round((rgb.b || 0) * 255);
      const name = color.name || color.hex;

      gpl += `${r.toString().padStart(3)} ${g.toString().padStart(3)} ${b.toString().padStart(3)} ${name}\n`;
    }
  });

  return gpl;
}

function exportToTailwind(palette: ColorPalette): string {
  const colors: { [key: string]: string } = {};

  palette.colors.forEach((color, index) => {
    const name = color.name
      ? color.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      : `color-${index + 1}`;
    colors[name] = color.hex;
  });

  return `// Tailwind CSS Configuration
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8).replace(/"/g, "'")}
    }
  }
}`;
}

function exportToSvg(palette: ColorPalette): string {
  const swatchSize = 80;
  const width = palette.colors.length * swatchSize;
  const height = swatchSize;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n`;
  svg += `  <title>${palette.name}</title>\n`;

  palette.colors.forEach((color, index) => {
    const x = index * swatchSize;
    svg += `  <rect x="${x}" y="0" width="${swatchSize}" height="${height}" fill="${color.hex}" />\n`;

    // Add color name/hex text
    const textColor = isLightColor(color.hex) ? "#000000" : "#ffffff";
    svg += `  <text x="${x + swatchSize / 2}" y="${height / 2 - 10}" text-anchor="middle" fill="${textColor}" font-family="Arial" font-size="10">${color.name || ""}</text>\n`;
    svg += `  <text x="${x + swatchSize / 2}" y="${height / 2 + 10}" text-anchor="middle" fill="${textColor}" font-family="Arial" font-size="8">${color.hex}</text>\n`;
  });

  svg += `</svg>`;
  return svg;
}

function exportToPng(palette: ColorPalette): string {
  // Return a data URL that can be used to create a PNG
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const swatchSize = 120;
  canvas.width = palette.colors.length * swatchSize;
  canvas.height = swatchSize;

  palette.colors.forEach((color, index) => {
    ctx.fillStyle = color.hex;
    ctx.fillRect(index * swatchSize, 0, swatchSize, swatchSize);

    // Add text
    const textColor = isLightColor(color.hex) ? "#000000" : "#ffffff";
    ctx.fillStyle = textColor;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      color.name || "",
      (index + 0.5) * swatchSize,
      swatchSize / 2 - 10,
    );
    ctx.font = "10px Arial";
    ctx.fillText(color.hex, (index + 0.5) * swatchSize, swatchSize / 2 + 10);
  });

  return canvas.toDataURL("image/png");
}

function isLightColor(hex: string): boolean {
  const parsed = parse(hex);
  if (!parsed) return false;

  const hsl = converter("hsl")(parsed);
  return (hsl.l || 0) > 0.5;
}

/**
 * Extract dominant colors from an image
 */
export async function extractColorsFromImage(
  imageSource: File | string,
  maxColors: number = 8,
): Promise<PaletteColor[]> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Cannot create canvas context"));
      return;
    }

    img.onload = () => {
      // Resize image for faster processing
      const maxSize = 200;
      const ratio = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData, maxColors);
        resolve(colors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    if (typeof imageSource === "string") {
      // Handle URL
      img.crossOrigin = "anonymous";
      img.src = imageSource;
    } else {
      // Handle File
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsDataURL(imageSource);
    }
  });
}

/**
 * Extract dominant colors using a simplified k-means clustering approach
 */
function extractDominantColors(
  imageData: ImageData,
  maxColors: number,
): PaletteColor[] {
  const data = imageData.data;
  const pixels: [number, number, number][] = [];

  // Sample pixels (every 4th pixel for performance)
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3];

    // Skip transparent pixels
    if (alpha > 128) {
      pixels.push([r, g, b]);
    }
  }

  if (pixels.length === 0) {
    return [];
  }

  // Use a simplified color quantization
  const colorMap = new Map<string, number>();

  pixels.forEach(([r, g, b]) => {
    // Quantize colors to reduce similar shades
    const quantR = Math.floor(r / 32) * 32;
    const quantG = Math.floor(g / 32) * 32;
    const quantB = Math.floor(b / 32) * 32;
    const key = `${quantR},${quantG},${quantB}`;

    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  });

  // Sort by frequency and take top colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxColors);

  return sortedColors.map(([colorKey], index) => {
    const [r, g, b] = colorKey.split(",").map(Number);
    const hex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;

    return {
      id: `extracted-${index}`,
      hex,
      name: generateColorName(hex),
    };
  });
}

/**
 * Generate descriptive names for colors
 */
export function generateColorName(hex: string): string {
  const parsed = parse(hex);
  if (!parsed) return hex;

  const hsl = converter("hsl")(parsed);
  const h = hsl.h || 0;
  const s = (hsl.s || 0) * 100;
  const l = (hsl.l || 0) * 100;

  // Define color name mappings
  const hueNames: { [key: string]: string } = {
    0: "Red",
    15: "Crimson",
    30: "Orange",
    45: "Amber",
    60: "Yellow",
    75: "Lime",
    90: "Chartreuse",
    120: "Green",
    150: "Spring Green",
    180: "Cyan",
    200: "Sky Blue",
    240: "Blue",
    270: "Violet",
    300: "Magenta",
    315: "Rose",
    330: "Pink",
  };

  const lightnessNames = {
    veryDark: l < 20,
    dark: l >= 20 && l < 40,
    medium: l >= 40 && l < 60,
    light: l >= 60 && l < 80,
    veryLight: l >= 80,
  };

  const saturationNames = {
    muted: s < 30,
    soft: s >= 30 && s < 60,
    vivid: s >= 60,
  };

  // Find closest hue
  let closestHue = "Gray";
  let minDiff = 360;

  if (s > 10) {
    // Only assign hue names for saturated colors
    Object.entries(hueNames).forEach(([hueValue, name]) => {
      const diff = Math.min(
        Math.abs(h - Number(hueValue)),
        360 - Math.abs(h - Number(hueValue)),
      );
      if (diff < minDiff) {
        minDiff = diff;
        closestHue = name;
      }
    });
  }

  // Build descriptive name
  let name = "";

  if (lightnessNames.veryLight) {
    name += "Pale ";
  } else if (lightnessNames.light) {
    name += "Light ";
  } else if (lightnessNames.dark) {
    name += "Dark ";
  } else if (lightnessNames.veryDark) {
    name += "Deep ";
  }

  if (saturationNames.muted && s > 10) {
    name += "Muted ";
  } else if (saturationNames.vivid) {
    name += "Vivid ";
  }

  name += closestHue;

  return name;
}

/**
 * Suggest complementary colors to extend a palette
 */
export function suggestComplementaryColors(
  currentColors: PaletteColor[],
  count: number = 3,
): PaletteColor[] {
  if (currentColors.length === 0) return [];

  const suggestions: PaletteColor[] = [];
  const existingHexes = new Set(currentColors.map((c) => c.hex.toLowerCase()));

  // Generate suggestions based on harmony rules
  currentColors.forEach((color, index) => {
    if (suggestions.length >= count) return;

    const parsed = parse(color.hex);
    if (!parsed) return;

    const hsl = converter("hsl")(parsed);

    // Generate complementary
    const complement = {
      ...hsl,
      h: ((hsl.h || 0) + 180) % 360,
    };
    const complementHex = formatHex(complement);

    if (
      !existingHexes.has(complementHex.toLowerCase()) &&
      suggestions.length < count
    ) {
      suggestions.push({
        id: `suggestion-comp-${index}`,
        hex: complementHex,
        name: generateColorName(complementHex),
      });
      existingHexes.add(complementHex.toLowerCase());
    }

    // Generate split-complementary
    if (suggestions.length < count) {
      const splitComp1 = {
        ...hsl,
        h: ((hsl.h || 0) + 150) % 360,
        l: Math.max(0.2, Math.min(0.8, (hsl.l || 0.5) + 0.2)),
      };
      const splitHex1 = formatHex(splitComp1);

      if (!existingHexes.has(splitHex1.toLowerCase())) {
        suggestions.push({
          id: `suggestion-split-${index}-1`,
          hex: splitHex1,
          name: generateColorName(splitHex1),
        });
        existingHexes.add(splitHex1.toLowerCase());
      }
    }

    // Generate analogous
    if (suggestions.length < count) {
      const analogous = {
        ...hsl,
        h: ((hsl.h || 0) + 30) % 360,
        s: Math.min(1, (hsl.s || 0.5) + 0.1),
      };
      const analogousHex = formatHex(analogous);

      if (!existingHexes.has(analogousHex.toLowerCase())) {
        suggestions.push({
          id: `suggestion-analog-${index}`,
          hex: analogousHex,
          name: generateColorName(analogousHex),
        });
        existingHexes.add(analogousHex.toLowerCase());
      }
    }
  });

  return suggestions.slice(0, count);
}

import {
  formatHex,
  formatHsl,
  formatRgb,
  parse,
  wcagContrast,
  colorsNamed,
  random,
  converter,
  interpolate,
  differenceEuclidean,
  clampGamut,
} from 'culori';

export type ColorFormat = 'hex' | 'hsl' | 'rgb' | 'hsv';

export interface ColorInfo {
  hex: string;
  hsl: string;
  rgb: string;
  hsv: string;
  name?: string;
}

export interface ContrastResult {
  ratio: number;
  level: 'AAA' | 'AA' | 'A' | 'FAIL';
  isAccessible: boolean;
}

/**
 * Format HSV color
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatHsv(colorInput: any): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hsv = converter('hsv')(colorInput) as any;
    if (!hsv) return 'hsv(0, 0%, 0%)';
    
    const h = Math.round(hsv.h || 0);
    const s = Math.round((hsv.s || 0) * 100);
    const v = Math.round((hsv.v || 0) * 100);
    return `hsv(${h}, ${s}%, ${v}%)`;
  } catch {
    return 'hsv(0, 0%, 0%)';
  }
}

/**
 * Convert any color to all supported formats
 */
export function convertColor(input: string): ColorInfo | null {
  try {
    const parsed = parse(input);
    if (!parsed) return null;

    const hex = formatHex(parsed);
    const hsl = formatHsl(parsed);
    const rgb = formatRgb(parsed);
    const hsv = formatHsv(parsed);

    // Try to find a named color
    const name = findNamedColor(hex);

    return {
      hex,
      hsl,
      rgb,
      hsv,
      name,
    };
  } catch (error) {
    console.error('Error converting color:', error);
    return null;
  }
}

/**
 * Check if a color string is valid
 */
export function isValidColor(input: string): boolean {
  try {
    const parsed = parse(input);
    return parsed !== undefined;
  } catch {
    return false;
  }
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrast(color1: string, color2: string): ContrastResult | null {
  try {
    const ratio = wcagContrast(color1, color2);
    
    let level: ContrastResult['level'] = 'FAIL';
    let isAccessible = false;

    if (ratio >= 7) {
      level = 'AAA';
      isAccessible = true;
    } else if (ratio >= 4.5) {
      level = 'AA';
      isAccessible = true;
    } else if (ratio >= 3) {
      level = 'A';
      isAccessible = false;
    }

    return {
      ratio: Math.round(ratio * 100) / 100,
      level,
      isAccessible,
    };
  } catch (error) {
    console.error('Error calculating contrast:', error);
    return null;
  }
}

/**
 * Find the closest named color
 */
export function findNamedColor(hex: string): string | undefined {
  const parsed = parse(hex);
  if (!parsed) return undefined;

  let closestName: string | undefined;
  let closestDistance = Infinity;

  Object.entries(colorsNamed).forEach(([name, namedValue]) => {
    const namedColor = parse(String(namedValue));
    if (namedColor) {
      const distance = differenceEuclidean()(parsed, namedColor);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestName = name;
      }
    }
  });

  return closestDistance < 0.1 ? closestName : undefined;
}

/**
 * Generate a random color
 */
export function generateRandomColor(): string {
  return formatHex(random());
}

/**
 * Generate a complementary color
 */
export function getComplementaryColor(color: string): string | null {
  try {
    const parsed = parse(color);
    if (!parsed) return null;

    const hsl = converter('hsl')(parsed);
    const complementary = {
      ...hsl,
      h: ((hsl.h || 0) + 180) % 360,
    };

    return formatHex(complementary);
  } catch (error) {
    console.error('Error getting complementary color:', error);
    return null;
  }
}

/**
 * Generate analogous colors
 */
export function getAnalogousColors(color: string, count: number = 2): string[] {
  try {
    const parsed = parse(color);
    if (!parsed) return [];

    const hsl = converter('hsl')(parsed);
    const colors: string[] = [];
    const step = 30; // degrees

    for (let i = 1; i <= count; i++) {
      const analogous1 = {
        ...hsl,
        h: ((hsl.h || 0) + (step * i)) % 360,
      };
      const analogous2 = {
        ...hsl,
        h: ((hsl.h || 0) - (step * i) + 360) % 360,
      };

      colors.push(formatHex(analogous1));
      if (colors.length < count * 2) {
        colors.push(formatHex(analogous2));
      }
    }

    return colors.slice(0, count * 2);
  } catch (error) {
    console.error('Error getting analogous colors:', error);
    return [];
  }
}

/**
 * Generate triadic colors
 */
export function getTriadicColors(color: string): string[] {
  try {
    const parsed = parse(color);
    if (!parsed) return [];

    const hsl = converter('hsl')(parsed);
    const triadic1 = {
      ...hsl,
      h: ((hsl.h || 0) + 120) % 360,
    };
    const triadic2 = {
      ...hsl,
      h: ((hsl.h || 0) + 240) % 360,
    };

    return [formatHex(triadic1), formatHex(triadic2)];
  } catch (error) {
    console.error('Error getting triadic colors:', error);
    return [];
  }
}

/**
 * Lighten a color
 */
export function lightenColor(color: string, amount: number = 0.1): string | null {
  try {
    const parsed = parse(color);
    if (!parsed) return null;

    const hsl = converter('hsl')(parsed);
    const lightened = {
      ...hsl,
      l: Math.min(1, (hsl.l || 0) + amount),
    };

    return formatHex(lightened);
  } catch (error) {
    console.error('Error lightening color:', error);
    return null;
  }
}

/**
 * Darken a color
 */
export function darkenColor(color: string, amount: number = 0.1): string | null {
  try {
    const parsed = parse(color);
    if (!parsed) return null;

    const hsl = converter('hsl')(parsed);
    const darkened = {
      ...hsl,
      l: Math.max(0, (hsl.l || 0) - amount),
    };

    return formatHex(darkened);
  } catch (error) {
    console.error('Error darkening color:', error);
    return null;
  }
}

/**
 * Adjust saturation of a color
 */
export function adjustSaturation(color: string, amount: number): string | null {
  try {
    const parsed = parse(color);
    if (!parsed) return null;

    const hsl = converter('hsl')(parsed);
    const adjusted = {
      ...hsl,
      s: Math.max(0, Math.min(1, (hsl.s || 0) + amount)),
    };

    return formatHex(adjusted);
  } catch (error) {
    console.error('Error adjusting saturation:', error);
    return null;
  }
}

/**
 * Create color interpolation between two colors
 */
export function interpolateColors(color1: string, color2: string, steps: number = 10): string[] {
  try {
    const interpolator = interpolate([color1, color2]);
    const colors: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const color = interpolator(t);
      if (color) {
        colors.push(formatHex(color));
      }
    }

    return colors;
  } catch (error) {
    console.error('Error interpolating colors:', error);
    return [];
  }
}

/**
 * Ensure color is within gamut
 */
export function ensureGamut(color: string): string | null {
  try {
    const parsed = parse(color);
    if (!parsed) return null;

    const clamped = clampGamut('rgb')(parsed);
    return formatHex(clamped || parsed);
  } catch (error) {
    console.error('Error ensuring gamut:', error);
    return null;
  }
}
import { interpolate, parse, formatHex, converter } from "culori";

export type GradientType = "linear" | "radial" | "conic";
export type GradientDirection =
  | number
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to top right"
  | "to top left"
  | "to bottom right"
  | "to bottom left";

export interface GradientStop {
  id: string;
  color: string;
  position: number; // 0-100
}

export interface GradientConfig {
  id: string;
  name: string;
  type: GradientType;
  direction: GradientDirection;
  stops: GradientStop[];
  createdAt: Date;
}

export interface LinearGradientConfig extends Omit<GradientConfig, "type"> {
  type: "linear";
  direction: GradientDirection;
}

export interface RadialGradientConfig extends Omit<GradientConfig, "type"> {
  type: "radial";
  shape: "circle" | "ellipse";
  size: "closest-side" | "closest-corner" | "farthest-side" | "farthest-corner";
  position: { x: number; y: number }; // percentage
}

export interface ConicGradientConfig extends Omit<GradientConfig, "type"> {
  type: "conic";
  angle: number; // degrees
  position: { x: number; y: number }; // percentage
}

/**
 * Create a new gradient stop
 */
export function createGradientStop(
  color: string,
  position: number,
): GradientStop {
  return {
    id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    color,
    position: Math.max(0, Math.min(100, position)),
  };
}

/**
 * Generate CSS for linear gradient
 */
export function generateLinearGradientCSS(
  config: LinearGradientConfig,
): string {
  const direction =
    typeof config.direction === "number"
      ? `${config.direction}deg`
      : config.direction;

  const stops = config.stops
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
}

/**
 * Generate CSS for radial gradient
 */
export function generateRadialGradientCSS(
  config: RadialGradientConfig,
): string {
  const shape = config.shape || "ellipse";
  const size = config.size || "farthest-corner";
  const position = config.position
    ? `${config.position.x}% ${config.position.y}%`
    : "50% 50%";

  const stops = config.stops
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  return `radial-gradient(${shape} ${size} at ${position}, ${stops})`;
}

/**
 * Generate CSS for conic gradient
 */
export function generateConicGradientCSS(config: ConicGradientConfig): string {
  const angle = config.angle || 0;
  const position = config.position
    ? `${config.position.x}% ${config.position.y}%`
    : "50% 50%";

  const stops = config.stops
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position * 3.6}deg`) // Convert percentage to degrees
    .join(", ");

  return `conic-gradient(from ${angle}deg at ${position}, ${stops})`;
}

/**
 * Generate CSS for any gradient type
 */
export function generateGradientCSS(config: GradientConfig): string {
  switch (config.type) {
    case "linear":
      return generateLinearGradientCSS(config as LinearGradientConfig);
    case "radial":
      return generateRadialGradientCSS(config as RadialGradientConfig);
    case "conic":
      return generateConicGradientCSS(config as ConicGradientConfig);
    default:
      return "";
  }
}

/**
 * Create interpolated stops between two colors
 */
export function createInterpolatedStops(
  startColor: string,
  endColor: string,
  startPosition: number = 0,
  endPosition: number = 100,
  steps: number = 10,
): GradientStop[] {
  const interpolator = interpolate([startColor, endColor]);
  const stops: GradientStop[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const color = interpolator(t);
    const position = startPosition + (endPosition - startPosition) * t;

    if (color) {
      stops.push(createGradientStop(formatHex(color), position));
    }
  }

  return stops;
}

/**
 * Add a new stop to a gradient
 */
export function addGradientStop(
  config: GradientConfig,
  color: string,
  position: number,
): GradientConfig {
  const newStop = createGradientStop(color, position);

  return {
    ...config,
    stops: [...config.stops, newStop].sort((a, b) => a.position - b.position),
  };
}

/**
 * Remove a stop from a gradient
 */
export function removeGradientStop(
  config: GradientConfig,
  stopId: string,
): GradientConfig {
  return {
    ...config,
    stops: config.stops.filter((stop) => stop.id !== stopId),
  };
}

/**
 * Update a gradient stop
 */
export function updateGradientStop(
  config: GradientConfig,
  stopId: string,
  updates: Partial<Omit<GradientStop, "id">>,
): GradientConfig {
  return {
    ...config,
    stops: config.stops
      .map((stop) =>
        stop.id === stopId
          ? {
              ...stop,
              ...updates,
              position:
                updates.position !== undefined
                  ? Math.max(0, Math.min(100, updates.position))
                  : stop.position,
            }
          : stop,
      )
      .sort((a, b) => a.position - b.position),
  };
}

/**
 * Reverse gradient stops
 */
export function reverseGradient(config: GradientConfig): GradientConfig {
  return {
    ...config,
    stops: config.stops
      .map((stop) => ({
        ...stop,
        position: 100 - stop.position,
      }))
      .sort((a, b) => a.position - b.position),
  };
}

/**
 * Generate random gradient
 */
export function generateRandomGradient(
  type: GradientType = "linear",
): GradientConfig {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
  ];
  const randomColors = colors
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 2);

  const stops: GradientStop[] = randomColors.map((color, index) =>
    createGradientStop(color, (index / (randomColors.length - 1)) * 100),
  );

  const baseConfig: GradientConfig = {
    id: `gradient-${Date.now()}`,
    name: `Random ${type} gradient`,
    type,
    direction: Math.floor(Math.random() * 360),
    stops,
    createdAt: new Date(),
  };

  if (type === "radial") {
    return {
      ...baseConfig,
      type: "radial",
      shape: Math.random() > 0.5 ? "circle" : "ellipse",
      size: (
        [
          "closest-side",
          "closest-corner",
          "farthest-side",
          "farthest-corner",
        ] as const
      )[Math.floor(Math.random() * 4)],
      position: {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      },
    } as RadialGradientConfig;
  }

  if (type === "conic") {
    return {
      ...baseConfig,
      type: "conic",
      angle: Math.floor(Math.random() * 360),
      position: {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      },
    } as ConicGradientConfig;
  }

  return baseConfig as LinearGradientConfig;
}

/**
 * Create preset gradients
 */
export function createPresetGradients(): GradientConfig[] {
  return [
    {
      id: "sunset",
      name: "Sunset",
      type: "linear",
      direction: 45,
      stops: [
        createGradientStop("#FF6B6B", 0),
        createGradientStop("#FFE66D", 50),
        createGradientStop("#FF6B6B", 100),
      ],
      createdAt: new Date(),
    },
    {
      id: "ocean",
      name: "Ocean",
      type: "linear",
      direction: 180,
      stops: [
        createGradientStop("#4ECDC4", 0),
        createGradientStop("#44A08D", 100),
      ],
      createdAt: new Date(),
    },
    {
      id: "aurora",
      name: "Aurora",
      type: "linear",
      direction: 135,
      stops: [
        createGradientStop("#00C9FF", 0),
        createGradientStop("#92FE9D", 100),
      ],
      createdAt: new Date(),
    },
    {
      id: "fire",
      name: "Fire",
      type: "radial",
      direction: 0,
      stops: [
        createGradientStop("#FFE53B", 0),
        createGradientStop("#FF2525", 100),
      ],
      createdAt: new Date(),
    } as RadialGradientConfig,
  ];
}

/**
 * Analyze gradient contrast
 */
export function analyzeGradientContrast(config: GradientConfig): {
  minContrast: number;
  maxContrast: number;
  averageContrast: number;
  contrastPoints: { position: number; contrast: number }[];
} {
  const stops = config.stops.sort((a, b) => a.position - b.position);
  const contrastPoints: { position: number; contrast: number }[] = [];

  let minContrast = Infinity;
  let maxContrast = 0;
  let totalContrast = 0;
  let pointCount = 0;

  // Analyze contrast between adjacent stops
  for (let i = 0; i < stops.length - 1; i++) {
    const currentStop = stops[i];
    const nextStop = stops[i + 1];

    // Create interpolated colors between stops
    const interpolator = interpolate([currentStop.color, nextStop.color]);
    const stepCount = Math.ceil((nextStop.position - currentStop.position) / 5); // Every 5%

    for (let j = 0; j <= stepCount; j++) {
      const t = j / stepCount;
      const position =
        currentStop.position + (nextStop.position - currentStop.position) * t;
      const color = interpolator(t);

      if (color && i > 0) {
        const prevColor = interpolator(0); // Previous color for contrast
        if (prevColor) {
          // This is a simplified contrast calculation
          // In a real implementation, you might want to use wcagContrast
          const contrast = calculateSimpleContrast(
            formatHex(color),
            formatHex(prevColor),
          );

          contrastPoints.push({ position, contrast });
          minContrast = Math.min(minContrast, contrast);
          maxContrast = Math.max(maxContrast, contrast);
          totalContrast += contrast;
          pointCount++;
        }
      }
    }
  }

  return {
    minContrast: minContrast === Infinity ? 0 : minContrast,
    maxContrast,
    averageContrast: pointCount > 0 ? totalContrast / pointCount : 0,
    contrastPoints,
  };
}

/**
 * Simple contrast calculation for gradient analysis
 */
function calculateSimpleContrast(color1: string, color2: string): number {
  const c1 = parse(color1);
  const c2 = parse(color2);

  if (!c1 || !c2) return 0;

  // Convert to RGB for luminance calculation
  const rgb1 = converter("rgb")(c1);
  const rgb2 = converter("rgb")(c2);

  // Convert to luminance and calculate contrast ratio
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Calculate relative luminance
 */
function getLuminance(color: { r?: number; g?: number; b?: number }): number {
  const { r = 0, g = 0, b = 0 } = color;

  const sRGB = [r, g, b].map((c) => {
    c = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return c;
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Export gradient to various formats
 */
export function exportGradient(
  config: GradientConfig,
  format: "css" | "svg" | "json",
): string {
  switch (format) {
    case "css":
      return generateGradientCSS(config);
    case "svg":
      return generateSVGGradient(config);
    case "json":
      return JSON.stringify(config, null, 2);
    default:
      return "";
  }
}

/**
 * Generate SVG gradient definition
 */
function generateSVGGradient(config: GradientConfig): string {
  const gradientId = `gradient-${config.id}`;

  if (config.type === "linear") {
    const angle = typeof config.direction === "number" ? config.direction : 0;
    const x1 = Math.cos(((angle - 90) * Math.PI) / 180) * 50 + 50;
    const y1 = Math.sin(((angle - 90) * Math.PI) / 180) * 50 + 50;
    const x2 = 100 - x1;
    const y2 = 100 - y1;

    const stops = config.stops
      .sort((a, b) => a.position - b.position)
      .map(
        (stop) =>
          `  <stop offset="${stop.position}%" stop-color="${stop.color}" />`,
      )
      .join("\n");

    return `<defs>
  <linearGradient id="${gradientId}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${stops}
  </linearGradient>
</defs>`;
  }

  if (config.type === "radial") {
    const radialConfig = config as RadialGradientConfig;
    const stops = config.stops
      .sort((a, b) => a.position - b.position)
      .map(
        (stop) =>
          `  <stop offset="${stop.position}%" stop-color="${stop.color}" />`,
      )
      .join("\n");

    return `<defs>
  <radialGradient id="${gradientId}" cx="${radialConfig.position.x}%" cy="${radialConfig.position.y}%">
${stops}
  </radialGradient>
</defs>`;
  }

  return `<!-- ${config.type} gradients not fully supported in SVG -->`;
}

import { interpolate, parse, formatHex, converter } from 'culori'
import {
  GradientConfig,
  GradientType,
  createGradientStop,
} from '@/lib/gradient-utils'
import { THEMES } from '@/lib/constants/theme'

export interface GradientGenerationOptions {
  liberty?: number // 0 = strict (only use provided colors), 1 = creative (generate harmonious variations)
  count?: number // number of gradients to generate (default: 6)
  types?: GradientType[] // gradient types to generate (default: ['linear'])
}

/**
 * Uniform algorithm to generate gradients from a color array
 * Uses color theory to create harmonious combinations
 */
export function generateGradientsFromColors(
  colors: string[],
  options: GradientGenerationOptions = {}
): GradientConfig[] {
  const { liberty = 0, count = 6, types = ['linear'] } = options
  
  if (colors.length === 0) return []
  
  const gradients: GradientConfig[] = []
  const usableColors = liberty > 0 ? expandColorPalette(colors, liberty) : colors
  
  // Generate different gradient patterns
  const patterns = [
    'sequential', // color1 -> color2
    'diverging',  // color1 -> middle -> color2  
    'triadic',    // three colors evenly spaced
    'analogous',  // colors next to each other
    'monochrome', // variations of single color
    'complementary' // opposite colors
  ]
  
  let generated = 0
  
  for (const pattern of patterns) {
    if (generated >= count) break
    
    for (const type of types) {
      if (generated >= count) break
      
      const gradient = createGradientFromPattern(usableColors, pattern, type, generated)
      if (gradient) {
        gradients.push(gradient)
        generated++
      }
    }
  }
  
  return gradients
}

/**
 * Expand color palette using color theory when liberty > 0
 */
function expandColorPalette(colors: string[], liberty: number): string[] {
  const expanded = [...colors]
  
  for (const color of colors) {
    const parsed = parse(color)
    if (!parsed) continue
    
    const hsl = converter('hsl')(parsed)
    if (!hsl) continue
    
    if (liberty >= 0.5) {
      // Add analogous colors (±30 degrees)
      const h = hsl.h ?? 0
      expanded.push(formatHex({ ...hsl, h: (h + 30) % 360 }))
      expanded.push(formatHex({ ...hsl, h: (h - 30 + 360) % 360 }))
    }
    
    if (liberty >= 0.7) {
      // Add complementary color (180 degrees)
      const h = hsl.h ?? 0
      expanded.push(formatHex({ ...hsl, h: (h + 180) % 360 }))
    }
    
    if (liberty >= 0.3) {
      // Add lighter/darker variations
      expanded.push(formatHex({ ...hsl, l: Math.min(1, hsl.l + 0.2) }))
      expanded.push(formatHex({ ...hsl, l: Math.max(0, hsl.l - 0.2) }))
    }
    
    if (liberty >= 0.8) {
      // Add saturation variations
      expanded.push(formatHex({ ...hsl, s: Math.min(1, hsl.s + 0.3) }))
      expanded.push(formatHex({ ...hsl, s: Math.max(0, hsl.s - 0.3) }))
    }
  }
  
  return [...new Set(expanded)] // Remove duplicates
}

/**
 * Create a gradient based on a specific pattern
 */
function createGradientFromPattern(
  colors: string[],
  pattern: string,
  type: GradientType,
  index: number
): GradientConfig | null {
  if (colors.length === 0) return null
  
  const id = `gen-${pattern}-${type}-${index}-${Date.now()}`
  const directions = [45, 90, 135, 180, 225, 270, 315, 0]
  const direction = directions[index % directions.length]
  
  let stops: Array<{ color: string; position: number }> = []
  
  switch (pattern) {
    case 'sequential':
      if (colors.length >= 2) {
        stops = [
          { color: colors[0], position: 0 },
          { color: colors[1], position: 100 }
        ]
      }
      break
      
    case 'diverging':
      if (colors.length >= 2) {
        const middle = colors.length > 2 ? colors[2] : interpolateColor(colors[0], colors[1], 0.5)
        stops = [
          { color: colors[0], position: 0 },
          { color: middle, position: 50 },
          { color: colors[1], position: 100 }
        ]
      }
      break
      
    case 'triadic':
      if (colors.length >= 3) {
        stops = [
          { color: colors[0], position: 0 },
          { color: colors[1], position: 50 },
          { color: colors[2], position: 100 }
        ]
      }
      break
      
    case 'analogous':
      if (colors.length >= 2) {
        const analogous = findAnalogousColors(colors[0])
        stops = [
          { color: colors[0], position: 0 },
          { color: analogous[0], position: 50 },
          { color: colors[1], position: 100 }
        ]
      }
      break
      
    case 'monochrome':
      if (colors.length >= 1) {
        const variations = createMonochromeVariations(colors[0])
        stops = [
          { color: variations[0], position: 0 },
          { color: variations[1], position: 100 }
        ]
      }
      break
      
    case 'complementary':
      if (colors.length >= 1) {
        const complement = findComplementaryColor(colors[0])
        stops = [
          { color: colors[0], position: 0 },
          { color: complement, position: 100 }
        ]
      }
      break
  }
  
  if (stops.length === 0) return null
  
  return {
    id,
    name: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)} ${type}`,
    type,
    direction,
    stops: stops.map((stop) => createGradientStop(stop.color, stop.position)),
    createdAt: new Date(),
  }
}

/**
 * Helper functions for color theory
 */
function interpolateColor(color1: string, color2: string, t: number): string {
  const interpolator = interpolate([color1, color2])
  const result = interpolator(t)
  return result ? formatHex(result) : color1
}

function findAnalogousColors(color: string): string[] {
  const parsed = parse(color)
  if (!parsed) return [color, color]
  
  const hsl = converter('hsl')(parsed)
  if (!hsl) return [color, color]
  
  return [
    formatHex({ ...hsl, h: ((hsl.h ?? 0) + 30) % 360 }),
    formatHex({ ...hsl, h: ((hsl.h ?? 0) - 30 + 360) % 360 })
  ]
}

function findComplementaryColor(color: string): string {
  const parsed = parse(color)
  if (!parsed) return color
  
  const hsl = converter('hsl')(parsed)
  if (!hsl) return color
  
  return formatHex({ ...hsl, h: ((hsl.h ?? 0) + 180) % 360 })
}

function createMonochromeVariations(color: string): string[] {
  const parsed = parse(color)
  if (!parsed) return [color, color]
  
  const hsl = converter('hsl')(parsed)
  if (!hsl) return [color, color]
  
  return [
    formatHex({ ...hsl, l: Math.max(0, hsl.l - 0.3) }),
    formatHex({ ...hsl, l: Math.min(1, hsl.l + 0.3) })
  ]
}

// Extract color arrays from theme data
function extractThemeColors() {
  const themeColorArrays: Record<string, string[]> = {}
  
  THEMES.forEach(theme => {
    const colors = theme.colors
    // Extract prominent colors (primary, secondary, accent, base)
    const prominentColors = [
      colors['--color-primary'],
      colors['--color-secondary'], 
      colors['--color-accent'],
      colors['--color-base-100']
    ].filter(Boolean)
    
    // Extract semantic colors for variety
    const semanticColors = [
      colors['--color-info'],
      colors['--color-success'],
      colors['--color-warning'],
      colors['--color-error']
    ].filter(Boolean)
    
    // Combine and deduplicate
    const allColors = [...prominentColors, ...semanticColors]
    themeColorArrays[theme.name] = allColors
  })
  
  return themeColorArrays
}

/**
 * Predefined color arrays for templates
 */
export const TEMPLATE_COLORS = {
  // Colors extracted from existing themes
  ...extractThemeColors(),
  
  // Additional curated color sets
  monochrome: [
    '#1f2937', '#374151', '#4b5563', '#6b7280', 
    '#9ca3af', '#d1d5db', '#e5e7eb', '#f9fafb'
  ],
  grayscale: [
    '#000000', '#1a1a1a', '#333333', '#4d4d4d',
    '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6'
  ],
  redhot: [
    '#7f1d1d', '#991b1b', '#dc2626', '#ef4444',
    '#f87171', '#fca5a5', '#fecaca', '#fed7d7'
  ],
  oceanic: [
    '#0c4a6e', '#0369a1', '#0284c7', '#0ea5e9',
    '#38bdf8', '#7dd3fc', '#a7f3d0', '#ccfbf1'
  ],
  sunset: [
    '#7c2d12', '#ea580c', '#f97316', '#fb923c',
    '#fed7aa', '#fef3c7', '#fef9c3', '#fffbeb'
  ],
  nature: [
    '#14532d', '#166534', '#15803d', '#16a34a',
    '#22c55e', '#4ade80', '#86efac', '#bbf7d0'
  ],
  royal: [
    '#581c87', '#7c3aed', '#8b5cf6', '#a78bfa',
    '#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff'
  ]
} as const

export type TemplateKey = keyof typeof TEMPLATE_COLORS
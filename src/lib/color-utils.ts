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
} from 'culori'

export type ColorFormat = 'hex' | 'hsl' | 'rgb' | 'hsv' | 'oklch'

export interface ColorInfo {
	hex: string
	hsl: string
	rgb: string
	hsv: string
	oklch: string
	name?: string
}

export interface ContrastResult {
	ratio: number
	level: 'AAA' | 'AA' | 'A' | 'FAIL'
	isAccessible: boolean
}

/**
 * Format HSV color
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatHsv(colorInput: any): string {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const hsv = converter('hsv')(colorInput) as any
		if (!hsv) return 'hsv(0, 0%, 0%)'

		const h = Math.round(hsv.h || 0)
		const s = Math.round((hsv.s || 0) * 100)
		const v = Math.round((hsv.v || 0) * 100)
		return `hsv(${h}, ${s}%, ${v}%)`
	} catch {
		return 'hsv(0, 0%, 0%)'
	}
}

/**
 * Format OKLCH color
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatOklch(colorInput: any): string {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const oklch = converter('oklch')(colorInput) as any
		if (!oklch) return 'oklch(0 0 0)'

		const l = Math.round((oklch.l || 0) * 10000) / 10000
		const c = Math.round((oklch.c || 0) * 10000) / 10000
		const h = Math.round(oklch.h || 0)
		return `oklch(${l} ${c} ${h})`
	} catch {
		return 'oklch(0 0 0)'
	}
}

/**
 * Convert any color to all supported formats
 */
export function convertColor(input: string): ColorInfo | null {
	try {
		const parsed = parse(input)
		if (!parsed) return null

		const hex = formatHex(parsed)
		const hsl = formatHsl(parsed)
		const rgb = formatRgb(parsed)
		const hsv = formatHsv(parsed)
		const oklch = formatOklch(parsed)

		// Try to find a named color
		const name = findNamedColor(hex)

		return {
			hex,
			hsl,
			rgb,
			hsv,
			oklch,
			name,
		}
	} catch (error) {
		console.error('Error converting color:', error)
		return null
	}
}

/**
 * Check if a color string is valid
 */
export function isValidColor(input: string): boolean {
	try {
		const parsed = parse(input)
		return parsed !== undefined
	} catch {
		return false
	}
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrast(
	color1: string,
	color2: string
): ContrastResult | null {
	try {
		const ratio = wcagContrast(color1, color2)

		let level: ContrastResult['level'] = 'FAIL'
		let isAccessible = false

		if (ratio >= 7) {
			level = 'AAA'
			isAccessible = true
		} else if (ratio >= 4.5) {
			level = 'AA'
			isAccessible = true
		} else if (ratio >= 3) {
			level = 'A'
			isAccessible = false
		}

		return {
			ratio: Math.round(ratio * 100) / 100,
			level,
			isAccessible,
		}
	} catch (error) {
		console.error('Error calculating contrast:', error)
		return null
	}
}

/**
 * Find the closest named color
 */
export function findNamedColor(hex: string): string | undefined {
	const parsed = parse(hex)
	if (!parsed) return undefined

	let closestName: string | undefined
	let closestDistance = Infinity

	Object.entries(colorsNamed).forEach(([name, namedValue]) => {
		const namedColor = parse(String(namedValue))
		if (namedColor) {
			const distance = differenceEuclidean()(parsed, namedColor)
			if (distance < closestDistance) {
				closestDistance = distance
				closestName = name
			}
		}
	})

	return closestDistance < 0.1 ? closestName : undefined
}

/**
 * Generate a random color
 */
export function generateRandomColor(): string {
	return formatHex(random())
}

/**
 * Generate a complementary color
 */
export function getComplementaryColor(color: string): string | null {
	try {
		const parsed = parse(color)
		if (!parsed) return null

		const hsl = converter('hsl')(parsed)
		const complementary = {
			...hsl,
			h: ((hsl.h || 0) + 180) % 360,
		}

		return formatHex(complementary)
	} catch (error) {
		console.error('Error getting complementary color:', error)
		return null
	}
}

/**
 * Generate analogous colors
 */
export function getAnalogousColors(color: string, count: number = 2): string[] {
	try {
		const parsed = parse(color)
		if (!parsed) return []

		const hsl = converter('hsl')(parsed)
		const colors: string[] = []
		const step = 30 // degrees

		for (let i = 1; i <= count; i++) {
			const analogous1 = {
				...hsl,
				h: ((hsl.h || 0) + step * i) % 360,
			}
			const analogous2 = {
				...hsl,
				h: ((hsl.h || 0) - step * i + 360) % 360,
			}

			colors.push(formatHex(analogous1))
			if (colors.length < count * 2) {
				colors.push(formatHex(analogous2))
			}
		}

		return colors.slice(0, count * 2)
	} catch (error) {
		console.error('Error getting analogous colors:', error)
		return []
	}
}

/**
 * Generate triadic colors
 */
export function getTriadicColors(color: string): string[] {
	try {
		const parsed = parse(color)
		if (!parsed) return []

		const hsl = converter('hsl')(parsed)
		const triadic1 = {
			...hsl,
			h: ((hsl.h || 0) + 120) % 360,
		}
		const triadic2 = {
			...hsl,
			h: ((hsl.h || 0) + 240) % 360,
		}

		return [formatHex(triadic1), formatHex(triadic2)]
	} catch (error) {
		console.error('Error getting triadic colors:', error)
		return []
	}
}

/**
 * Lighten a color
 */
export function lightenColor(
	color: string,
	amount: number = 0.1
): string | null {
	try {
		const parsed = parse(color)
		if (!parsed) return null

		const hsl = converter('hsl')(parsed)
		const lightened = {
			...hsl,
			l: Math.min(1, (hsl.l || 0) + amount),
		}

		return formatHex(lightened)
	} catch (error) {
		console.error('Error lightening color:', error)
		return null
	}
}

/**
 * Darken a color
 */
export function darkenColor(
	color: string,
	amount: number = 0.1
): string | null {
	try {
		const parsed = parse(color)
		if (!parsed) return null

		const hsl = converter('hsl')(parsed)
		const darkened = {
			...hsl,
			l: Math.max(0, (hsl.l || 0) - amount),
		}

		return formatHex(darkened)
	} catch (error) {
		console.error('Error darkening color:', error)
		return null
	}
}

/**
 * Adjust saturation of a color
 */
export function adjustSaturation(color: string, amount: number): string | null {
	try {
		const parsed = parse(color)
		if (!parsed) return null

		const hsl = converter('hsl')(parsed)
		const adjusted = {
			...hsl,
			s: Math.max(0, Math.min(1, (hsl.s || 0) + amount)),
		}

		return formatHex(adjusted)
	} catch (error) {
		console.error('Error adjusting saturation:', error)
		return null
	}
}

/**
 * Create color interpolation between two colors
 */
export function interpolateColors(
	color1: string,
	color2: string,
	steps: number = 10
): string[] {
	try {
		const interpolator = interpolate([color1, color2])
		const colors: string[] = []

		for (let i = 0; i <= steps; i++) {
			const t = i / steps
			const color = interpolator(t)
			if (color) {
				colors.push(formatHex(color))
			}
		}

		return colors
	} catch (error) {
		console.error('Error interpolating colors:', error)
		return []
	}
}

/**
 * Ensure color is within gamut
 */
export function ensureGamut(color: string): string | null {
	try {
		const parsed = parse(color)
		if (!parsed) return null

		const clamped = clampGamut('rgb')(parsed)
		return formatHex(clamped || parsed)
	} catch (error) {
		console.error('Error ensuring gamut:', error)
		return null
	}
}

/**
 * Generate shade palette from light to dark
 */
export interface ShadeInfo {
	color: string
	weight: number
	name: string
}

export function generateShades(
	baseColor: string,
	steps: number = 11
): ShadeInfo[] {
	try {
		const parsed = parse(baseColor)
		if (!parsed) return []

		const shades: ShadeInfo[] = []
		const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
		const actualSteps = Math.min(steps, weights.length)

		const hsl = converter('hsl')(parsed)
		const originalLightness = hsl.l || 0.5
		const originalSaturation = hsl.s || 0
		const originalHue = hsl.h || 0

		// Check if this is an achromatic color (white, gray, black)
		const isAchromatic = originalSaturation < 0.05

		for (let i = 0; i < actualSteps; i++) {
			const weight = weights[i]
			let lightness: number
			let saturation: number = originalSaturation
			const hue: number = originalHue

			if (weight === 500) {
				// Use the original color for weight 500
				lightness = originalLightness
			} else if (weight < 500) {
				// Light shades: interpolate from 95% to original lightness
				const ratio = weight / 500
				lightness = 0.95 - ratio * (0.95 - originalLightness)

				if (isAchromatic) {
					// For achromatic colors, keep them achromatic
					saturation = 0
				} else {
					// Slightly reduce saturation for very light shades
					if (weight <= 100) {
						saturation = originalSaturation * 0.8
					}
				}
			} else {
				// Dark shades: more conservative darkening
				const ratio = (weight - 500) / 450 // 450 = 950 - 500

				if (isAchromatic) {
					// For achromatic colors (white, gray, black), just adjust lightness
					lightness = originalLightness * (1 - ratio * 0.9)
					saturation = 0
				} else {
					// For colored inputs, preserve color character
					let targetDarkness: number
					if (originalLightness > 0.7) {
						targetDarkness = Math.max(0.15, originalLightness * 0.2)
					} else if (originalLightness > 0.4) {
						targetDarkness = Math.max(
							0.12,
							originalLightness * 0.25
						)
					} else {
						targetDarkness = Math.max(0.08, originalLightness * 0.3)
					}

					lightness =
						originalLightness -
						ratio * (originalLightness - targetDarkness)

					// Boost saturation slightly for dark shades to maintain color vibrancy
					if (weight >= 700) {
						saturation = Math.min(
							1,
							originalSaturation * (1 + ratio * 0.2)
						)
					}
				}
			}

			const shade = {
				...hsl,
				h: hue,
				s: Math.max(0, Math.min(1, saturation)),
				l: Math.max(0.05, Math.min(0.95, lightness)),
			}

			const hexColor = formatHex(shade)
			shades.push({
				color: hexColor,
				weight,
				name: `${weight}`,
			})
		}

		return shades
	} catch (error) {
		console.error('Error generating shades:', error)
		return []
	}
}

/**
 * Generate tints and shades palette
 */
export function generateTintsAndShades(
	baseColor: string,
	steps: number = 9
): { tints: ShadeInfo[]; base: ShadeInfo; shades: ShadeInfo[] } {
	try {
		const parsed = parse(baseColor)
		if (!parsed)
			return {
				tints: [],
				base: { color: baseColor, weight: 500, name: 'base' },
				shades: [],
			}

		const hsl = converter('hsl')(parsed)
		const baseLightness = hsl.l || 0.5

		const tints: ShadeInfo[] = []
		const shades: ShadeInfo[] = []

		const halfSteps = Math.floor(steps / 2)

		// Generate tints (lighter versions)
		for (let i = 1; i <= halfSteps; i++) {
			const lightness =
				baseLightness + (1 - baseLightness) * (i / halfSteps)
			const tint = {
				...hsl,
				l: Math.min(0.95, lightness),
			}

			tints.unshift({
				color: formatHex(tint),
				weight: 500 - i * 100,
				name: `tint-${i}`,
			})
		}

		// Generate shades (darker versions)
		for (let i = 1; i <= halfSteps; i++) {
			const lightness = baseLightness - baseLightness * (i / halfSteps)
			const shade = {
				...hsl,
				l: Math.max(0.05, lightness),
			}

			shades.push({
				color: formatHex(shade),
				weight: 500 + i * 100,
				name: `shade-${i}`,
			})
		}

		return {
			tints,
			base: { color: baseColor, weight: 500, name: 'base' },
			shades,
		}
	} catch (error) {
		console.error('Error generating tints and shades:', error)
		return {
			tints: [],
			base: { color: baseColor, weight: 500, name: 'base' },
			shades: [],
		}
	}
}

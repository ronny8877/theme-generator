/**
 * Image Color Extraction Utilities
 * Extracts dominant colors from uploaded images for theme generation
 */

export interface ExtractedColor {
	hex: string
	rgb: [number, number, number]
	dominance: number // 0-1, how dominant this color is in the image
	count: number // number of pixels
}

export interface ImageColorAnalysis {
	dominantColors: ExtractedColor[]
	averageColor: string
	brightness: number // 0-1
	contrast: number // 0-1
	colorfulness: number // 0-1
}

/**
 * Extract colors from an image file using canvas analysis
 */
export async function extractColorsFromImage(
	file: File,
	maxColors: number = 10,
	quality: number = 10
): Promise<ImageColorAnalysis> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		const img = new Image()

		img.onload = () => {
			// Resize image for faster processing
			const maxSize = 200
			const scale = Math.min(maxSize / img.width, maxSize / img.height)
			canvas.width = img.width * scale
			canvas.height = img.height * scale

			if (!ctx) {
				reject(new Error('Canvas context not available'))
				return
			}

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

			try {
				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				)
				const analysis = analyzeImageData(imageData, maxColors, quality)
				resolve(analysis)
			} catch (error) {
				reject(error)
			}
		}

		img.onerror = () => reject(new Error('Failed to load image'))
		img.src = URL.createObjectURL(file)
	})
}

/**
 * Analyze image data to extract color information
 */
function analyzeImageData(
	imageData: ImageData,
	maxColors: number,
	quality: number
): ImageColorAnalysis {
	const data = imageData.data
	const colorMap = new Map<
		string,
		{ count: number; rgb: [number, number, number] }
	>()
	let totalPixels = 0
	let totalRed = 0
	let totalGreen = 0
	let totalBlue = 0
	let totalBrightness = 0

	// Sample pixels based on quality
	for (let i = 0; i < data.length; i += 4 * quality) {
		const r = data[i]
		const g = data[i + 1]
		const b = data[i + 2]
		const a = data[i + 3]

		// Skip transparent pixels
		if (a < 128) continue

		// Round colors to reduce noise
		const roundedR = Math.round(r / 16) * 16
		const roundedG = Math.round(g / 16) * 16
		const roundedB = Math.round(b / 16) * 16

		const colorKey = `${roundedR},${roundedG},${roundedB}`

		if (colorMap.has(colorKey)) {
			colorMap.get(colorKey)!.count++
		} else {
			colorMap.set(colorKey, {
				count: 1,
				rgb: [roundedR, roundedG, roundedB],
			})
		}

		totalRed += r
		totalGreen += g
		totalBlue += b
		totalBrightness += (r + g + b) / 3
		totalPixels++
	}

	if (totalPixels === 0) {
		throw new Error('No valid pixels found in image')
	}

	// Sort colors by frequency and get dominant ones
	const sortedColors = Array.from(colorMap.entries())
		.sort((a, b) => b[1].count - a[1].count)
		.slice(0, maxColors)

	const dominantColors: ExtractedColor[] = sortedColors.map((entry) => {
		const value = entry[1]
		const [r, g, b] = value.rgb
		return {
			hex: rgbToHex(r, g, b),
			rgb: [r, g, b],
			dominance: value.count / totalPixels,
			count: value.count,
		}
	})

	// Calculate average color
	const avgR = Math.round(totalRed / totalPixels)
	const avgG = Math.round(totalGreen / totalPixels)
	const avgB = Math.round(totalBlue / totalPixels)
	const averageColor = rgbToHex(avgR, avgG, avgB)

	// Calculate brightness (0-1)
	const brightness = totalBrightness / totalPixels / 255

	// Calculate contrast (difference between lightest and darkest)
	const brightnesses = dominantColors.map((color) => {
		const [r, g, b] = color.rgb
		return (r + g + b) / 3 / 255
	})
	const contrast = Math.max(...brightnesses) - Math.min(...brightnesses)

	// Calculate colorfulness (variance in hue)
	const hues = dominantColors.map((color) => rgbToHue(color.rgb))
	const colorfulness = calculateHueVariance(hues)

	return {
		dominantColors,
		averageColor,
		brightness,
		contrast,
		colorfulness,
	}
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Convert RGB to HSL and return hue
 */
function rgbToHue([r, g, b]: [number, number, number]): number {
	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0

	if (max !== min) {
		const delta = max - min
		switch (max) {
			case r:
				h = (g - b) / delta + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / delta + 2
				break
			case b:
				h = (r - g) / delta + 4
				break
		}
		h /= 6
	}

	return h * 360
}

/**
 * Calculate variance in hue values
 */
function calculateHueVariance(hues: number[]): number {
	if (hues.length < 2) return 0

	// Convert hues to unit vectors to handle circular nature
	const vectors = hues.map((hue) => {
		const rad = (hue * Math.PI) / 180
		return { x: Math.cos(rad), y: Math.sin(rad) }
	})

	// Calculate mean vector
	const meanX = vectors.reduce((sum, v) => sum + v.x, 0) / vectors.length
	const meanY = vectors.reduce((sum, v) => sum + v.y, 0) / vectors.length
	const meanLength = Math.sqrt(meanX * meanX + meanY * meanY)

	// Colorfulness is 1 - mean length (more spread = higher variance)
	return Math.max(0, 1 - meanLength)
}

import { ColorScheme, RadiusConfig, MiscConfig } from '@/store/nano-store'

/**
 * Generate a theme from extracted image colors
 */
export function generateThemeFromImageColors(
	analysis: ImageColorAnalysis,
	themeName: string = 'image-generated'
): {
	name: string
	id: string
	colors: ColorScheme
	radius: RadiusConfig
	misc: MiscConfig
} {
	const { dominantColors, brightness } = analysis

	if (dominantColors.length === 0) {
		throw new Error('No colors extracted from image')
	}

	// Assign colors to theme roles
	const primary = dominantColors[0].hex
	const secondary =
		dominantColors[1]?.hex || adjustColorBrightness(primary, 0.2)
	const accent = dominantColors[2]?.hex || adjustColorHue(primary, 60)

	// Choose base colors based on overall image brightness
	const isLightImage = brightness > 0.6
	const baseColors = isLightImage
		? {
				base100: '#ffffff',
				base200: '#f8f9fa',
				base300: '#e9ecef',
				baseContent: '#212529',
			}
		: {
				base100: '#1a1a1a',
				base200: '#2d2d2d',
				base300: '#404040',
				baseContent: '#ffffff',
			}

	// Generate neutral from primary with lower saturation
	const neutral = adjustColorSaturation(primary, -0.4)
	const neutralContent = isLightImage ? '#ffffff' : '#1a1a1a'

	const colors: ColorScheme = {
		'--color-primary': convertToOklch(primary),
		'--color-primary-content': getContrastingColor(primary),
		'--color-secondary': convertToOklch(secondary),
		'--color-secondary-content': getContrastingColor(secondary),
		'--color-accent': convertToOklch(accent),
		'--color-accent-content': getContrastingColor(accent),
		'--color-neutral': convertToOklch(neutral),
		'--color-neutral-content': convertToOklch(neutralContent),
		'--color-base-100': convertToOklch(baseColors.base100),
		'--color-base-200': convertToOklch(baseColors.base200),
		'--color-base-300': convertToOklch(baseColors.base300),
		'--color-base-content': convertToOklch(baseColors.baseContent),
		'--color-info': convertToOklch('#0ea5e9'),
		'--color-info-content': convertToOklch('#ffffff'),
		'--color-success': convertToOklch('#22c55e'),
		'--color-success-content': convertToOklch('#ffffff'),
		'--color-warning': convertToOklch('#eab308'),
		'--color-warning-content': convertToOklch('#000000'),
		'--color-error': convertToOklch('#ef4444'),
		'--color-error-content': convertToOklch('#ffffff'),
	}

	const radius: RadiusConfig = {
		'--radius-selector': '0.5rem',
		'--radius-field': '0.5rem',
		'--radius-box': '0.5rem',
	}

	const misc: MiscConfig = {
		'--size-selector': '0.25rem',
		'--size-field': '0.25rem',
		'--border': '1px',
		'--depth': 1,
		'--noise': 1,
	}

	return {
		name: themeName,
		id: themeName.toLowerCase().replace(/\s+/g, '-'),
		colors,
		radius,
		misc,
	}
}

/**
 * Helper functions for color manipulation
 */
function adjustColorBrightness(hex: string, amount: number): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return hex

	const [r, g, b] = rgb
	const newR = Math.max(0, Math.min(255, r + amount * 255))
	const newG = Math.max(0, Math.min(255, g + amount * 255))
	const newB = Math.max(0, Math.min(255, b + amount * 255))

	return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB))
}

function adjustColorHue(hex: string, hueDelta: number): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return hex

	const [r, g, b] = rgb
	const hsl = rgbToHsl(r, g, b)
	const newHue = (hsl[0] + hueDelta) % 360
	const newRgb = hslToRgb(newHue, hsl[1], hsl[2])

	return rgbToHex(
		Math.round(newRgb[0]),
		Math.round(newRgb[1]),
		Math.round(newRgb[2])
	)
}

function adjustColorSaturation(hex: string, amount: number): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return hex

	const [r, g, b] = rgb
	const hsl = rgbToHsl(r, g, b)
	const newSaturation = Math.max(0, Math.min(1, hsl[1] + amount))
	const newRgb = hslToRgb(hsl[0], newSaturation, hsl[2])

	return rgbToHex(
		Math.round(newRgb[0]),
		Math.round(newRgb[1]),
		Math.round(newRgb[2])
	)
}

function getContrastingColor(hex: string): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return '#ffffff'

	const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
	return brightness > 128 ? '#000000' : '#ffffff'
}

function convertToOklch(hex: string): string {
	// For now, return the hex value. In a real implementation,
	// you would convert to OKLCH color space for better color handling
	return hex
}

// Utility functions for color conversion
function hexToRgb(hex: string): [number, number, number] | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
			]
		: null
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0
	let s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const delta = max - min
		s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

		switch (max) {
			case r:
				h = (g - b) / delta + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / delta + 2
				break
			case b:
				h = (r - g) / delta + 4
				break
		}
		h /= 6
	}

	return [h * 360, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
	h /= 360

	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) t += 1
		if (t > 1) t -= 1
		if (t < 1 / 6) return p + (q - p) * 6 * t
		if (t < 1 / 2) return q
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
		return p
	}

	let r: number, g: number, b: number

	if (s === 0) {
		r = g = b = l // achromatic
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}

	return [r * 255, g * 255, b * 255]
}

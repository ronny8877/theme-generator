/**
 * Single Color Theme Generation Utilities
 * Generates complete, accessible themes from a single base color
 */

import { ColorScheme, RadiusConfig, MiscConfig } from '@/store/nano-store'
import { parse, formatHex, converter, wcagContrast } from 'culori'

export interface ThemeGenerationOptions {
	baseColor: string
	themeName: string
	brightness: 'auto' | 'light' | 'dark'
	saturationBoost: number // -1 to 1
	contrastLevel: 'AA' | 'AAA'
	harmonyType: 'monochromatic' | 'analogous' | 'complementary' | 'triadic'
}

export interface ThemeAnalysis {
	averageContrast: number
	accessibilityScore: number // 0-100
	colorHarmony: string
	suggestions: string[]
}

/**
 * Generate a complete theme from a single color with accessibility considerations
 */
export function generateSingleColorTheme(options: ThemeGenerationOptions): {
	name: string
	id: string
	colors: ColorScheme
	radius: RadiusConfig
	misc: MiscConfig
	analysis: ThemeAnalysis
} {
	const {
		baseColor,
		themeName,
		brightness,
		saturationBoost,
		contrastLevel,
		harmonyType,
	} = options

	const parsedBase = parse(baseColor)
	if (!parsedBase) {
		throw new Error('Invalid base color provided')
	}

	const hsl = converter('hsl')(parsedBase)
	if (!hsl) {
		throw new Error('Could not convert color to HSL')
	}

	// Determine if we should use light or dark theme
	const shouldUseDarkTheme =
		brightness === 'dark' || (brightness === 'auto' && hsl.l < 0.5)

	// Generate color variations using the harmony type
	const colorVariations = generateColorHarmony(
		baseColor,
		harmonyType,
		saturationBoost
	)

	// Assign roles based on color properties and accessibility requirements
	const primary = colorVariations.primary
	const secondary = colorVariations.secondary
	const accent = colorVariations.accent

	// Generate base colors with proper contrast
	const baseColors = generateBaseColors(shouldUseDarkTheme)

	// Generate semantic colors (info, success, warning, error)
	const semanticColors = generateSemanticColors(primary, shouldUseDarkTheme)

	// Ensure all content colors meet accessibility requirements
	const contentColors = generateContentColors(
		{ primary, secondary, accent, ...semanticColors, ...baseColors },
		contrastLevel
	)

	const colors: ColorScheme = {
		'--color-primary': convertToOklch(primary),
		'--color-primary-content': convertToOklch(contentColors.primaryContent),
		'--color-secondary': convertToOklch(secondary),
		'--color-secondary-content': convertToOklch(
			contentColors.secondaryContent
		),
		'--color-accent': convertToOklch(accent),
		'--color-accent-content': convertToOklch(contentColors.accentContent),
		'--color-neutral': convertToOklch(colorVariations.neutral),
		'--color-neutral-content': convertToOklch(contentColors.neutralContent),
		'--color-base-100': convertToOklch(baseColors.base100),
		'--color-base-200': convertToOklch(baseColors.base200),
		'--color-base-300': convertToOklch(baseColors.base300),
		'--color-base-content': convertToOklch(contentColors.baseContent),
		'--color-info': convertToOklch(semanticColors.info),
		'--color-info-content': convertToOklch(contentColors.infoContent),
		'--color-success': convertToOklch(semanticColors.success),
		'--color-success-content': convertToOklch(contentColors.successContent),
		'--color-warning': convertToOklch(semanticColors.warning),
		'--color-warning-content': convertToOklch(contentColors.warningContent),
		'--color-error': convertToOklch(semanticColors.error),
		'--color-error-content': convertToOklch(contentColors.errorContent),
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

	// Analyze the generated theme
	const analysis = analyzeTheme(colors)

	return {
		name: themeName,
		id: themeName.toLowerCase().replace(/\s+/g, '-'),
		colors,
		radius,
		misc,
		analysis,
	}
}

/**
 * Generate color harmony variations based on color theory
 */
function generateColorHarmony(
	baseColor: string,
	harmonyType: string,
	saturationBoost: number
) {
	const hsl = converter('hsl')(parse(baseColor)!)
	const adjustedSaturation = Math.max(
		0,
		Math.min(1, (hsl.s || 0) + saturationBoost)
	)
	const baseHue = hsl.h || 0

	let primary, secondary, accent, neutral

	switch (harmonyType) {
		case 'monochromatic':
			primary = formatHex({ ...hsl, s: adjustedSaturation })
			secondary = formatHex({
				...hsl,
				s: adjustedSaturation * 0.7,
				l: Math.min(0.9, (hsl.l || 0) + 0.2),
			})
			accent = formatHex({
				...hsl,
				s: adjustedSaturation * 1.2,
				l: Math.max(0.1, (hsl.l || 0) - 0.2),
			})
			neutral = formatHex({ ...hsl, s: adjustedSaturation * 0.3, l: 0.5 })
			break

		case 'analogous':
			primary = formatHex({ ...hsl, s: adjustedSaturation })
			secondary = formatHex({
				...hsl,
				h: (baseHue + 30) % 360,
				s: adjustedSaturation * 0.8,
			})
			accent = formatHex({
				...hsl,
				h: (baseHue - 30 + 360) % 360,
				s: adjustedSaturation * 0.9,
			})
			neutral = formatHex({ ...hsl, s: adjustedSaturation * 0.2, l: 0.6 })
			break

		case 'complementary':
			primary = formatHex({ ...hsl, s: adjustedSaturation })
			secondary = formatHex({
				...hsl,
				h: (baseHue + 180) % 360,
				s: adjustedSaturation * 0.7,
			})
			accent = formatHex({
				...hsl,
				h: (baseHue + 150) % 360,
				s: adjustedSaturation * 0.8,
			})
			neutral = formatHex({ ...hsl, s: adjustedSaturation * 0.3, l: 0.5 })
			break

		case 'triadic':
			primary = formatHex({ ...hsl, s: adjustedSaturation })
			secondary = formatHex({
				...hsl,
				h: (baseHue + 120) % 360,
				s: adjustedSaturation * 0.8,
			})
			accent = formatHex({
				...hsl,
				h: (baseHue + 240) % 360,
				s: adjustedSaturation * 0.8,
			})
			neutral = formatHex({
				...hsl,
				s: adjustedSaturation * 0.25,
				l: 0.55,
			})
			break

		default:
			primary = baseColor
			secondary = formatHex({
				...hsl,
				s: adjustedSaturation * 0.7,
				l: (hsl.l || 0) + 0.1,
			})
			accent = formatHex({
				...hsl,
				s: adjustedSaturation * 0.9,
				l: (hsl.l || 0) - 0.1,
			})
			neutral = formatHex({ ...hsl, s: adjustedSaturation * 0.3, l: 0.5 })
	}

	return { primary, secondary, accent, neutral }
}

/**
 * Generate appropriate base colors for light or dark theme
 */
function generateBaseColors(isDark: boolean) {
	if (isDark) {
		return {
			base100: '#0f0f0f',
			base200: '#1a1a1a',
			base300: '#2d2d2d',
		}
	} else {
		return {
			base100: '#ffffff',
			base200: '#f8f9fa',
			base300: '#e9ecef',
		}
	}
}

/**
 * Generate semantic colors that work well with the base color
 */
function generateSemanticColors(baseColor: string, isDark: boolean) {
	return {
		info: formatHex({ mode: 'hsl', h: 200, s: 0.8, l: isDark ? 0.6 : 0.5 }),
		success: formatHex({
			mode: 'hsl',
			h: 120,
			s: 0.7,
			l: isDark ? 0.6 : 0.5,
		}),
		warning: formatHex({
			mode: 'hsl',
			h: 45,
			s: 0.9,
			l: isDark ? 0.7 : 0.6,
		}),
		error: formatHex({ mode: 'hsl', h: 0, s: 0.8, l: isDark ? 0.6 : 0.5 }),
	}
}

/**
 * Generate content colors that meet accessibility requirements
 */
function generateContentColors(
	colors: Record<string, string>,
	contrastLevel: 'AA' | 'AAA'
): Record<string, string> {
	const targetRatio = contrastLevel === 'AAA' ? 7 : 4.5

	const contentColors: Record<string, string> = {}

	Object.entries(colors).forEach(([key, bgColor]) => {
		const contentKey = key
			.replace(/([A-Z])/g, 'Content$1')
			.replace(/^([a-z])/, (match) => match.toLowerCase())

		// Try white first
		let whiteContrast = 0
		let blackContrast = 0

		try {
			whiteContrast = wcagContrast('#ffffff', bgColor) || 0
			blackContrast = wcagContrast('#000000', bgColor) || 0
		} catch {
			console.warn(`Could not calculate contrast for ${bgColor}`)
		}

		if (whiteContrast >= targetRatio) {
			contentColors[contentKey] = '#ffffff'
		} else if (blackContrast >= targetRatio) {
			contentColors[contentKey] = '#000000'
		} else {
			// Generate a color that meets the contrast requirement
			contentColors[contentKey] = generateAccessibleContentColor(
				bgColor,
				targetRatio
			)
		}
	})

	return contentColors
}

/**
 * Generate a content color that meets the specified contrast ratio
 */
function generateAccessibleContentColor(
	backgroundColor: string,
	targetRatio: number
): string {
	const bgHsl = converter('hsl')(parse(backgroundColor)!)

	// Try adjusting lightness to achieve target contrast
	for (let lightness = 0; lightness <= 1; lightness += 0.05) {
		const testColor = formatHex({ ...bgHsl, l: lightness })
		const contrast = wcagContrast(testColor, backgroundColor) || 0

		if (contrast >= targetRatio) {
			return testColor
		}
	}

	// Fallback to black or white
	const whiteContrast = wcagContrast('#ffffff', backgroundColor) || 0
	const blackContrast = wcagContrast('#000000', backgroundColor) || 0

	return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

/**
 * Analyze the generated theme for quality metrics
 */
function analyzeTheme(colors: ColorScheme): ThemeAnalysis {
	const colorEntries = Object.entries(colors)
	const backgroundColors = colorEntries.filter(
		([key]) => !key.includes('content')
	)

	let totalContrast = 0
	let contrastPairs = 0
	let accessibilityCount = 0

	// Calculate average contrast and accessibility score
	backgroundColors.forEach(([bgKey, bgColor]) => {
		const contentKey = bgKey.replace(/^--color-/, '--color-') + '-content'
		const contentColor = colors[contentKey as keyof ColorScheme]

		if (contentColor) {
			try {
				const contrast = wcagContrast(bgColor, contentColor) || 0
				totalContrast += contrast
				contrastPairs++

				if (contrast >= 4.5) accessibilityCount++
			} catch {
				console.warn(
					`Could not calculate contrast between ${bgColor} and ${contentColor}`
				)
			}
		}
	})

	const averageContrast =
		contrastPairs > 0 ? totalContrast / contrastPairs : 0
	const accessibilityScore =
		contrastPairs > 0 ? (accessibilityCount / contrastPairs) * 100 : 0

	// Generate suggestions
	const suggestions: string[] = []
	if (averageContrast < 4.5) {
		suggestions.push(
			'Consider increasing contrast between background and text colors'
		)
	}
	if (accessibilityScore < 80) {
		suggestions.push(
			'Some color combinations may not meet WCAG AA standards'
		)
	}
	if (averageContrast > 15) {
		suggestions.push(
			'Very high contrast - consider slightly reducing for better visual comfort'
		)
	}

	return {
		averageContrast,
		accessibilityScore,
		colorHarmony: 'Generated based on color theory principles',
		suggestions,
	}
}

/**
 * Convert color to OKLCH format (simplified - returns hex for now)
 */
function convertToOklch(color: string): string {
	// For now, return the hex color
	// In a real implementation, you would convert to OKLCH color space
	return color
}

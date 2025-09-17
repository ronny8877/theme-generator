'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Plus, Minus, Shuffle, Palette, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import {
	generateSingleColorTheme,
	type ThemeGenerationOptions,
} from '@/lib/single-color-theme-generation'
import { updateThemeColor } from '@/store/nano-store'

interface ColorEntry {
	id: string
	color: string
}

const RANDOM_COLORS = [
	'#FF6B6B',
	'#4ECDC4',
	'#45B7D1',
	'#96CEB4',
	'#FECA57',
	'#6C5CE7',
	'#A29BFE',
	'#FD79A8',
	'#FDCB6E',
	'#00B894',
	'#E17055',
	'#74B9FF',
	'#00CEC9',
	'#B2BEC3',
	'#DDA0DD',
	'#F39C12',
	'#E74C3C',
	'#9B59B6',
	'#3498DB',
	'#1ABC9C',
	'#2ECC71',
	'#F1C40F',
	'#E67E22',
	'#34495E',
	'#95A5A6',
]

export function MultiColorPaletteGenerator() {
	const [colors, setColors] = useState<ColorEntry[]>([
		{ id: '1', color: '#3B82F6' },
	])
	const [isGenerating, setIsGenerating] = useState(false)
	const [lastAppliedColors, setLastAppliedColors] = useState<string[]>([])

	const generateRandomColor = () => {
		return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
	}

	const addColor = () => {
		if (colors.length < 3) {
			setColors([
				...colors,
				{
					id: Date.now().toString(),
					color: generateRandomColor(),
				},
			])
		}
	}

	const removeColor = (id: string) => {
		if (colors.length > 1) {
			setColors(colors.filter((c) => c.id !== id))
		}
	}

	const updateColor = (id: string, newColor: string) => {
		setColors(
			colors.map((c) => (c.id === id ? { ...c, color: newColor } : c))
		)
	}

	const randomizeAllColors = () => {
		const newColors = colors.map((c) => ({
			...c,
			color: generateRandomColor(),
		}))
		setColors(newColors)
		toast.success('Colors randomized!')
	}

	const generateAndApplyTheme = useCallback(async () => {
		setIsGenerating(true)

		try {
			const colorValues = colors.map((c) => c.color)

			// Use the first color as the primary base for theme generation
			const primaryColor = colorValues[0]

			// Generate theme using single color generator
			const options: ThemeGenerationOptions = {
				baseColor: primaryColor,
				themeName: `Multi Color Theme`,
				brightness: 'auto',
				saturationBoost: 0.1,
				contrastLevel: 'AA',
				harmonyType: 'complementary',
			}

			const baseTheme = generateSingleColorTheme(options)

			// Enhance the theme with additional colors
			const enhancedColors = { ...baseTheme.colors }

			if (colorValues.length >= 2) {
				enhancedColors['--color-secondary'] = colorValues[1]
				// Generate appropriate content color
				enhancedColors['--color-secondary-content'] = '#ffffff'
			}

			if (colorValues.length >= 3) {
				enhancedColors['--color-accent'] = colorValues[2]
				enhancedColors['--color-accent-content'] = '#ffffff'
			}

			// Apply the enhanced theme by updating individual colors
			Object.entries(enhancedColors).forEach(([key, value]) => {
				updateThemeColor(key as keyof typeof enhancedColors, value)
			})
			setLastAppliedColors(colorValues)

			toast.success('Multi-color theme applied!', {
				description: `Generated from ${colorValues.length} color${colorValues.length > 1 ? 's' : ''}`,
			})
		} catch (error) {
			console.error('Error generating multi-color theme:', error)
			toast.error(
				'Failed to generate theme. Please try different colors.'
			)
		} finally {
			setIsGenerating(false)
		}
	}, [colors])

	// Auto-apply when colors change (debounced)
	useEffect(() => {
		const currentColors = colors.map((c) => c.color)
		const hasChanged =
			JSON.stringify(currentColors) !== JSON.stringify(lastAppliedColors)

		if (hasChanged && colors.length > 0) {
			const timeoutId = setTimeout(() => {
				generateAndApplyTheme()
			}, 500)

			return () => clearTimeout(timeoutId)
		}
	}, [colors, lastAppliedColors, generateAndApplyTheme])

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Palette className="w-5 h-5 text-primary" />
					<div>
						<div className="font-semibold">Multi-Color Palette</div>
						<div className="text-xs text-base-content/70">
							Generate theme from 1-3 colors
						</div>
					</div>
				</div>
				<Button
					onClick={randomizeAllColors}
					size="sm"
					variant="outline"
					className="gap-2"
				>
					<Shuffle className="w-4 h-4" />
					Random
				</Button>
			</div>

			{/* Color Pickers */}
			<div className="space-y-3">
				{colors.map((colorEntry, index) => (
					<div
						key={colorEntry.id}
						className="flex items-center gap-3"
					>
						<div className="flex items-center gap-2 flex-1">
							<div className="text-sm font-medium w-16">
								Color {index + 1}
							</div>
							<ColorPicker
								value={colorEntry.color}
								onChange={(newColor) =>
									updateColor(colorEntry.id, newColor)
								}
								className="flex-1"
							/>
						</div>

						{/* Remove button (only show if more than 1 color) */}
						{colors.length > 1 && (
							<Button
								onClick={() => removeColor(colorEntry.id)}
								size="sm"
								variant="ghost"
								className="w-8 h-8 p-0"
							>
								<Minus className="w-4 h-4" />
							</Button>
						)}
					</div>
				))}
			</div>

			{/* Add/Remove Controls */}
			<div className="flex items-center justify-between">
				<Button
					onClick={addColor}
					disabled={colors.length >= 3}
					size="sm"
					variant="outline"
					className="gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Color{' '}
					{colors.length < 3 && `(${3 - colors.length} left)`}
				</Button>

				<Button
					onClick={generateAndApplyTheme}
					disabled={isGenerating}
					size="sm"
					className="gap-2"
				>
					{isGenerating ? (
						<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
					) : (
						<Wand2 className="w-4 h-4" />
					)}
					Apply Theme
				</Button>
			</div>

			{/* Color Preview */}
			<div className="flex gap-2">
				{colors.map((colorEntry) => (
					<div
						key={colorEntry.id}
						className="flex-1 h-12 rounded-lg border-2 border-base-300 relative overflow-hidden"
						style={{ backgroundColor: colorEntry.color }}
					>
						<div className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-1 rounded">
							{colorEntry.color}
						</div>
					</div>
				))}
				{/* Fill remaining slots with empty placeholders */}
				{Array.from({ length: 3 - colors.length }).map((_, index) => (
					<div
						key={`empty-${index}`}
						className="flex-1 h-12 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center text-base-content/50"
					>
						<Plus className="w-5 h-5" />
					</div>
				))}
			</div>

			{/* Usage hint */}
			<div className="text-xs text-base-content/60 bg-base-200 p-2 rounded-lg">
				💡 Tip: Start with 1-2 colors for better harmony. The first
				color becomes primary, second becomes secondary, third becomes
				accent.
			</div>
		</div>
	)
}

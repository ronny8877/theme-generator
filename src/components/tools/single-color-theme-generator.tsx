'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import {
	Palette,
	Wand2,
	Eye,
	Settings,
	Copy,
	RefreshCw,
	TrendingUp,
	CheckCircle,
	AlertCircle,
	ChevronDown,
	BarChart3,
} from 'lucide-react'
import { toast } from 'sonner'
import {
	generateSingleColorTheme,
	type ThemeGenerationOptions,
	type ThemeAnalysis,
} from '@/lib/single-color-theme-generation'
import { convertColor } from '@/lib/color-utils'
import {
	$themeColors,
	$themeRadius,
	$themeMisc,
	type ColorScheme,
	type RadiusConfig,
	type MiscConfig,
} from '@/store/nano-store'

interface GeneratedTheme {
	name: string
	id: string
	colors: ColorScheme
	radius: RadiusConfig
	misc: MiscConfig
	analysis: ThemeAnalysis
}

interface SingleColorThemeGeneratorProps {
	onThemeGenerated?: (theme: GeneratedTheme) => void
	className?: string
}

export function SingleColorThemeGenerator({
	onThemeGenerated,
	className,
}: SingleColorThemeGeneratorProps) {
	const [baseColor, setBaseColor] = useState('#3B82F6')
	const [themeName, setThemeName] = useState('single-color-theme')
	const [isGenerating, setIsGenerating] = useState(false)
	const [generatedTheme, setGeneratedTheme] = useState<GeneratedTheme | null>(
		null
	)
	const [showAdvanced, setShowAdvanced] = useState(false)

	// Advanced options
	const [brightness, setBrightness] = useState<'auto' | 'light' | 'dark'>(
		'auto'
	)
	const [saturationBoost, setSaturationBoost] = useState(0)
	const [contrastLevel, setContrastLevel] = useState<'AA' | 'AAA'>('AA')
	const [harmonyType, setHarmonyType] = useState<
		'monochromatic' | 'analogous' | 'complementary' | 'triadic'
	>('analogous')

	const handleGenerateTheme = useCallback(async () => {
		setIsGenerating(true)

		try {
			const options: ThemeGenerationOptions = {
				baseColor,
				themeName,
				brightness,
				saturationBoost,
				contrastLevel,
				harmonyType,
			}

			const theme = generateSingleColorTheme(options)
			setGeneratedTheme(theme)

			toast.success(`Theme "${themeName}" generated successfully!`)
		} catch (error) {
			console.error('Error generating theme:', error)
			toast.error(
				'Failed to generate theme. Please try a different color.'
			)
		} finally {
			setIsGenerating(false)
		}
	}, [
		baseColor,
		themeName,
		brightness,
		saturationBoost,
		contrastLevel,
		harmonyType,
	])

	// Auto-generate when base color changes
	useEffect(() => {
		if (baseColor) {
			handleGenerateTheme()
		}
	}, [
		baseColor,
		brightness,
		saturationBoost,
		contrastLevel,
		harmonyType,
		themeName,
		handleGenerateTheme,
	])

	const handleApplyTheme = () => {
		if (!generatedTheme) {
			toast.error('No theme to apply')
			return
		}

		try {
			// Apply theme to store
			$themeColors.set(generatedTheme.colors)
			$themeRadius.set(generatedTheme.radius)
			$themeMisc.set(generatedTheme.misc)

			toast.success(`Theme "${generatedTheme.name}" applied!`)

			if (onThemeGenerated) {
				onThemeGenerated(generatedTheme)
			}
		} catch (error) {
			console.error('Error applying theme:', error)
			toast.error('Failed to apply theme')
		}
	}

	const copyColorsToClipboard = () => {
		if (!generatedTheme) return

		const colorsList = Object.entries(generatedTheme.colors)
			.filter(([key]) => !key.includes('content'))
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n')

		navigator.clipboard.writeText(colorsList)
		toast.success('Color palette copied to clipboard')
	}

	const resetToDefaults = () => {
		setBaseColor('#3B82F6')
		setThemeName('single-color-theme')
		setBrightness('auto')
		setSaturationBoost(0)
		setContrastLevel('AA')
		setHarmonyType('analogous')
		setGeneratedTheme(null)
	}

	const colorInfo = convertColor(baseColor)

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header */}
			<div className="card bg-base-100 shadow-lg">
				<div className="card-body">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="card-title text-2xl flex items-center gap-2">
								<Wand2 className="h-6 w-6" />
								Single Color Theme Generator
							</h2>
							<p className="text-base-content/70 mt-2">
								Generate a complete, accessible theme from just
								one color
							</p>
						</div>
						<Button
							onClick={resetToDefaults}
							className="btn-outline"
						>
							<RefreshCw className="h-4 w-4 mr-2" />
							Reset
						</Button>
					</div>
				</div>
			</div>

			{/* Main Controls */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Color Input */}
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<h3 className="card-title text-lg mb-4">Base Color</h3>
						<div className="space-y-4">
							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Choose your base color
									</span>
								</label>
								<ColorPicker
									value={baseColor}
									onChange={setBaseColor}
									placeholder="Pick a color to generate theme from..."
								/>
							</div>

							{colorInfo && (
								<div className="text-sm text-base-content/70 space-y-1">
									<div>Hex: {colorInfo.hex}</div>
									<div>HSL: {colorInfo.hsl}</div>
									{colorInfo.name && (
										<div>Name: {colorInfo.name}</div>
									)}
								</div>
							)}

							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Theme Name
									</span>
								</label>
								<input
									type="text"
									value={themeName}
									onChange={(e) =>
										setThemeName(e.target.value)
									}
									placeholder="Enter theme name"
									className="input input-bordered w-full"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Preview */}
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<h3 className="card-title text-lg mb-4">
							Live Preview
						</h3>
						{generatedTheme ? (
							<div className="space-y-4">
								<div className="grid grid-cols-4 gap-2">
									{Object.entries(generatedTheme.colors)
										.filter(
											([key]) => !key.includes('content')
										)
										.slice(0, 8)
										.map(([key, value]) => (
											<div
												key={key}
												className="text-center"
											>
												<div
													className="w-full h-12 rounded border border-base-300 mb-1"
													style={{
														backgroundColor: value,
													}}
												/>
												<div className="text-xs text-base-content/50 truncate">
													{key.replace(
														'--color-',
														''
													)}
												</div>
											</div>
										))}
								</div>

								{generatedTheme.analysis && (
									<div className="bg-base-200 rounded-lg p-4 space-y-2">
										<div className="flex items-center gap-2 text-sm">
											<BarChart3 className="h-4 w-4" />
											<span className="font-semibold">
												Theme Analysis
											</span>
										</div>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<div className="text-base-content/70">
													Avg Contrast
												</div>
												<div className="font-medium">
													{generatedTheme.analysis.averageContrast.toFixed(
														1
													)}
													:1
												</div>
											</div>
											<div>
												<div className="text-base-content/70">
													Accessibility
												</div>
												<div className="flex items-center gap-1">
													{generatedTheme.analysis
														.accessibilityScore >=
													80 ? (
														<CheckCircle className="h-4 w-4 text-success" />
													) : (
														<AlertCircle className="h-4 w-4 text-warning" />
													)}
													<span className="font-medium">
														{Math.round(
															generatedTheme
																.analysis
																.accessibilityScore
														)}
														%
													</span>
												</div>
											</div>
										</div>
										{generatedTheme.analysis.suggestions
											.length > 0 && (
											<div className="text-xs text-base-content/60">
												{
													generatedTheme.analysis
														.suggestions[0]
												}
											</div>
										)}
									</div>
								)}
							</div>
						) : (
							<div className="text-center text-base-content/50 py-8">
								<Palette className="h-12 w-12 mx-auto mb-2 opacity-50" />
								<p>
									Choose a base color to see the generated
									theme
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Advanced Settings */}
			<div className="card bg-base-100 shadow-lg">
				<div className="card-body">
					<div
						className="cursor-pointer flex items-center gap-2"
						onClick={() => setShowAdvanced(!showAdvanced)}
					>
						<Settings className="h-4 w-4" />
						<span className="font-semibold">Advanced Settings</span>
						<ChevronDown
							className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
						/>
					</div>

					{showAdvanced && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Theme Brightness
									</span>
								</label>
								<select
									value={brightness}
									onChange={(e) =>
										setBrightness(
											e.target.value as
												| 'auto'
												| 'light'
												| 'dark'
										)
									}
									className="select select-bordered w-full"
								>
									<option value="auto">
										Auto (detect from color)
									</option>
									<option value="light">
										Force Light Theme
									</option>
									<option value="dark">
										Force Dark Theme
									</option>
								</select>
							</div>

							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Color Harmony
									</span>
								</label>
								<select
									value={harmonyType}
									onChange={(e) =>
										setHarmonyType(
											e.target.value as
												| 'monochromatic'
												| 'analogous'
												| 'complementary'
												| 'triadic'
										)
									}
									className="select select-bordered w-full"
								>
									<option value="monochromatic">
										Monochromatic
									</option>
									<option value="analogous">Analogous</option>
									<option value="complementary">
										Complementary
									</option>
									<option value="triadic">Triadic</option>
								</select>
							</div>

							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Saturation Boost
									</span>
								</label>
								<input
									type="range"
									min="-0.5"
									max="0.5"
									step="0.1"
									value={saturationBoost}
									onChange={(e) =>
										setSaturationBoost(
											Number(e.target.value)
										)
									}
									className="range range-primary w-full"
								/>
								<div className="w-full flex justify-between text-xs px-2 text-base-content/50">
									<span>Muted</span>
									<span>
										Current:{' '}
										{saturationBoost > 0 ? '+' : ''}
										{(saturationBoost * 100).toFixed(0)}%
									</span>
									<span>Vibrant</span>
								</div>
							</div>

							<div>
								<label className="label">
									<span className="label-text font-semibold">
										Accessibility Level
									</span>
								</label>
								<select
									value={contrastLevel}
									onChange={(e) =>
										setContrastLevel(
											e.target.value as 'AA' | 'AAA'
										)
									}
									className="select select-bordered w-full"
								>
									<option value="AA">WCAG AA (4.5:1)</option>
									<option value="AAA">WCAG AAA (7:1)</option>
								</select>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Actions */}
			{generatedTheme && (
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<div className="flex gap-3">
							<Button
								onClick={handleApplyTheme}
								className="btn-primary flex-1"
								disabled={isGenerating}
							>
								<Eye className="h-4 w-4 mr-2" />
								Apply Theme
							</Button>

							<Button
								onClick={copyColorsToClipboard}
								className="btn-outline"
							>
								<Copy className="h-4 w-4" />
							</Button>

							<Button
								onClick={handleGenerateTheme}
								className="btn-outline"
								disabled={isGenerating}
							>
								<TrendingUp className="h-4 w-4 mr-2" />
								Regenerate
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

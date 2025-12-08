'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
	Upload,
	Image as ImageIcon,
	Palette,
	Copy,
	RefreshCw,
	Sparkles,
	Settings,
	Check,
	X,
	ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import {
	extractColorsFromImage,
	generateThemeFromImageColors,
	type ImageColorAnalysis,
	type ExtractedColor,
} from '@/lib/image-color-extraction'
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
}

interface ImageColorPickerToolProps {
	onThemeGenerated?: (theme: GeneratedTheme) => void
	className?: string
}

export function ImageColorPickerTool({
	onThemeGenerated,
	className,
}: ImageColorPickerToolProps) {
	const [isProcessing, setIsProcessing] = useState(false)
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [analysis, setAnalysis] = useState<ImageColorAnalysis | null>(null)
	const [selectedColors, setSelectedColors] = useState<ExtractedColor[]>([])
	const [themeName, setThemeName] = useState('image-theme')
	const [maxColors, setMaxColors] = useState(8)
	const [quality, setQuality] = useState(10)
	const [showAdvanced, setShowAdvanced] = useState(false)

	const handleFileUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (!file) return

			// Validate file type
			if (!file.type.startsWith('image/')) {
				toast.error('Please upload a valid image file')
				return
			}

			// Validate file size (max 10MB)
			if (file.size > 10 * 1024 * 1024) {
				toast.error('Image file must be smaller than 10MB')
				return
			}

			setUploadedImage(file)
			setImagePreview(URL.createObjectURL(file))

			// Start processing
			setIsProcessing(true)
			try {
				const colorAnalysis = await extractColorsFromImage(
					file,
					maxColors,
					quality
				)
				setAnalysis(colorAnalysis)

				// Auto-select top colors based on dominance
				const autoSelected = colorAnalysis.dominantColors
					.filter((color) => color.dominance > 0.01) // At least 1% dominance
					.slice(0, 5)
				setSelectedColors(autoSelected)

				toast.success(
					`Extracted ${colorAnalysis.dominantColors.length} colors from image`
				)
			} catch (error) {
				console.error('Error processing image:', error)
				toast.error(
					'Failed to process image. Please try another image.'
				)
			} finally {
				setIsProcessing(false)
			}
		},
		[maxColors, quality]
	)

	const handleColorToggle = (color: ExtractedColor) => {
		setSelectedColors((prev) => {
			const isSelected = prev.some((c) => c.hex === color.hex)
			if (isSelected) {
				return prev.filter((c) => c.hex !== color.hex)
			} else {
				return [...prev, color]
			}
		})
	}

	const generateTheme = async () => {
		if (!analysis || selectedColors.length === 0) {
			toast.error('Please select at least one color')
			return
		}

		try {
			// Create a modified analysis with only selected colors
			const modifiedAnalysis: ImageColorAnalysis = {
				...analysis,
				dominantColors: selectedColors,
			}

			const generatedTheme = generateThemeFromImageColors(
				modifiedAnalysis,
				themeName
			)

			// Apply theme to store
			$themeColors.set(generatedTheme.colors)
			$themeRadius.set(generatedTheme.radius)
			$themeMisc.set(generatedTheme.misc)

			toast.success(`Theme "${themeName}" generated from image!`)

			if (onThemeGenerated) {
				onThemeGenerated(generatedTheme)
			}
		} catch (error) {
			console.error('Error generating theme:', error)
			toast.error('Failed to generate theme')
		}
	}

	const copyColorToClipboard = (color: string) => {
		navigator.clipboard.writeText(color)
		toast.success('Color copied to clipboard')
	}

	const resetTool = () => {
		setUploadedImage(null)
		setImagePreview(null)
		setAnalysis(null)
		setSelectedColors([])
		setThemeName('image-theme')
		if (imagePreview) {
			URL.revokeObjectURL(imagePreview)
		}
	}

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header */}
			<div className="card bg-base-100 shadow-lg">
				<div className="card-body">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="card-title text-2xl flex items-center gap-2">
								<ImageIcon className="h-6 w-6" />
								Image Color Picker
							</h2>
							<p className="text-base-content/70 mt-2">
								Upload an image to extract colors and generate a
								custom theme
							</p>
						</div>
						{uploadedImage && (
							<Button onClick={resetTool} className="btn-outline">
								<RefreshCw className="h-4 w-4 mr-2" />
								Reset
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Upload Area */}
			{!uploadedImage && (
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
							<Upload className="h-12 w-12 mx-auto mb-4 text-base-content/50" />
							<h3 className="text-lg font-semibold mb-2">
								Upload an image
							</h3>
							<p className="text-base-content/70 mb-4">
								Choose an image file to extract colors from
							</p>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileUpload}
								className="file-input file-input-bordered file-input-primary w-full max-w-xs"
							/>
							<p className="text-sm text-base-content/50 mt-2">
								Supports PNG, JPG, JPEG, WebP, GIF, BMP (max
								10MB)
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Advanced Settings */}
			{!uploadedImage && (
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<div
							className="cursor-pointer flex items-center gap-2"
							onClick={() => setShowAdvanced(!showAdvanced)}
						>
							<Settings className="h-4 w-4" />
							<span className="font-semibold">
								Advanced Settings
							</span>
							<ChevronDown
								className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
							/>
						</div>
						{showAdvanced && (
							<div className="space-y-4 mt-4">
								<div>
									<label className="label">
										<span className="label-text font-semibold">
											Maximum Colors to Extract
										</span>
									</label>
									<input
										type="range"
										min="5"
										max="20"
										value={maxColors}
										onChange={(e) =>
											setMaxColors(Number(e.target.value))
										}
										className="range range-primary w-full"
									/>
									<div className="w-full flex justify-between text-xs px-2 text-base-content/50">
										<span>5</span>
										<span>Current: {maxColors}</span>
										<span>20</span>
									</div>
								</div>
								<div>
									<label className="label">
										<span className="label-text font-semibold">
											Processing Quality
										</span>
									</label>
									<input
										type="range"
										min="5"
										max="20"
										step="5"
										value={quality}
										onChange={(e) =>
											setQuality(Number(e.target.value))
										}
										className="range range-primary w-full"
									/>
									<div className="w-full flex justify-between text-xs px-2 text-base-content/50">
										<span>Fast</span>
										<span>
											Current:{' '}
											{quality === 5
												? 'High'
												: quality === 10
													? 'Medium'
													: 'Fast'}
										</span>
										<span>High</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Processing */}
			{isProcessing && (
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<div className="text-center space-y-4">
							<Sparkles className="h-8 w-8 mx-auto animate-pulse text-primary" />
							<h3 className="font-semibold">Processing Image</h3>
							<p className="text-base-content/70">
								Analyzing colors and extracting dominant
								palette...
							</p>
							<progress className="progress progress-primary w-full"></progress>
						</div>
					</div>
				</div>
			)}

			{/* Image Preview & Analysis */}
			{imagePreview && analysis && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Image Preview */}
					<div className="card bg-base-100 shadow-lg">
						<div className="card-body">
							<h3 className="card-title text-lg">
								Uploaded Image
							</h3>
							<div className="space-y-4">
								<img
									src={imagePreview}
									alt="Uploaded"
									className="w-full h-48 object-cover rounded-lg border"
								/>
								<div className="grid grid-cols-3 gap-2 text-sm">
									<div>
										<p className="text-base-content/70">
											Brightness
										</p>
										<p className="font-medium">
											{Math.round(
												analysis.brightness * 100
											)}
											%
										</p>
									</div>
									<div>
										<p className="text-base-content/70">
											Contrast
										</p>
										<p className="font-medium">
											{Math.round(
												analysis.contrast * 100
											)}
											%
										</p>
									</div>
									<div>
										<p className="text-base-content/70">
											Colorfulness
										</p>
										<p className="font-medium">
											{Math.round(
												analysis.colorfulness * 100
											)}
											%
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Color Analysis */}
					<div className="card bg-base-100 shadow-lg">
						<div className="card-body">
							<h3 className="card-title text-lg">
								Extracted Colors
							</h3>
							<p className="text-base-content/70 mb-4">
								Click colors to select/deselect for theme
								generation
							</p>
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-2">
									{analysis.dominantColors.map(
										(color, index) => {
											const isSelected =
												selectedColors.some(
													(c) => c.hex === color.hex
												)
											const colorInfo = convertColor(
												color.hex
											)

											return (
												<div
													key={`${color.hex}-${index}`}
													className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
														isSelected
															? 'ring-2 ring-primary border-primary'
															: 'border-base-300 hover:border-primary/50'
													}`}
													onClick={() =>
														handleColorToggle(color)
													}
												>
													<div className="flex items-center gap-2 mb-2">
														<div
															className="w-6 h-6 rounded border border-base-300"
															style={{
																backgroundColor:
																	color.hex,
															}}
														/>
														<span className="font-medium text-sm">
															{color.hex}
														</span>
														{isSelected && (
															<Check className="h-4 w-4 text-primary ml-auto" />
														)}
													</div>
													<div className="text-xs text-base-content/50 space-y-1">
														<div>
															Dominance:{' '}
															{Math.round(
																color.dominance *
																	100
															)}
															%
														</div>
														{colorInfo?.name && (
															<div>
																Name:{' '}
																{colorInfo.name}
															</div>
														)}
													</div>
												</div>
											)
										}
									)}
								</div>

								{selectedColors.length > 0 && (
									<div className="space-y-3 pt-4 border-t border-base-300">
										<span className="font-semibold">
											Selected Colors (
											{selectedColors.length})
										</span>
										<div className="flex flex-wrap gap-2">
											{selectedColors.map(
												(color, index) => (
													<div
														key={index}
														className="flex items-center gap-1"
													>
														<div
															className="w-8 h-8 rounded border border-base-300 cursor-pointer hover:scale-110 transition-transform"
															style={{
																backgroundColor:
																	color.hex,
															}}
															onClick={() =>
																copyColorToClipboard(
																	color.hex
																)
															}
															title="Click to copy"
														/>
														<button
															className="btn btn-ghost btn-xs"
															onClick={() =>
																handleColorToggle(
																	color
																)
															}
														>
															<X className="h-3 w-3" />
														</button>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Theme Generation */}
			{analysis && selectedColors.length > 0 && (
				<div className="card bg-base-100 shadow-lg">
					<div className="card-body">
						<h3 className="card-title text-lg">Generate Theme</h3>
						<p className="text-base-content/70">
							Create a custom theme using the selected colors
						</p>
						<div className="space-y-4">
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

							<div className="flex gap-2">
								<Button
									onClick={generateTheme}
									className="btn-primary flex-1"
								>
									<Palette className="h-4 w-4 mr-2" />
									Generate Theme
								</Button>
								<Button
									onClick={() => {
										const colors = selectedColors
											.map((c) => c.hex)
											.join(', ')
										navigator.clipboard.writeText(colors)
										toast.success(
											'Selected colors copied to clipboard'
										)
									}}
									className="btn-outline"
								>
									<Copy className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

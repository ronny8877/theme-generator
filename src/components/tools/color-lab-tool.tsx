'use client'

import React, { useState } from 'react'
import {
	convertColor,
	calculateContrast,
	getComplementaryColor,
	getAnalogousColors,
	getTriadicColors,
	generateShades,
	ShadeInfo,
} from '@/lib/color-utils'
import { getWCAGRating } from '@/lib/palette-utils'
import { EnhancedColorInput } from '@/components/color-lab/enhanced-color-input'
import { ShadePalette } from '@/components/color-lab/shade-palette'
import { PaletteExportModal } from '@/components/color-lab/palette-export-modal'
import {
	Palette,
	Eye,
	Shield,
	Shuffle,
	Check,
	Download,
	Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ColorPreviewWithCopy from '../color-lab/color-preview-with-copy'
import { handleCopyToClipboard } from '@/lib/utils'

export function ColorLabTool() {
	const [mainColor, setMainColor] = useState('#3b82f6')
	const [contrastColor, setContrastColor] = useState('#ffffff')
	const [shades, setShades] = useState<ShadeInfo[]>([])
	const [showExportModal, setShowExportModal] = useState(false)

	const colorInfo = convertColor(mainColor)
	const contrastResult = calculateContrast(mainColor, contrastColor)

	// Generate shades when main color changes
	React.useEffect(() => {
		const generatedShades = generateShades(mainColor, 11)
		setShades(generatedShades)
	}, [mainColor])

	// Generate harmonies
	const complementary = getComplementaryColor(mainColor)
	const analogous = getAnalogousColors(mainColor, 2)
	const triadic = getTriadicColors(mainColor)

	const harmonies = {
		complementary: complementary ? [mainColor, complementary] : [mainColor],
		analogous: [mainColor, ...analogous],
		triadic: [mainColor, ...triadic],
	}

	const handleHarmonyColorClick = (color: string) => {
		setMainColor(color)
		toast.success('Color selected from harmony')
	}

	const rating = contrastResult ? getWCAGRating(contrastResult.ratio) : null

	return (
		<div className="space-y-8">
			{/* Current Theme Colors Section */}
			{/* <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <CurrentThemeColors />
        </div>
      </div> */}

			{/* Color Converter Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<h3 className="card-title text-2xl mb-6">
						<Palette className="h-6 w-6" />
						Color Converter
					</h3>

					<div className="space-y-6">
						<div>
							<label className="label">
								<span className="label-text font-semibold">
									Select Color
								</span>
							</label>
							<EnhancedColorInput
								value={mainColor}
								onChange={setMainColor}
								size="lg"
								className="w-full"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
							{/* Color Display Grid */}
							{colorInfo?.hex && (
								<ColorPreviewWithCopy
									color={colorInfo.hex}
									type="HEX"
								/>
							)}

							{/* RGB */}
							{colorInfo?.rgb && (
								<ColorPreviewWithCopy
									color={colorInfo.rgb}
									type="RGB"
								/>
							)}

							{/* HSL */}
							{colorInfo?.hsl && (
								<ColorPreviewWithCopy
									color={colorInfo.hsl}
									type="HSL"
								/>
							)}

							{/* OKLCH */}
							{colorInfo?.oklch && (
								<ColorPreviewWithCopy
									color={colorInfo.oklch}
									type="OKLCH"
								/>
							)}
						</div>
					</div>
					<h3 className="text-xl font-semibold text-center">
						{colorInfo?.name}
					</h3>
				</div>
			</div>

			{/* Shade Palette Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<div className="flex items-center justify-between mb-6">
						<h3 className="card-title text-2xl">
							<Zap className="h-6 w-6" />
							Color Shades
						</h3>
						<Button
							variant="outline"
							onClick={() => setShowExportModal(true)}
							className="flex items-center gap-2"
						>
							<Download className="h-4 w-4" />
							Export Palette
						</Button>
					</div>

					<ShadePalette
						shades={shades}
						title="Generated Shade Palette"
					/>
				</div>
			</div>

			{/* Contrast Checker Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<h3 className="card-title text-2xl mb-6">
						<Eye className="h-6 w-6" />
						Contrast Checker
					</h3>

					<div className="space-y-6">
						<div>
							<label className="label">
								<span className="label-text font-semibold">
									Background Color
								</span>
							</label>
							<EnhancedColorInput
								value={contrastColor}
								onChange={setContrastColor}
								size="md"
								className="w-full"
							/>
						</div>

						{/* Contrast Preview */}
						<div className="flex flex-col md:flex-row gap-8 md:gap-6">
							{/* Visual Preview */}
							<div className="space-y-4 w-full">
								<h4 className="font-semibold text-lg">
									Preview
								</h4>
								<div
									className="p-8 rounded-2xl border-2 border-base-300 text-center h-48 shadow-inner"
									style={{
										backgroundColor: mainColor,
										color: contrastColor,
										minHeight: '120px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div>
										<div className="text-2xl font-bold mb-2">
											Sample Text
										</div>
										<div className="text-sm">
											This is how your text will look
										</div>
									</div>
								</div>
							</div>

							{/* Contrast Results */}
							<div className="space-y-4 w-full">
								<h4 className="font-semibold text-lg">
									Accessibility
								</h4>
								<div className="card bg-base-200 shadow-sm">
									<div className="card-body">
										<div className="stat">
											<div className="stat-title">
												Contrast Ratio
											</div>
											<div className="stat-value text-3xl">
												{contrastResult
													? `${contrastResult.ratio.toFixed(2)}:1`
													: 'N/A'}
											</div>
											{rating && (
												<div
													className={`stat-desc font-semibold`}
												>
													<div
														className={`badge ${rating.class} px-5 badge-lg mb-2`}
													>
														{contrastResult &&
															contrastResult.ratio >=
																3 && (
																<Check className="h-3 w-3 mr-1" />
															)}
														WCAG {rating.grade}
													</div>
													<div>{rating.desc}</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Shade Palette Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<div className="flex items-center justify-between mb-6">
						<h3 className="card-title text-2xl">
							<Zap className="h-6 w-6" />
							Color Shades
						</h3>
						<Button
							variant="outline"
							onClick={() => setShowExportModal(true)}
							className="flex items-center gap-2"
						>
							<Download className="h-4 w-4" />
							Export Palette
						</Button>
					</div>

					<ShadePalette
						shades={generateShades(contrastColor, 11)}
						title="Generated Shade Palette"
					/>
				</div>
			</div>
			{/* WCAG Compliance Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<h3 className="card-title text-2xl mb-6">
						<Shield className="h-6 w-6" />
						WCAG Compliance Guide
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="card bg-success/10 border border-success/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-success badge-lg px-4">
										AAA
									</div>
									<h4 className="font-semibold">Enhanced</h4>
								</div>
								<p className="text-sm">Contrast ratio ≥ 7:1</p>
								<p className="text-sm text-base-content/70">
									Perfect for all text sizes and users with
									vision impairments
								</p>
							</div>
						</div>

						<div className="card bg-info/10 border border-info/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-info badge-lg px-4">
										AA
									</div>
									<h4 className="font-semibold">Standard</h4>
								</div>
								<p className="text-sm">
									Contrast ratio ≥ 4.5:1
								</p>
								<p className="text-sm text-base-content/70">
									Good for normal text, meets legal
									requirements
								</p>
							</div>
						</div>

						<div className="card bg-warning/10 border border-warning/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-warning badge-lg px-4">
										A
									</div>
									<h4 className="font-semibold">
										Large Text
									</h4>
								</div>
								<p className="text-sm">Contrast ratio ≥ 3:1</p>
								<p className="text-sm text-base-content/70">
									Only for large text (18pt+ or 14pt+ bold)
								</p>
							</div>
						</div>

						<div className="card bg-warning/10 border border-warning/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-warning badge-lg px-4">
										B
									</div>
									<h4 className="font-semibold">Poor</h4>
								</div>
								<p className="text-sm">Contrast ratio ≥ 2:1</p>
								<p className="text-sm text-base-content/70">
									Below accessibility standards
								</p>
							</div>
						</div>

						<div className="card bg-error/10 border border-error/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-error badge-lg px-4">
										C
									</div>
									<h4 className="font-semibold">Very Poor</h4>
								</div>
								<p className="text-sm">
									Contrast ratio ≥ 1.5:1
								</p>
								<p className="text-sm text-base-content/70">
									Very poor contrast, avoid using
								</p>
							</div>
						</div>

						<div className="card bg-error/10 border border-error/20">
							<div className="card-body">
								<div className="flex items-center gap-3 mb-3">
									<div className="badge badge-error badge-lg px-4">
										D
									</div>
									<h4 className="font-semibold">Fail</h4>
								</div>
								<p className="text-sm">
									Contrast ratio &lt; 1.5:1
								</p>
								<p className="text-sm text-base-content/70">
									Completely inaccessible
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Color Harmonies Section */}
			<div className="card bg-base-200/60">
				<div className="card-body">
					<h3 className="card-title text-2xl mb-6">
						<Shuffle className="h-6 w-6" />
						Color Harmonies
					</h3>

					<div className="space-y-6">
						{Object.entries(harmonies).map(
							([harmonyType, colors]) => (
								<div key={harmonyType} className="space-y-3">
									<h4 className="font-semibold text-lg capitalize">
										{harmonyType
											.replace(/([A-Z])/g, ' $1')
											.trim()}
									</h4>
									<div className="flex flex-wrap gap-3">
										{colors.map(
											(
												harmonyColor: string,
												index: number
											) => (
												<div
													key={index}
													className="flex items-center gap-3"
												>
													<div
														className={`w-16 h-16 rounded-2xl border-2 shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
															harmonyColor ===
															mainColor
																? 'border-primary border-4 ring-2 ring-primary/30'
																: 'border-base-300'
														}`}
														style={{
															backgroundColor:
																harmonyColor,
														}}
														onClick={() =>
															handleCopyToClipboard(
																harmonyColor
															)
														}
														title="Click to select this color"
													/>
													<div className="font-mono text-sm text-base-content/70">
														{harmonyColor.toUpperCase()}
													</div>
												</div>
											)
										)}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>

			{/* Export Modal */}
			<PaletteExportModal
				isOpen={showExportModal}
				onClose={() => setShowExportModal(false)}
				shades={shades}
				baseColor={mainColor}
				paletteName={`${colorInfo?.name || 'Custom'} Color Palette`}
			/>
		</div>
	)
}

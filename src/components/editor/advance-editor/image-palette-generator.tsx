'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, ImageIcon, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import {
	extractColorsFromImage,
	generateThemeFromImageColors,
	type ImageColorAnalysis,
} from '@/lib/image-color-extraction'
import { updateThemeColor } from '@/store/nano-store'

export function ImagePaletteGenerator() {
	const [dragActive, setDragActive] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)
	const [imageAnalysis, setImageAnalysis] =
		useState<ImageColorAnalysis | null>(null)
	const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
		null
	)

	const handleFileSelect = async (file: File) => {
		if (!file.type.startsWith('image/')) {
			toast.error('Please select a valid image file')
			return
		}

		setIsProcessing(true)

		try {
			// Create image URL for preview
			const imageUrl = URL.createObjectURL(file)
			setSelectedImageUrl(imageUrl)

			// Extract colors
			const analysis = await extractColorsFromImage(file, 6)
			setImageAnalysis(analysis)

			toast.success(
				`Extracted ${analysis.dominantColors.length} colors from image`
			)
		} catch (error) {
			console.error('Error processing image:', error)
			toast.error('Failed to process image. Please try another one.')
		} finally {
			setIsProcessing(false)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setDragActive(false)

		const file = e.dataTransfer.files[0]
		if (file) {
			handleFileSelect(file)
		}
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			handleFileSelect(file)
		}
	}

	const applyImageTheme = async () => {
		if (!imageAnalysis || imageAnalysis.dominantColors.length === 0) {
			toast.error('No colors to generate theme from')
			return
		}

		setIsProcessing(true)

		try {
			const theme = generateThemeFromImageColors(imageAnalysis)

			// Apply the theme by updating individual colors
			Object.entries(theme.colors).forEach(([key, value]) => {
				updateThemeColor(key as keyof typeof theme.colors, value)
			})

			toast.success('Image-based theme applied!', {
				description: `Generated from ${imageAnalysis.dominantColors.length} colors`,
			})
		} catch (error) {
			console.error('Error applying theme:', error)
			toast.error('Failed to apply theme. Please try again.')
		} finally {
			setIsProcessing(false)
		}
	}

	const clearImage = () => {
		setImageAnalysis(null)
		setSelectedImageUrl(null)
		if (selectedImageUrl) {
			URL.revokeObjectURL(selectedImageUrl)
		}
	}

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ImageIcon className="w-5 h-5 text-primary" />
					<div>
						<div className="font-semibold">Image Palette</div>
						<div className="text-xs text-base-content/70">
							Extract colors from images
						</div>
					</div>
				</div>
				{selectedImageUrl && (
					<Button onClick={clearImage} size="sm" variant="outline">
						Clear
					</Button>
				)}
			</div>

			{/* Upload Area */}
			{!selectedImageUrl && (
				<div
					className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
						dragActive
							? 'border-primary bg-primary/5'
							: 'border-base-300 hover:border-primary/50'
					}`}
					onDragEnter={(e) => {
						e.preventDefault()
						setDragActive(true)
					}}
					onDragLeave={(e) => {
						e.preventDefault()
						setDragActive(false)
					}}
					onDragOver={(e) => e.preventDefault()}
					onDrop={handleDrop}
				>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileInputChange}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						disabled={isProcessing}
					/>

					<div className="space-y-2">
						<Upload className="w-8 h-8 mx-auto text-base-content/60" />
						<div className="font-medium">Upload an image</div>
						<div className="text-sm text-base-content/60">
							Drag & drop or click to select
						</div>
						<div className="text-xs text-base-content/50">
							JPG, PNG, GIF up to 10MB
						</div>
					</div>
				</div>
			)}

			{/* Image Preview */}
			{selectedImageUrl && (
				<div className="space-y-3">
					<div className="relative">
						<img
							src={selectedImageUrl}
							alt="Selected"
							className="w-full h-32 object-cover rounded-lg border border-base-300"
						/>
						{isProcessing && (
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
								<div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
							</div>
						)}
					</div>
				</div>
			)}

			{/* Extracted Colors */}
			{imageAnalysis && imageAnalysis.dominantColors.length > 0 && (
				<div className="space-y-3">
					<div className="text-sm font-medium">Extracted Colors</div>

					{/* Color Swatches */}
					<div className="grid grid-cols-6 gap-2">
						{imageAnalysis.dominantColors
							.slice(0, 6)
							.map((color, index) => (
								<div key={index} className="relative group">
									<div
										className="w-full h-12 rounded-lg border border-base-300 cursor-pointer hover:scale-105 transition-transform"
										style={{ backgroundColor: color.hex }}
										title={`${color.hex} (${(color.dominance * 100).toFixed(1)}%)`}
									/>
									<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
										{color.hex}
									</div>
								</div>
							))}
					</div>

					{/* Apply Button */}
					<Button
						onClick={applyImageTheme}
						disabled={isProcessing}
						className="w-full gap-2"
					>
						{isProcessing ? (
							<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
						) : (
							<Wand2 className="w-4 h-4" />
						)}
						Generate Theme from Image
					</Button>
				</div>
			)}

			{/* Usage hint */}
			<div className="text-xs text-base-content/60 bg-base-200 p-2 rounded-lg">
				💡 Tip: Choose images with distinct, well-balanced colors for
				the best themes. Landscapes and artwork often work great!
			</div>
		</div>
	)
}

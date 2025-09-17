'use client'

import React, { useState, useEffect } from 'react'
import { isValidColor, convertColor, ColorInfo } from '@/lib/color-utils'
import { ColorPicker } from '@/components/ui/color-picker'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Eye, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

interface EnhancedColorInputProps {
	value: string
	onChange: (color: string) => void
	onColorInfo?: (info: ColorInfo | null) => void
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

export function EnhancedColorInput({
	value,
	onChange,
	onColorInfo,
	size = 'md',
	className = '',
}: EnhancedColorInputProps) {
	const [inputValue, setInputValue] = useState(value)
	const [activeTab, setActiveTab] = useState('picker')
	const [validationError, setValidationError] = useState<string | null>(null)
	const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null)

	// Update color info when value changes
	useEffect(() => {
		const info = convertColor(value)
		setColorInfo(info)
		if (onColorInfo) {
			onColorInfo(info)
		}
	}, [value, onColorInfo])

	// Update input value when prop value changes
	useEffect(() => {
		setInputValue(value)
	}, [value])

	const handleInputChange = (inputValue: string, format: string) => {
		setInputValue(inputValue)
		setValidationError(null)

		if (!inputValue.trim()) {
			setValidationError('Color value is required')
			return
		}

		if (isValidColor(inputValue)) {
			const info = convertColor(inputValue)
			if (info) {
				onChange(info.hex)
				setColorInfo(info)
				if (onColorInfo) {
					onColorInfo(info)
				}
				toast.success(`Valid ${format} color applied`)
			}
		} else {
			setValidationError(`Invalid ${format} color format`)
		}
	}

	const handlePickerChange = (newColor: string) => {
		onChange(newColor)
		setInputValue(newColor)
	}

	const resetToDefault = () => {
		const defaultColor = '#3b82f6'
		onChange(defaultColor)
		setInputValue(defaultColor)
		setValidationError(null)
		toast.success('Reset to default color')
	}

	const inputSizeClasses = {
		sm: 'input-sm',
		md: 'input-md',
		lg: 'input-lg',
	}

	return (
		<div className={`space-y-4 ${className}`}>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="grid w-full grid-cols-2 h-12 rounded-box bg-primary">
					<TabsTrigger
						value="picker"
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-accent dark:data-[state=active]:text-accent-content rounded-box"
					>
						<Palette className="h-4 w-4" />
						Color Picker
					</TabsTrigger>
					<TabsTrigger
						value="input"
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-accent dark:data-[state=active]:text-accent-content rounded-box"
					>
						<Eye className="h-4 w-4" />
						Text Input
					</TabsTrigger>
				</TabsList>

				<TabsContent value="picker" className="space-y-4">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<label className="label-text font-semibold">
								Visual Color Picker
							</label>
							<Button
								variant="outline"
								size="sm"
								onClick={resetToDefault}
								className="flex items-center gap-2"
							>
								<RotateCcw className="h-3 w-3" />
								Reset
							</Button>
						</div>
						<ColorPicker
							value={value}
							onChange={handlePickerChange}
							onChangeDebounced={handlePickerChange}
							size={size}
							className="w-full"
						/>
					</div>
				</TabsContent>

				<TabsContent value="input" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* HEX Input */}
						<div className="space-y-2">
							<label className="label-text font-semibold">
								HEX
							</label>
							<input
								type="text"
								placeholder="#3b82f6"
								value={colorInfo?.hex || inputValue}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => handleInputChange(e.target.value, 'HEX')}
								className={`input input-bordered ${inputSizeClasses[size]} font-mono w-full`}
							/>
							<p className="text-xs text-base-content/60">
								Example: #3b82f6 or #fff
							</p>
						</div>

						{/* RGB Input */}
						<div className="space-y-2">
							<label className="label-text font-semibold">
								RGB
							</label>
							<input
								type="text"
								placeholder="rgb(59, 130, 246)"
								value={colorInfo?.rgb || ''}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => handleInputChange(e.target.value, 'RGB')}
								className={`input input-bordered ${inputSizeClasses[size]} font-mono w-full`}
							/>
							<p className="text-xs text-base-content/60">
								Example: rgb(59, 130, 246)
							</p>
						</div>

						{/* HSL Input */}
						<div className="space-y-2">
							<label className="label-text font-semibold">
								HSL
							</label>
							<input
								type="text"
								placeholder="hsl(217, 91%, 60%)"
								value={colorInfo?.hsl || ''}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => handleInputChange(e.target.value, 'HSL')}
								className={`input input-bordered ${inputSizeClasses[size]} font-mono w-full`}
							/>
							<p className="text-xs text-base-content/60">
								Example: hsl(217, 91%, 60%)
							</p>
						</div>

						{/* OKLCH Input */}
						<div className="space-y-2">
							<label className="label-text font-semibold">
								OKLCH
							</label>
							<input
								type="text"
								placeholder="oklch(0.6 0.2 264)"
								value={colorInfo?.oklch || ''}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => handleInputChange(e.target.value, 'OKLCH')}
								className={`input input-bordered ${inputSizeClasses[size]} font-mono w-full`}
							/>
							<p className="text-xs text-base-content/60">
								Example: oklch(0.6 0.2 264)
							</p>
						</div>
					</div>

					{validationError && (
						<div className="alert alert-error">
							<span className="text-sm">{validationError}</span>
						</div>
					)}
				</TabsContent>
			</Tabs>

			{/* Color Info Display */}
			{colorInfo && (
				<div
					style={{ backgroundColor: colorInfo.hex }}
					className="card bg-base-200 glass"
				>
					<div className="card-body p-4">
						<div className="flex items-center gap-4">
							<div
								className="w-12 h-12 rounded-lg border-2 border-base-300 shadow-sm"
								style={{ backgroundColor: colorInfo.hex }}
							/>
							<div className="flex-1">
								<h4 className="font-semibold text-lg">
									{colorInfo.name || 'Custom Color'}
								</h4>
								<p className="text-sm text-base-content/70 font-mono">
									{colorInfo.hex.toUpperCase()}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default EnhancedColorInput

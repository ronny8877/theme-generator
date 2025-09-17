import React from 'react'
import { ShadeInfo } from '@/lib/color-utils'
import { handleCopyToClipboard } from '@/lib/utils'

interface ShadePaletteProps {
	shades: ShadeInfo[]
	title?: string
	onColorClick?: (color: string) => void
}

export function ShadePalette({
	shades,
	title = 'Color Palette',
}: ShadePaletteProps) {
	if (shades.length === 0) {
		return (
			<div className="text-center text-base-content/60 py-8">
				No shades generated
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-lg">{title}</h4>
			<div className="flex flex-row justify-center">
				{shades.map((shade, index) => (
					<div
						key={index}
						className="group transition-all duration-200 relative"
					>
						{/* Color Preview */}
						<div
							style={{
								borderRadius:
									index === 0
										? '25px 0 0 25px'
										: index === shades.length - 1
											? '0 25px 25px 0'
											: '0',
								backgroundColor: shade.color,
							}}
							className="h-20 w-8 md:w-20 transition-all duration-300 ease-in-out cursor-pointer scale-100 group-hover:w-40 group-hover:scale-105"
							onClick={() => handleCopyToClipboard(shade.color)}
							title={`Click to select ${shade.color}`}
						/>

						{/* Color Info */}
						<div
							onClick={() => handleCopyToClipboard(shade.color)}
							className="p-2 glass absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
						>
							<div className="text-xs font-mono text-center mb-1">
								{shade.color.toUpperCase()}
							</div>
							<div className="text-xs text-base-content/60 text-center mb-2">
								{shade.weight}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ShadePalette

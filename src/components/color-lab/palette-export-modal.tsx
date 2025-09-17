'use client'

import React, { useState } from 'react'
import { ShadeInfo } from '@/lib/color-utils'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Copy, Check, Download, X } from 'lucide-react'
import { toast } from 'sonner'

interface PaletteExportModalProps {
	isOpen: boolean
	onClose: () => void
	shades: ShadeInfo[]
	baseColor: string
	paletteName?: string
}

export function PaletteExportModal({
	isOpen,
	onClose,
	shades,
	baseColor,
	paletteName = 'Color Palette',
}: PaletteExportModalProps) {
	const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
	const [activeTab, setActiveTab] = useState('hex')

	const handleCopy = async (content: string, format: string) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedFormat(format)
			toast.success(`${format} format copied to clipboard`)
			setTimeout(() => setCopiedFormat(null), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
			toast.error('Failed to copy to clipboard')
		}
	}

	const handleDownload = (content: string, filename: string) => {
		const blob = new Blob([content], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		toast.success(`Downloaded ${filename}`)
	}

	// Generate different export formats
	const generateTailwindV4 = () => {
		return `@import "tailwindcss";

:root {
  --color-primary-50: ${shades.find((s) => s.weight === 50)?.color || shades[0]?.color};
  --color-primary-100: ${shades.find((s) => s.weight === 100)?.color || shades[1]?.color};
  --color-primary-200: ${shades.find((s) => s.weight === 200)?.color || shades[2]?.color};
  --color-primary-300: ${shades.find((s) => s.weight === 300)?.color || shades[3]?.color};
  --color-primary-400: ${shades.find((s) => s.weight === 400)?.color || shades[4]?.color};
  --color-primary-500: ${shades.find((s) => s.weight === 500)?.color || baseColor};
  --color-primary-600: ${shades.find((s) => s.weight === 600)?.color || shades[5]?.color};
  --color-primary-700: ${shades.find((s) => s.weight === 700)?.color || shades[6]?.color};
  --color-primary-800: ${shades.find((s) => s.weight === 800)?.color || shades[7]?.color};
  --color-primary-900: ${shades.find((s) => s.weight === 900)?.color || shades[8]?.color};
  --color-primary-950: ${shades.find((s) => s.weight === 950)?.color || shades[9]?.color};
}`
	}

	const generateTailwindV3 = () => {
		const colors = shades
			.map((shade) => `        ${shade.weight}: "${shade.color}",`)
			.join('\n')
		return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${colors}
        }
      }
    }
  }
}`
	}

	const generateFigmaTokens = () => {
		const tokens = shades
			.map((shade) => `      "${shade.weight}": "${shade.color}",`)
			.join('\n')
		return `{
  "color": {
    "primary": {
${tokens}
    }
  }
}`
	}

	const generateCSSCustomProperties = () => {
		const properties = shades
			.map(
				(shade) => `  --color-primary-${shade.weight}: ${shade.color};`
			)
			.join('\n')
		return `:root {
${properties}
}`
	}

	const generatePlainColors = () => {
		return shades.map((shade) => shade.color).join('\n')
	}

	const generateSCSS = () => {
		const variables = shades
			.map((shade) => `$color-primary-${shade.weight}: ${shade.color};`)
			.join('\n')
		return `// Color Variables
${variables}

// Color Map
$primary-colors: (
${shades.map((shade) => `  ${shade.weight}: ${shade.color},`).join('\n')}
);`
	}

	const formats = [
		{
			id: 'hex',
			label: 'Hex',
			content: generatePlainColors(),
			filename: 'colors-hex.txt',
		},
		{
			id: 'tailwind-v4',
			label: 'Tailwind v4',
			content: generateTailwindV4(),
			filename: 'tailwind-v4-colors.css',
		},
		{
			id: 'tailwind-v3',
			label: 'Tailwind v3',
			content: generateTailwindV3(),
			filename: 'tailwind.config.js',
		},
		{
			id: 'figma',
			label: 'Figma',
			content: generateFigmaTokens(),
			filename: 'figma-tokens.json',
		},
		{
			id: 'css',
			label: 'CSS',
			content: generateCSSCustomProperties(),
			filename: 'color-variables.css',
		},
		{
			id: 'scss',
			label: 'SCSS',
			content: generateSCSS(),
			filename: 'colors.scss',
		},
	]

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="text-2xl">
							Export {paletteName}
						</DialogTitle>
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</DialogHeader>

				<div className="flex-1 overflow-hidden">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="h-full flex flex-col"
					>
						<div className="flex flex-wrap gap-2 border-b pb-4">
							{formats.map((format) => (
								<Button
									key={format.id}
									variant={
										activeTab === format.id
											? 'default'
											: 'outline'
									}
									size="sm"
									onClick={() => setActiveTab(format.id)}
								>
									{format.label}
								</Button>
							))}
						</div>

						<div className="flex-1 mt-4 overflow-hidden">
							{formats.map((format) => (
								<div
									key={format.id}
									className={`h-full ${activeTab === format.id ? 'block' : 'hidden'}`}
								>
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-semibold">
											{format.label} Format
										</h3>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleCopy(
														format.content,
														format.label
													)
												}
												disabled={
													copiedFormat ===
													format.label
												}
											>
												{copiedFormat ===
												format.label ? (
													<Check className="h-4 w-4 mr-2" />
												) : (
													<Copy className="h-4 w-4 mr-2" />
												)}
												{copiedFormat === format.label
													? 'Copied!'
													: 'Copy'}
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleDownload(
														format.content,
														format.filename
													)
												}
											>
												<Download className="h-4 w-4 mr-2" />
												Download
											</Button>
										</div>
									</div>

									<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
										{/* Color Preview */}
										<div className="space-y-3">
											<h4 className="font-medium">
												Preview
											</h4>
											<div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-1 p-3 bg-base-200 rounded-lg">
												{shades.map((shade, index) => (
													<div
														key={index}
														className="group relative"
													>
														<div
															className="aspect-square rounded border border-base-300 cursor-pointer hover:scale-110 transition-transform"
															style={{
																backgroundColor:
																	shade.color,
															}}
															title={`${shade.weight}: ${shade.color}`}
														/>
													</div>
												))}
											</div>
										</div>

										{/* Code Preview */}
										<div className="space-y-3">
											<h4 className="font-medium">
												Code
											</h4>
											<div className="bg-base-300 rounded-lg p-4 overflow-auto max-h-64">
												<pre className="text-sm text-base-content font-mono whitespace-pre-wrap">
													{format.content}
												</pre>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</Tabs>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default PaletteExportModal

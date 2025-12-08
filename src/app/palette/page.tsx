import type { Metadata } from 'next'
import { PaletteTool } from '@/components/tools/palette-tool'
import { SettingsDialog } from '@/components/settings-dialog'
import Link from 'next/link'
import ToolNav from '@/components/navs/tool-nav'
import { Pacifico } from 'next/font/google'
import Footer from '@/components/footer'

const pacifico = Pacifico({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-pacifico',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Palette Generator - LiveTheme | Professional Color Palette Tools',
	description:
		'Generate beautiful, accessible color palettes with harmony rules. Create monochromatic, analogous, complementary, and triadic palettes — analyze contrast and export in multiple formats.',
	keywords: [
		'color palette generator',
		'color scheme generator',
		'color harmony',
		'monochromatic palette',
		'analogous colors',
		'complementary palette',
		'triadic colors',
		'color combinations',
		'palette creator',
		'color accessibility',
		'contrast analysis',
		'design palette',
		'color theory',
		'palette export',
		'CSS colors',
		'design colors',
		'color inspiration',
		'brand colors',
		'web palette',
		'designer tools',
	],
	openGraph: {
		title: 'Palette Generator - Professional Color Palette Tools',
		description:
			'Create professional color palettes with harmony rules and accessibility analysis. Build monochromatic, analogous, complementary, and triadic palettes, extract colors from images, save palettes, and export in multiple formats.',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Palette Generator - Professional Color Palette Tools',
		description:
			'Create professional color palettes with harmony rules and accessibility analysis. Build, save, and export palettes with contrast checks for web and design.',
	},
}

export default function PalettePage() {
	return (
		<>
			<ToolNav />
			<main className="min-h-screen max-w-5xl mx-auto bg-base-100 pt-20 ">
				<h1
					className={`text-8xl font-bold mb-16 text-center ${pacifico.className}`}
				>
					Color Palettes
				</h1>
				<p className="text-center mb-16 text-lg text-base-content/80 px-4 max-w-md mx-auto">
					Generate beautiful, accessible color palettes using proven
					harmony rules. Create monochromatic, analogous,
					complementary, and triadic palettes, extract colors from
					images, save your favorites, and export in multiple formats,
					all with built-in contrast checks to ensure accessibility
					for web and design.
				</p>
				{/* Main Content */}
				<PaletteTool />
			</main>

			{/* Footer */}
			<Footer />

			<SettingsDialog />
		</>
	)
}

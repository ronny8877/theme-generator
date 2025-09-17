import type { Metadata } from 'next'
import { ColorLabTool } from '@/components/tools/color-lab-tool'
import ToolNav from '@/components/navs/tool-nav'
import Footer from '@/components/footer'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-pacifico',
	display: 'swap',
})
export const metadata: Metadata = {
	title: 'Color Lab - LiveTheme | Professional Color Conversion & Analysis Tool',
	description:
		'Convert colors between formats (HEX, RGB, HSL), analyze accessibility contrasts with WCAG guidelines, generate color harmonies, and test color combinations. Free professional color tools for designers and developers.',
	keywords: [
		'color converter',
		'hex to rgb',
		'rgb to hsl',
		'color contrast checker',
		'WCAG contrast',
		'accessibility colors',
		'color harmony',
		'complementary colors',
		'analogous colors',
		'triadic colors',
		'color analysis',
		'color picker',
		'color tool',
		'design colors',
		'web colors',
		'color accessibility',
		'contrast ratio',
		'color formats',
		'color theory',
		'designer tools',
	],
	openGraph: {
		title: 'Color Lab - Professional Color Tools',
		description:
			'Convert colors, check accessibility, and analyze color harmonies with our professional color lab.',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Color Lab - Professional Color Tools',
		description:
			'Convert colors, check accessibility, and analyze color harmonies with our professional color lab.',
	},
}

export default function ColorLabPage() {
	return (
		<>
			<ToolNav />
			<main className="min-h-screen max-w-5xl mx-auto bg-base-100 pt-20 ">
				<h1
					className={`text-8xl font-bold mb-16 text-center ${pacifico.className}`}
				>
					Color Lab
				</h1>
				{/* Main Content */}
				<ColorLabTool />
				{/* Footer */}
				<Footer />
			</main>
		</>
	)
}

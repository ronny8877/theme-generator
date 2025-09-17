import Link from 'next/link'
import Showcase from '@/components/landing/Showcase'
import TextPitch from '@/components/landing/TextPitch'
import WorkflowSteps from '@/components/landing/WorkflowSteps'
import BrowseAllTemplates from '@/components/landing/BrowseAllTemplates'
import Faq from '@/components/landing/Faq'
import Clock from '@/components/ui/clock'
import { SettingsDialog } from '@/components/settings-dialog'
import ToolNav from '@/components/navs/tool-nav'
import Footer from '@/components/footer'

export default function Home() {
	return (
		<>
			<main className={`container mx-auto p-4 bg-base-100`}>
				<ToolNav />

				{/* HERO section */}
				<section className="hero min-h-[70vh] lg:min-h-[80vh]">
					<div className="hero-content w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
						{/* Left: value proposition */}
						<div className="space-y-6 max-w-xl">
							<div>
								<h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
									Live Theme Editor for DaisyUI & Tailwind
								</h1>
								<h2 className="mt-2 text-2xl lg:text-3xl text-base-content/70">
									Tweak colors and fonts. Preview on real
									templates instantly.
								</h2>
							</div>
							<ul className="list-disc list-inside text-base-content/70 space-y-1">
								<li>DaisyUI & Tailwind editor</li>
								<li>Phone • Tablet • Desktop preview</li>
								<li>Export & share (CSS vars / JSON)</li>
							</ul>
							<div className="flex flex-wrap items-center gap-3">
								<Link
									href="/templates"
									className="btn btn-primary rounded-box"
								>
									Try the editor →
								</Link>
								<a
									href="#showcase"
									className="btn btn-outline rounded-box"
								>
									See live preview
								</a>
							</div>
						</div>
						{/* Right: interactive hero preview */}
						<div className="w-full flex items-center justify-center">
							{/* Large responsive clock for hero only */}
							<Clock
								size={`clamp(220px, 36vw, 520px)`}
								thicknessFactor={1.3}
							/>
						</div>
					</div>
				</section>

				{/* Pitch section */}
				<TextPitch />

				{/* Landing preview + selectors */}
				<div id="showcase">
					<Showcase />
				</div>

				{/* Workflow section */}
				<WorkflowSteps />

				{/* Browse all templates */}
				<BrowseAllTemplates />

				{/* FAQ at the end */}
				<Faq />
				{/* Footer */}
				<Footer />

				{/* Settings Dialog */}
				<SettingsDialog />
			</main>
		</>
	)
}

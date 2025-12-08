import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="mt-16 border-t border-base-300 pt-10 pb-16">
			<div className="grid md:grid-cols-3 gap-8">
				<div>
					<h3 className="text-lg font-semibold">LiveTheme</h3>
					<p className="mt-2 text-sm opacity-70">
						Free live theme editor for DaisyUI & Tailwind CSS. Build
						themes, preview on templates, then export for any
						framework.
					</p>
				</div>
				<div>
					<h4 className="font-medium">Tools</h4>
					<ul className="mt-2 space-y-1 text-sm">
						<li>
							<Link href="/templates">Templates</Link>
						</li>
						<li>
							<Link href="/color-lab">Color Lab</Link>
						</li>
						<li>
							<a href="/gradient">Gradients</a>
						</li>
						<li>
							<a href="/palette">Palette</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="font-medium">Community</h4>
					<ul className="mt-2 space-y-1 text-sm">
						<li>
							<a
								href="https://x.com/its_me_roni3"
								target="_blank"
								rel="noreferrer"
							>
								Twitter
							</a>
						</li>
						<li>
							<a
								href="https://github.com/ronny8877/"
								target="_blank"
								rel="noreferrer"
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								href="mailto:contact@livetheme.app"
								target="_blank"
								rel="noreferrer"
							>
								contact@livetheme.app
							</a>
						</li>
						<li>
							<Link href="/faq">Faq</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="mt-10 text-xs opacity-60">
				© {new Date().getFullYear()} LiveTheme. Built on DaisyUI &
				Tailwind. Exports for multiple frameworks.
			</div>
		</footer>
	)
}

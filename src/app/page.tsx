import { Pacifico } from "next/font/google";
import Link from "next/link";
import Showcase from "@/components/landing/Showcase";
import NavThemeSelect from "@/components/navs/nav-theme-select";
import TextPitch from "@/components/landing/TextPitch";
import WorkflowSteps from "@/components/landing/WorkflowSteps";
import BrowseAllTemplates from "@/components/landing/BrowseAllTemplates";
import Faq from "@/components/landing/Faq";
import Clock from "@/components/ui/clock";



const storyScript = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});

export default function Home() {
  return (
    <main className={`container mx-auto p-4 bg-base-100`}>
      <nav className="navbar bg-base-100 shadow-sm rounded-3xl sticky top-3 z-40 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
        <div className="flex-1 flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 h-10 rounded">
              <img
                title="LiveTheme -  theme editor"
                src="/logo-transparent.png"
                alt="LiveTheme"
                loading="eager"
              />
            </div>
          </div>
          <Link
            href="/"
            className={`hidden  md:text-3xl tracking-wide md:inline-block ${storyScript.className}`}
          >
            LiveTheme
          </Link>
        </div>
        <div className="flex-none flex items-center gap-2">
          <ul className="menu menu-horizontal px-1 flex items-center gap-2">
            <li>
              <Link href="/">Templates</Link>
            </li>
            <li>
              <NavThemeSelect />
            </li>
          </ul>
        </div>
      </nav>

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
                Tweak colors and fonts. Preview on real templates instantly.
              </h2>
            </div>
            <ul className="list-disc list-inside text-base-content/70 space-y-1">
              <li>DaisyUI & Tailwind editor</li>
              <li>Phone • Tablet • Desktop preview</li>
              <li>Export & share (CSS vars / JSON)</li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/templates" className="btn btn-primary rounded-box">
                Try the editor →
              </Link>
              <a href="#showcase" className="btn btn-outline rounded-box">
                See live preview
              </a>
            </div>
          </div>
          {/* Right: interactive hero preview */}
          <div className="w-full flex items-center justify-center">
            {/* Large responsive clock for hero only */}
            <Clock size={`clamp(220px, 36vw, 520px)`} thicknessFactor={1.3} />
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

      {/* FAQ at the end */}
      <Faq />

      {/* Browse all templates */}
      <BrowseAllTemplates />

      {/* Footer */}
      <footer className="mt-16 border-t border-base-300 pt-10 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">LiveTheme</h3>
            <p className="mt-2 text-sm opacity-70">
              Free live theme editor for DaisyUI & Tailwind CSS. Build themes,
              preview on templates, then export for any framework.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Product</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/templates">Templates</Link>
              </li>
              <li>
                <a href="#showcase">Showcase</a>
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
              {/* <li>
                <Link href="/">Changelog</Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs opacity-60">
          © {new Date().getFullYear()} LiveTheme. Built on DaisyUI & Tailwind.
          Exports for multiple frameworks.
        </div>
      </footer>
    </main>
  );
}

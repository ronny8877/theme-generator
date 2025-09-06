import { Pacifico, Outfit } from "next/font/google";
import Link from "next/link";
import Showcase from "@/components/landing/Showcase";
import NavThemeSelect from "@/components/navs/nav-theme-select";
import TextPitch from "@/components/landing/TextPitch";
import WorkflowSteps from "@/components/landing/WorkflowSteps";
import TemplateGallery from "@/components/landing/TemplateGallery";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const storyScript = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});

export default function Home() {
  return (<main  className={`container mx-auto p-4 bg-base-100 ${outfit.className}`}>
    <nav className="navbar bg-base-100 shadow-sm rounded-3xl ">
      <div className="flex-1 flex items-center gap-2">
     <div className="avatar">
  <div className="w-10 h-10 rounded">
    <img src="/logo-transparent.png" alt="LiveTheme"  loading="eager"/>
  </div>
</div>
<Link href="/" className={`text-3xl tracking-wide inline-block ${storyScript.className}`}>LiveTheme</Link>
      </div>
      <div className="flex-none flex items-cente gap-2">
        <ul className="menu menu-horizontal px-1 flex items-center gap-2">
          <li><Link href="/">Templates</Link></li>
          <li>
        <NavThemeSelect />
        </li>
        </ul>
      </div>
    </nav>

  {/* HERO section */}
    <section className="hero min-h-[70vh] lg:min-h-[80vh]">
      <div className="hero-content w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: text */}
        <div className="space-y-6 max-w-xl">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">Live Theme Editor for DaisyUI & Tailwind CSS</h1>
            <h2 className="mt-2 text-2xl lg:text-3xl text-base-content/70">Customize colors and fonts. Preview instantly on real templates.</h2>
          </div>
          <p className="text-base-content/70">
            Build and preview DaisyUI themes visually. Pick a template, tweak variables and typography, then share or export the result for any framework.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {/* <a
              href="https://discord.gg/daisyui"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.369A18.95 18.95 0 0016.558 3c-.197.363-.42.852-.576 1.23a17.532 17.532 0 00-7.964 0A7.931 7.931 0 007.442 3 18.953 18.953 0 003.683 4.37C1.64 7.595 1.104 10.74 1.314 13.846c2.042 1.51 4.02 2.432 5.962 3.04.48-.658.91-1.36 1.287-2.095-.71-.27-1.39-.6-2.034-.987.17-.123.337-.251.5-.382 3.913 1.83 8.165 1.83 12.045 0 .166.131.333.26.5.382-.646.386-1.327.718-2.036.987.377.735.806 1.437 1.287 2.095 1.946-.61 3.923-1.532 5.966-3.04.244-3.542-.418-6.657-2.474-9.477zM9.44 12.575c-.79 0-1.436-.72-1.436-1.607 0-.886.64-1.61 1.436-1.61.8 0 1.446.724 1.436 1.61 0 .887-.636 1.607-1.436 1.607zm5.12 0c-.79 0-1.436-.72-1.436-1.607 0-.886.64-1.61 1.436-1.61.8 0 1.446.724 1.436 1.61 0 .887-.636 1.607-1.436 1.607z"/></svg>
              Discord
            </a> */}
            <Link href="/templates" className="btn btn-primary">How to use? →</Link>
          </div>
        </div>
        {/* Right: mockup */}
        <div className="w-full flex items-center justify-center">
          <div className="mockup-browser border bg-base-200 border-base-300 rounded-3xl overflow-hidden shadow-xl">
            <div className="mockup-browser-toolbar">
              <div className="input">livetheme.app</div>
            </div>
            <img src="/preview.png" alt="LiveTheme editor screenshot" className="w-full max-h-[380px] object-cover" loading="eager"/>
          </div>
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

  {/* Full template gallery for SEO */}
  <TemplateGallery />

  {/* Footer */}
  <footer className="mt-16 border-t border-base-300 pt-10 pb-16">
    <div className="grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold">LiveTheme</h3>
        <p className="mt-2 text-sm opacity-70">
          Free live theme editor for DaisyUI & Tailwind CSS. Build themes, preview on templates, then export for any framework.
        </p>
      </div>
      <div>
        <h4 className="font-medium">Product</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li><Link href="/templates">Templates</Link></li>
          <li><a href="#showcase">Theme generator</a></li>
          <li><Link href="/">Docs</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium">Community</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li><a href="https://discord.gg/daisyui" target="_blank" rel="noreferrer">Discord</a></li>
          <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><Link href="/">Changelog</Link></li>
        </ul>
      </div>
    </div>
    <div className="mt-10 text-xs opacity-60">© {new Date().getFullYear()} LiveTheme. Built on DaisyUI & Tailwind. Exports for multiple frameworks.</div>
  </footer>
    </main>
  );
}
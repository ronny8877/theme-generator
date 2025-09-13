import Link from "next/link";
import { SettingsButton } from "../settings-button";
import NavThemeSelect from "./nav-theme-select";
import { Pacifico } from "next/font/google";
import { MenuIcon } from "lucide-react";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});
export default function ToolNav() {
  return (
    <nav className="container @container mx-auto navbar bg-base-100 shadow-sm rounded-3xl sticky top-3 z-40 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
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
          className={`  md:text-3xl tracking-wide md:inline-block ${pacifico.className}`}
        >
          LiveTheme
        </Link>
      </div>
      <div className="flex-none flex items-center gap-2">
        <details className="dropdown dropdown-end block @sm:hidden">
          <summary className="btn m-1 rounded-3xl">
            <MenuIcon />
          </summary>
          <ul className="menu rounded-3xl dropdown-content bg-base-100 rounded-box z-1 w-52 p-5 shadow-sm">
            <li>
              <Link href="/color-lab">Color Lab</Link>
            </li>
            <li>
              <Link href="/palette">Palette</Link>
            </li>
            <li>
              <Link href="/gradient">Gradient</Link>
            </li>
            <li>
              <Link href="/templates">Templates</Link>
            </li>
            <li>
              <NavThemeSelect />
            </li>
          </ul>
        </details>

        <ul className="hidden px-1 md:flex items-center @md:gap-3 @lg:gap-5">
          <li>
            <Link href="/color-lab">Color Lab</Link>
          </li>
          <li>
            <Link href="/palette">Palette</Link>
          </li>
          <li>
            <Link href="/gradient">Gradient</Link>
          </li>
          <li>
            <Link href="/templates">Templates</Link>
          </li>
          <li>
            <NavThemeSelect />
          </li>
        </ul>
      </div>
    </nav>
  );
}

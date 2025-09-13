import type { Metadata } from "next";
import { GradientTool } from "@/components/tools/gradient-tool";
import { CommonToolbar } from "@/components/common-toolbar";
import { SettingsDialog } from "@/components/settings-dialog";
import Link from "next/link";
import ToolNav from "@/components/navs/tool-nav";

export const metadata: Metadata = {
  title: "Gradient Generator - LiveTheme | Professional CSS Gradient Tools",
  description:
    "Create stunning CSS gradients with live preview. Generate linear, radial, and conic gradients. Edit color stops, adjust directions, and export CSS code. Professional gradient tools for web designers and developers.",
  keywords: [
    "gradient generator",
    "css gradient",
    "linear gradient",
    "radial gradient",
    "conic gradient",
    "gradient maker",
    "gradient creator",
    "css gradient generator",
    "gradient tool",
    "web gradients",
    "gradient css",
    "gradient editor",
    "gradient designer",
    "background gradient",
    "gradient stops",
    "gradient colors",
    "gradient export",
    "gradient code",
    "designer tools",
    "web design",
  ],
  openGraph: {
    title: "Gradient Generator - Professional CSS Gradient Tools",
    description:
      "Create stunning CSS gradients with live preview and instant export. Professional gradient tools for designers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Generator - Professional CSS Gradient Tools",
    description:
      "Create stunning CSS gradients with live preview and instant export. Professional gradient tools for designers.",
  },
};

export default function GradientPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <ToolNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GradientTool />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-base-300 bg-base-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Part of the{" "}
              <Link href="/" className="link link-primary">
                LiveTheme
              </Link>{" "}
              design tools suite
            </p>
          </div>
        </div>
      </footer>

      <SettingsDialog />
    </div>
  );
}

import type { Metadata } from "next";
import { PaletteTool } from "@/components/tools/palette-tool";
import { CommonToolbar } from "@/components/common-toolbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palette Generator - LiveTheme | Professional Color Palette Tools",
  description: "Generate beautiful color palettes using color harmony rules. Create monochromatic, analogous, complementary, triadic palettes. Analyze accessibility and export in multiple formats. Professional palette tools for designers.",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "color harmony",
    "monochromatic palette",
    "analogous colors",
    "complementary palette",
    "triadic colors",
    "color combinations",
    "palette creator",
    "color accessibility",
    "contrast analysis",
    "design palette",
    "color theory",
    "palette export",
    "CSS colors",
    "design colors",
    "color inspiration",
    "brand colors",
    "web palette",
    "designer tools"
  ],
  openGraph: {
    title: "Palette Generator - Professional Color Palette Tools",
    description: "Generate beautiful color palettes with harmony analysis and accessibility checking. Export in multiple formats.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palette Generator - Professional Color Palette Tools", 
    description: "Generate beautiful color palettes with harmony analysis and accessibility checking. Export in multiple formats.",
  },
};

export default function PalettePage() {
  return (
    <div className="min-h-screen bg-base-100">
      <CommonToolbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PaletteTool />
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
    </div>
  );
}
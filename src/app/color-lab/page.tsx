import type { Metadata } from "next";
import { ColorLabTool } from "@/components/tools/color-lab-tool";
import { CommonToolbar } from "@/components/common-toolbar";
import { SettingsDialog } from "@/components/settings-dialog";
import Link from "next/link";
import ToolNav from "@/components/navs/tool-nav";

export const metadata: Metadata = {
  title:
    "Color Lab - LiveTheme | Professional Color Conversion & Analysis Tool",
  description:
    "Convert colors between formats (HEX, RGB, HSL), analyze accessibility contrasts with WCAG guidelines, generate color harmonies, and test color combinations. Free professional color tools for designers and developers.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hsl",
    "color contrast checker",
    "WCAG contrast",
    "accessibility colors",
    "color harmony",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "color analysis",
    "color picker",
    "color tool",
    "design colors",
    "web colors",
    "color accessibility",
    "contrast ratio",
    "color formats",
    "color theory",
    "designer tools",
  ],
  openGraph: {
    title: "Color Lab - Professional Color Tools",
    description:
      "Convert colors, check accessibility, and analyze color harmonies with our professional color lab.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Lab - Professional Color Tools",
    description:
      "Convert colors, check accessibility, and analyze color harmonies with our professional color lab.",
  },
};

export default function ColorLabPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <ToolNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ColorLabTool />
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

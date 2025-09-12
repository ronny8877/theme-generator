import type { Metadata } from "next";
import { AboutTool } from "@/components/tools/about-tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About - LiveTheme | Professional Design Tools & Color Utilities",
  description: "Learn about LiveTheme's mission to provide professional color tools for designers and developers. Discover our features, technology stack, and how to get involved with the project.",
  keywords: [
    "about livetheme",
    "design tools",
    "color tools",
    "theme generator",
    "professional design",
    "open source design",
    "color utilities",
    "designer tools",
    "developer tools",
    "web design",
    "accessibility tools",
    "design system",
    "culori",
    "nextjs",
    "tailwind",
    "radix ui"
  ],
  openGraph: {
    title: "About LiveTheme - Professional Design Tools",
    description: "Professional color tools and design utilities for modern web development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About LiveTheme - Professional Design Tools",
    description: "Professional color tools and design utilities for modern web development.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="border-b border-base-300 bg-base-100/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="btn btn-ghost btn-sm"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold">About LiveTheme</h1>
              <p className="text-sm text-base-content/70">
                Professional design tools for the modern web
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AboutTool />
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
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Zap, Code } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $currentTheme, $isAutoThemeEnabled } from "@/store/homepage-store";

export function HeroSection() {
  const currentTheme = useStore($currentTheme);
  const isAutoThemeEnabled = useStore($isAutoThemeEnabled);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 text-sm font-medium shadow-sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            20+ Built-in DaisyUI Themes
          </Badge>

          {/* Theme Debug Info */}
          <div className="mb-4 text-sm text-muted-foreground">
            Current: <strong>{currentTheme}</strong>{" "}
            {isAutoThemeEnabled && "(Auto)"}
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-tight">
            Transform Your Website with{" "}
            <span className="text-primary">DaisyUI Themes</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-12 max-w-4xl mx-auto leading-relaxed">
            20+ pre-built themes, infinite customization possibilities.
            Experience real-time theme switching with our powerful DaisyUI
            integration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button
              size="lg"
              className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => {
                window.location.href = "/templates";
              }}
            >
              Browse Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                20+
              </div>
              <div className="text-muted-foreground text-lg">
                Built-in Themes
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                ∞
              </div>
              <div className="text-muted-foreground text-lg">
                Customization Options
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                0ms
              </div>
              <div className="text-muted-foreground text-lg">
                Theme Switch Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

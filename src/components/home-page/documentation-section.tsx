"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Copy, Check } from "lucide-react";
import { useState } from "react";

export function DocumentationSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    integration: true,
    themes: false,
    variables: false,
  });

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const htmlIntegrationCode = `<!-- Theme switching is as simple as changing the data-theme attribute -->
<html data-theme="cyberpunk">
  <!-- All DaisyUI components automatically adapt -->
  <button class="btn btn-primary">Themed Button</button>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Auto-themed Card</h2>
    </div>
  </div>
</html>`;

  const cssVariablesCode = `/* Each theme automatically sets these variables */
:root[data-theme="cyberpunk"] {
  --p: 219 100% 50%;  /* Primary color */
  --s: 328 100% 54%;  /* Secondary color */
  --a: 175 70% 41%;   /* Accent color */
  --b1: 219 14% 8%;   /* Base background */
}`;

  const reactIntegrationCode = `import { useTheme } from '@/contexts/theme-context'

function ThemeSwitcher() {
  const { setTheme, currentTheme } = useTheme()
  
  return (
    <select 
      value={currentTheme} 
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="cyberpunk">Cyberpunk</option>
    </select>
  )
}`;

  const themes = [
    {
      name: "Light",
      description: "Clean, minimal design with light backgrounds",
      color: "bg-white border",
    },
    {
      name: "Dark",
      description: "Modern dark mode with high contrast",
      color: "bg-gray-900",
    },
    {
      name: "Cupcake",
      description: "Soft pastels with rounded corners",
      color: "bg-pink-100",
    },
    {
      name: "Cyberpunk",
      description: "Neon colors with futuristic feel",
      color: "bg-purple-900",
    },
    {
      name: "Synthwave",
      description: "Retro 80s inspired with purples and pinks",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      name: "Retro",
      description: "Vintage colors with warm tones",
      color: "bg-orange-200",
    },
    {
      name: "Aqua",
      description: "Ocean-inspired blues and teals",
      color: "bg-cyan-400",
    },
  ];

  return (
    <section id="documentation" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            How Our <span className="text-primary">DaisyUI Integration</span>{" "}
            Works
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Comprehensive guide to implementing dynamic theme switching with
            DaisyUI&apos;s powerful theming system.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Integration Guide */}
          <div className="space-y-6">
            <Collapsible
              open={openSections.integration}
              onOpenChange={() => toggleSection("integration")}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          HTML Integration
                        </CardTitle>
                        <CardDescription>
                          Simple data-theme attribute switching
                        </CardDescription>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${openSections.integration ? "rotate-180" : ""}`}
                      />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{htmlIntegrationCode}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(htmlIntegrationCode, "html")
                        }
                      >
                        {copiedCode === "html" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openSections.variables}
              onOpenChange={() => toggleSection("variables")}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          CSS Variables Demo
                        </CardTitle>
                        <CardDescription>
                          How themes modify CSS custom properties
                        </CardDescription>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${openSections.variables ? "rotate-180" : ""}`}
                      />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{cssVariablesCode}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(cssVariablesCode, "css")}
                      >
                        {copiedCode === "css" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">React Integration</CardTitle>
                <CardDescription>
                  Using our theme context in React components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{reactIntegrationCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(reactIntegrationCode, "react")
                    }
                  >
                    {copiedCode === "react" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Showcase */}
          <div>
            <Collapsible
              open={openSections.themes}
              onOpenChange={() => toggleSection("themes")}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          Available Theme Showcase
                        </CardTitle>
                        <CardDescription>
                          Explore all 7 built-in themes
                        </CardDescription>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${openSections.themes ? "rotate-180" : ""}`}
                      />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4">
                  {themes.map((theme) => (
                    <Card key={theme.name} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg ${theme.color} flex-shrink-0`}
                          ></div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{theme.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {theme.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Quick Start Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Start Guide</CardTitle>
                <CardDescription>
                  Get up and running in 3 simple steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Install DaisyUI</h4>
                    <p className="text-sm text-muted-foreground">
                      Add DaisyUI to your Tailwind CSS project
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Choose Base Theme</h4>
                    <p className="text-sm text-muted-foreground">
                      Select from 20+ pre-built themes or create custom
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Implement Switching</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our theme context for dynamic switching
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

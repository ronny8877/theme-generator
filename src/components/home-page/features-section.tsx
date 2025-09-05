"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Code, Download, Layers, Sparkles } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Palette,
      title: "20+ Built-in Themes",
      description:
        "Choose from a vast collection of professionally designed themes, from minimal to vibrant.",
      badge: "Popular",
    },
    {
      icon: Zap,
      title: "CSS Variable Based",
      description:
        "Lightning-fast theme switching using CSS custom properties with zero JavaScript overhead.",
      badge: "Fast",
    },
    {
      icon: Code,
      title: "Component Library Included",
      description:
        "Complete set of DaisyUI components that automatically adapt to your chosen theme.",
      badge: "Complete",
    },
    {
      icon: Layers,
      title: "Tailwind CSS Compatible",
      description:
        "Seamlessly integrates with Tailwind CSS utilities while maintaining theme consistency.",
      badge: "Compatible",
    },
    {
      icon: Sparkles,
      title: "Real-time Theme Switching",
      description:
        "Switch themes instantly without page reloads or flickering using our advanced system.",
      badge: "Instant",
    },
    {
      icon: Download,
      title: "Export Theme Files",
      description:
        "Generate and download custom theme configurations for use in any project.",
      badge: "Portable",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Everything You Need for{" "}
            <span className="text-primary">Dynamic Theming</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Powerful features designed to make theme management effortless and
            theme switching seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

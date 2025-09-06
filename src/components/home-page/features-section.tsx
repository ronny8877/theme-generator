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
import { motion } from "framer-motion";

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
      title: "Includes Color Palettes",
      description:
        "Export complete color palettes for each theme to use in your design tools.",
      badge: "Design",
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
      title: "Export Theme",
      description:
        "Export your theme with tailwind, styled-components, or as standalone CSS.",
      badge: "Portable",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
                Powerful features designed to make theme management effortless
                and theme switching seamless.
              </p>
            </div>
            <motion.div
              className="max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    <Card
                      key={index}
                      className="relative overflow-hidden group hover:shadow-lg transition-shadow border-none"
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
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

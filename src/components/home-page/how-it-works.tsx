"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, Palette, Download, ArrowRight } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: FileImage,
      title: "Choose Template",
      description:
        "Start with one of our professionally designed templates or create from scratch using our intuitive builder.",
      features: [
        "20+ Templates",
        "Industry-specific templates",
        "Mobile-ready layouts",
      ],
    },
    {
      number: 2,
      icon: Palette,
      title: "Customize Colors & Fonts",
      description:
        "Use our advanced editor to customize every aspect of your theme. See changes in real-time as you work.",
      features: [
        "Real-time preview",
        "Advance font and color controls",
        "Typography controls",
      ],
    },
    {
      number: 3,
      icon: Download,
      title: "Export & Deploy",
      description:
        "Export clean, production-ready code that works with any framework. Deploy instantly or integrate with your workflow.",
      features: [
        "CSS variables based",
        "Framework agnostic",
        "Shareable themes",
      ],
    },
  ];

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

  return (
    <section id="how-it-works" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It{" "}
            <span className="bg-base-300 bg-clip-text text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your website&apos;s appearance in just three simple steps.
            No coding required, professional results guaranteed.
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-12 -right-6 w-8 h-0.5 bg-gradient-primary opacity-50 z-10"
                    style={{
                      background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    }}
                  />
                )}

                <Card className="h-full bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 border-base-200">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="text-2xl font-bold text-balance">
                          {step.number}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {step.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center justify-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to get started?
          </h3>
          <p className="text-muted-foreground mb-6">
            Browse our templates or start start customizing your own theme now.
          </p>
          <Button size="lg" className="px-8">
            Browse Templates
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

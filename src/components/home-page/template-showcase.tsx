import React, { useState, useCallback, useMemo, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Lazy load template components for better performance
const TwitterLike = lazy(() =>
  import("@/templates/website").then((module) => ({
    default: module.TwitterLike,
  }))
);
const CookingRecipe = lazy(() =>
  import("@/templates/website").then((module) => ({
    default: module.CookingRecipe,
  }))
);
const EcommerceSite = lazy(() =>
  import("@/templates/website").then((module) => ({
    default: module.EcommerceSite,
  }))
);
const PersonalPortfolio = lazy(() =>
  import("@/templates/website").then((module) => ({
    default: module.PersonalPortfolio,
  }))
);
const SaaSLanding = lazy(() =>
  import("@/templates/website").then((module) => ({
    default: module.SaaSLanding,
  }))
);

// Template loading fallback component
const TemplateSkeleton = React.memo(() => (
  <div className="h-full w-full bg-muted/50 animate-pulse flex items-center justify-center">
    <div className="text-muted-foreground">Loading template...</div>
  </div>
));

TemplateSkeleton.displayName = "TemplateSkeleton";

const TemplateShowCaseComponent: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  // Memoize the template array to prevent recreating on every render
  const WEBSITE_TEMPLATES = useMemo(
    () => [
      { name: "Social Platform", component: TwitterLike },
      { name: "Recipe Website", component: CookingRecipe },
      { name: "E-commerce Store", component: EcommerceSite },
      { name: "Personal Portfolio", component: PersonalPortfolio },
      { name: "SaaS Landing", component: SaaSLanding },
      {
        name: "Browse More",
        component: () => {
          window.location.href = "/templates";
          return null;
        },
      },
    ],
    []
  );

  // Memoize event handlers to prevent child re-renders
  const nextTemplate = useCallback(() => {
    setSelectedTemplate((prev) => (prev + 1) % WEBSITE_TEMPLATES.length);
  }, [WEBSITE_TEMPLATES.length]);

  const prevTemplate = useCallback(() => {
    setSelectedTemplate(
      (prev) => (prev - 1 + WEBSITE_TEMPLATES.length) % WEBSITE_TEMPLATES.length
    );
  }, [WEBSITE_TEMPLATES.length]);

  const handleTemplateSelect = useCallback((index: number) => {
    setSelectedTemplate(index);
  }, []);

  // Memoize current template component to avoid recreating
  const CurrentTemplateComponent = useMemo(
    () => WEBSITE_TEMPLATES[selectedTemplate].component,
    [WEBSITE_TEMPLATES, selectedTemplate]
  );

  return (
    <section id="themes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live Website{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Templates
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of professional website templates. Click on
            template names or use navigation arrows to browse through different
            designs.
          </p>
        </motion.div>

        {/* Theme Preview Area */}
        <div className="max-w-6xl mx-auto">
          {/* Template Selector */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {WEBSITE_TEMPLATES.map((template, index: number) => (
              <Button
                key={template.name}
                variant={selectedTemplate === index ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect(index)}
                className="transition-all duration-300"
              >
                {template.name}
              </Button>
            ))}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden shadow-strong bg-gradient-card border-border/50">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Navigation Arrows - for templates */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTemplate}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTemplate}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTemplate}
                      className="h-[600px] overflow-auto"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Render actual template component with Suspense for lazy loading */}
                      <div className="transform scale-75 origin-top-left w-[133%] h-[133%]">
                        <Suspense fallback={<TemplateSkeleton />}>
                          <CurrentTemplateComponent />
                        </Suspense>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 p-6 bg-muted/30 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            🚀 Professional Website Templates Ready to Use
          </h3>
          <p className="text-muted-foreground">
            Each template is built with modern web technologies and can be
            customized with different themes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export const TemplateShowCase = React.memo(TemplateShowCaseComponent);

TemplateShowCase.displayName = "TemplateShowCase";

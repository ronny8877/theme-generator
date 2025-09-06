"use client";

import { Navigation } from "@/components/home-page/navigation";
import { HeroSection } from "@/components/home-page/hero-section";
import { FeaturesSection } from "@/components/home-page/features-section";
import { ThemeShowcaseSection } from "@/components/home-page/theme-showcase-section";
import { DocumentationSection } from "@/components/home-page/documentation-section";
import { PricingSection } from "@/components/home-page/pricing-section";
import { Footer } from "@/components/home-page/footer";
import { ScrollThemeWrapper } from "@/components/home-page/scroll-theme-wrapper";
import { useEffect } from "react";
import { initHomepageTheme } from "@/store/homepage-store";
import { HowItWorksSection } from "@/components/home-page/how-it-works";
import { FAQSection } from "@/components/home-page/faq-section";
import { TemplateShowCase } from "@/components/home-page/template-showcase";

export default function Home() {
  // Initialize homepage theme on mount
  useEffect(() => {
    initHomepageTheme();
  }, []);

  return (
    <ScrollThemeWrapper>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="space-y-24">
          <section id="hero">
            <HeroSection />
          </section>
          <section id="features">
            <FeaturesSection />
          </section>
          <section id="showcase">
            <ThemeShowcaseSection />
          </section>
          <section id="template-showcase">
            <TemplateShowCase />
          </section>
          <section id="howitworks">
            <HowItWorksSection />
          </section>
          <section id="pricing">
            <PricingSection />
          </section>
          <section id="pricing">
            <FAQSection />
          </section>
        </main>
        <Footer />
      </div>
    </ScrollThemeWrapper>
  );
}

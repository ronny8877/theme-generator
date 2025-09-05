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
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useState } from "react";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for personal projects",
      icon: Star,
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "5 Built-in Themes",
        "Basic Theme Switching",
        "CSS Export",
        "Community Support",
        "Personal Use License",
      ],
      popular: false,
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      description: "Best for professional developers",
      icon: Zap,
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "50+ Built-in Themes",
        "Advanced Theme Editor",
        "Real-time Preview",
        "Priority Support",
        "Commercial License",
        "Custom CSS Variables",
        "Export to Multiple Formats",
      ],
      popular: true,
      cta: "Start Pro Trial",
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      icon: Crown,
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited Themes",
        "White-label Solution",
        "Team Collaboration",
        "Advanced Analytics",
        "Custom Integrations",
        "Dedicated Support",
        "SLA Guarantee",
        "On-premise Deployment",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Choose Your <span className="text-primary">Perfect Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core theming
            features with different levels of customization.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-12" : ""}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <plan.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.monthlyPrice === 0
                        ? ""
                        : isYearly
                          ? "/year"
                          : "/month"}
                    </span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ${Math.round(plan.yearlyPrice / 12)}/month billed annually
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  className={`w-full ${plan.popular ? "" : "variant-outline bg-transparent"}`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">
                    What&apos;s included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">
                  Can I switch between plans?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately, and we&apos;ll prorate any
                  billing differences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-muted-foreground text-sm">
                  We offer a 30-day money-back guarantee for all paid plans. If
                  you&apos;re not satisfied, we&apos;ll provide a full refund.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">
                  Can I use themes commercially?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Pro and Enterprise plans include commercial licenses. The
                  Starter plan is for personal use only.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

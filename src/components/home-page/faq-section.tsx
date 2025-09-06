"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the theme customization work?",
    answer:
      "Our platform allows you to customize every aspect of your website's appearance. You can modify colors, fonts, layouts, and components in real-time using our intuitive interface.",
  },
  {
    question: "Can I use my own custom themes?",
    answer:
      "Yes! You can upload your own custom themes or modify existing ones. Our system supports CSS variables and custom styling to match your brand perfectly.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer a 14-day free trial with full access to all features. No credit card required to get started.",
  },
  {
    question: "How do I export my customized theme?",
    answer:
      "You can export your theme as CSS files, JSON configuration, or integrate directly with popular frameworks like React, Vue, and Angular.",
  },
  {
    question: "What support options are available?",
    answer:
      "We provide 24/7 customer support via chat, email, and phone. Premium users also get access to one-on-one consultation sessions.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes! Our platform supports real-time collaboration with team members. You can share projects, leave comments, and manage permissions.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-24 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Get answers to common questions about our theme customization
            platform
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-base-100 rounded-xl px-6 border-none shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-base-content hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base-content/80 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

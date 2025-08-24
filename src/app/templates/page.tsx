"use client";

import { useState } from "react";
import TemplatePreview from "@/components/TemplatePreview";
import { BlogPost, BlogLanding } from "@/templates/blog";
import { AppleStyleDock } from "@/components/navs/floating-mockup";

const templates = [
  {
    id: "blog-post",
    name: "Blog Post",
    description:
      "A detailed blog post layout with header, content, interactions, and suggested articles",
    component: BlogPost,
  },
  {
    id: "blog-landing",
    name: "Blog Landing Page",
    description:
      "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
    component: BlogLanding,
  },
];

export default function TemplatesDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  return (
    <>
      <div className="h-screen flex">
        {/* Template Selector Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Template Gallery
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Preview and customize templates with different color schemes
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedTemplate.id === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">
              More templates coming soon! This is a preview of the theme system.
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview
            template={selectedTemplate.component}
            templateName={selectedTemplate.name}
            description={selectedTemplate.description}
          />
        </div>
      </div>
      <AppleStyleDock />
    </>
  );
}

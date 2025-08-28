"use client";
import React, { useState } from "react";
import { Palette, Monitor, Tablet, Smartphone } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { BlogPost, BlogLanding } from "@/templates/blog";
import { observer } from "mobx-react-lite";
import { useAppStore, useTemplateStore } from "@/store/hooks";
import { SelectSection } from "./ui/floating-select";

type ViewportSize = "desktop" | "tablet" | "mobile";

const componentMap = {
  "simple-blog-post": BlogPost,
  "simple-blog-landing": BlogLanding,
};

function TemplatePreview() {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");

  const store = useAppStore();
  const templateStore = useTemplateStore();
  console.log("Active Theme CSS Variables:", templateStore.activeTemplateId);

  // Helper function to convert theme object to CSS custom properties
  const applyCSSVariables = (
    theme: Record<string, any>,
  ): React.CSSProperties => {
    const cssVars: Record<string, any> = {};
    Object.entries(theme).forEach(([key, value]) => {
      // CSS custom properties should start with --
      if (key.startsWith("--")) {
        cssVars[key] = value;
      }
    });
    return cssVars;
  };

  const getViewportClasses = () => {
    switch (store.activePreviewDevice) {
      case "mobile":
        return "max-w-[430px] h-[900px]";
      case "tablet":
        return "max-w-[768px] h-full";
      default:
        return "max-w-full h-full";
    }
  };

  const activeComponentId =
    templateStore.activeTemplateId as keyof typeof componentMap;
  const ActiveComponent = componentMap[activeComponentId] || BlogLanding;

  return (
    <div className="h-full flex items-center justify-center  p-5">
      <div
        className={`${getViewportClasses()} w-full @container bg-white rounded-4xl shadow-lg overflow-hidden transition-all duration-400`}
        style={{
          transform:
            viewport === "mobile"
              ? "scale(0.8)"
              : viewport === "tablet"
                ? "scale(0.7)"
                : "scale(1)",
          transformOrigin: "center",
        }}
      >
        <ScrollArea className="w-full h-full ">
          <div
            style={applyCSSVariables(templateStore.active_theme.CssVariables)}
          >
            {/* Use key to force remount on template change */}
            <ActiveComponent key={activeComponentId} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default observer(TemplatePreview);

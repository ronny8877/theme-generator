"use client";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { BlogPost, BlogLanding } from "@/templates/blog";
import {
  TwitterLike,
  CookingRecipe,
  EcommerceSite,
  PersonalPortfolio,
} from "@/templates/website";
import { useAppStore, useTemplateStore, useCssVariables } from "@/store/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { $app, editEditorSettings } from "@/store";
import { motion } from "framer-motion";
import { PictureInPicture } from "lucide-react";
import EditorFloatingWrapper from "./editor/editor-floating-wrapper";
import Editor from "./editor/editor";
type ViewportSize = "desktop" | "tablet" | "mobile";

const componentMap = {
  "simple-blog-post": BlogPost,
  "simple-blog-landing": BlogLanding,
  "twitter-like-social": TwitterLike,
  "cooking-recipe-site": CookingRecipe,
  "ecommerce-store": EcommerceSite,
  "personal-portfolio": PersonalPortfolio,
};

function TemplatePreview() {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const appStore = useAppStore();
  const templateStore = useTemplateStore();
  const cssVariables = useCssVariables();

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
    switch (appStore.activePreviewDevice) {
      case "mobile":
        return "max-w-[430px] h-[860px]";
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
    <div
      ref={animationParent}
      className="h-full flex items-center justify-center gap-5 transition-all duration-400 p-4 flex-nowrap"
    >
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
        <div className="mockup-browser border-base-300 border w-full">
          <div className="mockup-browser-toolbar">
            <div className="input rounded-full">SITENAME</div>
          </div>
          <ScrollArea className="w-full h-[90vh]">
            <div
              ref={parent}
              className="smooth-theme-transition relative"
              style={applyCSSVariables(cssVariables)}
            >
              {/* Use key to force remount on template change */}
              <ActiveComponent key={activeComponentId} />
            </div>
          </ScrollArea>
        </div>
      </div>
      {appStore.editor.is_open && appStore.editor.ui_type === "default" && (
        <Editor />
      )}
      {appStore.editor.is_open && appStore.editor.ui_type === "floating" && (
        <EditorFloatingWrapper />
      )}
    </div>
  );
}

export default TemplatePreview;

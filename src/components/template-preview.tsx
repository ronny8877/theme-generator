"use client";
import React, { useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { BlogPost, BlogLanding } from "@/templates/blog";
import {
  TwitterLike,
  CookingRecipe,
  EcommerceSite,
  PersonalPortfolio,
  SaaSLanding,
  CookbookLanding,
} from "@/templates/website";
import { AIChatUI } from "@/templates/app";
import { ConcertPoster } from "@/templates/poster";
import {
  useCssVariables,
  useActivePreviewDevice,
  useEditor,
  useActiveTemplateId,
  observer,
} from "@/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditorFloatingWrapper from "./editor/editor-floating-wrapper";
import Editor from "./editor/editor";
import { FontInjector } from "./font-injector";
import ThemeInfo from "./navs/theme-info";
import AnimeRealm from "@/templates/website/anime-realm";
import { CSSVariablesInjector } from "./css-variables-injector";
type ViewportSize = "desktop" | "tablet" | "mobile";

const componentMap = {
  "simple-blog-post": BlogPost,
  "simple-blog-landing": BlogLanding,
  "twitter-like-social": TwitterLike,
  "cooking-recipe-site": CookingRecipe,
  "ecommerce-store": EcommerceSite,
  "personal-portfolio": PersonalPortfolio,
  "saas-landing": SaaSLanding,
  "cookbook-landing": CookbookLanding,
  "ai-chat-ui": AIChatUI,
  "concert-poster": ConcertPoster,
  "anime-realm": AnimeRealm,
};

const TemplateRenderer = observer(function TemplateRenderer() {
  const activeTemplateId = useActiveTemplateId();
  const tid = activeTemplateId as keyof typeof componentMap;
  const Cmp = useMemo(() => componentMap[tid] || BlogLanding, [tid]);
  return <Cmp key={tid} />;
});

const TemplatePreview = observer(function TemplatePreview() {
  const [viewport] = useState<ViewportSize>("desktop");
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const previewDevice = useActivePreviewDevice();
  const editor = useEditor();
  const cssVariables = useCssVariables();

  // Only pass CSS variables that actually changed (stable reference)
  const cssVarEntries = useMemo(
    () => Object.entries(cssVariables),
    [cssVariables]
  );
  const stableCssVars = useMemo(
    () => Object.fromEntries(cssVarEntries),
    [cssVarEntries]
  );

  // CSSVariablesInjector will set CSS vars on the template root without rerendering children

  const getViewportClasses = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-[430px] h-[860px]";
      case "tablet":
        return "max-w-[768px] h-full";
      default:
        return "max-w-full h-full";
    }
  };

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
          <div className="mockup-browser-toolbar relative">
            <ThemeInfo />
            {/* <div className="input rounded-full">SITENAME</div> */}
          </div>
          <ScrollArea className="w-full h-[92vh]">
            <div
              ref={parent}
              id="template-root"
              className="smooth-theme-transition template-content relative"
            >
              <CSSVariablesInjector
                targetSelector="#template-root"
                variables={stableCssVars as never}
              />
              <FontInjector />
              <TemplateRenderer />
            </div>
          </ScrollArea>
        </div>
      </div>
      {editor.is_open && editor.ui_type === "default" && <Editor />}
      {editor.is_open && editor.ui_type === "floating" && (
        <EditorFloatingWrapper />
      )}
    </div>
  );
});

export default TemplatePreview;

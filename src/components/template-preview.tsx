"use client";
import React, { useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import dynamic from "next/dynamic";
import { useCssVariables } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $activePreviewDeviceSel, $editorUiType, $isEditorOpen } from "@/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditorFloatingWrapper from "./editor/editor-floating-wrapper";
import Editor from "./editor/editor";
import GradientToolFloating from "./gradient-tool-floating";
import TypographyToolFloating from "./typography-tool-floating";
import { FontInjector } from "./font-injector";
import ThemeInfo from "./navs/theme-info";
import { CSSVariablesInjector } from "./css-variables-injector";
import { useStore as useNano } from "@nanostores/react";
import { $activeTemplateId as $activeTemplateIdSel } from "@/store";
import ExportDialogContainer from "@/components/export-dialog-container";
import ShareDialogContainer from "@/components/share-dialog-container";
type ViewportSize = "desktop" | "tablet" | "mobile";

export type TemplatePreviewProps = {
  hideEditor?: boolean;
  /** Whether to include global export/share containers (default true). */
  includeGlobals?: boolean;
  /** Optional: explicitly set which template id to render (overrides store). */
  templateId?: keyof typeof dynamicComponentMap;
  /** Optional: provide a React component to render instead of a template id. */
  component?: React.ComponentType;
};

// A simple shimmering skeleton to show while templates load
function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-4">
      <div className="h-10 w-1/3 rounded-md bg-base-300/60" />
      <div className="h-4 w-2/3 rounded bg-base-300/60" />
      <div className="h-4 w-1/2 rounded bg-base-300/60" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="h-48 rounded-xl bg-base-300/60" />
        <div className="h-48 rounded-xl bg-base-300/60" />
        <div className="h-48 rounded-xl bg-base-300/60" />
        <div className="h-48 rounded-xl bg-base-300/60" />
      </div>
    </div>
  );
}

export const dynamicComponentMap = {
  "simple-blog-post": dynamic(() => import("@/templates/blog/blog-post"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  "techcore-blog": dynamic(() => import("@/templates/blog/techcore-blog"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  "simple-blog-landing": dynamic(
    () => import("@/templates/blog/blog-landing"),
    { ssr: false, loading: LoadingSkeleton },
  ),
  "twitter-like-social": dynamic(
    () => import("@/templates/website/twitter-like"),
    { ssr: false, loading: LoadingSkeleton },
  ),
  "cooking-recipe-site": dynamic(
    () => import("@/templates/website/cooking-recipe"),
    { ssr: false, loading: LoadingSkeleton },
  ),
  "ecommerce-store": dynamic(() => import("@/templates/website/ecommerce"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  "personal-portfolio": dynamic(
    () => import("@/templates/website/personal-portfolio"),
    { ssr: false, loading: LoadingSkeleton },
  ),
  "saas-landing": dynamic(() => import("@/templates/website/saas-landing"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  "cookbook-landing": dynamic(
    () => import("@/templates/website/cookbook-landing"),
    { ssr: false, loading: LoadingSkeleton },
  ),
  "ai-chat-ui": dynamic(() => import("@/templates/app/ai-chat-ui"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  "anime-realm": dynamic(() => import("@/templates/website/anime-realm"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
  landing: dynamic(() => import("@/templates/website/landing"), {
    ssr: false,
    loading: LoadingSkeleton,
  }),
} as const;

type TemplateId = keyof typeof dynamicComponentMap;

const TemplateRenderer = React.memo(function TemplateRenderer({
  overrideComponent,
  forcedTemplateId,
}: {
  overrideComponent?: React.ComponentType;
  forcedTemplateId?: TemplateId | undefined;
}) {
  const tidFromStore = useNano($activeTemplateIdSel) as TemplateId | undefined;
  // Decide which template id to use: explicit prop > store > default landing
  const effectiveId: TemplateId = (forcedTemplateId ||
    tidFromStore ||
    "landing") as TemplateId;

  const Cmp = useMemo(() => {
    if (overrideComponent) return overrideComponent;
    return dynamicComponentMap[effectiveId] || dynamicComponentMap["landing"];
  }, [overrideComponent, effectiveId]);

  return <Cmp key={(overrideComponent ? "override" : effectiveId) as string} />;
});

function TemplatePreviewBase({
  hideEditor = false,
  includeGlobals = true,
  templateId,
  component,
}: TemplatePreviewProps) {
  const [viewport] = useState<ViewportSize>("desktop");
  const [parent] = useAutoAnimate<HTMLDivElement>();
  // const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const previewDevice = useStore($activePreviewDeviceSel);
  const editorUiType = useStore($editorUiType);
  const isEditorOpen = useStore($isEditorOpen);
  const cssVariables = useCssVariables();
  // Only pass CSS variables that actually changed (stable reference)
  const stableCssVars = useMemo(() => ({ ...cssVariables }), [cssVariables]);

  // CSSVariablesInjector will set CSS vars on the template root without rerendering children

  const getViewportClasses = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-[430px] w-[430px] h-full 2xl:max-h-[932px]";
      case "tablet":
        return "max-w-[768px] h-full h-[760px] 2xl:h-[932px]";
      default:
        return "max-w-full h-full";
    }
  };

  return (
    <div className="h-full flex items-center justify-center gap-5 transition-all duration-400 flex-nowrap">
      <div
        className={`${getViewportClasses()} w-full @container bg-base-100 rounded-4xl shadow-lg overflow-hidden transition-all duration-400`}
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
          <ScrollArea
            className={`w-full ${previewDevice === "mobile" ? "h-[760px] 2xl:h-[932px]" : "h-[95vh]"}`}
          >
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
              {/* Start with loading state; dynamic() will swap in the template when ready */}
              <TemplateRenderer
                overrideComponent={component}
                forcedTemplateId={templateId}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
      {!hideEditor && isEditorOpen && editorUiType === "default" && <Editor />}
      {!hideEditor && isEditorOpen && editorUiType === "floating" && (
        <EditorFloatingWrapper />
      )}

      {/* Floating Tool Panels */}
      <GradientToolFloating />
      <TypographyToolFloating />

      {/* Global export/share dialogs (optional) */}
      {includeGlobals && <ExportDialogContainer />}
      {includeGlobals && <ShareDialogContainer />}
    </div>
  );
}

export default React.memo(TemplatePreviewBase);

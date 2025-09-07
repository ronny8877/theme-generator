"use client";
import { ToolSelect } from "@/components/navs/tool-select";
import DeviceSelect from "@/components/navs/device-select";
import ConditionalContent from "@/components/conditional-content";
import MainContentArea from "@/components/main-content-area";
import EditorToggle from "@/components/editor-toggle";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { decodeParamToState, colorsFromCsv } from "@/lib/share-url";
import {
  useActiveTemplateId,
  useTemplateActions,
  useAppActions,
} from "@/store/hooks";
import { $themeColors, editEditorSettings } from "@/store/nano-store";
import {
  loadGoogleFont,
  updateBodyFont,
  updateHeadingFont,
} from "@/store/font-store";
// import ThemeInfo from "@/components/navs/theme-info";

function TemplatesPageInner() {
  const search = useSearchParams();
  const encoded = search.get("theme") || "";
  const { setActiveTemplateById, updateColorScheme } = useTemplateActions();
  const { setActiveTool } = useAppActions();
  const activeTemplateId = useActiveTemplateId();

  useEffect(() => {
    // Ensure the editor is open when entering edit mode
    editEditorSettings({ is_open: true });

    if (!encoded) return;
    const state = decodeParamToState(encoded);
    if (!state) return;
    if (state.tool) setActiveTool(state.tool);
    if (state.templateId && state.templateId !== activeTemplateId) {
      setActiveTemplateById(state.templateId);
    }
    const next = colorsFromCsv(state.colorsCsv, $themeColors.get());
    if (next) updateColorScheme(next);
    if (state.fonts.headingFamily) {
      loadGoogleFont(state.fonts.headingFamily).catch(() => {});
      updateHeadingFont({
        family: state.fonts.headingFamily,
        weight: state.fonts.headingWeight || "400",
      });
    }
    if (state.fonts.bodyFamily) {
      loadGoogleFont(state.fonts.bodyFamily).catch(() => {});
      updateBodyFont({
        family: state.fonts.bodyFamily,
        weight: state.fonts.bodyWeight || "400",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded]);

  return (
    <>
      {/* <ThemeInfo /> */}
      <ConditionalContent />
      <DeviceSelect />
      <div className="h-screen flex">
        {/* Main Content Area - Template Preview or Full-Screen Tools */}
        <div className="flex-1">
          <MainContentArea className="h-full" />
        </div>
      </div>
      <ToolSelect />
      {/* <FloatingThemeSelector /> */}
      <EditorToggle />
    </>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm opacity-70">Loading…</div>}>
      {/* Structured data for template list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              "landing",
              "simple-blog-post",
              "simple-blog-landing",
              "twitter-like-social",
              "cooking-recipe-site",
              "ecommerce-store",
              "personal-portfolio",
              "saas-landing",
              "cookbook-landing",
              "ai-chat-ui",
              "concert-poster",
              "anime-realm",
            ].map((id, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://livetheme.app/preview/${id}`,
              name: id,
            })),
          }),
        }}
      />
      <TemplatesPageInner />
    </Suspense>
  );
}

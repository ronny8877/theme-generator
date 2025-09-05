'use client';
import TemplatePreview from "@/components/template-preview";
import { ToolSelect } from "@/components/navs/tool-select";
import DeviceSelect from "@/components/navs/device-select";
import TemplateSelector from "@/components/template-selector";
import EditorToggle from "@/components/editor-toggle";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import type { Metadata } from "next";
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
      <TemplateSelector />
      <DeviceSelect />
      <div className="h-screen flex">
        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview />
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
    <Suspense fallback={
    <div className="p-4 text-sm opacity-70">Loading…</div>}>
      <TemplatesPageInner />
    </Suspense>
  );
}

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { decodeParamToState, colorsFromCsv } from "@/lib/share-url";
import {
  useCssVariables,
  useTemplateActions,
  useAppActions,
} from "@/store/hooks";
import { CSSVariablesInjector } from "@/components/css-variables-injector";
import { FontInjector } from "@/components/font-injector";
import ExportDialogContainer from "@/components/export-dialog-container";
import ShareDialogContainer from "@/components/share-dialog-container";
import { $themeColors } from "@/store/nano-store";
import {
  updateHeadingFont,
  updateBodyFont,
  loadGoogleFont,
} from "@/store/font-store";
import { useActiveTemplateId } from "@/store/hooks";
import dynamic from "next/dynamic";
import { editEditorSettings } from "@/store/nano-store";
import { dynamicComponentMap } from "@/components/template-preview";

// Lightweight loader for template chunks
function LoadingTemplate() {
  return (
    <div className="w-full h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-base-300 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        {/* Loading text with subtle animation */}
        <div className="flex items-center gap-1 text-base-content/70">
          <span>Loading template</span>
          <div className="flex gap-1">
            <div
              className="w-1 h-1 bg-current rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-current rounded-full animate-pulse"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-current rounded-full animate-pulse"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingActions({ encoded }: { encoded: string }) {
  const router = useRouter();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3">
      <button
        className="btn btn-primary rounded-full shadow-lg"
        onClick={() =>
          router.push(
            `/templates${encoded ? `?theme=${encodeURIComponent(encoded)}` : ""}`,
          )
        }
      >
        Edit
      </button>
      <button
        className="btn btn-outline rounded-full"
        onClick={async () => {
          const { openExport } = await import("@/store/ui-store");
          openExport();
        }}
      >
        Export
      </button>
    </div>
  );
}

export default function ClientPreview() {
  const params = useParams<{ template: string }>();
  const search = useSearchParams();
  const encoded = search.get("theme") || "";
  const cssVariables = useCssVariables();
  const { setActiveTemplateById, updateColorScheme } = useTemplateActions();
  const { setActiveTool } = useAppActions();
  const activeTemplateId = useActiveTemplateId();
  const router = useRouter();

  // Decode theme param synchronously to compute the target template id immediately
  const decodedState = useMemo(
    () => (encoded ? decodeParamToState(encoded) : null),
    [encoded],
  );
  const targetTemplateId = useMemo(() => {
    // Prefer encoded state, then URL param, then store, finally fallback
    return (
      decodedState?.templateId ||
      params?.template ||
      activeTemplateId ||
      "landing"
    );
  }, [decodedState?.templateId, params?.template, activeTemplateId]);

  // For UX: show small loading state while we apply URL state/actions on first paint
  const [applying, setApplying] = useState(true);
  // Failsafe: show not-found if template id is unknown after a grace period
  const isKnownTemplate = (id: string) => id in dynamicComponentMap;
  const [notFound, setNotFound] = useState(false);

  // apply from URL once
  // Intentionally run when URL changes only; actions are stable across renders
  useEffect(() => {
    // Ensure editor is hidden for dedicated preview
    editEditorSettings({ is_open: false });
    // Always reflect the target template in global store so other UI stays consistent
    if (targetTemplateId && activeTemplateId !== targetTemplateId) {
      setActiveTemplateById(targetTemplateId);
    }
    if (!encoded) {
      setApplying(false);
      return;
    }
    const state = decodeParamToState(encoded);
    if (!state) {
      setApplying(false);
      return;
    }
    if (state.tool) setActiveTool(state.tool);
    if (state.templateId && state.templateId !== activeTemplateId) {
      setActiveTemplateById(state.templateId);
    }
    // colors
    const next = colorsFromCsv(state.colorsCsv, $themeColors.get());
    if (next) updateColorScheme(next);
    // fonts
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
    setApplying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded, targetTemplateId]);

  // Failsafe timer for unknown templates
  useEffect(() => {
    if (!targetTemplateId) return;
    if (isKnownTemplate(targetTemplateId)) {
      setNotFound(false);
      return;
    }
    const t = setTimeout(() => setNotFound(true), 1200);
    return () => clearTimeout(t);
  }, [targetTemplateId]);

  const stableCssVars = useMemo(() => ({ ...cssVariables }), [cssVariables]);
  type TemplateId = keyof typeof dynamicComponentMap;
  const templateId = (targetTemplateId || "landing") as TemplateId;
  const Cmp = dynamicComponentMap[templateId];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div
        id="template-root"
        className="smooth-theme-transition template-content relative"
      >
        <CSSVariablesInjector
          targetSelector="#template-root"
          variables={stableCssVars as never}
        />
        <FontInjector />
        {notFound ? (
          <div className="w-full h-[70vh] grid place-items-center p-6 text-center">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold mb-2">
                Template not found
              </h2>
              <p className="text-base-content/70 mb-6">
                The shared link references a template that doesn’t exist. Try
                again or load the default template.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="btn btn-outline"
                  onClick={() => router.refresh()}
                >
                  Try again
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/preview/landing")}
                >
                  Load default
                </button>
              </div>
            </div>
          </div>
        ) : !Cmp || applying ? (
          <div className="w-full h-[70vh] grid place-items-center">
            <div className="flex flex-col items-center gap-4">
              {/* Animated spinner */}
              <div className="relative">
                <div className="w-12 h-12 border-4 border-base-300 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
              </div>
              {/* Loading text with subtle animation */}
              <div className="flex items-center gap-1 text-base-content/70">
                <span>Loading template</span>
                <div className="flex gap-1">
                  <div
                    className="w-1 h-1 bg-current rounded-full animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-current rounded-full animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-current rounded-full animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Cmp />
        )}
      </div>
      <FloatingActions encoded={encoded} />
      <ExportDialogContainer />
      <ShareDialogContainer />
    </div>
  );
}

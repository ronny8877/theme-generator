"use client";
import React, { useEffect, useMemo } from "react";
import type { Metadata } from "next";
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
import { BlogPost, BlogLanding } from "@/templates/blog";
import {
  TwitterLike,
  CookingRecipe,
  EcommerceSite,
  PersonalPortfolio,
  SaaSLanding,
  CookbookLanding,
  Landing,
} from "@/templates/website";
import { AIChatUI } from "@/templates/app";
import { ConcertPoster } from "@/templates/poster";
import AnimeRealm from "@/templates/website/anime-realm";
import { editEditorSettings } from "@/store/nano-store";

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
  landing: Landing,
} as const;

export default function PreviewPage() {
  const params = useParams<{ template: string }>();
  const search = useSearchParams();
  const encoded = search.get("theme") || "";
  const cssVariables = useCssVariables();
  const { setActiveTemplateById, updateColorScheme } = useTemplateActions();
  const { setActiveTool } = useAppActions();
  const activeTemplateId = useActiveTemplateId();

  // apply from URL once
  // Intentionally run when URL changes only; actions are stable across renders
  useEffect(() => {
    // Ensure editor is hidden for dedicated preview
    editEditorSettings({ is_open: false });
    if (params?.template && activeTemplateId !== params.template) {
      setActiveTemplateById(params.template);
    }
    if (!encoded) return;
    const state = decodeParamToState(encoded);
    if (!state) return;
    if (state.tool) setActiveTool(state.tool);
    if (state.templateId && state.templateId !== params.template) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded, params?.template]);

  const stableCssVars = useMemo(() => ({ ...cssVariables }), [cssVariables]);

  const TID = (activeTemplateId ||
    params?.template ||
    "landing") as keyof typeof componentMap;
  const Cmp = componentMap[TID] || BlogLanding;

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
        <Cmp />
      </div>
      <FloatingActions encoded={encoded} />
      <ExportDialogContainer />
      <ShareDialogContainer />
    </div>
  );
}

export function generateMetadata(
  { params }: { params: { template: string } }
): Metadata {
  const templateId = params.template;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://livetheme.app";
  const titleMap: Record<string, string> = {
    "simple-blog-post": "Blog Post Template Preview",
    "simple-blog-landing": "Blog Landing Template Preview",
    "twitter-like-social": "Social App Template Preview",
    "cooking-recipe-site": "Recipe Website Template Preview",
    "ecommerce-store": "E-commerce Template Preview",
    "personal-portfolio": "Portfolio Template Preview",
    "saas-landing": "SaaS Landing Template Preview",
    "cookbook-landing": "Cookbook Landing Template Preview",
    "ai-chat-ui": "AI Chat UI Template Preview",
    "concert-poster": "Concert Poster Template Preview",
    "anime-realm": "Anime Realm Fan Site Preview",
    landing: "Landing Template Preview",
  };
  const name = titleMap[templateId] || "Template Preview";
  const title = `${name} – LiveTheme`;
  const url = `${site}/preview/${templateId}`;
  const image = `${site}/preview.png`;
  return {
    title,
    description: "Live preview of a customizable template from LiveTheme.",
    alternates: { canonical: url },
    openGraph: { url, title, images: [image] },
    twitter: { title, images: [image], card: "summary_large_image" },
  };
}

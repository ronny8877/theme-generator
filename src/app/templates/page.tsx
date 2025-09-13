"use client";
import { ToolSelect } from "@/components/navs/tool-select";
import DeviceSelect from "@/components/navs/device-select";
import ConditionalContent from "@/components/conditional-content";
import MainContentArea from "@/components/main-content-area";
import EditorToggle from "@/components/editor-toggle";
import { FloatingAccessibilityPreview } from "@/components/floating-accessibility-preview";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useCallback, useRef } from "react";
import { decodeParamToState, colorsFromCsv } from "@/lib/share-url";
import {
  useActiveTemplateId,
  useTemplateActions,
  useAppActions,
} from "@/store/hooks";
import { $themeColors, editEditorSettings } from "@/store/nano-store";
import { useStore } from "@nanostores/react";
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
  const themeColors = useStore($themeColors);
  const themeColorsRef = useRef(themeColors);
  const updateColorSchemeRef = useRef(updateColorScheme);

  // Update refs on each render
  themeColorsRef.current = themeColors;
  updateColorSchemeRef.current = updateColorScheme;

  // Stable callback for accessibility color changes
  const handleAccessibilityColorsChange = useCallback((colors: string[]) => {
    // Convert the colors array back to a color scheme object
    const colorKeys = Object.keys(themeColorsRef.current);
    const newColorScheme: Record<string, string> = {};

    colors.forEach((color, index) => {
      if (colorKeys[index]) {
        newColorScheme[colorKeys[index]] = color;
      }
    });

    // Update the theme with simulated colors for live preview
    updateColorSchemeRef.current(newColorScheme);
  }, []); // Empty deps to prevent recreation

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
    <div className="min-h-screen bg-base-200">
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
      <FloatingAccessibilityPreview
        colors={Object.values(themeColors)}
        onColorsChange={handleAccessibilityColorsChange}
      />
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm opacity-70">Loading…</div>}>
      {/* Enhanced structured data for template gallery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Free Website Templates - LiveTheme",
              description:
                "Collection of customizable website templates for blogs, portfolios, e-commerce, and more",
              numberOfItems: 12,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/simple-blog-post",
                    name: "Blog Post Template",
                    description:
                      "Professional blog post template with responsive design, clean typography, and comment sections",
                    url: "https://livetheme.app/preview/simple-blog-post",
                    keywords:
                      "blog template, blog design, responsive blog, article template",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/simple-blog-landing",
                    name: "Blog Landing Page Template",
                    description:
                      "Modern blog homepage with featured posts, trending content, and newsletter signup",
                    url: "https://livetheme.app/preview/simple-blog-landing",
                    keywords:
                      "blog landing page, blog homepage, content blog, blogger template",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/twitter-like-social",
                    name: "Social Media App Template",
                    description:
                      "Twitter-inspired social media platform with posts, trending topics, and user interactions",
                    url: "https://livetheme.app/preview/twitter-like-social",
                    keywords:
                      "social media template, twitter clone, social app UI, social platform design",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/cooking-recipe-site",
                    name: "Recipe Website Template",
                    description:
                      "Beautiful recipe platform with ingredients, instructions, and nutrition facts",
                    url: "https://livetheme.app/preview/cooking-recipe-site",
                    keywords:
                      "recipe website, food blog template, cooking site, culinary blog",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/ecommerce-store",
                    name: "E-commerce Store Template",
                    description:
                      "Complete online store with product listings, shopping cart, and checkout flow",
                    url: "https://livetheme.app/preview/ecommerce-store",
                    keywords:
                      "ecommerce template, online store, shop template, retail website",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/personal-portfolio",
                    name: "Personal Portfolio Template",
                    description:
                      "Professional portfolio for developers and creatives with project showcase",
                    url: "https://livetheme.app/preview/personal-portfolio",
                    keywords:
                      "portfolio template, developer portfolio, personal website, creative portfolio",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 7,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/saas-landing",
                    name: "SaaS Landing Page Template",
                    description:
                      "Modern SaaS landing page with features, pricing, and testimonials",
                    url: "https://livetheme.app/preview/saas-landing",
                    keywords:
                      "saas landing page, software landing, tech startup, saas template",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/cookbook-landing",
                    name: "Cookbook Landing Page Template",
                    description:
                      "Recipe discovery platform with search, popular recipes, and seasonal picks",
                    url: "https://livetheme.app/preview/cookbook-landing",
                    keywords:
                      "cookbook website, recipe platform, food discovery, culinary platform",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 9,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/ai-chat-ui",
                    name: "AI Chat Interface Template",
                    description:
                      "Modern AI chat interface with conversation history and message formatting",
                    url: "https://livetheme.app/preview/ai-chat-ui",
                    keywords:
                      "ai chat template, chatbot ui, ai interface, virtual assistant",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 10,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/anime-realm",
                    name: "Anime Fan Site Template",
                    description:
                      "Cyberpunk-inspired anime fan site with character profiles and wallpapers",
                    url: "https://livetheme.app/preview/anime-realm",
                    keywords:
                      "anime website, fan site template, anime community, otaku site",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 11,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/techcore-blog",
                    name: "Tech Blog Template",
                    description:
                      "Professional technology blog with modern design and developer-focused content",
                    url: "https://livetheme.app/preview/techcore-blog",
                    keywords:
                      "tech blog, technology blog, developer blog, programming blog",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 12,
                  item: {
                    "@type": "WebPageElement",
                    "@id": "https://livetheme.app/preview/landing",
                    name: "Landing Page Template",
                    description:
                      "Versatile landing page with Material You design and customizable widgets",
                    url: "https://livetheme.app/preview/landing",
                    keywords:
                      "landing page template, business landing, product page, startup website",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Free Website Templates",
              description:
                "Customizable website templates for various industries and use cases",
              url: "https://livetheme.app/templates",
              mainEntity: {
                "@type": "ItemList",
                name: "Website Template Collection",
              },
            },
          ]),
        }}
      />
      <TemplatesPageInner />
    </Suspense>
  );
}

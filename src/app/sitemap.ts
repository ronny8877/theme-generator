import type { MetadataRoute } from "next";

const routes: string[] = [
  "/",
  "/templates",
  "/preview/landing",
  "/preview/simple-blog-post",
  "/preview/simple-blog-landing",
  "/preview/twitter-like-social",
  "/preview/cooking-recipe-site",
  "/preview/ecommerce-store",
  "/preview/personal-portfolio",
  "/preview/saas-landing",
  "/preview/cookbook-landing",
  "/preview/ai-chat-ui",
  "/preview/concert-poster",
  "/preview/anime-realm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://livetheme.app");
  const now = new Date();
  return routes.map((p) => ({
    url: new URL(p, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.6,
  }));
}

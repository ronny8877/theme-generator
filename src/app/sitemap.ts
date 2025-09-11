import type { MetadataRoute } from "next";

// Enhanced route configuration with SEO priorities
const routeConfig: Array<{
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}> = [
  // Core pages - highest priority
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/templates", priority: 0.9, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  
  // Category pages - high priority for SEO
  { path: "/templates/business", priority: 0.85, changeFrequency: "weekly" },
  { path: "/templates/blog", priority: 0.85, changeFrequency: "weekly" },
  
  // Popular template categories - high priority
  { path: "/preview/simple-blog-post", priority: 0.8, changeFrequency: "monthly" },
  { path: "/preview/personal-portfolio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/preview/saas-landing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/preview/ecommerce-store", priority: 0.8, changeFrequency: "monthly" },
  
  // Blog and content templates - medium-high priority
  { path: "/preview/simple-blog-landing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/preview/techcore-blog", priority: 0.7, changeFrequency: "monthly" },
  { path: "/preview/cooking-recipe-site", priority: 0.7, changeFrequency: "monthly" },
  { path: "/preview/cookbook-landing", priority: 0.7, changeFrequency: "monthly" },
  
  // Specialized templates - medium priority
  { path: "/preview/twitter-like-social", priority: 0.6, changeFrequency: "monthly" },
  { path: "/preview/ai-chat-ui", priority: 0.6, changeFrequency: "monthly" },
  { path: "/preview/landing", priority: 0.6, changeFrequency: "monthly" },
  
  // Niche templates - lower priority but still indexed
  { path: "/preview/anime-realm", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://livetheme.app",
  );
  const now = new Date();
  
  return routeConfig.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

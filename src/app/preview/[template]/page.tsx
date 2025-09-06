import React from "react";
import type { Metadata } from "next";
import ClientPreview from "./ClientPreview";

export default function PreviewPage() {
  return <ClientPreview />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ template: string }>;
}): Promise<Metadata> {
  const { template: templateId } = await params;
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

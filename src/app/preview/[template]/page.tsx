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

  // Enhanced SEO metadata for each template
  const templateSEO: Record<
    string,
    { title: string; description: string; keywords: string[] }
  > = {
    "simple-blog-post": {
      title: "Free Blog Post Template | Responsive Blog Design | LiveTheme",
      description:
        "Professional blog post template with responsive design. Customize colors, fonts, and layouts. Features clean typography, comment sections, and related articles. Free to use and export.",
      keywords: [
        "blog post template",
        "blog design",
        "responsive blog",
        "blog layout",
        "content management",
        "blog theme",
        "article template",
        "writing template",
      ],
    },
    "simple-blog-landing": {
      title: "Blog Landing Page Template | Modern Blog Homepage | LiveTheme",
      description:
        "Modern blog landing page template with featured posts, trending content, and newsletter signup. Fully customizable blog homepage design. Perfect for content creators and bloggers.",
      keywords: [
        "blog landing page",
        "blog homepage",
        "blog template",
        "content blog",
        "blog layout",
        "blog design",
        "blogger template",
        "blog theme",
      ],
    },
    "twitter-like-social": {
      title: "Social Media App Template | Twitter-like UI Design | LiveTheme",
      description:
        "Professional social media platform template inspired by Twitter. Features posts, trending topics, user profiles, and real-time interactions. Customizable social app UI design.",
      keywords: [
        "social media template",
        "twitter clone",
        "social app UI",
        "social platform design",
        "social network template",
        "microblogging template",
        "social feed design",
      ],
    },
    "cooking-recipe-site": {
      title:
        "Recipe Website Template | Food Blog Design | Cooking Site | LiveTheme",
      description:
        "Beautiful recipe website template with ingredients lists, cooking instructions, nutrition facts, and photo galleries. Perfect for food bloggers and recipe sharing sites.",
      keywords: [
        "recipe website",
        "food blog template",
        "cooking site",
        "recipe template",
        "food website design",
        "culinary blog",
        "recipe card",
        "cooking blog",
      ],
    },
    "ecommerce-store": {
      title:
        "E-commerce Store Template | Online Shop Design | Retail Website | LiveTheme",
      description:
        "Complete e-commerce store template with product listings, shopping cart, checkout flow, and payment integration. Professional online store design for retail businesses.",
      keywords: [
        "ecommerce template",
        "online store",
        "shop template",
        "retail website",
        "ecommerce design",
        "shopping cart",
        "product catalog",
        "online business",
      ],
    },
    "personal-portfolio": {
      title:
        "Personal Portfolio Template | Developer Portfolio | Creative Portfolio | LiveTheme",
      description:
        "Professional portfolio template for developers, designers, and creatives. Showcase projects, skills, experience, and contact information with modern responsive design.",
      keywords: [
        "portfolio template",
        "developer portfolio",
        "personal website",
        "creative portfolio",
        "professional portfolio",
        "resume website",
        "showcase template",
        "freelancer portfolio",
      ],
    },
    "saas-landing": {
      title:
        "SaaS Landing Page Template | Software Landing Page | Tech Startup | LiveTheme",
      description:
        "Modern SaaS landing page template with features showcase, pricing tables, testimonials, and conversion-optimized design. Perfect for software companies and tech startups.",
      keywords: [
        "saas landing page",
        "software landing",
        "tech startup",
        "saas template",
        "app landing page",
        "software marketing",
        "product launch",
        "saas website",
      ],
    },
    "cookbook-landing": {
      title:
        "Cookbook Landing Page | Recipe Discovery Site | Food Platform | LiveTheme",
      description:
        "Elegant cookbook landing page template for recipe discovery platforms. Features recipe search, popular dishes, seasonal picks, and food photography galleries.",
      keywords: [
        "cookbook website",
        "recipe platform",
        "food discovery",
        "cookbook template",
        "recipe collection",
        "culinary platform",
        "food blog",
        "recipe finder",
      ],
    },
    "ai-chat-ui": {
      title:
        "AI Chat Interface Template | Chatbot UI Design | AI Assistant | LiveTheme",
      description:
        "Modern AI chat interface template with conversation history, message formatting, and intelligent responses. Perfect for AI chatbots, virtual assistants, and customer support.",
      keywords: [
        "ai chat template",
        "chatbot ui",
        "ai interface",
        "chat design",
        "virtual assistant",
        "ai conversation",
        "chatbot template",
        "ai customer service",
      ],
    },
    "anime-realm": {
      title:
        "Anime Fan Site Template | Anime Website Design | Otaku Community | LiveTheme",
      description:
        "Cyberpunk-inspired anime fan site template with character profiles, story highlights, wallpapers, and merchandise links. Perfect for anime communities and fan sites.",
      keywords: [
        "anime website",
        "fan site template",
        "anime community",
        "otaku site",
        "anime blog",
        "manga website",
        "anime fan page",
        "anime design",
      ],
    },
    "techcore-blog": {
      title:
        "Tech Blog Template | Technology News Site | Developer Blog | LiveTheme",
      description:
        "Professional technology blog template with modern design, featured articles, trending tech news, and developer-focused content. Perfect for tech publications and developer blogs.",
      keywords: [
        "tech blog",
        "technology blog",
        "developer blog",
        "tech news",
        "programming blog",
        "software blog",
        "tech publication",
        "technology website",
      ],
    },
    landing: {
      title:
        "Landing Page Template | Modern Website Design | Business Landing | LiveTheme",
      description:
        "Versatile landing page template with Material You inspired design, customizable widgets, and responsive layout. Perfect for businesses, apps, and product launches.",
      keywords: [
        "landing page template",
        "website template",
        "business landing",
        "product page",
        "app landing",
        "startup website",
        "company homepage",
        "web design",
      ],
    },
  };

  const templateData = templateSEO[templateId];
  const fallback = {
    title: "Template Preview – LiveTheme",
    description: "Live preview of a customizable template from LiveTheme.",
    keywords: ["template preview", "web template", "website design"],
  };

  const { title, description, keywords } = templateData || fallback;
  const url = `${site}/preview/${templateId}`;
  const image = `${site}/preview.png`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      images: [{ url: image, alt: `${title} preview` }],
      type: "website",
    },
    twitter: {
      title,
      description,
      images: [image],
      card: "summary_large_image",
    },
  };
}

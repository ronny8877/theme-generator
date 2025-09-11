import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Templates | Customizable Templates | LiveTheme",
  description: "Discover 12+ free, customizable website templates including blog templates, portfolio designs, e-commerce stores, SaaS landing pages, and more. Edit colors, fonts, and layouts in real-time.",
  keywords: [
    "free website templates",
    "customizable templates", 
    "blog templates",
    "portfolio templates",
    "ecommerce templates",
    "saas landing pages",
    "responsive templates",
    "web design templates",
    "html templates",
    "css templates",
    "tailwind templates",
    "daisyui templates",
    "business templates",
    "startup templates",
    "developer templates",
    "designer templates",
    "food blog templates",
    "recipe website templates",
    "social media templates",
    "ai chat templates",
    "anime website templates",
    "tech blog templates"
  ],
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Free Website Templates | Customizable Templates | LiveTheme",
    description: "Discover 12+ free, customizable website templates. Edit colors, fonts, and layouts in real-time. Perfect for blogs, portfolios, e-commerce, and more.",
    url: "https://livetheme.app/templates",
    type: "website",
    images: [
      {
        url: "https://livetheme.app/preview.png",
        alt: "LiveTheme customizable website templates gallery"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Templates | Customizable Templates | LiveTheme", 
    description: "Discover 12+ free, customizable website templates. Edit colors, fonts, and layouts in real-time.",
    images: ["https://livetheme.app/preview.png"]
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

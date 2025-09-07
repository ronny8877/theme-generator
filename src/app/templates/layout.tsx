import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates – LiveTheme",
  description:
    "Browse live, responsive templates for DaisyUI & Tailwind. Preview your theme instantly on blogs, portfolios, SaaS, and more.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Templates – LiveTheme",
    url: "https://livetheme.app/templates",
    images: ["https://livetheme.app/preview.png"],
  },
  twitter: {
    title: "Templates – LiveTheme",
    card: "summary_large_image",
    images: ["https://livetheme.app/preview.png"],
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

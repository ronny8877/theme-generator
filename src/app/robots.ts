import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"], // Block API routes and admin if they exist
      },
    ],
    sitemap:
      (process.env.NEXT_PUBLIC_SITE_URL || "https://livetheme.app") +
      "/sitemap.xml",
  };
}

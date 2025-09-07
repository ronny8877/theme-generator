import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import OneTimeNotice from "@/components/one-time-notice";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});
export const metadata: Metadata = {
  title: "LiveTheme – Free Theme Editor & Preview Tool",
  description:
    "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
  metadataBase: new URL("https://livetheme.app"),
  keywords: [
    "theme editor",
    "live theme editor",
    "website theme preview",
    "daisyui theme editor",
    "tailwind theme editor",
    "tailwind theme generator",
    "daisyui templates",
    "color palette editor",
    "font editor",
    "UI theme generator",
    "Tailwind theme",
    "DaisyUI theme",
    "theme builder",
    "design system",
    "web design tool",
    "CSS themes",
    "website themes",
    "website inspirations",
    "blog template",
    "portfolio template",
    "saas landing page template",
    "responsive design",
    "export CSS variables",
    "template preview",
    "export themes",
    "share theme",
    "responsive preview",
    "theme templates",
    "theme",
    "site themes",
    "web themes",
    "free themes",
    "Website colors",
    "Website fonts",
    "Web design",
    "Palette Visualizer",
    "Realtime colors",
  ],
  authors: [{ name: "LiveTheme" }],
  creator: "LiveTheme",
  publisher: "LiveTheme",
  category: "Design",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
    other: [{ rel: "apple-touch-icon", url: "/logo.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://livetheme.app",
    title: "LiveTheme – Free Theme Editor & Preview Tool",
    description:
      "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
    images: [
      {
        url: "https://livetheme.app/preview.png",
        alt: "LiveTheme preview",
      },
    ],
  },
  applicationName: "LiveTheme",
  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "LiveTheme – Free Theme Editor & Preview Tool",
    description:
      "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
    images: ["https://livetheme.app/preview.png"],
    site: "@its_me_roni3",
    creator: "@its_me_roni3",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        {/* Early theme set to avoid FOUC */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const storageKey = 'theme';
      let stored = localStorage.getItem(storageKey);
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Migrate old values if necessary
      if (stored === 'light') stored = 'autumn';
      if (stored === 'dark') stored = 'business';
      const theme = stored || (isSystemDark ? 'business' : 'autumn');
      document.documentElement.setAttribute('data-theme', theme);
            } catch {}
          `}
        </Script>

        {/* JSON-LD schema (SoftwareApplication + WebSite) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LiveTheme",
              applicationCategory: "WebApplication",
              operatingSystem: "All",
              url: "https://livetheme.app",
              description:
                "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
              image: "https://livetheme.app/preview.png",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LiveTheme",
              url: "https://livetheme.app",
              logo: "https://livetheme.app/logo.png",
              sameAs: [
                "https://x.com/its_me_roni3",
                "https://github.com/ronny8877",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "LiveTheme",
              url: "https://livetheme.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://livetheme.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ])}
        </Script>
        <GoogleTagManager gtmId="GTM-MTV3JK9Z" />
        <meta
          name="google-adsense-account"
          content="ca-pub-6428755652534745"
        ></meta>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body
        className={`${outfit.className} antialiased min-h-screen bg-base-100 text-base-content`}
      >
        {children}
        <OneTimeNotice />
        <Toaster />
      </body>
    </html>
  );
}

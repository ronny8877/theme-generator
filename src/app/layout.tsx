import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import SeoHead from "@/components/seo-head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LiveTheme – Free Theme Editor & Preview Toolss",
  description:
    "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
  metadataBase: new URL("https://livetheme.app"),
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager gtmId="GTM-MTV3JK9Z" />

        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />

        {/* Early theme set to avoid FOUC */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const storageKey = 'theme';
              const stored = localStorage.getItem(storageKey);
              const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const theme = stored || system;
              document.documentElement.setAttribute('data-theme', theme);
            } catch {}
          `}
        </Script>

        {/* JSON-LD schema (kept as an inline script) */}
        <Script id="ld-json" strategy="afterInteractive">
          {`{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "LiveTheme",
            "applicationCategory": "WebApplication",
            "operatingSystem": "All",
            "url": "https://livetheme.app",
            "description": "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed."
          }`}
        </Script>
        {/* <SeoHead/> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-100 text-base-content`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}


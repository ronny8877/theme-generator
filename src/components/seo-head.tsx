import Head from "next/head";

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function SeoHead({
  title = "LiveTheme – Free Theme Editor & Preview Tool",
  description = "Edit, preview, and export website themes in real time. Customize colors, fonts, and layouts, then share or export instantly. Free, no account needed.",
  url = "https://livetheme.app",
  image = "https://livetheme.app/preview.png",
}: SeoHeadProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Prefer Next.js Metadata's canonical when available */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "LiveTheme",
            applicationCategory: "WebApplication",
            operatingSystem: "All",
            url: url,
            description: description,
          }),
        }}
      />
    </Head>
  );
}

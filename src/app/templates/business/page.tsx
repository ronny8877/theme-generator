import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Business Website Templates | Professional Templates | LiveTheme",
  description:
    "Professional business website templates including portfolios, SaaS landing pages, e-commerce stores, and corporate websites. Fully customizable with real-time editing for modern businesses.",
  keywords: [
    "business website templates",
    "professional website templates",
    "corporate website templates",
    "business templates free",
    "portfolio templates",
    "saas landing page templates",
    "ecommerce templates",
    "startup website templates",
    "company website templates",
    "business website design",
    "professional web design",
    "corporate web templates",
    "business homepage templates",
    "modern business templates",
    "responsive business templates",
    "small business templates",
    "enterprise website templates",
    "business website inspiration",
    "commercial website templates",
  ],
  alternates: { canonical: "/templates/business" },
  openGraph: {
    title:
      "Free Business Website Templates | Professional Templates | LiveTheme",
    description:
      "Professional business website templates for modern companies. Customize colors, fonts, and layouts in real-time.",
    url: "https://livetheme.app/templates/business",
    type: "website",
    images: [
      {
        url: "https://livetheme.app/preview.png",
        alt: "Business template gallery - LiveTheme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Business Website Templates | Professional Templates | LiveTheme",
    description:
      "Professional business website templates for modern companies. Customize colors, fonts, and layouts in real-time.",
    images: ["https://livetheme.app/preview.png"],
  },
};

const businessTemplates = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "Professional portfolio website perfect for developers, designers, and creative professionals. Showcase your projects, skills, and experience with a modern, responsive design.",
    features: [
      "Project showcase",
      "Skills section",
      "Experience timeline",
      "Contact form",
      "Responsive design",
    ],
    category: "Portfolio",
    businessType: "Freelancers & Creatives",
  },
  {
    id: "saas-landing",
    title: "SaaS Landing Page",
    description:
      "Modern SaaS landing page template with features showcase, pricing tables, testimonials, and conversion-optimized design. Perfect for software companies and tech startups.",
    features: [
      "Features showcase",
      "Pricing tables",
      "Customer testimonials",
      "Call-to-action",
      "Conversion optimized",
    ],
    category: "SaaS",
    businessType: "Tech Startups",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description:
      "Complete online store template with product listings, shopping cart, checkout flow, and payment integration. Ideal for retail businesses going digital.",
    features: [
      "Product catalog",
      "Shopping cart",
      "Checkout flow",
      "Payment integration",
      "Inventory management",
    ],
    category: "E-commerce",
    businessType: "Retail & Online Stores",
  },
  {
    id: "landing",
    title: "Business Landing Page",
    description:
      "Versatile business landing page with Material You inspired design, customizable widgets, and responsive layout. Perfect for any business or service.",
    features: [
      "Customizable widgets",
      "Material design",
      "Service sections",
      "Contact info",
      "Mobile responsive",
    ],
    category: "Landing Page",
    businessType: "General Business",
  },
];

export default function BusinessTemplatesPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Structured data for business templates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Business Website Templates Collection",
            description:
              "Professional business website templates for modern companies",
            url: "https://livetheme.app/templates/business",
            mainEntity: {
              "@type": "ItemList",
              name: "Business Website Templates",
              numberOfItems: businessTemplates.length,
              itemListElement: businessTemplates.map((template, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "WebPageElement",
                  "@id": `https://livetheme.app/preview/${template.id}`,
                  name: template.title,
                  description: template.description,
                  url: `https://livetheme.app/preview/${template.id}`,
                  category: template.category,
                  audience: template.businessType,
                },
              })),
            },
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/templates" className="text-primary hover:underline">
            Templates
          </Link>
          <span className="mx-2">/</span>
          <span className="text-base-content/70">Business Templates</span>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Professional Business Website Templates
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Professional website templates designed for modern businesses,
            startups, and entrepreneurs. Create a stunning business presence
            with fully customizable designs that you can edit in real-time.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {businessTemplates.map((template) => (
            <div key={template.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex gap-2 mb-2">
                  <div className="badge badge-primary">{template.category}</div>
                  <div className="badge badge-outline">
                    {template.businessType}
                  </div>
                </div>
                <h2 className="card-title">{template.title}</h2>
                <p className="text-base-content/80 mb-4">
                  {template.description}
                </p>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <ul className="text-sm space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-actions justify-end">
                  <Link
                    href={`/preview/${template.id}`}
                    className="btn btn-primary"
                  >
                    Preview Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Benefits Section */}
        <div className="bg-base-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Choose Our Business Templates?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Professional Design</h3>
              <p className="text-sm text-base-content/80">
                Modern, clean designs that establish credibility and trust with
                your customers.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">Mobile Responsive</h3>
              <p className="text-sm text-base-content/80">
                All templates are fully responsive and look great on desktop,
                tablet, and mobile devices.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Fast & Optimized</h3>
              <p className="text-sm text-base-content/80">
                Built with performance in mind for fast loading times and better
                SEO rankings.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Build Your Business Website?
          </h2>
          <p className="text-base-content/80 mb-6">
            Choose a template above and start customizing your business website
            in real-time. No coding required - just point, click, and customize
            to match your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates" className="btn btn-primary">
              Browse All Templates
            </Link>
            <Link href="/templates/blog" className="btn btn-outline">
              View Blog Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Blog Templates | Blog Website Designs | LiveTheme",
  description: "Discover professional blog templates including blog post layouts, blog landing pages, and tech blog designs. Fully customizable with real-time editing. Perfect for content creators, writers, and bloggers.",
  keywords: [
    "blog templates",
    "blog website templates", 
    "blog design templates",
    "free blog templates",
    "blog post template",
    "blog landing page template",
    "tech blog template",
    "content blog template",
    "blogger templates",
    "blog theme",
    "blog layout",
    "responsive blog design",
    "modern blog templates",
    "professional blog templates",
    "blog homepage template",
    "article template",
    "writing template",
    "content management templates",
    "blog website design",
    "blog inspiration"
  ],
  alternates: { canonical: "/templates/blog" },
  openGraph: {
    title: "Free Blog Templates | Blog Website Designs | LiveTheme",
    description: "Professional blog templates for content creators. Customize colors, fonts, and layouts in real-time.",
    url: "https://livetheme.app/templates/blog",
    type: "website",
    images: [
      {
        url: "https://livetheme.app/preview.png",
        alt: "Blog template gallery - LiveTheme"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Blog Templates | Blog Website Designs | LiveTheme",
    description: "Professional blog templates for content creators. Customize colors, fonts, and layouts in real-time.",
    images: ["https://livetheme.app/preview.png"]
  }
};

const blogTemplates = [
  {
    id: "simple-blog-post",
    title: "Blog Post Template",
    description: "Professional blog post layout with clean typography, comment sections, and related articles. Perfect for individual blog posts and article pages.",
    features: ["Clean typography", "Comment sections", "Related articles", "Responsive design", "SEO optimized"],
    category: "Blog Post"
  },
  {
    id: "simple-blog-landing", 
    title: "Blog Landing Page",
    description: "Complete blog homepage with featured posts, recent articles, trending content, and newsletter signup. Ideal for blog main pages.",
    features: ["Featured posts", "Recent articles", "Newsletter signup", "Trending content", "Social media links"],
    category: "Blog Homepage"
  },
  {
    id: "techcore-blog",
    title: "Tech Blog Template", 
    description: "Modern technology blog with developer-focused design, code highlighting, and tech news sections. Perfect for technology publications.",
    features: ["Code highlighting", "Tech news sections", "Developer focused", "Modern design", "Technical content"],
    category: "Tech Blog"
  }
];

export default function BlogTemplatesPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Structured data for blog templates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog Templates Collection",
            description: "Professional blog templates for content creators and writers",
            url: "https://livetheme.app/templates/blog",
            mainEntity: {
              "@type": "ItemList",
              name: "Blog Website Templates",
              numberOfItems: blogTemplates.length,
              itemListElement: blogTemplates.map((template, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "WebPageElement",
                  "@id": `https://livetheme.app/preview/${template.id}`,
                  name: template.title,
                  description: template.description,
                  url: `https://livetheme.app/preview/${template.id}`,
                  category: template.category
                }
              }))
            }
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/templates" className="text-primary hover:underline">Templates</Link>
          <span className="mx-2">/</span>
          <span className="text-base-content/70">Blog Templates</span>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Free Blog Templates</h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Professional blog templates designed for content creators, writers, and bloggers. 
            Customize colors, fonts, and layouts in real-time to create the perfect blog for your audience.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogTemplates.map((template) => (
            <div key={template.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="badge badge-primary mb-2">{template.category}</div>
                <h2 className="card-title">{template.title}</h2>
                <p className="text-base-content/80 mb-4">{template.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Features:</h3>
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

        {/* Call to Action */}
        <div className="text-center bg-base-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Blog?</h2>
          <p className="text-base-content/80 mb-6">
            Choose a template above and start customizing your blog theme in real-time. 
            No account required - just click, edit, and export when you&apos;re ready.
          </p>
          <Link href="/templates" className="btn btn-primary btn-lg">
            Browse All Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
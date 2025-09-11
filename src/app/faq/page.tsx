import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | LiveTheme",
  description: "Find answers to common questions about LiveTheme's free website templates, theme editor, customization options, and exporting features.",
  keywords: [
    "livetheme faq",
    "website template questions",
    "theme editor help",
    "how to use livetheme",
    "free website templates",
    "template customization",
    "export themes",
    "website design help"
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Frequently Asked Questions | LiveTheme",
    description: "Find answers to common questions about LiveTheme's free website templates and theme editor.",
    url: "https://livetheme.app/faq",
    type: "website"
  }
};

const faqs = [
  {
    question: "Are the website templates really free?",
    answer: "Yes! All our website templates are completely free to use, customize, and export. There are no hidden fees, subscriptions, or account requirements."
  },
  {
    question: "Do I need to create an account to use LiveTheme?",
    answer: "No account is required! You can browse templates, customize themes, and export your designs without signing up. Just start editing right away."
  },
  {
    question: "How do I customize the colors and fonts?",
    answer: "Use our real-time theme editor on any template page. You can change colors, fonts, spacing, and other design elements instantly and see the changes live."
  },
  {
    question: "Can I export my customized theme?",
    answer: "Yes! You can export your customized theme as CSS variables, copy the configuration, or share a link with others. Multiple export options are available."
  },
  {
    question: "Are the templates responsive and mobile-friendly?",
    answer: "Absolutely! All our templates are built with responsive design principles and work perfectly on desktop, tablet, and mobile devices."
  },
  {
    question: "What technologies are the templates built with?",
    answer: "Our templates are built with modern web technologies including Tailwind CSS, DaisyUI, React, and Next.js for optimal performance and customization."
  },
  {
    question: "Can I use these templates for commercial projects?",
    answer: "Yes! Our templates are free for both personal and commercial use. You can use them for client projects, your business, or any other purpose."
  },
  {
    question: "How often are new templates added?",
    answer: "We regularly add new templates to our collection. Check back frequently or follow our updates to see the latest designs and categories."
  },
  {
    question: "Can I suggest a template type or feature?",
    answer: "We love feedback! While we don't have a formal suggestion system yet, we're always working on new template types based on popular web design trends."
  },
  {
    question: "What browsers are supported?",
    answer: "Our templates work in all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest browser versions for the best experience."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* FAQ Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-base-content/70">FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-base-content/80">
            Find answers to common questions about LiveTheme&apos;s free website templates and theme editor.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-base-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-base-content/80 mb-6">
            Browse our collection of free website templates and start customizing your perfect design today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates" className="btn btn-primary">
              Browse Templates
            </Link>
            <Link href="/templates/blog" className="btn btn-outline">
              Blog Templates
            </Link>
            <Link href="/templates/business" className="btn btn-outline">
              Business Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
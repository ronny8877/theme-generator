import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";

interface BlogPostProps {
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

export default function BlogPost() {
  // DaisyUI theme colors fallback

  return (
    <div className={`min-h-screen bg-base-100 text-base-content`}>
      {/* Header */}
      <header className="border-b border-base-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-xl @sm:text-2xl font-bold text-primary">
              BlogSite POST
            </div>
            <div className="hidden md:flex items-center gap-4 @md:gap-6">
              <a
                href="#"
                className="btn btn-ghost btn-xs @sm:btn-sm text-base-content font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-xs @sm:btn-sm text-base-content"
              >
                Categories
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-xs @sm:btn-sm text-base-content"
              >
                About
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-xs @sm:btn-sm text-base-content"
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="mb-8">
          <div className="mb-6">
            <span className="badge badge-primary badge-outline badge-lg mb-4">
              Technology
            </span>
            <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold leading-tight mb-4">
              The Future of Web Development: Trends to Watch in 2025
            </h1>
            <p className="text-base @sm:text-lg @md:text-xl leading-relaxed mb-6 text-base-content/70">
              Explore the cutting-edge technologies and methodologies that are
              shaping the future of web development.
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 @md:gap-6 mb-8 pb-6 border-b border-base-200">
            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-xs @sm:text-sm text-base-content/60">
                  Senior Developer
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-base-content/60">
              <Calendar className="w-4 h-4" />
              <span className="text-xs @sm:text-sm">March 15, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/60">
              <Clock className="w-4 h-4" />
              <span className="text-xs @sm:text-sm">8 min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
              alt="Blog post featured image"
              className="w-full h-48 @sm:h-64 @md:h-80 object-cover rounded-lg border border-base-200"
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none text-base @sm:text-lg">
            <p className="mb-6">
              Web development is constantly evolving, with new technologies and
              frameworks emerging regularly. As we look ahead to 2025, several
              trends are shaping the future of how we build and interact with
              web applications.
            </p>

            <h2 className="text-lg @sm:text-xl @md:text-2xl font-bold mb-4 mt-8 text-base-content">
              1. AI-Powered Development Tools
            </h2>
            <p className="mb-6">
              Artificial Intelligence is revolutionizing the way developers
              write code. From intelligent code completion to automated testing
              and bug detection, AI tools are becoming indispensable in modern
              development workflows.
            </p>

            <h2 className="text-lg @sm:text-xl @md:text-2xl font-bold mb-4 mt-8 text-base-content">
              2. WebAssembly Adoption
            </h2>
            <p className="mb-6">
              WebAssembly (WASM) is enabling high-performance applications to
              run in browsers with near-native speed. This technology is opening
              up new possibilities for complex applications previously limited
              to desktop environments.
            </p>

            <h2 className="text-lg @sm:text-xl @md:text-2xl font-bold mb-4 mt-8 text-base-content">
              3. Serverless Architecture
            </h2>
            <p className="mb-6">
              The shift towards serverless computing continues to gain momentum,
              allowing developers to focus on code rather than infrastructure
              management. This approach offers better scalability and
              cost-effectiveness.
            </p>
          </div>

          {/* Article Interactions */}
          <div className="mt-12 pt-8 border-t border-base-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 @sm:gap-4">
                <button className="btn btn-ghost btn-xs @sm:btn-sm text-primary flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>42</span>
                </button>
                <button className="btn btn-ghost btn-xs @sm:btn-sm text-secondary flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>12</span>
                </button>
                <button className="btn btn-ghost btn-xs @sm:btn-sm text-secondary flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
              <button className="btn btn-ghost btn-xs @sm:btn-sm text-secondary">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Suggested Articles */}
        <section className="mt-16">
          <h3 className="text-lg @sm:text-xl @md:text-2xl font-bold mb-6">
            Suggested Articles
          </h3>
          <div className="grid @md:grid-cols-2 gap-4 @md:gap-6">
            {[
              {
                title: "Understanding React Server Components",
                excerpt:
                  "A deep dive into the new React Server Components and how they can improve your application performance.",
                category: "React",
                readTime: "5 min read",
                image:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
              },
              {
                title: "Modern CSS Grid Layouts",
                excerpt:
                  "Learn how to create complex, responsive layouts using CSS Grid with practical examples and best practices.",
                category: "CSS",
                readTime: "7 min read",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="card bg-base-100 border border-base-200 rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-32 @sm:h-40 object-cover"
                />
                <div className="card-body p-4">
                  <span className="badge badge-accent badge-outline badge-sm mb-3">
                    {article.category}
                  </span>
                  <h4 className="text-base @sm:text-lg font-semibold mb-2">
                    {article.title}
                  </h4>
                  <p className="mb-4 text-xs @sm:text-sm text-base-content/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="text-xs @sm:text-sm text-base-content/60">
                    {article.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

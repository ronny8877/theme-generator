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

export default function BlogPost({ colors }: BlogPostProps) {
  const defaultColors = {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#f59e0b",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    textSecondary: "#64748b",
  };

  const theme = colors || defaultColors;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: theme.secondary + "20" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.primary }}
            >
              BlogSite
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.text }}
              >
                Home
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.text }}
              >
                Categories
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.text }}
              >
                About
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.text }}
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
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: theme.primary + "20",
                color: theme.primary,
              }}
            >
              Technology
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              The Future of Web Development: Trends to Watch in 2025
            </h1>
            <p
              className="text-xl leading-relaxed mb-6"
              style={{ color: theme.textSecondary }}
            >
              Explore the cutting-edge technologies and methodologies that are
              shaping the future of web development.
            </p>
          </div>

          {/* Article Meta */}
          <div
            className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b"
            style={{ borderColor: theme.secondary + "20" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm" style={{ color: theme.textSecondary }}>
                  Senior Developer
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ color: theme.textSecondary }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">March 15, 2025</span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ color: theme.textSecondary }}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">8 min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
              alt="Blog post featured image"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Web development is constantly evolving, with new technologies and
              frameworks emerging regularly. As we look ahead to 2025, several
              trends are shaping the future of how we build and interact with
              web applications.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ color: theme.text }}
            >
              1. AI-Powered Development Tools
            </h2>
            <p className="mb-6 leading-relaxed">
              Artificial Intelligence is revolutionizing the way developers
              write code. From intelligent code completion to automated testing
              and bug detection, AI tools are becoming indispensable in modern
              development workflows.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ color: theme.text }}
            >
              2. WebAssembly Adoption
            </h2>
            <p className="mb-6 leading-relaxed">
              WebAssembly (WASM) is enabling high-performance applications to
              run in browsers with near-native speed. This technology is opening
              up new possibilities for complex applications previously limited
              to desktop environments.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ color: theme.text }}
            >
              3. Serverless Architecture
            </h2>
            <p className="mb-6 leading-relaxed">
              The shift towards serverless computing continues to gain momentum,
              allowing developers to focus on code rather than infrastructure
              management. This approach offers better scalability and
              cost-effectiveness.
            </p>
          </div>

          {/* Article Interactions */}
          <div
            className="mt-12 pt-8 border-t"
            style={{ borderColor: theme.secondary + "20" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: theme.primary + "10",
                    color: theme.primary,
                  }}
                >
                  <Heart className="w-5 h-5" />
                  <span>42</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: theme.secondary + "10",
                    color: theme.secondary,
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>12</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: theme.secondary + "10",
                    color: theme.secondary,
                  }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
              <button
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{
                  backgroundColor: theme.secondary + "10",
                  color: theme.secondary,
                }}
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>

        {/* Suggested Articles */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Suggested Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
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
                className="rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: theme.surface }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                    style={{
                      backgroundColor: theme.accent + "20",
                      color: theme.accent,
                    }}
                  >
                    {article.category}
                  </span>
                  <h4 className="text-lg font-semibold mb-2">
                    {article.title}
                  </h4>
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    className="text-sm"
                    style={{ color: theme.textSecondary }}
                  >
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

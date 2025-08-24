import { Calendar, Clock, User, TrendingUp, Star } from "lucide-react";

interface BlogLandingProps {
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

export default function BlogLanding({ colors }: BlogLandingProps) {
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

  const featuredPost = {
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are shaping the future of web development.",
    category: "Technology",
    author: "John Doe",
    date: "March 15, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  };

  const recentPosts = [
    {
      title: "Understanding React Server Components",
      excerpt:
        "A deep dive into the new React Server Components and how they can improve your application performance.",
      category: "React",
      author: "Jane Smith",
      date: "March 12, 2025",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    },
    {
      title: "Modern CSS Grid Layouts",
      excerpt:
        "Learn how to create complex, responsive layouts using CSS Grid with practical examples.",
      category: "CSS",
      author: "Mike Johnson",
      date: "March 10, 2025",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt:
        "Best practices for creating robust and scalable backend services using Node.js and Express.",
      category: "Backend",
      author: "Sarah Wilson",
      date: "March 8, 2025",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    },
  ];

  const trendingPosts = [
    {
      title: "TypeScript 5.0: What's New",
      views: "12.5k",
      category: "TypeScript",
    },
    {
      title: "Mastering Tailwind CSS",
      views: "9.2k",
      category: "CSS",
    },
    {
      title: "Next.js App Router Guide",
      views: "8.7k",
      category: "Next.js",
    },
    {
      title: "Web Performance Optimization",
      views: "7.3k",
      category: "Performance",
    },
  ];

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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div
              className="text-3xl font-bold"
              style={{ color: theme.primary }}
            >
              DevBlog
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity font-medium"
                style={{ color: theme.text }}
              >
                Home
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.textSecondary }}
              >
                Categories
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.textSecondary }}
              >
                About
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.textSecondary }}
              >
                Contact
              </a>
              <button
                className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                Subscribe
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: theme.surface }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span style={{ color: theme.primary }}>DevBlog</span>
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              Discover the latest trends, tutorials, and insights in web
              development. Join thousands of developers learning something new
              every day.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5" style={{ color: theme.accent }} />
                <h2 className="text-2xl font-bold">Featured Post</h2>
              </div>
              <div
                className="rounded-xl overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: theme.surface }}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                    style={{
                      backgroundColor: theme.primary + "20",
                      color: theme.primary,
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p
                    className="text-lg mb-6 leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    {featuredPost.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-6 text-sm"
                    style={{ color: theme.textSecondary }}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: theme.surface }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                        style={{
                          backgroundColor: theme.accent + "20",
                          color: theme.accent,
                        }}
                      >
                        {post.category}
                      </span>
                      <h4 className="text-lg font-semibold mb-2 leading-tight">
                        {post.title}
                      </h4>
                      <p
                        className="mb-4 leading-relaxed"
                        style={{ color: theme.textSecondary }}
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className="flex items-center justify-between text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Newsletter Signup */}
            <div
              className="rounded-lg p-6 mb-8"
              style={{ backgroundColor: theme.primary + "10" }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: theme.primary }}
              >
                Subscribe to Newsletter
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: theme.textSecondary }}
              >
                Get the latest posts delivered right to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{
                    borderColor: theme.secondary + "30",
                    backgroundColor: theme.background,
                  }}
                />
                <button
                  className="w-full py-2 rounded-lg text-white font-medium text-sm transition-colors hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Trending Posts */}
            <div
              className="rounded-lg p-6"
              style={{ backgroundColor: theme.surface }}
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp
                  className="w-5 h-5"
                  style={{ color: theme.accent }}
                />
                <h3 className="text-lg font-semibold">Trending</h3>
              </div>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium leading-tight group-hover:opacity-80 transition-opacity">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: theme.secondary + "20",
                              color: theme.secondary,
                            }}
                          >
                            {post.category}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: theme.textSecondary }}
                          >
                            {post.views} views
                          </span>
                        </div>
                      </div>
                      <div
                        className="text-lg font-bold text-right"
                        style={{ color: theme.primary }}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{
          borderColor: theme.secondary + "20",
          backgroundColor: theme.surface,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div
                className="text-2xl font-bold mb-4"
                style={{ color: theme.primary }}
              >
                DevBlog
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                Your go-to resource for web development tutorials, tips, and
                industry insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  JavaScript
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  React
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  CSS
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  Node.js
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  About
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  Terms
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block hover:opacity-80 transition-opacity"
                  style={{ color: theme.textSecondary }}
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <div
            className="border-t mt-8 pt-8 text-center text-sm"
            style={{
              borderColor: theme.secondary + "20",
              color: theme.textSecondary,
            }}
          >
            © 2025 DevBlog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

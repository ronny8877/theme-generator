import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Header */}
      <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 @md:px-6 @lg:px-8 py-3 @md:py-4">
          <nav className="flex items-center justify-between">
            <div className="text-lg @sm:text-xl @md:text-2xl font-bold text-primary">
              BlogSite
            </div>
            <div className="hidden @md:flex items-center gap-2 @lg:gap-4">
              <a
                href="#"
                className="btn btn-ghost btn-sm rounded-box text-base-content"
              >
                Home
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-sm rounded-box text-base-content"
              >
                Categories
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-sm rounded-box text-base-content"
              >
                About
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-sm rounded-box text-base-content"
              >
                Contact
              </a>
            </div>
            <div className="@md:hidden">
              <button className="btn btn-ghost btn-sm btn-circle">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 @md:px-6 @lg:px-8 py-6 @md:py-8 @lg:py-12">
        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li>
              <a className="text-base-content/70 hover:text-base-content">
                Home
              </a>
            </li>
            <li>
              <a className="text-base-content/70 hover:text-base-content">
                Technology
              </a>
            </li>
            <li className="text-base-content">Web Development</li>
          </ul>
        </div>

        {/* Article Container */}
        <article className="card bg-base-100 rounded-box shadow-xl border border-base-300">
          <div className="card-body p-6 @md:p-8 @lg:p-12">
            {/* Article Header */}
            <div className="mb-6 @md:mb-8">
              <div className="badge badge-primary badge-lg mb-4 rounded-box">
                Technology
              </div>
              <h1 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold leading-tight mb-4 @md:mb-6 text-base-content">
                The Future of Web Development: Trends to Watch in 2025
              </h1>
              <p className="text-base @md:text-lg @lg:text-xl leading-relaxed mb-6 text-base-content/70">
                Explore the cutting-edge technologies and methodologies that are
                shaping the future of web development.
              </p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-3 @md:gap-4 @lg:gap-6 mb-6 @md:mb-8 pb-4 @md:pb-6 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10 h-10 @md:w-12 @md:h-12 flex items-center justify-center">
                    <User className="w-4 h-4 @md:w-5 @md:h-5" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-base-content text-sm @md:text-base">
                    John Doe
                  </div>
                  <div className="text-xs @md:text-sm text-base-content/60">
                    Senior Developer
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-base-content/60">
                <Calendar className="w-4 h-4" />
                <span className="text-xs @md:text-sm">March 15, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/60">
                <Clock className="w-4 h-4" />
                <span className="text-xs @md:text-sm">8 min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-6 @md:mb-8">
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
                alt="Blog post featured image"
                className="w-full h-48 @sm:h-56 @md:h-64 @lg:h-80 object-cover rounded-box border border-base-300"
              />
            </div>

            {/* Article Content */}
            <div className="prose max-w-none text-base @md:text-lg leading-relaxed">
              <p className="mb-6 text-base-content">
                Web development is constantly evolving, with new technologies
                and frameworks emerging regularly. As we look ahead to 2025,
                several trends are shaping the future of how we build and
                interact with web applications.
              </p>

              <h2 className="text-lg @md:text-xl @lg:text-2xl font-bold mb-4 mt-8 text-base-content">
                1. AI-Powered Development Tools
              </h2>
              <p className="mb-6 text-base-content">
                Artificial Intelligence is revolutionizing the way developers
                write code. From intelligent code completion to automated
                testing and bug detection, AI tools are becoming indispensable
                in modern development workflows.
              </p>

              <h2 className="text-lg @md:text-xl @lg:text-2xl font-bold mb-4 mt-8 text-base-content">
                2. WebAssembly Adoption
              </h2>
              <p className="mb-6 text-base-content">
                WebAssembly (WASM) is enabling high-performance applications to
                run in browsers with near-native speed. This technology is
                opening up new possibilities for complex applications previously
                limited to desktop environments.
              </p>

              <h2 className="text-lg @md:text-xl @lg:text-2xl font-bold mb-4 mt-8 text-base-content">
                3. Serverless Architecture
              </h2>
              <p className="mb-6 text-base-content">
                The shift towards serverless computing continues to gain
                momentum, allowing developers to focus on code rather than
                infrastructure management. This approach offers better
                scalability and cost-effectiveness.
              </p>
            </div>

            {/* Article Interactions */}
            <div className="mt-8 @md:mt-12 pt-6 @md:pt-8 border-t border-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 @md:gap-4">
                  <button className="btn btn-ghost btn-sm rounded-box text-primary flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">42</span>
                  </button>
                  <button className="btn btn-ghost btn-sm rounded-box text-secondary flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">12</span>
                  </button>
                  <button className="btn btn-ghost btn-sm rounded-box text-secondary flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                <button className="btn btn-ghost btn-sm btn-circle rounded-box text-secondary">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Suggested Articles */}
        <section className="mt-8 @md:mt-12 @lg:mt-16">
          <h3 className="text-xl @md:text-2xl @lg:text-3xl font-bold mb-6 @md:mb-8 text-base-content">
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
                className="card bg-base-100 border border-base-300 rounded-box overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-32 @md:h-40 object-cover"
                />
                <div className="card-body p-4 @md:p-6">
                  <div className="badge badge-accent badge-outline badge-sm mb-3 rounded-box">
                    {article.category}
                  </div>
                  <h4 className="text-base @md:text-lg font-semibold mb-2 text-base-content">
                    {article.title}
                  </h4>
                  <p className="mb-4 text-sm @md:text-base text-base-content/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="text-xs @md:text-sm text-base-content/60 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
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

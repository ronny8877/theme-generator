import {
  Calendar,
  Clock,
  User,
  TrendingUp,
  Star,
  Menu,
  Search,
  Bell,
} from "lucide-react";

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

export default function BlogLanding() {
  // DaisyUI handles theming automatically, but we'll keep this for custom overrides if needed

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
    <div className="min-h-screen bg-base-100">
      {/* Header - DaisyUI Navbar */}
      <div className="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown @lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <Menu className="w-4 h-4 @sm:w-5 @sm:h-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-200"
            >
              <li>
                <a className="text-sm @sm:text-base font-medium">Home</a>
              </li>
              <li>
                <a className="text-sm @sm:text-base">Categories</a>
              </li>
              <li>
                <a className="text-sm @sm:text-base">About</a>
              </li>
              <li>
                <a className="text-sm @sm:text-base">Contact</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-lg @sm:text-xl @lg:text-2xl font-bold text-primary">
            DevBlog
          </a>
        </div>

        <div className="navbar-center hidden @lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md font-medium">
                Home
              </a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md">Categories</a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md">About</a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md">Contact</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-1 @sm:gap-2">
          <button className="btn btn-ghost btn-circle btn-sm @sm:btn-md">
            <Search className="w-4 h-4 @sm:w-5 @sm:h-5" />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm @sm:btn-md">
            <Bell className="w-4 h-4 @sm:w-5 @sm:h-5" />
          </button>
          <button className="btn btn-primary btn-xs @sm:btn-sm @lg:btn-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-br from-base-200 to-base-300">
        <div className="hero-content text-center max-w-4xl">
          <div className="@sm:max-w-md @lg:max-w-none">
            <h1 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl @xl:text-6xl font-bold leading-tight">
              Welcome to <span className="text-primary">DevBlog</span>
            </h1>
            <p className="py-6 text-sm @sm:text-base @md:text-lg @lg:text-xl text-base-content/80 max-w-3xl mx-auto">
              Discover the latest trends, tutorials, and insights in web
              development. Join thousands of developers learning something new
              every day.
            </p>
            <div className="flex @sm:flex-col @md:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-sm @sm:btn-md @lg:btn-lg">
                Get Started
              </button>
              <button className="btn btn-outline btn-sm @sm:btn-md @lg:btn-lg">
                Browse Articles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid @lg:grid-cols-4 gap-6 @lg:gap-8">
          {/* Main Content Area */}
          <div className="@lg:col-span-3 space-y-8">
            {/* Featured Post */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-4 h-4 @md:w-6 @md:h-6 text-accent" />
                <h2 className="text-lg @md:text-2xl @lg:text-3xl font-bold">
                  Featured Post
                </h2>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-200">
                <figure className="relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-48 @sm:h-64 @lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="badge badge-primary badge-sm @sm:badge-md @lg:badge-lg font-semibold">
                      {featuredPost.category}
                    </div>
                  </div>
                </figure>

                <div className="card-body p-4 @sm:p-6 @lg:p-8">
                  <h3 className="card-title text-base @sm:text-xl @md:text-2xl @lg:text-3xl font-bold leading-tight mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-base-content/80 text-sm @sm:text-base @lg:text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs @sm:text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 @sm:w-4 @sm:h-4" />
                      <span className="font-medium">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 @sm:w-4 @sm:h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 @sm:w-4 @sm:h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary btn-sm @md:btn-md">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <h2 className="text-lg @md:text-2xl @lg:text-3xl font-bold mb-6">
                Recent Posts
              </h2>
              <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-base-200"
                  >
                    <figure className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 @sm:h-40 @md:h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 @sm:top-3 @sm:left-3">
                        <div className="badge badge-accent badge-sm @sm:badge-md font-medium">
                          {post.category}
                        </div>
                      </div>
                    </figure>

                    <div className="card-body p-3 @sm:p-4 @md:p-6">
                      <h4 className="card-title text-sm @sm:text-base @md:text-lg font-semibold leading-tight mb-2">
                        {post.title}
                      </h4>
                      <p className="text-base-content/80 text-xs @sm:text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-base-content/70 mb-4">
                        <span className="font-medium">{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <div className="card-actions">
                        <button className="btn btn-xs @sm:btn-sm btn-outline btn-primary">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="@lg:col-span-1 space-y-4 @md:space-y-6">
            {/* Newsletter Signup */}
            <div className="card bg-primary/10 border border-primary/20">
              <div className="card-body p-3 @sm:p-4 @md:p-6">
                <h3 className="card-title text-primary text-sm @sm:text-base @md:text-lg mb-3">
                  📧 Subscribe to Newsletter
                </h3>
                <p className="text-xs @md:text-sm text-base-content/80 mb-4">
                  Get the latest posts delivered right to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered input-xs @sm:input-sm w-full"
                  />
                  <button className="btn btn-primary btn-xs @sm:btn-sm w-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body p-3 @sm:p-4 @md:p-6">
                <div className="flex items-center gap-2 mb-4 @md:mb-6">
                  <TrendingUp className="w-3 h-3 @sm:w-4 @sm:h-4 @md:w-5 @md:h-5 text-accent" />
                  <h3 className="card-title text-sm @sm:text-base @md:text-lg">
                    🔥 Trending
                  </h3>
                </div>
                <div className="space-y-2 @md:space-y-4">
                  {trendingPosts.map((post, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="flex items-start gap-2 @sm:gap-3 p-1 @sm:p-2 @md:p-3 rounded-lg hover:bg-base-200 transition-colors">
                        <div className="badge badge-primary badge-xs @sm:badge-sm @md:badge-lg font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-xs @sm:text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 @md:mt-2">
                            <div className="badge badge-outline badge-xs">
                              {post.category}
                            </div>
                            <span className="text-xs text-base-content/60">
                              {post.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body p-3 @sm:p-4 @md:p-6">
                <h3 className="card-title text-sm @sm:text-base @md:text-lg mb-4">
                  📂 Popular Categories
                </h3>
                <div className="space-y-1 @md:space-y-2">
                  {[
                    "JavaScript",
                    "React",
                    "CSS",
                    "Node.js",
                    "TypeScript",
                    "Next.js",
                  ].map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-1 @md:p-2 rounded hover:bg-base-200 cursor-pointer transition-colors"
                    >
                      <span className="text-xs @md:text-sm font-medium">
                        {category}
                      </span>
                      <div className="badge badge-xs @md:badge-sm">
                        {Math.floor(Math.random() * 50) + 10}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-base-200 text-base-content p-10 mt-16">
        <aside>
          <div className="text-2xl font-bold text-primary mb-4">DevBlog</div>
          <p className="text-base-content/80 max-w-sm">
            Your go-to resource for web development tutorials, tips, and
            industry insights.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-circle btn-ghost">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="btn btn-circle btn-ghost">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
              </svg>
            </button>
            <button className="btn btn-circle btn-ghost">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </button>
          </div>
        </aside>

        <nav>
          <h6 className="footer-title">Categories</h6>
          <a className="link link-hover">JavaScript</a>
          <a className="link link-hover">React</a>
          <a className="link link-hover">CSS</a>
          <a className="link link-hover">Node.js</a>
          <a className="link link-hover">TypeScript</a>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Careers</a>
        </nav>

        <nav>
          <h6 className="footer-title">Resources</h6>
          <a className="link link-hover">Documentation</a>
          <a className="link link-hover">Tutorials</a>
          <a className="link link-hover">Support</a>
          <a className="link link-hover">Community</a>
          <a className="link link-hover">Newsletter</a>
        </nav>
      </footer>

      {/* Copyright */}
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            © 2025 DevBlog. All rights reserved. Made with ❤️ for developers.
          </p>
        </aside>
      </footer>
    </div>
  );
}

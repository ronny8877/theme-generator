import {
  ArrowRight,
  Check,
  Users,
  Menu,
  Headphones,
  Github,
  Twitter,
  Linkedin,
  Palette,
  Sparkles,
  Layout,
  Code,
  Download,
  Eye,
  Settings,
} from "lucide-react";

export default function SaaSLanding() {
  const features = [
    {
      icon: Palette,
      title: "Beautiful Themes",
      description:
        "Create stunning, professional themes with our intuitive design tools and extensive customization options.",
    },
    {
      icon: Code,
      title: "Export Ready Code",
      description:
        "Generate clean, production-ready code that you can use in any project. No vendor lock-in.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description:
        "Let AI help you create beautiful color palettes and typography combinations that work perfectly together.",
    },
    {
      icon: Layout,
      title: "Pre-built Components",
      description:
        "Access hundreds of pre-designed components and templates to speed up your development process.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description:
        "See your changes in real-time with our interactive preview system. What you see is what you get.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Export your themes in CSS, SCSS, Tailwind, or any format you need for your project.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UI Designer at DesignCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "LiveTheme has completely transformed my design workflow. I can create beautiful, consistent themes in minutes instead of hours.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Frontend Developer at StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "The code export feature is incredible. Clean, well-structured CSS that integrates perfectly with our existing projects.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Designer at TechFlow",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "The AI suggestions are spot-on. It's like having a design expert helping me create perfect color combinations every time.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out and personal projects",
      features: [
        "3 theme projects",
        "Basic color palettes",
        "Standard templates",
        "Community support",
        "CSS export",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Ideal for designers and small teams",
      features: [
        "Unlimited projects",
        "Advanced AI suggestions",
        "Premium templates",
        "Priority support",
        "All export formats",
        "Custom components",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For agencies and large organizations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "Brand guidelines",
        "SLA guarantees",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 font-sans @container">
      {/* Navigation */}
      <div className="navbar sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="flex items-center justify-between h-16 @md:h-20">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 @md:w-10 @md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 @md:w-6 @md:h-6 text-primary-content" />
                </div>
                <h1 className="text-xl @md:text-2xl font-bold text-base-content">
                  LiveTheme
                </h1>
              </div>

              <div className="hidden @lg:flex items-center gap-8">
                <a
                  href="#features"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#templates"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Templates
                </a>
                <a
                  href="#pricing"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#docs"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Docs
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden @md:inline-flex btn btn-outline text-base-content btn-sm rounded-box">
                Sign In
              </button>
              <button className="btn btn-primary btn-sm @md:btn-md rounded-box">
                Start Creating
              </button>
              <button className="btn btn-ghost btn-sm btn-circle @lg:hidden rounded-box">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Bento Style */}
      <section className="hero min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <div className="hero-content text-center">
          <div className="max-w-7xl mx-auto px-4 @sm:px-6 @lg:px-8">
            {/* Main Hero Content */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="badge badge-primary badge-lg gap-2 mb-8 h-auto">
                <Sparkles className="w-4 h-4" />
                Streamline your workflow with our software!
              </div>

              <h1 className="text-4xl @md:text-6xl @lg:text-7xl font-bold mb-6 leading-tight text-base-content">
                Create Beautiful{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Themes
                </span>{" "}
                Instantly
              </h1>

              <p className="text-xl @md:text-2xl text-base-content/70 mb-10 leading-relaxed">
                Experience seamless integration and user-friendly features.
                Design, customize, and export professional themes in minutes.
              </p>

              <div className="flex flex-col @sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl rounded-box">
                  Try free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn btn-outline btn-lg rounded-box">
                  Schedule demo
                </button>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 @md:grid-cols-3 @lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Large Card - Happy Clients */}
              <div className="@md:col-span-2 @lg:col-span-2 card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl @md:text-5xl font-bold text-primary">
                      500K+
                    </div>
                    <div className="avatar-group -space-x-2">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      </div>
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                      </div>
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                      </div>
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-600"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="card-title text-base-content">
                    Happy clients
                  </h3>
                  <p className="text-base-content/60">
                    Trusted by designers and developers worldwide
                  </p>
                </div>
              </div>

              {/* Medium Card - Projects */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="text-3xl font-bold text-primary mb-2">
                    10K+
                  </div>
                  <h3 className="card-title text-lg text-base-content">
                    Projects managed
                  </h3>
                  <div className="w-full bg-base-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Medium Card - Users */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="text-3xl font-bold text-primary mb-2">
                    200K+
                  </div>
                  <h3 className="card-title text-lg text-base-content">
                    Users engaged
                  </h3>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-base-content/60">
                      Active community
                    </span>
                  </div>
                </div>
              </div>

              {/* Large Card - Contact */}
              <div className="@md:col-span-3 @lg:col-span-2 card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl text-primary-content">
                    Contact us
                  </h3>
                  <p className="opacity-90 text-primary-content">
                    Ready to transform your design workflow? Get in touch with
                    our team.
                  </p>
                  <div className="card-actions">
                    <button className="btn btn-secondary rounded-box">
                      Inquiries
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Small Card - Upgrade */}
              <div className="@lg:col-span-2 card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-warning/20 text-warning rounded-xl w-10">
                        <Settings className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="badge badge-warning">UPGRADE PLAN</div>
                  </div>
                  <h3 className="card-title text-lg text-base-content">
                    Unlock premium features
                  </h3>
                  <p className="text-sm text-base-content/60">
                    Get access to advanced tools and templates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 @md:py-32">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl @md:text-5xl font-bold mb-6 text-base-content">
              Everything You Need to{" "}
              <span className="text-primary">Design</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Built for modern designers and developers who demand beautiful,
              functional, and customizable themes.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body">
                  <div className="avatar placeholder mb-6">
                    <div className="bg-primary/10 text-primary flex items-center  justify-center  rounded-xl w-12">
                      <feature.icon className="w-6 h-6 block mt-2 mx-auto" />
                    </div>
                  </div>
                  <h3 className="card-title text-base-content">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 @md:py-32 bg-base-200">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl @md:text-5xl font-bold mb-6 text-base-content">
              Loved by <span className="text-primary">Designers</span>
            </h2>
            <p className="text-xl text-base-content/70">
              See what our customers are saying about LiveTheme
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body">
                  <div className="rating rating-sm mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-warning"
                        defaultChecked
                        disabled
                      />
                    ))}
                  </div>
                  <p className="text-base-content/80 mb-6">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-base-content">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-base-content/60">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 @md:py-32">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl @md:text-5xl font-bold mb-6 text-base-content">
              Simple, <span className="text-primary">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-base-content/70">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? "bg-primary text-primary-content scale-105 ring-4 ring-primary/20"
                    : "bg-base-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="badge badge-secondary gap-1">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                <div className="card-body text-center">
                  <h3
                    className={`card-title justify-center text-2xl ${plan.popular ? "text-primary-content" : "text-base-content"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mb-6 ${plan.popular ? "text-primary-content/80" : "text-base-content/60"}`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span
                      className={`text-4xl @md:text-5xl font-bold ${plan.popular ? "text-primary-content" : "text-base-content"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-lg ${plan.popular ? "text-primary-content/80" : "text-base-content/60"}`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        <span
                          className={`text-sm ${plan.popular ? "text-primary-content" : "text-base-content"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="card-actions justify-center">
                    <button
                      className={`btn w-full rounded-box ${plan.popular ? "btn-secondary" : "btn-primary"}`}
                    >
                      {plan.name === "Enterprise"
                        ? "Contact Sales"
                        : "Start Creating"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero py-20 @md:py-32 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl @md:text-5xl font-bold mb-6 text-primary-content">
              Ready to Create Amazing Themes?
            </h2>
            <p className="text-xl opacity-90 mb-10 text-primary-content">
              Join thousands of designers who trust LiveTheme for their creative
              projects.
            </p>
            <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
              <button className="btn btn-secondary btn-lg shadow-xl rounded-box">
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary rounded-box">
                <Headphones className="w-5 h-5" />
                Get Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="footer items-start grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-8">
            <div className="col-span-1 @md:col-span-2 @lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-xl w-8">
                    <Palette className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-base-content">
                  LiveTheme
                </h3>
              </div>
              <p className="text-base-content/70 mb-6 text-left">
                The fastest way to create, customize, and export beautiful
                themes for your projects.
              </p>
              <div className="flex gap-3">
                <button className="btn btn-ghost btn-circle btn-sm rounded-box">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-circle btn-sm rounded-box">
                  <Github className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-circle btn-sm rounded-box">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <span className="footer-title text-base-content">Product</span>
              <a className="link link-hover text-base-content">Theme Builder</a>
              <a className="link link-hover text-base-content">Templates</a>
              <a className="link link-hover text-base-content">Color Tools</a>
              <a className="link link-hover text-base-content">
                Export Options
              </a>
            </div>

            <div>
              <span className="footer-title text-base-content">Resources</span>
              <a className="link link-hover text-base-content">Documentation</a>
              <a className="link link-hover text-base-content">Tutorials</a>
              <a className="link link-hover text-base-content">Design Guide</a>
              <a className="link link-hover text-base-content">Community</a>
            </div>

            <div>
              <span className="footer-title text-base-content">Company</span>
              <a className="link link-hover text-base-content">About</a>
              <a className="link link-hover text-base-content">Blog</a>
              <a className="link link-hover text-base-content">Careers</a>
              <a className="link link-hover text-base-content">Contact</a>
            </div>
          </div>

          <div className="divider"></div>
          <div className="text-center">
            <p className="text-base-content/60">
              © 2025 LiveTheme. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import {
  ArrowRight,
  Check,
  Star,
  Play,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Award,
  Menu,
  BarChart3,
  Headphones,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function SaaSLanding() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Deploy your applications in seconds, not minutes. Our optimized infrastructure ensures blazing fast performance.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Real-time collaboration tools that keep your team in sync across projects and deployments.",
    },
    {
      icon: TrendingUp,
      title: "Auto Scaling",
      description:
        "Automatically scale your applications based on demand without manual intervention.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description:
        "Worldwide content delivery network ensures your users get the best performance everywhere.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Deep insights into your application performance with real-time monitoring and alerts.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "CloudDeploy has revolutionized our deployment process. We've reduced our time-to-market by 70% and our team couldn't be happier.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer at StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "The ease of use is incredible. What used to take hours now takes minutes. The analytics dashboard gives us insights we never had before.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Manager at InnovateCorp",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "Outstanding platform with exceptional support. The auto-scaling feature has saved us thousands in infrastructure costs.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small teams and side projects",
      features: [
        "Up to 5 projects",
        "10GB storage",
        "Basic analytics",
        "Email support",
        "99.9% uptime SLA",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "Ideal for growing businesses and teams",
      features: [
        "Unlimited projects",
        "100GB storage",
        "Advanced analytics",
        "Priority support",
        "99.99% uptime SLA",
        "Custom domains",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantees",
      ],
      popular: false,
    },
  ];

  const stats = [
    { number: "500K+", label: "Deployments" },
    { number: "99.99%", label: "Uptime" },
    { number: "150+", label: "Countries" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="flex items-center justify-between h-16 @md:h-20">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 @md:w-10 @md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 @md:w-6 @md:h-6 text-primary-content" />
                </div>
                <h1 className="text-xl @md:text-2xl font-bold">CloudDeploy</h1>
              </div>

              <div className="hidden @lg:flex items-center gap-8">
                <a
                  href="#features"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-base-content hover:text-primary transition-colors"
                >
                  Testimonials
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
              <button className="hidden @md:inline-flex btn btn-ghost btn-sm">
                Sign In
              </button>
              <button className="btn btn-primary btn-sm @md:btn-md">
                Start Free Trial
              </button>
              <button className="btn btn-ghost btn-sm btn-circle @lg:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 @md:py-32 bg-gradient-to-br from-base-100 via-base-200 to-base-300 overflow-hidden">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              Trusted by 50,000+ developers worldwide
            </div>

            <h1 className="text-4xl @md:text-6xl @lg:text-7xl font-bold mb-6 leading-tight">
              Deploy Your Apps{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            <p className="text-xl @md:text-2xl text-base-content/70 mb-10 leading-relaxed">
              The fastest way to deploy, scale, and monitor your applications.
              Zero configuration, maximum performance.
            </p>

            <div className="flex flex-col @sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="btn btn-primary btn-lg @md:btn-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Start Free Trial
                <ArrowRight className="w-5 h-5 @md:w-6 @md:h-6" />
              </button>
              <button className="btn btn-outline btn-lg @md:btn-xl">
                <Play className="w-5 h-5 @md:w-6 @md:h-6" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 @md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl @md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm @md:text-base text-base-content/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 @md:py-32">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl @md:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-primary">Scale</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Built for modern development teams who demand speed, reliability,
              and scalability.
            </p>
          </div>

          <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-base-300"
              >
                <div className="card-body p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="card-title text-xl mb-4">{feature.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {feature.description}
                  </p>
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
            <h2 className="text-3xl @md:text-5xl font-bold mb-6">
              Loved by <span className="text-primary">Developers</span>
            </h2>
            <p className="text-xl text-base-content/70">
              See what our customers are saying about CloudDeploy
            </p>
          </div>

          <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl border border-base-300"
              >
                <div className="card-body p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-warning fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-base-content/80 mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
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
            <h2 className="text-3xl @md:text-5xl font-bold mb-6">
              Simple, <span className="text-primary">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-base-content/70">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-primary text-primary-content ring-4 ring-primary/20 scale-105"
                    : "bg-base-100 border border-base-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-secondary text-secondary-content px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="card-body p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p
                    className={`mb-6 ${plan.popular ? "text-primary-content/80" : "text-base-content/60"}`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-4xl @md:text-5xl font-bold">
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

                  <button
                    className={`btn w-full ${
                      plan.popular ? "btn-secondary" : "btn-primary"
                    }`}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Free Trial"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 @md:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8 text-center">
          <h2 className="text-3xl @md:text-5xl font-bold text-primary-content mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-content/90 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who trust CloudDeploy for their
            deployment needs.
          </p>
          <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
            <button className="btn btn-secondary btn-lg @md:btn-xl shadow-xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5 @md:w-6 @md:h-6" />
            </button>
            <button className="btn btn-outline btn-lg @md:btn-xl text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
              <Headphones className="w-5 h-5 @md:w-6 @md:h-6" />
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-16">
        <div className="container mx-auto px-4 @sm:px-6 @lg:px-8">
          <div className="grid @md:grid-cols-2 @lg:grid-cols-4 gap-8">
            <div className="col-span-2 @md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-content" />
                </div>
                <h3 className="text-xl font-bold">CloudDeploy</h3>
              </div>
              <p className="text-base-content/70 mb-6 leading-relaxed">
                The fastest way to deploy, scale, and monitor your applications
                worldwide.
              </p>
              <div className="flex gap-3">
                <button className="btn btn-ghost btn-circle btn-sm">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-circle btn-sm">
                  <Github className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-circle btn-sm">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-base-content/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-base-content/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-base-content/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-base-content/20 mt-12 pt-8 text-center">
            <p className="text-base-content/60">
              © 2025 CloudDeploy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

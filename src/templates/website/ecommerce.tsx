import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  Menu,
  User,
  MapPin,
  Phone,
  Mail,
  Plus,
  Minus,
  Share2,
  Eye,
} from "lucide-react";

export default function EcommerceSite() {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "Sale",
      isLiked: false,
    },
    {
      id: 2,
      name: "Smart Watch Series 8",
      price: 299.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      badge: "New",
      isLiked: true,
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.3,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      badge: "Sale",
      isLiked: false,
    },
    {
      id: 4,
      name: "USB-C Hub Multiport",
      price: 34.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      badge: "Hot",
      isLiked: false,
    },
  ];

  const categories = [
    {
      name: "Electronics",
      count: 234,
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop",
    },
    {
      name: "Fashion",
      count: 189,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
    },
    {
      name: "Home & Garden",
      count: 156,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    },
    {
      name: "Sports",
      count: 98,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    },
    {
      name: "Books",
      count: 123,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
    },
    {
      name: "Toys",
      count: 76,
      image:
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "SSL encrypted checkout",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment",
      description: "Credit cards & PayPal",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      {/* Header */}
      <div className="bg-base-100 shadow-lg border-b border-base-300">
        {/* Top Bar */}
        <div className="bg-primary text-primary-content">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm @md:text-base">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="hidden @sm:inline font-medium">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="hidden @md:inline">
                    support@techstore.com
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden @sm:inline font-medium">
                  🚚 Free shipping on orders over $50
                </span>
                <div className="flex items-center gap-2 hover:text-primary-content/80 transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Track Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="dropdown @lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm"
                >
                  <Menu className="w-6 h-6" />
                </div>
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
                  <li>
                    <a className="font-medium">Categories</a>
                  </li>
                  <li>
                    <a>Deals</a>
                  </li>
                  <li>
                    <a>New Arrivals</a>
                  </li>
                  <li>
                    <a>Contact</a>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-content font-bold text-xl">
                    T
                  </span>
                </div>
                <h1 className="text-2xl @md:text-3xl @lg:text-4xl font-bold text-primary">
                  TechStore
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="join w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for products, brands, and more..."
                    className="input input-bordered join-item w-full pr-12 text-base border-base-300 focus:border-primary"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                </div>
                <button className="btn btn-primary join-item px-8 shadow-lg hover:shadow-xl transition-all duration-200">
                  Search
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="btn btn-ghost btn-circle btn-md indicator hover:bg-base-200">
                <User className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-circle btn-md indicator hover:bg-base-200">
                <span className="indicator-item badge badge-error badge-xs">
                  2
                </span>
                <Heart className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-circle btn-md indicator hover:bg-base-200">
                <span className="indicator-item badge badge-primary badge-sm">
                  3
                </span>
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden @lg:block border-t border-base-300 bg-base-50">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-8 py-4">
              <a
                href="#"
                className="text-base font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg transition-colors"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-base hover:text-primary transition-colors font-medium"
              >
                🔥 Deals
              </a>
              <a
                href="#"
                className="text-base hover:text-primary transition-colors font-medium"
              >
                ✨ New Arrivals
              </a>
              <a
                href="#"
                className="text-base hover:text-primary transition-colors font-medium"
              >
                ⭐ Best Sellers
              </a>
              <a
                href="#"
                className="text-base hover:text-primary transition-colors font-medium"
              >
                📞 Contact
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero bg-gradient-to-br from-primary via-primary-focus to-secondary text-primary-content">
        <div className="hero-content container mx-auto px-4 py-12 @md:py-16 @lg:py-20">
          <div className="grid @lg:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6 @lg:space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl @md:text-4xl @lg:text-5xl @xl:text-6xl font-bold leading-tight">
                  Latest Tech at <span className="text-accent">Unbeatable</span>{" "}
                  Prices
                </h2>
                <p className="text-lg @md:text-xl @lg:text-2xl opacity-90 leading-relaxed">
                  Discover cutting-edge technology and premium electronics with
                  fast shipping and excellent customer service.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="btn btn-accent btn-lg @lg:btn-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  Shop Now
                </button>
                <button className="btn btn-outline btn-lg @lg:btn-xl text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
                  Learn More
                </button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl @md:text-3xl font-bold">10K+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl @md:text-3xl font-bold">5K+</div>
                  <div className="text-sm opacity-90">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl @md:text-3xl font-bold">99.9%</div>
                  <div className="text-sm opacity-90">Uptime</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square @lg:aspect-auto @lg:h-96 @xl:h-[500px] relative">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop"
                  alt="Featured Products"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-base-100/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                        <span className="text-success-content font-bold">
                          ✓
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-base-content">
                          Free Shipping
                        </p>
                        <p className="text-sm text-base-content/70">
                          On orders over $50
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-200 py-12 @lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl @md:text-3xl font-bold text-base-content mb-4">
              Why Choose TechStore?
            </h3>
            <p className="text-base-content/70 text-lg">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 @lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-base-300"
              >
                <div className="card-body p-6 text-center">
                  <div className="mx-auto w-16 h-16 @lg:w-20 @lg:h-20 bg-primary text-primary-content rounded-full flex items-center justify-center shadow-lg mb-4">
                    <feature.icon className="w-8 h-8 @lg:w-10 @lg:h-10" />
                  </div>
                  <h4 className="text-base @lg:text-lg font-bold text-base-content mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm @lg:text-base text-base-content/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8 @lg:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-sm @md:text-base @lg:text-lg text-base-content/70">
            Find exactly what you're looking for in our curated categories
          </p>
        </div>

        <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-6 gap-4 @lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-base-300 transform hover:-translate-y-1"
            >
              <div className="card-body p-6 text-center">
                <div className="aspect-square mb-4 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm @md:text-base font-bold text-base-content group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-xs @md:text-sm text-base-content/60 mt-1">
                  {category.count} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8 @lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-2">
              Featured Products
            </h2>
            <p className="text-sm @md:text-base text-base-content/70">
              Handpicked items just for you
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline btn-sm @md:btn-md">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm @md:btn-md"
              >
                Sort by <ChevronDown className="w-4 h-4" />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-200">
                <li>
                  <a>Price: Low to High</a>
                </li>
                <li>
                  <a>Price: High to Low</a>
                </li>
                <li>
                  <a>Best Rating</a>
                </li>
                <li>
                  <a>Newest</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-6 @lg:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-base-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 z-10 badge ${
                      product.badge === "Sale"
                        ? "badge-error"
                        : product.badge === "New"
                          ? "badge-success"
                          : "badge-warning"
                    } text-sm font-bold shadow-lg`}
                  >
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-4 right-4 z-10 btn btn-circle btn-sm bg-base-100/90 hover:bg-base-100 border-base-300 shadow-lg">
                  <Heart
                    className={`w-4 h-4 ${product.isLiked ? "fill-error text-error" : "text-base-content/70"}`}
                  />
                </button>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
                    <button className="btn btn-circle btn-md bg-base-100 shadow-xl hover:bg-primary hover:text-primary-content transform hover:scale-110 transition-all duration-200">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="btn btn-circle btn-md bg-base-100 shadow-xl hover:bg-primary hover:text-primary-content transform hover:scale-110 transition-all duration-200">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body p-6">
                <h3 className="text-base @md:text-lg font-bold line-clamp-2 h-12 @md:h-14 text-base-content group-hover:text-primary transition-colors duration-200">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 my-3">
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-warning fill-current"
                            : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-base-content/70 font-medium">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl @md:text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-base-content/60 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="badge badge-success text-xs font-bold">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                <button className="btn btn-primary w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-300 mt-12">
        <div className="container mx-auto px-4 py-8 @lg:py-12">
          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg @lg:text-xl font-bold text-primary">
                TechStore
              </h3>
              <p className="text-sm @md:text-base text-base-content/70">
                Your trusted partner for premium electronics and cutting-edge
                technology.
              </p>
              <div className="flex gap-2">
                <button className="btn btn-circle btn-outline btn-sm">f</button>
                <button className="btn btn-circle btn-outline btn-sm">t</button>
                <button className="btn btn-circle btn-outline btn-sm">i</button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm @md:text-base font-semibold">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm @md:text-base text-base-content/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm @md:text-base font-semibold">
                Categories
              </h4>
              <ul className="space-y-2 text-sm @md:text-base text-base-content/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Computers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Smartphones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm @md:text-base font-semibold">
                Newsletter
              </h4>
              <p className="text-sm @md:text-base text-base-content/70">
                Subscribe for exclusive deals and updates.
              </p>
              <div className="join w-full">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered join-item flex-1 input-sm @md:input-md"
                />
                <button className="btn btn-primary join-item btn-sm @md:btn-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex flex-col @md:flex-row items-center justify-between gap-4 text-sm @md:text-base text-base-content/60">
            <p>&copy; 2025 TechStore. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

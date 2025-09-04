import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Search,
  Bell,
  Mail,
  Home,
  Hash,
  Bookmark,
  User,
  Settings,
  ImageIcon,
  Smile,
  Calendar,
  MapPin,
} from "lucide-react";

export default function TwitterLike() {
  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        username: "sarahchen",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "Just shipped a new feature that I'm really excited about! Container queries are game-changers for responsive design 🚀",
      timestamp: "2h",
      likes: 42,
      retweets: 12,
      replies: 8,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      user: {
        name: "Alex Rodriguez",
        username: "alexdev",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: false,
      },
      content:
        "Hot take: TypeScript makes JavaScript development so much more enjoyable. The time saved on debugging is incredible.",
      timestamp: "4h",
      likes: 128,
      retweets: 34,
      replies: 23,
    },
    {
      id: 3,
      user: {
        name: "Design Weekly",
        username: "designweekly",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "10 UI/UX trends we're seeing in 2025:\n\n1. Adaptive interfaces\n2. Voice-first design\n3. Micro-interactions\n4. Dark mode by default\n5. Sustainability-focused UX\n\nWhat trends are you excited about?",
      timestamp: "6h",
      likes: 89,
      retweets: 56,
      replies: 31,
    },
  ];

  const trendingTopics = [
    { tag: "#WebDev", posts: "12.3K" },
    { tag: "#TypeScript", posts: "8.7K" },
    { tag: "#React", posts: "15.2K" },
    { tag: "#CSS", posts: "6.9K" },
    { tag: "#NextJS", posts: "4.5K" },
  ];

  const suggestedUsers = [
    {
      name: "Emma Wilson",
      username: "emmawilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      bio: "Frontend Developer • React enthusiast",
    },
    {
      name: "Michael Kim",
      username: "michaelkim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack engineer at TechCorp",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar - Hidden on mobile, shown on larger screens */}
        <div className="hidden @lg:flex @lg:w-64 @xl:w-80 flex-col h-screen sticky top-0 p-6 border-r border-base-300 bg-base-50">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-content font-bold text-lg">
                  D
                </span>
              </div>
              <h1 className="text-xl @xl:text-2xl font-bold text-base-content">
                DevSocial
              </h1>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl bg-primary text-primary-content font-medium transition-all duration-200 hover:bg-primary-focus"
            >
              <Home className="w-6 h-6 @xl:w-7 @xl:h-7" />
              <span className="text-base @xl:text-lg">Home</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <Hash className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Explore
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <Bell className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Notifications
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <Mail className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Messages
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <Bookmark className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Bookmarks
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <User className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Profile
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 group"
            >
              <Settings className="w-6 h-6 @xl:w-7 @xl:h-7 text-base-content/70 group-hover:text-base-content" />
              <span className="text-base @xl:text-lg text-base-content/70 group-hover:text-base-content">
                Settings
              </span>
            </a>
          </nav>

          <div className="mt-auto space-y-4">
            <button className="btn btn-primary w-full @xl:btn-lg rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <span className="text-base @xl:text-lg">Post</span>
            </button>

            <div className="dropdown dropdown-top dropdown-end w-full">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 p-4 rounded-2xl hover:bg-base-200 transition-all duration-200 w-full"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="Your avatar"
                    />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-base">John Doe</p>
                  <p className="text-sm text-base-content/60">@johndoe</p>
                </div>
                <MoreHorizontal className="w-5 h-5 text-base-content/60" />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-xl border border-base-300">
                <li>
                  <a>Switch Account</a>
                </li>
                <li>
                  <a>Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl border-r border-base-300 bg-base-100">
          {/* Header */}
          <div className="sticky top-0 bg-base-100/95 backdrop-blur-md border-b border-base-300 p-6 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl @md:text-2xl font-bold text-base-content">
                Home
              </h2>
              <div className="flex @lg:hidden">
                <button className="btn btn-ghost btn-circle btn-sm">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Compose Tweet */}
          <div className="border-b border-base-300 p-6 bg-base-50">
            <div className="flex gap-4">
              <div className="avatar">
                <div className="w-12 h-12 @md:w-14 @md:h-14 rounded-full ring-2 ring-primary ring-offset-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Your avatar"
                  />
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="What's happening?"
                  className="textarea textarea-ghost w-full text-lg @md:text-xl resize-none focus:outline-none p-0 border-none bg-transparent placeholder:text-base-content/50"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="btn btn-primary @md:btn-md rounded-full font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-200">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-0">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-b border-base-300 p-6 hover:bg-base-50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="avatar">
                    <div className="w-12 h-12 @md:w-14 @md:h-14 rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200">
                      <img src={post.user.avatar} alt={post.user.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-base @md:text-lg text-base-content truncate">
                        {post.user.name}
                      </h3>
                      {post.user.verified && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-content text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      )}
                      <span className="text-base-content/60 text-sm @md:text-base">
                        @{post.user.username}
                      </span>
                      <span className="text-base-content/40 text-sm">·</span>
                      <span className="text-base-content/60 text-sm">
                        {post.timestamp}
                      </span>
                      <div className="ml-auto">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </div>
                          <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-xl border border-base-300">
                            <li>
                              <a>Save post</a>
                            </li>
                            <li>
                              <a>Copy link</a>
                            </li>
                            <li>
                              <a>Report</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <p className="text-base @md:text-lg mb-4 whitespace-pre-line text-base-content leading-relaxed">
                      {post.content}
                    </p>

                    {post.image && (
                      <div className="mb-4 rounded-2xl overflow-hidden border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between max-w-md">
                      <button className="flex items-center gap-2 p-3 rounded-full hover:bg-info/10 transition-all duration-200 group/btn">
                        <MessageCircle className="w-5 h-5 text-base-content/60 group-hover/btn:text-info transition-colors duration-200" />
                        <span className="text-sm @md:text-base text-base-content/60 group-hover/btn:text-info transition-colors duration-200 font-medium">
                          {post.replies}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 p-3 rounded-full hover:bg-success/10 transition-all duration-200 group/btn">
                        <Repeat2 className="w-5 h-5 text-base-content/60 group-hover/btn:text-success transition-colors duration-200" />
                        <span className="text-sm @md:text-base text-base-content/60 group-hover/btn:text-success transition-colors duration-200 font-medium">
                          {post.retweets}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 p-3 rounded-full hover:bg-error/10 transition-all duration-200 group/btn">
                        <Heart className="w-5 h-5 text-base-content/60 group-hover/btn:text-error transition-colors duration-200" />
                        <span className="text-sm @md:text-base text-base-content/60 group-hover/btn:text-error transition-colors duration-200 font-medium">
                          {post.likes}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 p-3 rounded-full hover:bg-base-200 transition-all duration-200 group/btn">
                        <Share className="w-5 h-5 text-base-content/60 group-hover/btn:text-base-content transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile and tablet */}
        <div className="hidden @xl:flex @xl:w-80 flex-col p-6 space-y-6 bg-base-50">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
            <input
              type="text"
              placeholder="Search DevSocial"
              className="input input-bordered w-full pl-12 bg-base-100 border-base-300 focus:border-primary text-base rounded-full"
            />
          </div>

          {/* Trending */}
          <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-base-content">
              Whats happening
            </h3>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="hover:bg-base-200 p-3 rounded-xl transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base text-primary group-hover:text-primary-focus">
                        {topic.tag}
                      </p>
                      <p className="text-sm text-base-content/60 mt-1">
                        {topic.posts} posts
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-primary hover:text-primary-focus text-sm font-medium mt-4 hover:underline transition-all duration-200">
              Show more
            </button>
          </div>

          {/* Who to follow */}
          <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-base-content">
              Who to follow
            </h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between hover:bg-base-200 p-3 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base truncate text-base-content">
                        {user.name}
                      </p>
                      <p className="text-sm text-base-content/60">
                        @{user.username}
                      </p>
                      <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm rounded-full border-base-300 hover:bg-base-content hover:text-base-100 hover:border-base-content transition-all duration-200">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <button className="text-primary hover:text-primary-focus text-sm font-medium mt-4 hover:underline transition-all duration-200">
              Show more
            </button>
          </div>

          {/* Footer */}
          <div className="text-xs text-base-content/50 space-y-2">
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="hover:text-base-content/70 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-base-content/70 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-base-content/70 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
            <p>&copy; 2025 DevSocial, Inc.</p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="@lg:hidden fixed bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-t border-base-300 p-4 z-50">
        <div className="flex justify-around max-w-sm mx-auto">
          <button className="btn btn-ghost btn-circle bg-primary text-primary-content">
            <Home className="w-6 h-6" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-base-200">
            <Search className="w-6 h-6" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-base-200 indicator">
            <span className="indicator-item badge badge-primary badge-xs">
              3
            </span>
            <Bell className="w-6 h-6" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-base-200 indicator">
            <span className="indicator-item badge badge-primary badge-xs">
              2
            </span>
            <Mail className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

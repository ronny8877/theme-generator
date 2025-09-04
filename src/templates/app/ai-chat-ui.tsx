import {
  Send,
  Bot,
  User,
  Paperclip,
  Mic,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Zap,
  Sparkles,
  Search,
  Settings,
  Plus,
  Menu,
} from "lucide-react";

export default function AIChatUI() {
  const conversations = [
    {
      id: 1,
      title: "React Best Practices",
      lastMessage: "Thanks for the explanation about hooks!",
      timestamp: "2m ago",
      isActive: true,
    },
    {
      id: 2,
      title: "TypeScript Migration",
      lastMessage: "How do I convert this JavaScript file?",
      timestamp: "1h ago",
      isActive: false,
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      lastMessage: "Perfect! That solved my layout issue.",
      timestamp: "3h ago",
      isActive: false,
    },
    {
      id: 4,
      title: "Database Design",
      lastMessage: "What's the best approach for this schema?",
      timestamp: "1d ago",
      isActive: false,
    },
  ];

  const messages = [
    {
      id: 1,
      type: "user" as const,
      content: "What are the best practices for React hooks?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "assistant" as const,
      content:
        "Here are some key React hooks best practices:\n\n1. **Always call hooks at the top level** - Never call hooks inside loops, conditions, or nested functions\n\n2. **Use custom hooks for reusable logic** - Extract complex stateful logic into custom hooks\n\n3. **Keep useState simple** - Break down complex state into multiple useState calls\n\n4. **Use useEffect wisely** - Include all dependencies and clean up side effects\n\n5. **Optimize with useMemo and useCallback** - Prevent unnecessary re-renders",
      timestamp: "10:30 AM",
    },
    {
      id: 3,
      type: "user" as const,
      content: "Can you show me an example of a custom hook?",
      timestamp: "10:32 AM",
    },
    {
      id: 4,
      type: "assistant" as const,
      content:
        "Certainly! Here's a simple custom hook for handling form input:\n\n```jsx\nfunction useInput(initialValue) {\n  const [value, setValue] = useState(initialValue);\n  \n  const handleChange = (e) => {\n    setValue(e.target.value);\n  };\n  \n  const reset = () => {\n    setValue(initialValue);\n  };\n  \n  return {\n    value,\n    onChange: handleChange,\n    reset\n  };\n}\n\n// Usage\nfunction MyForm() {\n  const name = useInput('');\n  const email = useInput('');\n  \n  return (\n    <form>\n      <input {...name} placeholder=\"Name\" />\n      <input {...email} placeholder=\"Email\" />\n    </form>\n  );\n}\n```\n\nThis custom hook encapsulates the input state logic and can be reused across components.",
      timestamp: "10:32 AM",
    },
  ];

  const suggestions = [
    "Explain React Server Components",
    "Best practices for TypeScript",
    "How to optimize React performance",
    "CSS-in-JS vs Tailwind CSS",
  ];

  return (
    <div className="min-h-screen bg-base-100 flex @container">
      {/* Sidebar */}
      <div className="hidden @lg:flex @lg:w-80 flex-col bg-base-200 border-r border-base-300">
        {/* Header */}
        <div className="p-6 border-b border-base-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-content" />
            </div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
          </div>

          <button className="btn btn-primary w-full gap-2 rounded-xl">
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-base-300 ${
                  conv.isActive
                    ? "bg-primary text-primary-content"
                    : "bg-base-100"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`font-semibold text-sm truncate ${
                      conv.isActive
                        ? "text-primary-content"
                        : "text-base-content"
                    }`}
                  >
                    {conv.title}
                  </h3>
                  <span
                    className={`text-xs ${
                      conv.isActive
                        ? "text-primary-content/70"
                        : "text-base-content/60"
                    }`}
                  >
                    {conv.timestamp}
                  </span>
                </div>
                <p
                  className={`text-xs truncate ${
                    conv.isActive
                      ? "text-primary-content/80"
                      : "text-base-content/70"
                  }`}
                >
                  {conv.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-base-300">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">John Doe</p>
              <p className="text-xs text-base-content/60">Free Plan</p>
            </div>
            <button className="btn btn-ghost btn-sm btn-circle">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 @md:p-6 border-b border-base-300 bg-base-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="btn btn-ghost btn-sm btn-circle @lg:hidden">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-content" />
                </div>
                <div>
                  <h2 className="font-semibold">AI Assistant</h2>
                  <p className="text-xs text-success flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-sm btn-circle">
                <Search className="w-4 h-4" />
              </button>
              <button className="btn btn-ghost btn-sm btn-circle">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 @md:p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    message.type === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-gradient-to-br from-primary to-secondary text-primary-content"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-4xl ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-primary text-primary-content ml-auto"
                      : "bg-base-200 text-base-content"
                  } ${message.type === "user" ? "rounded-br-md" : "rounded-bl-md"}`}
                >
                  <div className="whitespace-pre-wrap text-sm @md:text-base leading-relaxed">
                    {message.content}
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 mt-2 text-xs text-base-content/60 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {message.type === "assistant" && (
                    <div className="flex items-center gap-1">
                      <button className="btn btn-ghost btn-xs btn-circle hover:bg-base-300">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="btn btn-ghost btn-xs btn-circle hover:bg-base-300">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="btn btn-ghost btn-xs btn-circle hover:bg-base-300">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      <button className="btn btn-ghost btn-xs btn-circle hover:bg-base-300">
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="px-4 @md:px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="btn btn-outline btn-sm rounded-full text-xs hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 @md:p-6 border-t border-base-300 bg-base-50">
          <div className="relative">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    placeholder="Ask me anything..."
                    rows={1}
                    className="textarea textarea-bordered w-full resize-none pr-24 @md:pr-32 text-sm @md:text-base rounded-2xl bg-base-100 border-base-300 focus:border-primary min-h-[3rem]"
                    style={{ maxHeight: "150px" }}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-circle">
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-base-content/60">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>AI can make mistakes. Check important info.</span>
              </div>
              <span>0/4000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

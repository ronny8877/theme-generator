import React, { useState } from "react";
import { MessageSquare, Plus, Send, Settings, User, Menu } from "lucide-react";

type Conv = {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
};
type Msg = {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
};

export default function AIChatUI() {
  const [conversations] = useState<Conv[]>([
    {
      id: 1,
      title: "Understanding Quantum Computing",
      lastMessage: "Short intro and resources",
      timestamp: "2m",
      isActive: true,
    },
    {
      id: 2,
      title: "Creative Writing Prompts",
      lastMessage: "New prompt ideas",
      timestamp: "1h",
    },
    {
      id: 3,
      title: "Sourdough Recipe",
      lastMessage: "Starter tips",
      timestamp: "3h",
    },
    {
      id: 4,
      title: "Trip to Japan",
      lastMessage: "Itinerary draft",
      timestamp: "1d",
    },
  ]);

  const [messages] = useState<Msg[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hi — how can I help you today?",
      timestamp: "10:30",
    },
    {
      id: 2,
      type: "user",
      content: "Give me a quick primer on React hooks.",
      timestamp: "10:31",
    },
  ]);

  const suggestions = [
    "Explain React Server Components",
    "Best practices for TypeScript",
    "How to optimize React performance",
    "CSS-in-JS vs Tailwind CSS",
  ];

  return (
    <div className="@container flex bg-base-100 text-base-content h-screen @md:h-[90vh] @lg:h-[95vh]">
      {/* Sidebar (visible on medium+ previews) */}
      <aside className="hidden @md:flex @md:w-64 @lg:w-72 @xl:w-80 flex-col bg-base-200 border-r border-base-300">
        <div className="p-4 @lg:p-6">
          <div className="mb-4 @lg:mb-6 flex items-center gap-3">
            <div className="w-8 h-8 @lg:w-10 @lg:h-10 rounded-box bg-primary text-primary-content flex items-center justify-center">
              <MessageSquare className="w-4 h-4 @lg:w-5 @lg:h-5" />
            </div>
            <h1 className="text-sm @lg:text-lg font-semibold text-base-content">
              AI Assistant
            </h1>
          </div>

          <button className="btn btn-primary mb-4 w-full gap-2 rounded-box btn-sm @lg:btn-md">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 @lg:px-6 pb-4">
          <div className="space-y-1 @lg:space-y-2">
            {conversations.map((c) => (
              <a
                key={c.id}
                className={`flex items-center gap-3 rounded-box px-3 py-2 @lg:py-3 text-xs @lg:text-sm font-medium transition-colors cursor-pointer ${
                  c.isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                }`}
                href="#"
              >
                <MessageSquare className="w-4 h-4 @lg:w-5 @lg:h-5 shrink-0" />
                <span className="truncate">{c.title}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-auto p-4 @lg:p-6 pt-2 space-y-1 @lg:space-y-2">
          <a
            className="flex items-center gap-3 rounded-box px-3 py-2 text-xs @lg:text-sm font-medium text-base-content hover:bg-base-300 transition-colors"
            href="#"
          >
            <Settings className="w-3 h-3 @lg:w-4 @lg:h-4" />
            Settings
          </a>
          <a
            className="flex items-center gap-3 rounded-box px-3 py-2 text-xs @lg:text-sm font-medium text-base-content hover:bg-base-300 transition-colors"
            href="#"
          >
            <User className="w-3 h-3 @lg:w-4 @lg:h-4" />
            Profile
          </a>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col min-h-0">
        <header className="p-3 @md:p-4 @lg:px-6 @lg:py-4 border-b border-base-300 bg-base-100">
          <div className="flex items-center justify-between">
            <button className="btn btn-ghost btn-sm btn-circle @lg:hidden">
              <Menu className="w-4 h-4" />
            </button>

            <h2 className="text-sm @md:text-lg font-semibold @md:hidden text-center flex-1 text-base-content">
              AI Assistant
            </h2>

            <button className="btn btn-ghost btn-sm btn-circle">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        <section
          className="flex-1 overflow-y-auto p-3 @md:p-4 @lg:p-6 space-y-4 @md:space-y-6"
          style={{ minHeight: 0 }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 @md:gap-4 ${m.type === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-7 h-7 @md:w-8 @md:h-8 rounded-box flex items-center justify-center ${m.type === "user" ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}`}
                >
                  {m.type === "user" ? (
                    <User className="w-3 h-3 @md:w-4 @md:h-4" />
                  ) : (
                    <MessageSquare className="w-3 h-3 @md:w-4 @md:h-4" />
                  )}
                </div>
              </div>

              <div
                className={`flex-1 max-w-3xl @lg:max-w-4xl ${m.type === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-3 @md:p-4 rounded-box ${m.type === "user" ? "bg-primary text-primary-content ml-auto" : "bg-base-200 text-base-content"}`}
                >
                  <div className="whitespace-pre-wrap text-sm @md:text-base leading-relaxed">
                    {m.content}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 mt-1 @md:mt-2 text-xs @md:text-sm text-base-content/60 ${m.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span>{m.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="px-3 @md:px-4 @lg:px-6 pb-3 @md:pb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="btn btn-outline btn-xs @md:btn-sm rounded-box text-xs @md:text-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <footer className="p-3 @md:p-4 @lg:p-6 border-t border-base-300 bg-base-100">
          <div className="relative">
            <div className="flex items-end gap-2 @md:gap-3">
              <div className="flex-1">
                <textarea
                  placeholder="Type your message here..."
                  rows={2}
                  className="textarea textarea-bordered w-full resize-none pr-20 @md:pr-24 text-sm @md:text-base rounded-box bg-base-200 text-base-content placeholder:text-base-content/50"
                  style={{ maxHeight: 120 }}
                />
                <div className="absolute right-2 @md:right-3 bottom-2 @md:bottom-3 flex items-center gap-1 @md:gap-2">
                  <button
                    className="btn btn-ghost btn-xs @md:btn-sm btn-circle"
                    aria-label="attach"
                  >
                    <svg
                      className="w-3 h-3 @md:w-4 @md:h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M21 15v4a2 2 0 0 1-2 2h-8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn btn-ghost btn-xs @md:btn-sm btn-circle"
                    aria-label="mic"
                  >
                    <svg
                      className="w-3 h-3 @md:w-4 @md:h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 1v11"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary btn-circle btn-sm @md:btn-md"
                aria-label="send"
              >
                <Send className="w-3 h-3 @md:w-4 @md:h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 @md:mt-3 text-xs @md:text-sm text-base-content/60">
              <div className="flex items-center gap-2">
                <span className="hidden @md:inline">
                  AI can make mistakes. Consider checking important information.
                </span>
                <span className="@md:hidden">AI can make mistakes</span>
              </div>
              <span>0/4000</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

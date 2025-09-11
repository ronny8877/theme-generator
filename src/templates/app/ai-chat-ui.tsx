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
    <div
      className="@container flex bg-base-100 text-base-content @sm:h-screen md:h-[93vh] @4xl:h-[95vh]"
      data-theme="figtree"
      // style={{ minHeight: "var(--app-height, 100vh)" }}
    >
      {/* Sidebar (visible on medium+ previews) */}
      <aside className="hidden @md:flex @md:w-72 @lg:w-80 flex-col bg-base-200 p-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-content flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h1 className="text-sm @md:text-lg font-semibold">AI Assistant</h1>
        </div>

        <button className="btn btn-primary mb-4 w-full gap-2 roF@md:-rounded-box">
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <nav className="flex-1 overflow-y-auto space-y-2">
          {conversations.map((c) => (
            <a
              key={c.id}
              className={`flex items-center gap-3 rounded-box px-3 py-2 text-sm font-medium transition-colors truncate ${
                c.isActive
                  ? "bg-primary text-primary-content"
                  : "text-base-content hover:bg-base-300"
              }`}
              href="#"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="truncate">{c.title}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <a
            className="flex items-center gap-3 rounded-box px-3 py-2 text-sm font-medium text-base-content hover:bg-base-300"
            href="#"
          >
            <Settings className="w-4 h-4" />
            Settings
          </a>
          <a
            className="flex items-center gap-3 rounded-box px-3 py-2 text-sm font-medium text-base-content hover:bg-base-300"
            href="#"
          >
            <User className="w-4 h-4" />
            Profile
          </a>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col min-h-0">
        <header className="p-4 @md:px-6 py-1 border-b border-base-300 bg-base-100">
          <div className="flex items-center justify-between">
            <button className="btn btn-ghost btn-sm btn-circle @lg:hidden">
              <Menu className="w-4 h-4" />
            </button>

            <h2 className=" text-sm @md:text-lg block @md:font-semibold @md:hidden text-center w-60 p-0">
              AI Assistant
            </h2>

            <button className="btn btn-ghost btn-sm btn-circle">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        <section
          className="flex-1 overflow-y-auto p-3 @md:p-6 space-y-6"
          style={{ minHeight: 0 }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 ${m.type === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.type === "user" ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}`}
                >
                  {m.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                </div>
              </div>

              <div
                className={`flex-1 max-w-4xl ${m.type === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl ${m.type === "user" ? "bg-primary text-primary-content ml-auto" : "bg-base-200 text-base-content"}`}
                >
                  <div className="whitespace-pre-wrap text-sm @md:text-base leading-relaxed">
                    {m.content}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 mt-2 text-xs text-base-content/60 ${m.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span>{m.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="px-4 @md:px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="btn btn-outline btn-sm rounded-full text-xs"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <footer className="p-4 @md:p-6 border-t border-base-300 bg-base-100">
          <div className="relative">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  placeholder="Type your message here..."
                  rows={2}
                  className="textarea textarea-bordered w-full resize-none pr-12 text-sm @md:text-base rounded-lg bg-base-200"
                  style={{ maxHeight: 150 }}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    aria-label="attach"
                  >
                    {/* keep simple, icon placeholder */}
                    <svg
                      className="w-4 h-4"
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
                    className="btn btn-ghost btn-sm btn-circle"
                    aria-label="mic"
                  >
                    <svg
                      className="w-4 h-4"
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
                className="btn btn-primary btn-circle ml-2"
                aria-label="send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-base-content/60">
              <div className="flex items-center gap-2">
                <span>
                  AI can make mistakes. Consider checking important information.
                </span>
              </div>
              <span>0/4000</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

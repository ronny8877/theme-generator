import {
  Home,
  FileText,
  Star,
  BookOpen,
  Lightbulb,
  Menu,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

export default function TechCoreBlog() {
  return (
    <div
      className={`@container min-h-screen bg-base-100 text-base-content`}
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <header className="w-full border-b border-base-200 bg-base-100/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 ">
            <div className="text-black">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]  @md:text-xl">
              TechCore
            </h2>
          </div>

          {/* Desktop nav - visible on md+ using container queries */}
          <nav className="hidden items-center gap-6 @md:flex">
            <a
              className="flex items-center gap-2 text-sm font-medium leading-normal text-base-content"
              href="#"
            >
              <Home className="h-5 w-5 text-primary " />
              <span className="sr-only @md:not-sr-only">Home</span>
            </a>
            <a
              className="flex items-center gap-2 text-sm font-medium leading-normal text-base-content"
              href="#"
            >
              <FileText className="h-5 w-5 text-primary " />
              <span className="sr-only @md:not-sr-only">News</span>
            </a>
            <a
              className="flex items-center gap-2 text-sm font-medium leading-normal text-base-content"
              href="#"
            >
              <Star className="h-5 w-5 text-primary " />
              <span className="sr-only @md:not-sr-only">Reviews</span>
            </a>
            <a
              className="flex items-center gap-2 text-sm font-medium leading-normal text-base-content"
              href="#"
            >
              <BookOpen className="h-5 w-5 text-primary " />
              <span className="sr-only @md:not-sr-only">Guides</span>
            </a>
            <a
              className="flex items-center gap-2 text-sm font-medium leading-normal text-base-content"
              href="#"
            >
              <Lightbulb className="h-5 w-5 text-primary    " />
              <span className="sr-only @md:not-sr-only">Tips</span>
            </a>
          </nav>

          {/* Mobile menu using details/summary so no client JS required */}
          <details className="@md:hidden">
            <summary className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-100">
              <Menu className="h-5 w-5 text-neutral-700" />
            </summary>
            <div className="mt-2 w-48 rounded-lg bg-base-100 p-2 shadow-lg">
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                href="#"
              >
                <Home className="h-5 w-5" />
                Home
              </a>
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                href="#"
              >
                <FileText className="h-5 w-5" />
                News
              </a>
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                href="#"
              >
                <Star className="h-5 w-5" />
                Reviews
              </a>
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                href="#"
              >
                <BookOpen className="h-5 w-5" />
                Guides
              </a>
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                href="#"
              >
                <Lightbulb className="h-5 w-5" />
                Tips
              </a>
            </div>
          </details>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            >
              <User className="h-5 w-5" />
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full"
              style={{
                width: 36,
                height: 36,
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAav6kqmw3uH0EXOPNDeNgwiBtTNhM_N62h8v2EyssPD1KnRnpAEeZ69qsdOJ1PmNn5LUihWshE3YHhSHxUzqo-H1xjBisprKczWcL-Wy0Ida_1GBOpby-a8XRePqWPSY4iD9ih355covw0B7W33uAXch08UTKcbfBqxfxsx7upFhCAlV8rnQgnQMCTESUHh-xrBDIeLHOVTEd11plVQFgLSpl3SYelJsSZz9kahbjRJKoa9SRc2jWHD-gq_i-wbZjEIpYwJapErDI')",
              }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 @sm:px-6 @lg:px-8">
        <div className="relative mb-12 flex min-h-[360px] md:min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl  p-6 md:p-8 text-center bg-primary">
          <div className="absolute inset-0 z-0 h-full w-full text-primary-content">
            <img
              alt="Hero background"
              className="h-full w-full object-cover opacity-4 rounded-box"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7S5iHoxjrAa3Jw5P8J7g-X-J6myTTjyFPVI6yFdsp6D4hiIcqKUse47y7b0M20-26qHE4Ev8CX-N24xH-wDt011gPoT0O_Q855MLsxX43mu7juDR-C8pWYmqCGF4y5v1MSrcs97PjHdjmzWe6N128UwTdVULX5TG45sutMZfj1vnV--DvscAz_jnQDHWPoc9x-IHMogLITwzsGUX4N2N_h19wjPzJqBhPR4pivhmrv9zw1k72T2kachnw0bzYevIJcTScaDbhsdQ"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex flex-col gap-4 text-primary">
              <h1 className="text-3xl text-primary-content font-bold leading-tight tracking-tight @sm:text-4xl @md:text-5xl @lg:text-6xl">
                The Future of Tech is Here
              </h1>
              <h2 className="mx-auto max-w-2xl text-sm @sm:text-base font-normal leading-normal text-primary-content">
                Explore the latest innovations and insights in the world of
                technology. From groundbreaking gadgets to in-depth reviews,
                stay ahead of the curve with our expert analysis and commentary.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-content">
              <span className="truncate">Explore Now</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 @lg:col-span-8">
            <h2 className="px-4 text-base-content pb-4 pt-5 text-xl @sm:text-2xl font-bold leading-tight tracking-tight ">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 gap-8 ">
              {[1, 2, 3, 4].map((i) => (
                <article
                  key={i}
                  className="flex flex-col gap-4 rounded-xl p-4 transition-shadow hover:shadow-lg @md:flex-row"
                >
                  <div className="w-full overflow-hidden rounded-xl @md:w-56 @md:flex-shrink-0">
                    <img
                      alt="Post thumbnail"
                      className="w-full object-cover h-48 @md:h-36"
                      src={`https://picsum.photos/seed/tech-${i}/800/450`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg @md:text-xl font-semibold leading-normal text-base-content">
                      Sample Post Title {i}
                    </p>
                    <p className="text-sm font-normal leading-normal text-base-content">
                      A short excerpt highlighting the post&apos;s topic and why
                      it&apos;s worth reading.
                    </p>
                    <a
                      className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                      href="#"
                    >
                      Read More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="col-span-12 @lg:col-span-4">
            <div className="sticky top-20 @md:top-28">
              <div className="space-y-6 rounded-2xl bg-base-100 p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Suggested Posts
                </h3>
                <div className="flex flex-col gap-4  @sm:overflow-x-auto">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="flex-shrink-0 w-full @sm:w-56 flex items-center gap-4 hover:bg-base-300 p-2 rounded-boxs"
                    >
                      <img
                        alt="Suggested post thumbnail"
                        className="h-16 w-16 rounded-lg object-cover"
                        src={`https://picsum.photos/seed/thumb-${n}/80/80`}
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">Suggested Post {n}</p>
                        <p className="text-sm text-neutral-500">Category</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-6 rounded-2xl bg-base-100 p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments
                </h3>
                <div className="space-y-6">
                  {[1, 2].map((c) => (
                    <div key={c} className="flex items-start gap-4">
                      <img
                        alt="User avatar"
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                        src={`https://picsum.photos/seed/avatar-${c}/48/48`}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">User {c}</p>
                          <p className="text-xs0">{c} days ago</p>
                        </div>
                        <p className="text-sm text-base-content">
                          A short comment about the article or topic.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="mt-8 flex items-center justify-center p-4">
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
            href="#"
          >
            <ChevronLeft className="h-5 w-5" />
          </a>
          <a
            className="mx-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white bg-primary"
            href="#"
          >
            1
          </a>
          <a
            className="mx-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-normal text-neutral-600 hover:bg-neutral-100"
            href="#"
          >
            2
          </a>
          <a
            className="mx-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-normal text-neutral-600 hover:bg-neutral-100"
            href="#"
          >
            3
          </a>
          <a
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
            href="#"
          >
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
      </main>
      <footer className="footer items-center p-6 bg-base-200 rounded-2xl text-base-content">
        <aside className="grid-flow-col items-center">
          <p className="font-semibold">Built on Tailwind + DaisyUI</p>
          <p className="text-sm opacity-70">
            with shadcn/ui patterns and Next.js running on the edge.
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="link link-hover"
            href="https://daisyui.com/"
            target="_blank"
            rel="noreferrer"
          >
            DaisyUI docs
          </a>
          <a
            className="link link-hover"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind
          </a>
        </nav>
      </footer>
    </div>
  );
}

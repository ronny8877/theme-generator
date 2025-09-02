import { Search } from "lucide-react";

export default function BlogLanding() {
  const heroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCyr8wbpOZNNZ8n7JMYh3kQnn77OE6PfbBEHgwKXlcGHZ5VT30CTU_87vVORYKV9DON-byUbXXgqVhAUJw-MCkOmho5PUZnc81Qy8yo2MQY0kRoNHFEJZ5_NT6dNzlJo9GEJc19lsiIg6HUtK8XDb7zzJ5YYDEkgUiQDZ3tnvasLPN-i1A4mNxzhhH1uDVEhEBz3Mvy0iQHKlbJL9AMpr7Ik1qi0XraiHhxL51IkShTRn49SVJxbAwADvohKVk38UlOQwEjpvcACkc";

  const articles = [
    {
      title: "Mastering Productivity: Time Management Techniques",
      excerpt:
        "Learn proven time management strategies to boost your productivity.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYITX-oW-AxA02mHod2VaLRZMYOjFnh-DUxaapI5QyzmD1UUIQJQF5hT5d6mrX2LAXwtAwvyJvNTdP4Q7fVMaIvcd9GZvCS8nCrRdkMcFW5keuLSqc25dO7Y_TapikerXv5F0rrcn3TTdKXsYlpzR0wiPcfPAs_TM-zS2wkT5-TP6QRtkl3lz2G6CepwP3xmj0nItO42yLYrKEIDGBlNdzzlrMd4bYba-UU93n0pLVZX_Rh9I3WBug-susTxI2nAlkMuqn9GFQ3GI",
    },
    {
      title: "The Rise of AI in Software Development",
      excerpt:
        "Discover how artificial intelligence is transforming software development.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBLzrVJsKaPllk-wZ6deJ2Ed5ZPo2INNjQwCYZb7yXTpMp_wt4Ei78PUXV1g93Dz8ydKpYmUgEh7gUP8LMe0Wvx8xTQ7xMTO1MsdSadivTPKyFglQOlmlyjow40t7T1G6EwseObaeufmbx1sIQVnjTWYJciWOkKFggzUokbSSj1K4pi4gwe4qcMhg9OnOs5G7WwBv0mLhPuhW6EfHWJyY-22PDfS3iEKInPp7B09QfN7owil-UKiLzfH9-rnfxDfKrHKu-0EFxGnUY",
    },
    {
      title: "Cybersecurity Essentials for Remote Workers",
      excerpt:
        "Essential cybersecurity tips and practices to safeguard your data.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDl3zDxyigQXaV7KXFYuwWfkT-mBgAFktTAqjFN2fdNC1-EetdWUp9ukhxjkdTIeRsu0T4bpBjOVdhtaHbS7gQJXi_ayGTobBZQ6mliiIfnzzf5j-0oIbxUvMrOKtEyvPM9WCmhTpysY_8hVvpPSZPYOV58AuFuaswTPyTu0L9M008JZzCMWBKVV0JiDmjjQcxweLP2viMK7TB3vbydyZ7bBly3Klb9-Z8hRrGKnTWOSK4nLI8Tlur5p9Gh51q7HBx-KugbN32f2Ik",
    },
    {
      title: "The Art of Effective Communication in Virtual Teams",
      excerpt: "Enhance your communication skills in virtual settings.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGWkJ5LnqIvEmqNSyYIGYA2wWH4EJ0cGb_dEQVrP-ExeLKztQqwuz90vaCnhGiyLBnZPEqamOd5IDiSnBuLVlONvlfSRr-L3OF0JVjJC0RfO4H5-rFuNfM5LWniccHwrjcqLw7mJ2cF0WH3n6OI870vYVKaAJsnCivqhCD7yuoYrDhErGA-JC5-BZNsX9UqL5fFQL6fiSE6V-fA1it7YyWePKuY-5EvtGUwG2npTtoLDXIsAeUq-BjtIcEOz7rily5XbO6mWip270",
    },
    {
      title: "Building a Strong Personal Brand Online",
      excerpt: "Strategies for crafting a compelling personal brand online.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_fSTPX83-VDS9OsZo6tAOz0PWIWN_Nc3t2XwxF6EDIWGfskO4SRxhmJLYMDXFaAx7XoUhq6mzGAV62KiKgmyT9MQ750Zln6xDhf3P7tgBLLzj4pCuSuE2oQyih2grr5l8zzdW4qvf9v2qR4DfuJb5u1aDdE4wQMsvEU6nXxP882BhyOLnE2-9b-Xkl0HqmNh3BgZKx0rEV-8xcwLVIw9e18Q6ilvKjnW8ANrGe0IkHBY_bW75IkBTunTxYlwcuEN3PbfeUsTko",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      <header className="flex items-center justify-between border-b border-base-200 bg-primary text-primary-content px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6"
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" />
            </svg>
            <h2 className="@sm:text-xl font-bold tracking-tight">
              Tech Insights
            </h2>
          </div>

          <nav className="hidden @md:flex items-center gap-6 text-sm">
            <a className=" transition-colors">Home</a>
            <a className=" transition-colors">Articles</a>
            <a className=" transition-colors">About</a>
            <a className=" transition-colors">Contact</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden @sm:block">
            <div className="flex items-center rounded-full border border-base-200 bg-base-100 px-2 py-1 gap-2 w-64">
              <Search className="w-4 h-4 text-base-content/60" />
              <input
                className="w-full bg-transparent focus:outline-none text-sm"
                placeholder="Search articles..."
              />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle btn-sm">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-box overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
            <div className="relative p-8 sm:p-12 text-white">
              <h1 className="text-3xl @md:text-4xl @lg:text-5xl font-bold leading-tight mb-4">
                The Future of Work: Embracing Remote Collaboration
              </h1>
              <p className="text-sm @md:text-base text-white/80 max-w-3xl mb-6">
                Explore the evolving landscape of remote work, its benefits, and
                strategies for effective collaboration in distributed teams.
              </p>
              <a className=" btn btn-primary btn-sm rounded-field" href="#">
                Read More
              </a>
            </div>
          </div>

          <h2 className="text-text @md:text-3xl text-2xl font-bold mt-12 mb-6">
            Recent Articles
          </h2>

          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <article key={a.title} className="group bg-base-200 card p-2">
                <div className="overflow-hidden rounded-box">
                  <div
                    className="w-full aspect-video bg-center bg-cover rounded-box group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${a.image})` }}
                  />
                </div>
                <div className="mt-4">
                  <h6 className="text-lg  text-base-content group-hover:text-accent-content transition-colors truncate">
                    {a.title}
                  </h6>
                  <p className="text-sm text-base-content/70 mt-2">
                    {a.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Personality + Features */}
          <section className="mt-12">
            <h2 className="text-2xl @md:text-3xl text-base-content font-bold mb-6">
              Why readers love Tech Insights
            </h2>
            <p className="text-base-content/70 max-w-3xl mb-6">
              We write with curiosity and a coffee cup in hand — bite-sized deep
              dives, practical guides, and occasional opinion pieces with
              personality. No jargon that hides the how; just useful takeaways
              you can apply today.
            </p>

            <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6 text-primary-content">
              <div className="card bg-base-100 shadow hover:shadow-lg transition p-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🤖</div>
                  <div>
                    <h3 className="font-semibold">AI-Powered Briefs</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      Short summaries of complex topics so you can stay current
                      without the deep-dive drain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow hover:shadow-lg transition p-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-primary-content">
                      Remote Work Playbooks
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      Actionable strategies for distributed teams — meetings,
                      async writing, and better rituals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow hover:shadow-lg transition p-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔒</div>
                  <div>
                    <h3 className="font-semibold">Security First</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      Practical tips and checklists to keep your team and users
                      safe without the scare tactics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories & Editors pick + Newsletter */}
          <section className="mt-12 grid grid-cols-1 @md:grid-cols-3 gap-8 text-base-content">
            <div className="@md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "AI",
                  "Remote Work",
                  "Security",
                  "Productivity",
                  "Cloud",
                  "Frontend",
                  "Backend",
                ].map((c) => (
                  <span key={c} className="badge badge-outline">
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Editor’s Picks</h3>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((a) => (
                    <div key={a.title} className="flex items-start gap-4">
                      <div
                        className="w-16 h-10 bg-base-200 rounded-md bg-center bg-cover"
                        style={{ backgroundImage: `url(${a.image})` }}
                      />
                      <div>
                        <h6 className="truncate w-96 hover:text-primary transition-colors ">
                          {a.title}
                        </h6>
                        <p className="text-xs text-base-content/60">
                          {a.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="card bg-primary/10 border border-primary/20 p-4">
                <h4 className="font-semibold text-primary">
                  Join our newsletter
                </h4>
                <p className="text-sm text-base-content/70 mt-2">
                  Weekly roundups, zero spam — just the stuff we’d read
                  ourselves.
                </p>
                <div className="mt-4 flex gap-2">
                  <input
                    className="input input-bordered input-sm flex-1"
                    placeholder="you@company.com"
                  />
                  <button className="btn btn-primary btn-sm">Subscribe</button>
                </div>
              </div>

              <div className="card p-4 bg-base-100 shadow">
                <h5 className="font-semibold">From the team</h5>
                <p className="text-sm text-base-content/70 mt-2">
                  We publish practical guides every Tuesday — built for builders
                  who want to ship better software.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

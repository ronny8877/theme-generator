import { Search, Bookmark } from "lucide-react";
import Image from "next/image";

export default function CookbookLanding() {
  return (
    <div className="min-h-screen bg-base-100 @container">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-base-200 px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <a className="flex items-center gap-3 text-base-content" href="#">
            <span className="text-primary text-3xl">🍳</span>
            <h1 className="text-xl font-bold tracking-tight">
              Culinary Canvas
            </h1>
          </a>

          <nav className="hidden @md:flex items-center gap-6 text-sm text-base-content/70">
            <a className="hover:text-primary transition-colors">Home</a>
            <a className="hover:text-primary transition-colors">Recipes</a>
            <a className="hover:text-primary transition-colors">Ingredients</a>
            <a className="hover:text-primary transition-colors">Community</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-circle btn-sm @sm:btn-md">
            <Search className="w-4 h-4 @sm:w-5 @sm:h-5" />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm @sm:btn-md">
            <Bookmark className="w-4 h-4 @sm:w-5 @sm:h-5" />
          </button>
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center ring-2"
            style={{
              backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuC0WIA8MVJSzjD7U9xn1MdGNrfr5A6ixrBPcME9tUpX8YA8UT0pOA9XvajQHukt87fHaIsysZbg_ecbM6yCOujX6lw2uRnBjBgk5ZNPUeaPEopImU5UB5SWKwOCsD4k5TdmiER6HLReloWQM24DvJzmnWUUQf7OOB01DK1VJwdYJ6GU59_uWltLsh-_DI0R8SQ8RwagsZ3ZNl-8WeG7_2lw5BnTOAyoosoABuOnBCmetYytPLaIX10IdV309D0ImZUnbnZJsUID7fw)`,
            }}
          />
        </div>
      </header>

      <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight @sm:text-5xl">
              Find Your Next Favorite Dish
            </h2>
            <p className="mt-4 text-lg text-base-content/70">
              Search through thousands of recipes from around the world.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <label className="flex flex-col">
              <div className="relative flex w-full items-stretch rounded-full shadow-lg">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-base-content/60">
                  <Search />
                </span>
                <input
                  className="input input-ghost w-full rounded-full py-4 pl-12 pr-6 text-base text-base-content placeholder:text-base-content/50 h-14"
                  placeholder="Search for recipes or ingredients"
                />
              </div>
            </label>
          </div>

          <div className="border-b border-base-200">
            <nav aria-label="Tabs" className="-mb-px flex justify-center gap-6">
              <a className="whitespace-nowrap border-b-2 border-primary px-1 py-3 text-base font-semibold text-primary">
                Quick Meals
              </a>
              <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-base font-medium text-base-content/70 hover:border-base-300 hover:text-base-content">
                Healthy Options
              </a>
              <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-base font-medium text-base-content/70 hover:border-base-300 hover:text-base-content">
                Desserts
              </a>
              <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-base font-medium text-base-content/70 hover:border-base-300 hover:text-base-content">
                Seasonal
              </a>
            </nav>
          </div>

          <section>
            <h3 className="text-3xl font-bold tracking-tight text-base-content mb-6">
              Popular Recipes
            </h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 @sm:grid-cols-2 @lg:grid-cols-4 xl:gap-x-8">
              {/* Recipe cards - sample set */}
              {[
                {
                  title: "Creamy Tomato Pasta",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDerFlbGUIrnyV07xEccDg5y97UuoibYXPEz2XwQv6Xpqj94cYzsosG3FM_1by0Ijue2x6DiHFrpocjsJJqecHeXoPZtQOqUCaOCXYYpBPdVb-D3Kca94MaWjX4EbgI3r53wxwkDhXEi1j_Ul_SlPQryiP8RAQ38JMJuISmivnOI7RCLnQHPky-GniwfnkZYuzQTwqMTQhc6LDDhCXZ_8b-E7GU19I_fDL2yN-Cwq7qp6sy1623AMAMDIW5Iv3xr4DbFT-SCto3QsI",
                  excerpt:
                    "A quick and easy pasta dish with a rich tomato sauce.",
                },
                {
                  title: "Grilled Salmon with Asparagus",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAfAC_cfxI2hblzR_NXm2pFfZB6g5AqsHbbs94CNmfFAXWDwXuIOdUBrDa-sr5BlFzNkYTjwe_JQFB9YU92ZMYt1SJ4JJ0t6ql_z_7ti0KNoZ6fsSQdJqXg7P2KwYt54zX8_CeboagGN2qkowrIfHbw2to-1fI-VFGMeKORHvCCSWlwU3rd6FVZb9RYXwYkHnp5dbia1zuT1-mDLp0UKAqdTiq7xaubeXjmpqcfFvzI0_NePlKjYMdvnRPw4N6MxbZSUiluRX9yfMo",
                  excerpt: "Perfectly grilled salmon with fresh asparagus.",
                },
                {
                  title: "Chocolate Chip Cookies",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9XSSP98ZbPJKUDijWxmlLTwF74qQhy6lOArHipeJti4ESeNbt2KhnkDF9yr_VIijIZHyzLwrzeWxY4ISgJYKNeMPSAL1kKL7mpUcgikD1te-Do0ha8qKpCQ9XfMgDqwmElJeTCwjtGafeRRoyYLtpHw4DDI69PjXfjlDIvawcD0jJcAAAEL3F29SriZWqB5eE-3wNHcQ5XAF7yomYV5FDY07PzsxBaQB3hu2ITAKbJMQzYXQxfcBzMMdd_VarYX0e--TSUgQbz1w",
                  excerpt: "Classic chocolate chip cookies, soft and chewy.",
                },
                {
                  title: "Summer Berry Salad",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBbj2mG_b-ew0pUY5PuwgmyhCLgDiBOUG-VdI0WtcLRk2bastMyaGew40u-ehXFTrn_tJeAr6ttzYIr1-vwkoYvR5qqq4repx9nGcYNwLBhUhTWCP3cyr6Mmc9mptb2MbPu2gpwPbH5WCp5rHMYq91Icjcv2MWRnHdY9ark2cpxJSGPD1TJpcFvRwocKmnWg3OcfnNEHx2LDFnxK_sxAUHNNQRWu3VfonyvV_o0GBNjVSjqap-pFDH3ptX8RByW8iMSSaTJU0mLxWc",
                  excerpt:
                    "A refreshing salad with mixed berries and a light vinaigrette.",
                },
              ].map((r) => (
                <div
                  key={r.title}
                  className="group relative flex flex-col gap-2"
                >
                  <div className="w-full overflow-hidden rounded-lg bg-base-200 aspect-square">
                    <Image
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-75"
                      width={800}
                      height={800}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-base-content">
                      <a className="hover:text-primary transition-colors">
                        {r.title}
                      </a>
                    </h4>
                    <p className="text-sm text-base-content/60">{r.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-bold tracking-tight text-base-content mb-6">
              Seasonal Picks
            </h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 @sm:grid-cols-2 @lg:grid-cols-4 xl:gap-x-8">
              {/* reuse sample cards */}
              {[
                {
                  title: "Pumpkin Spice Latte",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBjwKT5lB611UrkPsRCA1idDZ1pcaPKW7WLDRNirXkqMw_78gbGYidIj3SKbaCZJz-dJWQwZyquoQQUanee8BXZ9FdvBO7tSL3HxpQ3YkoPRM3nnlYoo8SwcZ7Uy9LE-AfP8AMxqUZsmoWqUWJU25mJCreo7LAGNrJeVmoePt_A2XRC4nYc7JVnfT8FljIinToi5PLGpMrlay8xwpFKhgZnEeyD81CyaXlNekADAxtXastpNHjXZ-0lhWuKEOQhG-J97E_QVsrOpYg",
                },
                {
                  title: "Apple Crumble",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuB6pILlyu4ZKJ2JpX_nIxfEeLUgxlUCzDCFsMPGLToT1MUJKvJfFpvYWJNxExax95qmc7PEWClSBmbrlh2lSrHU2a7LBHP63Rvix7bLRi5OuWozfcgyyOS4C642wxm08vLBYVT3IHctd1BNeWxkN_ETJaJA0KbPB4mZSERq3YpqeCTayr8PRuW6zX4abkyY-5RzvPwLWURCPN_wSF40Mu7yhPeNVFingz-uhndnx0b9lj1egMHgTQpkrCvb2iuTm4rzU_GQNmqS1ns",
                },
                {
                  title: "Roasted Turkey with Cranberry Sauce",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDhDFT7X-_8cc6jPXfDwTlWpTBnHYYKPCTLowhIiFapXjTm0KvTrLTNJ16lLonOVYX4crvpEQDpcQ0_jXARwap_UOafvzj8nr78tR3ObvWk3wOOwVosQNItW531qRfxxfSdMNGs8CNwu_yNStjGh5qZ7X5Co1Nx4tFNC_9c0fnQu5m4GJURdMAQVQfNKiiuzitJjIvNjI1FyVy-pYDCbVehUdgkl_eMOlfiRyuuJObpCZSluLIRt_wlATdvvcVTP4yLhGVEWomHU",
                },
                {
                  title: "Gingerbread Cookies",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUdL9GJEOpMUnyftiJQerxS3uReNU99wJdm6cwBAXQEcg4oIy7Jnce3dlLqgoIqEtrrhQrAayvAgYiQaTKwuQKz8KkZ92x3n_8dVu6oAxbyEn5dFRjbzonnH4QhPBchK_CzLyC8fF0JSWkJqDdJgtm1rdzOug1Q7N4iqMnP34Xv3i8CB2iWd5HMddnh3TO96TvqLWyfg3_cJqjKYoW5cgRpBQUGvkALofaYbWOTf2X2OzYjPpQB8gV9qf_cmGF-bY37qNN3OvyDMY",
                },
              ].map((r) => (
                <div
                  key={r.title}
                  className="group relative flex flex-col gap-2"
                >
                  <div className="w-full overflow-hidden rounded-lg bg-base-200 aspect-square">
                    <Image
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-75"
                      width={800}
                      height={800}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-base-content">
                      <a className="hover:text-primary transition-colors">
                        {r.title}
                      </a>
                    </h4>
                    <p className="text-sm text-base-content/60">
                      A seasonal favorite
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

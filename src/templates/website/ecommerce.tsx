import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Heart,
  ShoppingBag,
} from "lucide-react";

export default function EcommerceSite() {
  return (
    <div className="relative flex min-h-screen flex-col bg-base-100 group/design-root overflow-x-hidden @container">
      <header className="navbar border-b border-base-300 px-10 w-full mx-auto py-4 bg-primary text-primary-content">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-gray-900">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ color: "var(--primary-color)" }}
            >
              store
            </span>
            <h2 className="text-base-content text-xl font-bold leading-tight tracking-[-0.015em]">
              Fashion Hub
            </h2>
          </div>

          <div className="hidden @sm:flex items-center gap-6">
            <a className="link link-hover">New Arrivals</a>
            <a className="link link-hover">Men</a>
            <a className="link link-hover">Women</a>
            <a className="link link-hover">Accessories</a>
            <a className="link link-hover">Sale</a>
          </div>
        </div>

        <div className="flex flex-1 justify-end items-center gap-4">
          <button className="btn btn-ghost btn-circle">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="btn btn-ghost btn-circle">
            <Heart />
          </button>
          <button className="btn btn-ghost btn-circle">
            <ShoppingBag />
          </button>
          <div className="avatar">
            <div className="w-10 rounded-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3bf_K7ts0BGr0-Ez05fpSnNQTsGqOmLFIUTdbCVYlZKk2VmCpxhO2I28RWoiGaQhvuJqvpCARSDVpkj3mfwlxeKk0VxyHJSEG0pyfpwaO8LBUTn4CdYUPeLYWsUcFq4ZVcPzUYyj1KumHbrsFJoHbGRR-rtihnnGceZ7AlZIdjFVEpsx30X4azbHtPLr9nyim8lme8JxZLNC22cpn7H2uQ_qHBKnMbetoTWCoeHMXE1tVv7TMjQImg7t6AXw3kQViGwNcqnbkv8H1"
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col text-base-content">
        <section className="relative w-full h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjAE5-rzqmGvtzB7_N_Re649o4MjDTd-v5fwVPP777rabPX6tItTjAW3lsAb36Vo-ysoPDEyIYW9_vGNrEmJHm8WRd4-pNj8JVGF5rNBbcJnJB-w8AUGHRHEN6xdaL9Nxdrq8wPhjhQed9HW82PnehpcE28vGjpdMhQ6a6m64yU1GMXmY3YTpdKe7FnjF_67IhZFB1GW6HplDYds8eaZB-HSTpnQt7hDxjjmDDLGnO0G3Se3IvNXbcM82THRMnIhIKiFOawZrZLr0e")',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-4xl @md:text-5xl font-bold mb-4">
              Discover Your Style
            </h1>
            <p className="text-lg @md:text-xl max-w-2xl mb-8">
              Shop the latest trends in fashion, electronics, and toys. Quality
              products at unbeatable prices.
            </p>
            <button className="btn btn-primary rounded-box btn-lg font-bold">
              Shop Now
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            <button className="h-2 w-2 rounded-full bg-white" />
            <button className="h-2 w-2 rounded-full bg-white/50" />
            <button className="h-2 w-2 rounded-full bg-white/50" />
          </div>

          <button className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle">
            <ArrowLeftCircle />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle">
            <ArrowRightCircle />
          </button>
        </section>

        <section className="px-4 lg:px-20 py-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fashion</h2>
            <div className="grid grid-cols-1 @sm:grid-cols-1 @md:grid-cols-3 @lg:grid-cols-4 gap-8">
              {/* four example cards */}
              {[
                {
                  title: "Classic White Tee",
                  price: "$29.00",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJyuIXxrUzN9zKtauMdIlNmVUBXRQXPlLnqadgR8WPp4w2zActpCdHdMGKPNsqpeSx8TjKSQUQdZxc0DRHEdMX2vOT3On0ST1C5NOQRKF7WqEZZfkvOCTgccbzsjB0fPVm39lVoC2kZobY3qv_cP11BgflGa7pQ3z2xtUdjkATiwtpg98GvKrWhyiSvtIHvB-Z7ZhxQOujw3TZd6OyjJISVPVyoqm7smC-Ey1op2VllpvhneTCQRzTgKg1N1rN_mch6An0anxodkyk",
                },
                {
                  title: "Slim Fit Jeans",
                  price: "$89.00",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTGf3nJYj91ObMISmUJiX2EunoOTYpKNXThY7m_wxa5KS3va931PDOLn4zN8VKo_pr3ic-y4jOZfokxk9XLN3qLyzU8Dir1u49UwOEr6VWx-k42y_a_jxcZmXn1WIBZzCriXypbmqfpgPurEW0VNuuT4P3E6CdgDeUtj7G30aBEZBaiCQVAF0clI94y3oJQv0_Ekj6FzwVfl3biJcQZNPhf0dTPY641vQRIvReiVr9hp5Gf4gwZpqbCDK1mfCCKGL4iWmyxqykveEk",
                },
                {
                  title: "Leather Ankle Boots",
                  price: "$149.00",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1sKkDGRsEzUwnFy3nk6W94CdOKbFNUZprDhLXhdQd_qVCd_cU_p_ECN6G_dQAsdsdhc23TSIzrNXUowCYenQGFUwXRIGl1yHDDvkUFfboQ987qVTFSSFQxETbS0zIwblvudvpqkGjxxMoZFwRr2VnvgQALpaMNiAngo2ZSuV7IaIjwSclA7M0uVBM5g6Xq7pIlVWmaTFdX5Gjm9fA10CQ0DSh_sD8GdXluSVOHWza61AAahXvbUevT_hh3vSYZTXR8XBKlvXKd87a",
                },
                {
                  title: "Minimalist Backpack",
                  price: "$75.00",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClC9Myg8AJewcpVabQh4yc7_P3HIuh3307GDHMmVzgV6FISSOVnIzAL_jomtBD-Rhgzp6ddcpdEFNSiaM26KPlUEOIkFPQHCRxX5nOWS1pfDw32Bo66rVkDeWvaTGnECnRaxwScCwfFX2mPpH-p3PxeCQQ5HoOliI6zpmtUVcIvMrhnQw_iLI-onk5pPPXQRUckmRtkXY3PavFu_GuVZvq2MgovnrgASHiIh68JVGdhPUxCHKPm2rf1Nz-eg04zLSof647kOozapyt",
                },
              ].map((it, idx) => (
                <div
                  key={idx}
                  className="card card-compact bg-base-300 shadow group"
                >
                  <figure className="relative">
                    <img
                      src={it.img}
                      alt={it.title}
                      width={600}
                      height={600}
                      className="w-full aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 btn btn-ghost btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart />
                    </button>
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="text-base-content font-semibold leading-normal text-sm @md:text-base">
                      {it.title}
                    </h3>
                    <p className=" text-sm mt-1">{it.price}</p>
                    <div className="card-actions mt-2">
                      <button className="btn btn-primary btn-block font-bold rounded-field">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Toys</h2>
          <div className="grid grid-cols-1 @sm:grid-cols-1 @md:grid-cols-3 @lg:grid-cols-4 gap-8">
              {/* reuse same items for demo */}
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="card card-compact bg-base-200 shadow group"
                >
                  <figure className="relative">
                    <img
                      src={`https://lh3.googleusercontent.com/aida-public/AB6AXuAjAE5-rzqmGvtzB7_N_Re649o4MjDTd-v5fwVPP777rabPX6tItTjAW3lsAb36Vo-ysoPDEyIYW9_vGNrEmJHm8WRd4-pNj8JVGF5rNBbcJnJB-w8AUGHRHEN6xdaL9Nxdrq8wPhjhQed9HW82PnehpcE28vGjpdMhQ6a6m64yU1GMXmY3YTpdKe7FnjF_67IhZFB1GW6HplDYds8eaZB-HSTpnQt7hDxjjmDDLGnO0G3Se3IvNXbcM82THRMnIhIKiFOawZrZLr0e`}
                      alt={`Item ${n + 1}`}
                      width={600}
                      height={600}
                      className="w-full aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 btn btn-ghost btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart />
                    </button>
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="text-base-content text-base font-semibold leading-normal">
                      Item {n + 1}
                    </h3>
                    <p className=" text-sm mt-1">$49.00</p>
                    <div className="card-actions mt-2">
                      <button className="btn btn-primary btn-block font-bold  rounded-field">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Electronics
            </h2>
           <div className="grid grid-cols-1 @sm:grid-cols-1 @md:grid-cols-3 @lg:grid-cols-4 gap-8">
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="card card-compact bg-base-300 shadow group"
                >
                  <figure className="relative">
                    <img
                      src={`https://lh3.googleusercontent.com/aida-public/AB6AXuAjAE5-rzqmGvtzB7_N_Re649o4MjDTd-v5fwVPP777rabPX6tItTjAW3lsAb36Vo-ysoPDEyIYW9_vGNrEmJHm8WRd4-pNj8JVGF5rNBbcJnJB-w8AUGHRHEN6xdaL9Nxdrq8wPhjhQed9HW82PnehpcE28vGjpdMhQ6a6m64yU1GMXmY3YTpdKe7FnjF_67IhZFB1GW6HplDYds8eaZB-HSTpnQt7hDxjjmDDLGnO0G3Se3IvNXbcM82THRMnIhIKiFOawZrZLr0e`}
                      alt={`Device ${n + 1}`}
                      className="w-full aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 btn btn-ghost btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart />
                    </button>
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="text-base-content text-base font-semibold leading-normal">
                      Device {n + 1}
                    </h3>
                    <p className=" text-sm mt-1">$199.00</p>
                    <div className="card-actions mt-2">
                      <button className="btn btn-primary btn-block font-bold  rounded-field">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import React from "react";
import clsx from "clsx";

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: "shift" | "shaky";
};

function GlitchText({
  text,
  className,
  as: Tag = "h2",
  variant = "shift",
}: GlitchTextProps) {
  return (
    <Tag
      className={clsx(
        "relative font-bold inline-block",
        variant === "shift" ? "glitch-shift" : "glitch-shaky",
        className
      )}
      data-text={text}
    >
      {text}
      <style jsx>{`
        /* SHIFT VARIANT (toned-down RGB offset) */
        .glitch-shift {
          color: var(--color-base-content);
        }
        .glitch-shift::before,
        .glitch-shift::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
        }
        .glitch-shift::before {
          left: 1px;
          text-shadow: -1px 0 var(--color-primary);
          animation: glitchShift 3s infinite linear alternate-reverse;
        }
        .glitch-shift::after {
          left: -1px;
          text-shadow: 1px 0 var(--color-secondary);
          animation: glitchShift 3s infinite linear alternate;
        }

        @keyframes glitchShift {
          0% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(10% 0 70% 0);
          }
          40% {
            clip-path: inset(30% 0 40% 0);
          }
          60% {
            clip-path: inset(50% 0 20% 0);
          }
          80% {
            clip-path: inset(70% 0 10% 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        /* SHAKY VARIANT (subtle jitter) */
        .glitch-shaky {
          color: var(--color-base-content);
          animation: shaky 0.25s infinite;
        }
        .glitch-shaky::before,
        .glitch-shaky::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          opacity: 0.6;
        }
        .glitch-shaky::before {
          color: var(--color-primary);
          left: 1px;
        }
        .glitch-shaky::after {
          color: var(--color-secondary);
          left: -1px;
        }

        @keyframes shaky {
          0% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </Tag>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden @container bg-base-100">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,11,20,0.8) 0%, rgba(26,11,20,1) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEypMA__j0wSHG6UkKwo0mviupsxgYY2-v1xJ8CwsnMqrOel60_LBNWbaSgFLNMms4T8JCvd8oZ9Wh4doTKG-LCdi23aP7FusNAra336KWSjWO98w66piJyZMKeXdq99p2FixLTS7dxiIHfaKwv57wtXqfk-Sp7NJAq9hK6Oei4IkPCCd6n42dKTzSlSEyzNBVzVVO-Blr7WIYGtb9YM8xax7XpssmCZK_rvsE8bcgYNVXaPtpIXAG4A8AL36pKSxiRU5TyOKqDGBl')",
        }}
      ></div>
      <div className="absolute inset-0 bg-base-100 opacity-40 z-10"></div>
      <div className="relative z-20 flex flex-col items-center gap-6 px-4">
        {["Darling", "in the", "Franxx"].map((word, i) => (
          <GlitchText
            as="h1"
            key={i}
            text={word}
            variant="shift"
            className="text-6xl md:text-8xl font-black uppercase"
          />
        ))}
        <GlitchText
          as="p"
          variant="shaky"
          text="In a dystopian future, humanity's fate rests on the shoulders of young pilots and their giant mechs."
          className="text-secondary text-base md:text-lg max-w-2xl mt-4"
        />
        <button className="btn btn-primary mt-8 px-8 uppercase tracking-wider pulse-button">
          Enter the Cage
        </button>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-16 md:py-24 @container bg-base-100">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @lg:px-8 grid @md:grid-cols-2 gap-8 @md:gap-12 items-center">
        <div className="card bg-base-200 shadow-xl">
          <figure>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfkPo7qjLpDAegJaYdCV10bNHhBzwv9AIN8IFqgJ_3Na_XBrYZ9Vza4b8OVd01lkdpLXVlGKso2b1ZPsdC-M_xwxHwGbme-PmGy64cSKq2CM1Grw-d6SK4BPEmVYb974uTKpa323cRVDN5wcTNQmJDW71CsGLj6jgZQtuW35F1t2mKPc9znho87nHOzmwdidYKJU0gzcYNNEsHE5rNzj0spzM8Omi2qTMTyUACuarCdQNiqZwuxP1oljZ7TCXvmx1ErEx2FCg1Xc8P"
              alt="World on the Brink"
              className="rounded-lg"
            />
          </figure>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold glitch-2 text-base-content">
            A World on the Brink
          </h2>
          <p className="text-base md:text-lg text-secondary leading-relaxed">
            In a desolate future, humanity shelters in mobile fortress cities,
            constantly threatened by colossal creatures known as Klaxosaurs. To
            combat these threats, children are bred to pilot giant mechs called
            Franxx, fighting for survival in a world teetering on the edge.
            Their connections, both in and out of the cockpit, will determine
            the future.
          </p>
        </div>
      </div>
    </section>
  );
}

function CharactersSection() {
  const characters = [
    {
      name: "Hiro",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/0/04/Hiromain.jpg",
    },
    {
      name: "Zero Two",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/9/95/Zerotwomain.jpg",
    },
    {
      name: "Ichigo",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/e/e9/Ichigomain.jpg",
    },
    {
      name: "Goro",
      img: "data:image/jpeg;base64,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",
    },
    {
      name: "Mitsuru",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/b/be/Mitsuru_infobox.png",
    },
  ];

  return (
    <section className="py-16 md:py-24 @container bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl @md:text-5xl font-bold text-center mb-12 glitch-2 text-base-content">
          The Parasites
        </h2>
        <div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 gap-4 @md:gap-6">
          {characters.map((char, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group">
              <div className="card angled-card w-full border-2 border-transparent hover:border-primary rounded-md transition">
                <figure>
                  <img
                    src={char.img}
                    alt={char.name}
                    className="rounded-md max-w-24 @sm:max-w-full max-h-24 @sm:max-h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
              </div>
              <p className="text-xs @sm:text-sm @md:text-base font-bold text-base-content tracking-wider text-center">
                {char.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const episodes = [
    {
      title: "Episode 1",
      name: "Alone and Lonesome",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/2/23/%22You_are_now_my_darling%21%22.png",
    },
    {
      title: "Episode 2",
      name: "What It Means to Connect",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/e/e0/Genista%2C_Argentea%2C_Delphinium_and_Chlorophytum.png",
    },
    {
      title: "Episode 3",
      name: "Fighting Puppet",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/4/4a/Episode_3.png",
    },
    {
      title: "Episode 4",
      name: "Flap Flap",
      img: "https://static.wikia.nocookie.net/darling-in-the-franxx/images/b/bf/Hiro_and_Zero_Two_running_to_Strelizia.png",
    },
  ];
  return (
    <section className="py-16 md:py-24 @container bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 glitch-2 text-base-content">
          Log Files // Gallery
        </h2>

        {/* Mobile: Carousel */}
        <div className="carousel w-full h-96 rounded-box @md:hidden">
          {episodes.map((ep, index) => (
            <div
              key={ep.title}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full"
            >
              <div className="card bg-base-200 shadow-md w-full">
                <figure className="h-64">
                  <img
                    src={ep.img}
                    alt={ep.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Episode {ep.title}</h3>
                  <p className="text-secondary text-sm">{ep.name}</p>
                </div>
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`#slide${index === 0 ? 4 : index}`}
                  className="btn btn-circle btn-sm"
                >
                  ❮
                </a>
                <a
                  href={`#slide${index === 3 ? 1 : index + 2}`}
                  className="btn btn-circle btn-sm"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden @md:grid @md:grid-cols-2 @lg:grid-cols-3 gap-6">
          {episodes.map((ep, index) => (
            <div key={ep.title} className="card bg-base-200 shadow-md">
              <figure className="h-48">
                <img
                  src={ep.img}
                  alt={ep.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{ep.title}</h3>
                <p className="text-secondary text-sm">{ep.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MerchSection() {
  const merchItems = [
    {
      name: "Strelitzia Model Kit",
      img: "https://m.media-amazon.com/images/I/51l19G+jEeL._UF894,1000_QL80_.jpg",
    },
    {
      name: "Zero Two Figure",
      img: "https://preview.redd.it/new-zero-two-figure-announced-v0-ilyb4h190ixd1.jpeg?auto=webp&s=5f6c40810689894201d693e1e468d4a6f00d809a",
    },
    {
      name: "Squad 13 Jacket",
      img: "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwbd0fe732/Apparel/LSM2HPACRU/bioworld-unisex-t-shirts-darling-in-the-franxx-squad-13-long-sleeve-crunchyroll-exclusive-32970740564012.jpg",
    },
    {
      name: "Klaxosaur Codex",
      img: "https://cdnb.artstation.com/p/assets/images/images/032/773/455/large/joshua-carty-klaxosaur-3.jpg?1607434897",
    },
  ];

  return (
    <section className="py-16 md:py-24 @container bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 glitch-2 text-base-content">
          Merchandise // Shop
        </h2>
        <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-3 @md:gap-6">
          {merchItems.map((item, i) => (
            <div
              key={i}
              className="card bg-base-200 border border-primary/20 hover:border-primary transition-colors duration-300 w-full"
            >
              <figure className="aspect-square">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-3 @md:p-4">
                <h3 className="card-title text-xs @sm:text-sm @md:text-base text-base-content">
                  {item.name}
                </h3>
                <button className="btn btn-outline btn-primary btn-xs @sm:btn-sm uppercase tracking-wider pulse-button">
                  Acquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WallpaperSection() {
  // const wallpapers = [
  //   "Zero Two Poster",
  //   "Squad 13 Art",
  //   "Mecha Blueprint",
  //   "Klaxosaur Sketch",
  // ];

  const wallpapers = [
    {
      name: "Zero Two Poster",
      img: "https://images.alphacoders.com/905/905461.jpg",
    },
    {
      name: "Squad 13 Art",
      img: "https://i.pinimg.com/1200x/3d/8f/8c/3d8f8c43702b10923e0b374151fedb00.jpg",
    },
    {
      name: "Mecha Blueprint",
      img: "https://i.pinimg.com/1200x/f0/c1/f8/f0c1f8a22b72af83aa4fc719f36b0d9a.jpg",
    },
    {
      name: "Klaxosaur Sketch",
      img: "https://i.pinimg.com/1200x/04/e4/81/04e4810a190506debb027dd8bc0a96b7.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 @container bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 glitch-2 text-base-content">
          Wallpapers // Downloads
        </h2>
        <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-3 @md:gap-6">
          {wallpapers.map((item, i) => (
            <div
              key={i}
              className="card bg-base-200 border border-primary/20 hover:border-primary transition-colors duration-300 w-full"
            >
              <figure className="aspect-[2/3]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-3 @md:p-4">
                <h3 className="card-title text-xs @sm:text-sm @md:text-base text-base-content">
                  {item.name}
                </h3>
                <button className="btn btn-outline btn-secondary btn-xs @sm:btn-sm uppercase tracking-wider">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-base-200 border-t border-primary/20 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-secondary">© Darling in the Franxx Fan Project</p>
      </div>
    </footer>
  );
}

export default function AnimeRealm() {
  return (
    <div className="min-h-screen bg-base-100 @container">
      <HeroSection />
      <StorySection />
      <CharactersSection />
      <GallerySection />
      <MerchSection />
      <WallpaperSection />
      <Footer />
    </div>
  );
}

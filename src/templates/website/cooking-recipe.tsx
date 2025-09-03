import { Clock, ChefHat, Star } from "lucide-react";

type Ingredient = { label: string };
type Instruction = { step: number; title: string; body: string };
type Review = {
  name: string;
  ago: string;
  text: string;
  rating: number;
  avatar?: string;
  likes?: number;
  comments?: number;
};

export default function CookingRecipe() {
  const title = "Creamy Tomato Pasta with Basil";
  const description =
    "A simple yet flavorful pasta dish with a rich tomato sauce and a touch of cream, garnished with fresh basil.";
  const heroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCIjDu3r4zKNeY93Iep61jwU4UscR9D45Og9N3SHe2X1CuT1nOhV1k_6iVuPrsDiWLKttlEMOkndxyckQ0QUkHw8AyTkCC8yJkwMj8SuErYwp4vaHldYQYK3eDBlmXkFXXs1uGrCiP3DMtii6Tc_UKQNYNiPXR8RnSc2qdtQGXg6Q9TjmzL3qp4HT-mFRYRTd87685aUTsPqLOtKqTZ_tRYmDuHzMvhQdvpnTfdbHx5kYx12VkGuK-hnBKYU-kYB1LllCxlVnb6k3E";

  const ingredients: Ingredient[] = [
    { label: "200g pasta (e.g., spaghetti)" },
    { label: "400g canned chopped tomatoes" },
    { label: "100ml double cream" },
    { label: "1 onion, finely chopped" },
    { label: "2 cloves garlic, minced" },
    { label: "2 tbsp olive oil" },
    { label: "Fresh basil leaves" },
  ];

  const instructions: Instruction[] = [
    {
      step: 1,
      title: "Prepare the Base",
      body: "Heat the olive oil in a pan over medium heat. Add the chopped onion and cook until softened, about 5 minutes. Stir in the minced garlic and cook for another minute until fragrant.",
    },
    {
      step: 2,
      title: "Simmer the Sauce",
      body: "Pour in the canned chopped tomatoes and bring to a simmer. Cook for about 10 minutes, stirring occasionally, until the sauce thickens slightly.",
    },
    {
      step: 3,
      title: "Add the Cream",
      body: "Stir in the double cream and season with salt and pepper to taste. Continue to cook for another 2-3 minutes until the sauce is smooth and creamy.",
    },
    {
      step: 4,
      title: "Cook the Pasta",
      body: "While the sauce is simmering, cook the pasta according to package instructions until al dente. Drain the pasta and add it to the creamy tomato sauce.",
    },
    {
      step: 5,
      title: "Combine and Serve",
      body: "Toss the pasta in the sauce until it's well coated. Garnish with fresh basil leaves before serving.",
    },
  ];

  const reviews: Review[] = [
    {
      name: "Sophia Carter",
      ago: "1 month ago",
      text: "This recipe is a game-changer! So easy to make and the flavors are incredible. The creamy tomato sauce is rich and satisfying, and the fresh basil adds a lovely touch.",
      rating: 5,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8aZkNP6785jo4dNpGW9aiLV_3SZLZtFenQ4sfEIAT5_TMaA5PeVf9bNufFceWvpWj1pdgMhH2w7uhW-LQDhga0Q9ZKn61liuvAeUoAeTBBLfRp7E97Y_irRT800rqGiO5EoVxAnMyKjRKulKwEPJDd_WdVk2rzpK-koQw7c2_voKZsNXIBnok5eZJgS127AUhMqLcxQAqrsDrLWDRRJ5AhU3cL8qS61icB5HFnsG10XgH1R5kXZjXBt4Np9zV8FYQomhfHE4Nvx8",
      likes: 12,
      comments: 1,
    },
    {
      name: "Ethan Bennett",
      ago: "2 months ago",
      text: "A solid recipe for a quick and tasty meal. The sauce is creamy and flavorful. I added a pinch of red pepper flakes for heat.",
      rating: 4,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCINBUQUomz-Z1kQUO6Rujrx9uwAlVLo-BlBhB0XJgZVNFpKxpoqYVlicDkhXon-KWyEUcO0jLr2Ms8NvBTeej3w-Dr2MFjZ2sDDcNu0uwP5SX7tMv63syl9oN-aysEiNJTxYry23ru9_fXDEuUfw5qMBSIEw9mRiRBhmyCwj8u9zUah7_Exq13ITcljQjqVCBlwXq2KCxn14twNT6peBaHfgR1wcG4u99m-2-fiDy0aFydmW5Y22QORtW-IZR4vljq9QyUMp4JdHY",
      likes: 8,
      comments: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      <header className="flex items-center justify-between border-b border-base-300 bg-white px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-red-600">
            <div className="w-8 h-8">
              <svg
                viewBox="0 0 48 48"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Cookbook</h2>
          </div>

          <nav className="hidden @md:flex items-center gap-6 text-sm text-base-content/70">
            <a className="hover:text-red-600 transition-colors">Recipes</a>
            <a className="hover:text-red-600 transition-colors">Ingredients</a>
            <a className="hover:text-red-600 transition-colors">Meal Plans</a>
            <a className="hover:text-red-600 transition-colors">Community</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden @sm:block">
            <div className="flex items-center rounded-full border border-base-300 bg-white px-3 py-1 gap-2 w-64">
              <svg
                className="w-4 h-4 text-base-content/60"
                viewBox="0 0 256 256"
                fill="currentColor"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
              <input
                className="w-full bg-transparent focus:outline-none text-sm"
                placeholder="Search recipes..."
              />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle">
            <svg className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
            </svg>
          </button>

          <div
            className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-offset-2"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1545996124-1b2325a5a3b9?w=200&h=200&fit=crop)`,
            }}
          />
        </div>
      </header>

      <main className="px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-selector shadow-lg overflow-hidden">
          <div
            className="w-full bg-cover bg-center min-h-[360px]"
            style={{ backgroundImage: `url(${heroImage})` }}
          />

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold leading-tight">{title}</h1>
              <p className="text-black/60 mt-2">{description}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center border-y border-base-200 py-4 mb-8 gap-4">
              <div className="flex-1 text-center sm:text-left border-r sm:border-r border-base-200 pr-0 sm:pr-6">
                <p className="text-sm text-black/60 font-medium">Prep time</p>
                <p className="text-lg font-bold">15 minutes</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm text-black/60 font-medium">Servings</p>
                <p className="text-lg font-bold">2</p>
              </div>
            </div>

            <div className="grid grid-cols-1 @md:grid-cols-3 gap-12">
              <aside className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                <div className="space-y-3">
                  {ingredients.map((ing, i) => (
                    <label key={i} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                      />
                      <span className="text-base">{ing.label}</span>
                    </label>
                  ))}
                </div>
              </aside>

              <section className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <div className="space-y-6">
                  {instructions.map((ins) => (
                    <div key={ins.step} className="flex gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-error text-error-content flex items-center justify-center font-bold">
                        {ins.step}
                      </div>
                      <div>
                        <p className="text-base font-semibold">{ins.title}</p>
                        <p className="text-black/60">{ins.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-base-200">
              <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
              <div className="space-y-8">
                {reviews.map((r, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${r.avatar})` }}
                      />
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-base-content/60">{r.ago}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < r.rating
                              ? "w-4 h-4 text-yellow-400"
                              : "w-4 h-4 text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-base-content/70">{r.text}</p>

                    <div className="flex gap-4 text-base-content/60">
                      <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 256 256"
                          fill="currentColor"
                        >
                          <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                        </svg>
                        <span>{r.likes ?? 0}</span>
                      </button>

                      <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 256 256"
                          fill="currentColor"
                        >
                          <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                        </svg>
                        <span>{r.comments ?? 0}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

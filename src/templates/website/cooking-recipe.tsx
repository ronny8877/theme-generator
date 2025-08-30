import {
  Clock,
  Users,
  ChefHat,
  Star,
  Heart,
  Share2,
  Printer,
  BookOpen,
  Timer,
  Thermometer,
  Scale,
  Check,
  Plus,
  Search,
  Filter,
  Menu,
  MoreHorizontal,
} from "lucide-react";

export default function CookingRecipe() {
  const recipe = {
    title: "Mediterranean Quinoa Bowl",
    description:
      "A healthy and delicious quinoa bowl packed with fresh vegetables, feta cheese, and a tangy lemon dressing",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    author: {
      name: "Chef Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      bio: "Mediterranean cuisine specialist",
    },
    rating: 4.8,
    reviews: 127,
    prepTime: "15 min",
    cookTime: "20 min",
    totalTime: "35 min",
    servings: 4,
    difficulty: "Easy",
    calories: 380,
  };

  const ingredients = [
    { item: "Quinoa", amount: "1 cup", checked: false },
    { item: "Cherry tomatoes", amount: "1 cup", checked: false },
    { item: "Cucumber", amount: "1 large", checked: false },
    { item: "Red onion", amount: "1/2 medium", checked: false },
    { item: "Feta cheese", amount: "4 oz", checked: false },
    { item: "Kalamata olives", amount: "1/2 cup", checked: false },
    { item: "Fresh parsley", amount: "1/4 cup", checked: false },
    { item: "Lemon juice", amount: "3 tbsp", checked: false },
    { item: "Extra virgin olive oil", amount: "3 tbsp", checked: false },
    { item: "Garlic", amount: "2 cloves", checked: false },
    { item: "Dried oregano", amount: "1 tsp", checked: false },
    { item: "Salt and pepper", amount: "to taste", checked: false },
  ];

  const instructions = [
    {
      step: 1,
      instruction:
        "Rinse quinoa under cold water until water runs clear. In a medium saucepan, bring 2 cups of water to a boil.",
      time: "2 min",
    },
    {
      step: 2,
      instruction:
        "Add quinoa to boiling water, reduce heat to low, cover and simmer for 15 minutes or until water is absorbed.",
      time: "15 min",
    },
    {
      step: 3,
      instruction:
        "Remove from heat and let stand 5 minutes. Fluff with a fork and let cool completely.",
      time: "5 min",
    },
    {
      step: 4,
      instruction:
        "Meanwhile, dice cucumber, halve cherry tomatoes, and thinly slice red onion.",
      time: "5 min",
    },
    {
      step: 5,
      instruction:
        "In a small bowl, whisk together lemon juice, olive oil, minced garlic, oregano, salt, and pepper.",
      time: "2 min",
    },
    {
      step: 6,
      instruction:
        "In a large bowl, combine cooled quinoa, tomatoes, cucumber, red onion, feta cheese, and olives.",
      time: "3 min",
    },
    {
      step: 7,
      instruction:
        "Pour dressing over quinoa mixture and toss gently. Garnish with fresh parsley and serve.",
      time: "2 min",
    },
  ];

  const relatedRecipes = [
    {
      title: "Greek Salad",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
      time: "10 min",
      rating: 4.6,
    },
    {
      title: "Lemon Herb Chicken",
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop",
      time: "45 min",
      rating: 4.9,
    },
    {
      title: "Hummus & Vegetables",
      image:
        "https://images.unsplash.com/photo-1571197119270-3b4b0f4e9dee?w=300&h=200&fit=crop",
      time: "15 min",
      rating: 4.7,
    },
  ];

  const nutritionFacts = [
    { label: "Calories", value: "380" },
    { label: "Protein", value: "14g" },
    { label: "Carbs", value: "48g" },
    { label: "Fat", value: "16g" },
    { label: "Fiber", value: "6g" },
    { label: "Sugar", value: "8g" },
  ];

  return (
    <div className="min-h-screen bg-base-100 @container">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown @lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <Menu className="w-5 h-5" />
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
              <li>
                <a className="font-medium">Recipes</a>
              </li>
              <li>
                <a>Categories</a>
              </li>
              <li>
                <a>Meal Plans</a>
              </li>
              <li>
                <a>Shopping Lists</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl @md:text-2xl font-bold text-primary">
            <ChefHat className="w-7 h-7 @md:w-8 @md:h-8" />
            FoodieHub
          </a>
        </div>

        <div className="navbar-center hidden @lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md font-medium bg-primary text-primary-content">
                Recipes
              </a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md hover:bg-base-200">
                Categories
              </a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md hover:bg-base-200">
                Meal Plans
              </a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm @xl:btn-md hover:bg-base-200">
                Shopping Lists
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-circle btn-sm @md:btn-md">
            <Search className="w-4 h-4 @md:w-5 @md:h-5" />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm @md:btn-md">
            <Filter className="w-4 h-4 @md:w-5 @md:h-5" />
          </button>
          <button className="btn btn-primary btn-sm @md:btn-md">Sign In</button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 @lg:py-8">
        <div className="grid @lg:grid-cols-3 gap-6 @lg:gap-8">
          {/* Main Recipe Content */}
          <div className="@lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <div className="space-y-6">
              <div className="aspect-video @md:aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl @md:text-3xl @lg:text-4xl font-bold text-base-content leading-tight">
                      {recipe.title}
                    </h1>
                    <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 mt-3 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle btn-sm"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                    <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-xl border border-base-300">
                      <li>
                        <a>Share Recipe</a>
                      </li>
                      <li>
                        <a>Save to Collection</a>
                      </li>
                      <li>
                        <a>Report Issue</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recipe Meta */}
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4 @md:p-6">
                    <div className="flex flex-wrap items-center gap-4 @md:gap-6">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 @md:w-14 @md:h-14 rounded-full ring-2 ring-primary ring-offset-2">
                            <img
                              src={recipe.author.avatar}
                              alt={recipe.author.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-base @md:text-lg text-base-content">
                            {recipe.author.name}
                          </p>
                          <p className="text-sm @md:text-base text-base-content/60">
                            {recipe.author.bio}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="rating rating-sm @md:rating-md">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 @md:w-5 @md:h-5 ${
                                i < Math.floor(recipe.rating)
                                  ? "text-warning fill-current"
                                  : "text-base-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-base @md:text-lg">
                          {recipe.rating}
                        </span>
                        <span className="text-sm @md:text-base text-base-content/60">
                          ({recipe.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipe Stats */}
                <div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
                  <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body p-4 text-center">
                      <Clock className="w-6 h-6 @md:w-8 @md:h-8 mx-auto mb-2 text-primary" />
                      <p className="text-xs @md:text-sm text-base-content/60 font-medium">
                        Prep Time
                      </p>
                      <p className="font-bold text-sm @md:text-base text-base-content">
                        {recipe.prepTime}
                      </p>
                    </div>
                  </div>
                  <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body p-4 text-center">
                      <Timer className="w-6 h-6 @md:w-8 @md:h-8 mx-auto mb-2 text-warning" />
                      <p className="text-xs @md:text-sm text-base-content/60 font-medium">
                        Cook Time
                      </p>
                      <p className="font-bold text-sm @md:text-base text-base-content">
                        {recipe.cookTime}
                      </p>
                    </div>
                  </div>
                  <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body p-4 text-center">
                      <Users className="w-6 h-6 @md:w-8 @md:h-8 mx-auto mb-2 text-success" />
                      <p className="text-xs @md:text-sm text-base-content/60 font-medium">
                        Servings
                      </p>
                      <p className="font-bold text-sm @md:text-base text-base-content">
                        {recipe.servings}
                      </p>
                    </div>
                  </div>
                  <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body p-4 text-center">
                      <Scale className="w-6 h-6 @md:w-8 @md:h-8 mx-auto mb-2 text-info" />
                      <p className="text-xs @md:text-sm text-base-content/60 font-medium">
                        Difficulty
                      </p>
                      <p className="font-bold text-sm @md:text-base text-base-content">
                        {recipe.difficulty}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-primary btn-sm @md:btn-md shadow-lg hover:shadow-xl transition-all duration-200">
                    <Plus className="w-4 h-4 @md:w-5 @md:h-5" />
                    Add to Meal Plan
                  </button>
                  <button className="btn btn-outline btn-sm @md:btn-md border-error text-error hover:bg-error hover:text-error-content">
                    <Heart className="w-4 h-4 @md:w-5 @md:h-5" />
                    Save Recipe
                  </button>
                  <button className="btn btn-outline btn-sm @md:btn-md">
                    <Share2 className="w-4 h-4 @md:w-5 @md:h-5" />
                    Share
                  </button>
                  <button className="btn btn-outline btn-sm @md:btn-md">
                    <Printer className="w-4 h-4 @md:w-5 @md:h-5" />
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6 @md:p-8">
                <h2 className="card-title text-xl @md:text-2xl mb-6 text-base-content">
                  <BookOpen className="w-6 h-6 @md:w-7 @md:h-7 text-primary" />
                  Ingredients
                </h2>
                <div className="grid @md:grid-cols-2 gap-3">
                  {ingredients.map((ingredient, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-4 p-4 hover:bg-base-200 rounded-xl transition-all duration-200 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm @md:checkbox-md"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-sm @md:text-base text-primary">
                          {ingredient.amount}
                        </span>
                        <span className="text-sm @md:text-base text-base-content ml-2 group-has-[:checked]:line-through group-has-[:checked]:text-base-content/50 transition-all duration-200">
                          {ingredient.item}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6 @md:p-8">
                <h2 className="card-title text-xl @md:text-2xl mb-6 text-base-content">
                  <ChefHat className="w-6 h-6 @md:w-7 @md:h-7 text-primary" />
                  Instructions
                </h2>
                <div className="space-y-6">
                  {instructions.map((step) => (
                    <div
                      key={step.step}
                      className="card bg-base-200 shadow-sm border border-base-300"
                    >
                      <div className="card-body p-4 @md:p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 @md:w-12 @md:h-12 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-base @md:text-lg shadow-lg">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm @md:text-base text-base-content mb-3 leading-relaxed">
                              {step.instruction}
                            </p>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-warning" />
                              <span className="text-xs @md:text-sm text-base-content/70 font-medium">
                                {step.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <h3 className="card-title text-lg @md:text-xl mb-4 text-base-content">
                  <Thermometer className="w-5 h-5 @md:w-6 @md:h-6 text-info" />
                  Nutrition Facts
                </h3>
                <div className="space-y-3">
                  {nutritionFacts.map((fact, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 hover:bg-base-200 rounded-lg transition-all duration-200 border border-base-300"
                    >
                      <span className="text-sm @md:text-base text-base-content/80 font-medium">
                        {fact.label}
                      </span>
                      <span className="font-bold text-sm @md:text-base text-primary">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Recipes */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <h3 className="card-title text-lg @md:text-xl mb-4 text-base-content">
                  Related Recipes
                </h3>
                <div className="space-y-4">
                  {relatedRecipes.map((related, index) => (
                    <div
                      key={index}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-base-300"
                    >
                      <div className="card-body p-4">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 @md:w-20 @md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={related.image}
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm @md:text-base line-clamp-2 text-base-content group-hover:text-primary transition-colors duration-200">
                              {related.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 @md:w-4 @md:h-4 text-warning" />
                              <span className="text-xs @md:text-sm text-base-content/70 font-medium">
                                {related.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 @md:w-4 @md:h-4 text-warning fill-current" />
                              <span className="text-xs @md:text-sm text-base-content/70 font-medium">
                                {related.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline btn-sm w-full mt-4">
                  View More Recipes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { SelectSection } from "@/components/ui/floating-select";

export const THEME_INFO = {
  light: {
    name: "Light",
    emoji: "☀️",
    colors: ["#ffffff", "#f3f4f6", "#3b82f6"],
  },
  dark: {
    name: "Dark",
    emoji: "🌙",
    colors: ["#1f2937", "#374151", "#60a5fa"],
  },
  cupcake: {
    name: "Cupcake",
    emoji: "🧁",
    colors: ["#faf7f5", "#e4c2a5", "#65c3c8"],
  },
  bumblebee: {
    name: "Bumblebee",
    emoji: "🐝",
    colors: ["#fffbeb", "#fbbf24", "#1f2937"],
  },
  emerald: {
    name: "Emerald",
    emoji: "💚",
    colors: ["#ecfdf5", "#10b981", "#374151"],
  },
  corporate: {
    name: "Corporate",
    emoji: "🏢",
    colors: ["#ffffff", "#3b82f6", "#1f2937"],
  },
  synthwave: {
    name: "Synthwave",
    emoji: "🌃",
    colors: ["#2d1b69", "#ff7ac6", "#bf95f9"],
  },
  retro: {
    name: "Retro",
    emoji: "📻",
    colors: ["#f9f7ed", "#e4a853", "#a4161a"],
  },
  cyberpunk: {
    name: "Cyberpunk",
    emoji: "🤖",
    colors: ["#ffee00", "#ff0080", "#00ff41"],
  },
  valentine: {
    name: "Valentine",
    emoji: "💕",
    colors: ["#f8e7e7", "#e96d7b", "#a991f7"],
  },
  halloween: {
    name: "Halloween",
    emoji: "🎃",
    colors: ["#1a1625", "#f28c18", "#6f2da8"],
  },
  garden: {
    name: "Garden",
    emoji: "🌿",
    colors: ["#e3f2fd", "#5c7f67", "#babf95"],
  },
  forest: {
    name: "Forest",
    emoji: "🌲",
    colors: ["#f4f6f5", "#1db584", "#19362d"],
  },
  aqua: {
    name: "Aqua",
    emoji: "🌊",
    colors: ["#dbeafe", "#0ea5e9", "#1e40af"],
  },
  lofi: {
    name: "Lo-Fi",
    emoji: "🎵",
    colors: ["#0f0f0f", "#262626", "#b8b8b8"],
  },
  pastel: {
    name: "Pastel",
    emoji: "🎨",
    colors: ["#f9fafb", "#fbbf24", "#fb7185"],
  },
  fantasy: {
    name: "Fantasy",
    emoji: "🧚",
    colors: ["#f8fafc", "#7c3aed", "#ec4899"],
  },
  wireframe: {
    name: "Wireframe",
    emoji: "📐",
    colors: ["#ffffff", "#000000", "#6b7280"],
  },
  black: {
    name: "Black",
    emoji: "⚫",
    colors: ["#000000", "#374151", "#ffffff"],
  },
  luxury: {
    name: "Luxury",
    emoji: "💎",
    colors: ["#09090b", "#d4af37", "#ffffff"],
  },
  dracula: {
    name: "Dracula",
    emoji: "🧛",
    colors: ["#282a36", "#bd93f9", "#ff79c6"],
  },
  cmyk: {
    name: "CMYK",
    emoji: "🖨️",
    colors: ["#ffffff", "#0ea5e9", "#ec4899"],
  },
  autumn: {
    name: "Autumn",
    emoji: "🍂",
    colors: ["#f7f3e9", "#a16207", "#dc2626"],
  },
  business: {
    name: "Business",
    emoji: "💼",
    colors: ["#ffffff", "#1e40af", "#374151"],
  },
  acid: {
    name: "Acid",
    emoji: "🧪",
    colors: ["#ff00ff", "#00ff00", "#ffff00"],
  },
  lemonade: {
    name: "Lemonade",
    emoji: "🍋",
    colors: ["#fefce8", "#eab308", "#65a30d"],
  },
  night: {
    name: "Night",
    emoji: "🌃",
    colors: ["#0f172a", "#38bdf8", "#f1f5f9"],
  },
  coffee: {
    name: "Coffee",
    emoji: "☕",
    colors: ["#1c1614", "#a78349", "#e7d2cc"],
  },
  winter: {
    name: "Winter",
    emoji: "❄️",
    colors: ["#f0f9ff", "#0284c7", "#1e40af"],
  },
  // New Modern Themes
  neon: {
    name: "Neon",
    emoji: "💡",
    colors: ["#0a0a0a", "#00ff88", "#ff0080"],
  },
  sunset: {
    name: "Sunset",
    emoji: "🌅",
    colors: ["#1a1a2e", "#ff6b6b", "#ffd93d"],
  },
  ocean: {
    name: "Ocean",
    emoji: "🌊",
    colors: ["#e0f2fe", "#0369a1", "#075985"],
  },
  minimal: {
    name: "Minimal",
    emoji: "⚪",
    colors: ["#fafafa", "#171717", "#737373"],
  },
  gaming: {
    name: "Gaming",
    emoji: "🎮",
    colors: ["#0f0f0f", "#7c3aed", "#06ffa5"],
  },
  berry: {
    name: "Berry",
    emoji: "🫐",
    colors: ["#fdf2f8", "#be185d", "#831843"],
  },
  space: {
    name: "Space",
    emoji: "🚀",
    colors: ["#0c0a09", "#6366f1", "#a855f7"],
  },
  mint: {
    name: "Mint",
    emoji: "🌿",
    colors: ["#f0fdf4", "#059669", "#047857"],
  },
} as const;

export const DAISY_UI_AVILABLE_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "sunset",
];

export const AVILABLE_PREVIEW_DEVICES = [
  "mobile",
  "tablet",
  "desktop",
] as const;

export const TOOL_VARIANTS = [
  "website",
  "app",
  "poster",
  "typography",
  "gradient",
] as const;

export const TEMPLATES_ARRAY = [
  {
    id: "simple-blog-post",
    title: "Blog Post",
    description:
      "A detailed blog post layout with header, content, interactions, and suggested articles",
    theme_id: "lemonade",
    fonts: {
      heading: { family: "Playfair Display", weight: "600" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "simple-blog-landing",
    title: "Blog Landing Page",
    description:
      "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
    theme_id: "winter",
    fonts: {
      heading: { family: "Merriweather", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "twitter-like-social",
    title: "Twitter-like Social Platform",
    description:
      "A modern social media interface with posts, trending topics, user interactions, and responsive design",
    theme_id: "dark",
    fonts: {
      heading: { family: "Inter", weight: "600" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "cooking-recipe-site",
    title: "Cooking Recipe Website",
    description:
      "A beautiful recipe platform with ingredients, instructions, nutrition facts, and related recipes",
    theme_id: "garden",
    fonts: {
      heading: { family: "Playfair Display", weight: "600" },
      body: { family: "Lora", weight: "400" },
    },
  },
  {
    id: "cookbook-landing",
    title: "Cookbook Landing",
    description:
      "A recipe discovery landing page with search, popular recipes, and seasonal picks",
    theme_id: "mint",
    fonts: {
      heading: { family: "Playfair Display", weight: "600" },
      body: { family: "Source Sans Pro", weight: "400" },
    },
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description:
      "A full-featured online store with product listings, categories, shopping cart, and checkout flow",
    theme_id: "corporate",
    fonts: {
      heading: { family: "Outfit", weight: "600" },
      body: { family: "Montserrat", weight: "400" },
    },
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "A professional portfolio website with projects, experience, skills, and contact information",
    theme_id: "winter",
    fonts: {
      heading: { family: "Poppins", weight: "600" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "saas-landing",
    title: "SaaS Landing Page",
    description:
      "A modern SaaS landing page with features, pricing, testimonials, and call-to-action sections",
    theme_id: "corporate",
    fonts: {
      heading: { family: "Outfit", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "ai-chat-ui",
    title: "AI Chat Interface",
    description:
      "A sleek AI chat interface with conversation history, message formatting, and user interactions",
    theme_id: "synthwave",
    fonts: {
      heading: { family: "Orbitron", weight: "600" },
      body: { family: "Inter", weight: "400" },
    },
  },
  {
    id: "concert-poster",
    title: "Concert Poster",
    description:
      "An eye-catching concert poster design with neon effects, event details, and ticket information",
    theme_id: "test",
  },
];

export const TEMPLATES: SelectSection[] = [
  {
    title: "Blog Templates",
    options: [
      {
        theme_id: "lemonade",
        id: "simple-blog-post",
        title: "Blog Post",
        description:
          "A detailed blog post layout with header, content, interactions, and suggested articles",
        fonts: {
          heading: { family: "Playfair Display", weight: "600" },
          body: { family: "Inter", weight: "400" },
        },
      },
      {
        theme_id: "winter",
        id: "simple-blog-landing",
        title: "Blog Landing Page",
        description:
          "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
        fonts: {
          heading: { family: "Merriweather", weight: "700" },
          body: { family: "Inter", weight: "400" },
        },
      },
    ],
  },
  {
    title: "Website Templates",
    options: [
      {
        theme_id: "dark",
        id: "twitter-like-social",
        title: "Social Media Platform",
        description:
          "A modern social media interface with posts, trending topics, user interactions, and responsive design",
        fonts: {
          heading: { family: "Inter", weight: "600" },
          body: { family: "Inter", weight: "400" },
        },
      },
      {
        theme_id: "garden",
        id: "cooking-recipe-site",
        title: "Recipe Website",
        description:
          "A beautiful recipe platform with ingredients, instructions, nutrition facts, and related recipes",
        fonts: {
          heading: { family: "Playfair Display", weight: "600" },
          body: { family: "Lora", weight: "400" },
        },
      },
      {
        theme_id: "mint",
        id: "cookbook-landing",
        title: "Cookbook Landing",
        description:
          "A recipe discovery landing page with search and featured recipes",
        fonts: {
          heading: { family: "Playfair Display", weight: "600" },
          body: { family: "Source Sans Pro", weight: "400" },
        },
      },
      {
        theme_id: "corporate",
        id: "ecommerce-store",
        title: "E-commerce Store",
        description:
          "A full-featured online store with product listings, categories, shopping cart, and checkout flow",
        fonts: {
          heading: { family: "Outfit", weight: "600" },
          body: { family: "Montserrat", weight: "400" },
        },
      },
      {
        theme_id: "winter",
        id: "personal-portfolio",
        title: "Personal Portfolio",
        description:
          "A professional portfolio website with projects, experience, skills, and contact information",
        fonts: {
          heading: { family: "Poppins", weight: "600" },
          body: { family: "Inter", weight: "400" },
        },
      },
      {
        theme_id: "corporate",
        id: "saas-landing",
        title: "SaaS Landing Page",
        description:
          "A modern SaaS landing page with features, pricing, testimonials, and call-to-action sections",
        fonts: {
          heading: { family: "Outfit", weight: "700" },
          body: { family: "Inter", weight: "400" },
        },
      },
      {
        theme_id: "cyberpunk",
        id: "anime-realm",
        title: "Anime Realm",
        description:
          "A modern, glitch-inspired fan site celebrating Darling in the Franxx with character profiles, story highlights, wallpapers, merch links, and more.",
        fonts: {
          heading: { family: "Orbitron", weight: "600" },
          body: { family: "Outfit", weight: "400" },
        },
      },
    ],
  },
  {
    title: "App Templates",
    options: [
      {
        theme_id: "synthwave",
        id: "ai-chat-ui",
        title: "AI Chat Interface",
        description:
          "A sleek AI chat interface with conversation history, message formatting, and user interactions",
        fonts: {
          heading: { family: "Orbitron", weight: "600" },
          body: { family: "Inter", weight: "400" },
        },
      },
    ],
  },
  {
    title: "Poster Templates",
    options: [
      {
        theme_id: "retro",
        id: "concert-poster",
        title: "Concert Poster",
        description:
          "An eye-catching concert poster design with neon effects, event details, and ticket information",
        fonts: {
          heading: { family: "Oswald", weight: "600" },
          body: { family: "Montserrat", weight: "400" },
        },
      },
    ],
  },
];

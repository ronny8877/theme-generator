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
} as const;

export const DAISY_UI_AVILABLE_THEMES = ["lemonade", "synthwave", "cyberpunk"];

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

export const THEMES = [
  {
    name: "lemonade",
    id: "lemonade",
    default: true,
    colors: {
      "--color-base-100": "oklch(98.71% 0.02 123.72)",
      "--color-base-200": "oklch(91.8% 0.018 123.72)",
      "--color-base-300": "oklch(84.89% 0.017 123.72)",
      "--color-base-content": "oklch(19.742% 0.004 123.72)",

      "--color-primary": "oklch(58.92% 0.199 134.6)",
      "--color-primary-content": "oklch(11.784% 0.039 134.6)",

      "--color-secondary": "oklch(77.75% 0.196 111.09)",
      "--color-secondary-content": "oklch(15.55% 0.039 111.09)",

      "--color-accent": "oklch(85.39% 0.201 100.73)",
      "--color-accent-content": "oklch(17.078% 0.04 100.73)",

      "--color-neutral": "oklch(30.98% 0.075 108.6)",
      "--color-neutral-content": "oklch(86.196% 0.015 108.6)",

      "--color-info": "oklch(86.19% 0.047 224.14)",
      "--color-info-content": "oklch(17.238% 0.009 224.14)",

      "--color-success": "oklch(86.19% 0.047 157.85)",
      "--color-success-content": "oklch(17.238% 0.009 157.85)",

      "--color-warning": "oklch(86.19% 0.047 102.15)",
      "--color-warning-content": "oklch(17.238% 0.009 102.15)",

      "--color-error": "oklch(86.19% 0.047 25.85)",
      "--color-error-content": "oklch(17.238% 0.009 25.85)",
    },

    radius: {
      "--radius-selector": "1rem",
      "--radius-field": "0.5rem",
      "--radius-box": "1rem",
    },

    misc: {
      "--size-selector": "0.25rem",
      "--size-field": "0.25rem",
      "--border": "1px",
      "--depth": 0,
      "--noise": 0,
    },
  },
  {
    name: "cyberpunk",
    id: "cyberpunk",
    default: false,
    colors: {
      "--color-base-100": "oklch(94.51% 0.179 104.32)",
      "--color-base-200": "oklch(91.51% 0.179 104.32)",
      "--color-base-300": "oklch(85.51% 0.179 104.32)",
      "--color-base-content": "oklch(0% 0 0)",

      "--color-primary": "oklch(74.22% 0.209 6.35)",
      "--color-primary-content": "oklch(14.844% 0.041 6.35)",

      "--color-secondary": "oklch(83.33% 0.184 204.72)",
      "--color-secondary-content": "oklch(16.666% 0.036 204.72)",

      "--color-accent": "oklch(71.86% 0.217 310.43)",
      "--color-accent-content": "oklch(14.372% 0.043 310.43)",

      "--color-neutral": "oklch(23.04% 0.065 269.31)",
      "--color-neutral-content": "oklch(94.51% 0.179 104.32)",

      "--color-info": "oklch(72.06% 0.191 231.6)",
      "--color-info-content": "oklch(0% 0 0)",

      "--color-success": "oklch(64.8% 0.15 160)",
      "--color-success-content": "oklch(0% 0 0)",

      "--color-warning": "oklch(84.71% 0.199 83.87)",
      "--color-warning-content": "oklch(0% 0 0)",

      "--color-error": "oklch(71.76% 0.221 22.18)",
      "--color-error-content": "oklch(0% 0 0)",
    },

    radius: {
      "--radius-selector": "0rem",
      "--radius-field": "0rem",
      "--radius-box": "0rem",
    },

    misc: {
      "--size-selector": "0.25rem",
      "--size-field": "0.25rem",
      "--border": "1px",
      "--depth": 0,
      "--noise": 0,
    },
  },
  {
    name: "synthwave",
    id: "synthwave",
    default: false,
    colors: {
      "--color-base-100": "oklch(15% 0.09 281.288)",
      "--color-base-200": "oklch(20% 0.09 281.288)",
      "--color-base-300": "oklch(25% 0.09 281.288)",
      "--color-base-content": "oklch(78% 0.115 274.713)",

      "--color-primary": "oklch(71% 0.202 349.761)",
      "--color-primary-content": "oklch(28% 0.109 3.907)",

      "--color-secondary": "oklch(82% 0.111 230.318)",
      "--color-secondary-content": "oklch(29% 0.066 243.157)",

      "--color-accent": "oklch(75% 0.183 55.934)",
      "--color-accent-content": "oklch(26% 0.079 36.259)",

      "--color-neutral": "oklch(45% 0.24 277.023)",
      "--color-neutral-content": "oklch(87% 0.065 274.039)",

      "--color-info": "oklch(74% 0.16 232.661)",
      "--color-info-content": "oklch(29% 0.066 243.157)",

      "--color-success": "oklch(77% 0.152 181.912)",
      "--color-success-content": "oklch(27% 0.046 192.524)",

      "--color-warning": "oklch(90% 0.182 98.111)",
      "--color-warning-content": "oklch(42% 0.095 57.708)",

      "--color-error": "oklch(73.7% 0.121 32.639)",
      "--color-error-content": "oklch(23.501% 0.096 290.329)",
    },

    radius: {
      "--radius-selector": "1rem",
      "--radius-field": "0.5rem",
      "--radius-box": "1rem",
    },

    misc: {
      "--size-selector": "0.25rem",
      "--size-field": "0.25rem",
      "--border": "1px",
      "--depth": 0,
      "--noise": 0,
    },
  },
  {
    name: "retro",
    id: "retro",
    default: false,
    colors: {
      "--color-base-100": "oklch(91.637% 0.034 90.515)",
      "--color-base-200": "oklch(88.272% 0.049 91.774)",
      "--color-base-300": "oklch(84.133% 0.065 90.856)",
      "--color-base-content": "oklch(41% 0.112 45.904)",

      "--color-primary": "oklch(80% 0.114 19.571)",
      "--color-primary-content": "oklch(39% 0.141 25.723)",

      "--color-secondary": "oklch(92% 0.084 155.995)",
      "--color-secondary-content": "oklch(44% 0.119 151.328)",

      "--color-accent": "oklch(68% 0.162 75.834)",
      "--color-accent-content": "oklch(41% 0.112 45.904)",

      "--color-neutral": "oklch(44% 0.011 73.639)",
      "--color-neutral-content": "oklch(86% 0.005 56.366)",

      "--color-info": "oklch(58% 0.158 241.966)",
      "--color-info-content": "oklch(96% 0.059 95.617)",

      "--color-success": "oklch(51% 0.096 186.391)",
      "--color-success-content": "oklch(96% 0.059 95.617)",

      "--color-warning": "oklch(64% 0.222 41.116)",
      "--color-warning-content": "oklch(96% 0.059 95.617)",

      "--color-error": "oklch(70% 0.191 22.216)",
      "--color-error-content": "oklch(40% 0.123 38.172)",
    },

    radius: {
      "--radius-selector": "0.25rem",
      "--radius-field": "0.25rem",
      "--radius-box": "0.5rem",
    },

    misc: {
      "--size-selector": "0.25rem",
      "--size-field": "0.25rem",
      "--border": "1px",
      "--depth": 0,
      "--noise": 0,
    },
  },
];

export const TEMPLATES_ARRAY = [
  {
    id: "simple-blog-post",
    title: "Blog Post",
    description:
      "A detailed blog post layout with header, content, interactions, and suggested articles",
    theme_id: "test",
  },
  {
    id: "simple-blog-landing",
    title: "Blog Landing Page",
    description:
      "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
    theme_id: "test",
  },
  {
    id: "twitter-like-social",
    title: "Twitter-like Social Platform",
    description:
      "A modern social media interface with posts, trending topics, user interactions, and responsive design",
    theme_id: "test",
  },
  {
    id: "cooking-recipe-site",
    title: "Cooking Recipe Website",
    description:
      "A beautiful recipe platform with ingredients, instructions, nutrition facts, and related recipes",
    theme_id: "test",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description:
      "A full-featured online store with product listings, categories, shopping cart, and checkout flow",
    theme_id: "test",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "A professional portfolio website with projects, experience, skills, and contact information",
    theme_id: "test",
  },
];

export const TEMPLATES: SelectSection[] = [
  {
    title: "Blog Templates",
    options: [
      {
        theme_id: "test",
        id: "simple-blog-post",
        title: "Blog Post",
        description:
          "A detailed blog post layout with header, content, interactions, and suggested articles",
      },
      {
        theme_id: "test",
        id: "simple-blog-landing",
        title: "Blog Landing Page",
        description:
          "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
      },
    ],
  },
  {
    title: "Website Templates",
    options: [
      {
        theme_id: "test",
        id: "twitter-like-social",
        title: "Social Media Platform",
        description:
          "A modern social media interface with posts, trending topics, user interactions, and responsive design",
      },
      {
        theme_id: "test",
        id: "cooking-recipe-site",
        title: "Recipe Website",
        description:
          "A beautiful recipe platform with ingredients, instructions, nutrition facts, and related recipes",
      },
      {
        theme_id: "test",
        id: "ecommerce-store",
        title: "E-commerce Store",
        description:
          "A full-featured online store with product listings, categories, shopping cart, and checkout flow",
      },
      {
        theme_id: "test",
        id: "personal-portfolio",
        title: "Personal Portfolio",
        description:
          "A professional portfolio website with projects, experience, skills, and contact information",
      },
    ],
  },
];

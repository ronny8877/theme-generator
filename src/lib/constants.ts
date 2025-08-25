export const AVILABLE_THEMES = [
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

export const TEMPLATES = [
  {
    id: "template-1",
    name: "Template 1",
    description: "Description for Template 1",
    preview_image: "url_to_preview_image_1",
    preview_url: "/templates/template-1", // optional iframe path
    tags: ["modern", "minimal"],

    // prominent_colors: {
    //   primary: "#ff0000",
    //   secondary: "#00ff00",
    //   accent: "#0000ff",
    // },

    theme: {
      colors: {
        "--color-base-100": "oklch(25.33% 0.016 252.42)",
        "--color-base-200": "oklch(23.26% 0.014 253.1)",
        "--color-base-300": "oklch(80% 0.105 251.813)",
        "--color-base-content": "oklch(97.807% 0.029 256.847)",

        "--color-primary": "oklch(58% 0.233 277.117)",
        "--color-primary-content": "oklch(96% 0.018 272.314)",

        "--color-secondary": "oklch(65% 0.241 354.308)",
        "--color-secondary-content": "oklch(94% 0.028 342.258)",

        "--color-accent": "oklch(77% 0.152 181.912)",
        "--color-accent-content": "oklch(38% 0.063 188.416)",

        "--color-neutral": "oklch(14% 0.005 285.823)",
        "--color-neutral-content": "oklch(92% 0.004 286.32)",

        "--color-info": "oklch(74% 0.16 232.661)",
        "--color-info-content": "oklch(29% 0.066 243.157)",

        "--color-success": "oklch(76% 0.177 163.223)",
        "--color-success-content": "oklch(37% 0.077 168.94)",

        "--color-warning": "oklch(82% 0.189 84.429)",
        "--color-warning-content": "oklch(41% 0.112 45.904)",

        "--color-error": "oklch(71% 0.194 13.428)",
        "--color-error-content": "oklch(27% 0.105 12.094)",
      },

      radius: {
        "--radius-selector": "0.5rem",
        "--radius-field": "0.25rem",
        "--radius-box": "0.5rem",
      },

      misc: {
        "--size-selector": "0.25rem",
        "--size-field": "0.25rem",
        "--border": "1px",
        "--depth": 1,
        "--noise": 0,
      },
    },
  },
];

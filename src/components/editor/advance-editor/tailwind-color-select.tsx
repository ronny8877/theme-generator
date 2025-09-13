import { TAILWIND_COLORS } from "@/lib/constants/tailwind-colors";
import { useStore } from "@nanostores/react";
import { $themeColors } from "@/store/nano-store";
import { calculateContrast } from "@/lib/color-utils";
import { Crown, Contrast } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TailwindColors({
  onSelect,
  selected,
}: {
  onSelect?: (hex: string) => void;
  selected?: string | null;
}) {
  const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const themeColors = useStore($themeColors);

  const isSelected = (hex?: string) =>
    !!hex && selected?.toLowerCase() === hex.toLowerCase();

  // Get current theme colors as an array for easy comparison
  const currentThemeColorValues = Object.values(themeColors);

  const isCurrentThemeColor = (hex: string) =>
    currentThemeColorValues.some(
      (color) => color.toLowerCase() === hex.toLowerCase(),
    );

  const getContrastWithBackground = (color: string) => {
    // Calculate contrast with base background
    return calculateContrast(
      color,
      themeColors["--color-base-100"] || "#ffffff",
    );
  };

  return (
    <div className="p-2 sm:p-4 pb-0 overflow-x-auto">
      {/* Current Theme Colors Header */}
      <div className="mb-6 p-3 bg-base-200 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Current Theme Colors</h4>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Object.entries(themeColors).map(([key, color]) => {
            const contrast = getContrastWithBackground(color);
            const colorName = key.replace("--color-", "").replace("-", " ");

            return (
              <div key={key} className="text-center">
                <button
                  onClick={() => onSelect?.(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 relative group ${
                    isSelected(color)
                      ? "ring-2 ring-primary ring-offset-2 border-primary"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color }}
                  title={`${colorName}: ${color} (Contrast: ${contrast?.ratio || "N/A"})`}
                >
                  {contrast && (
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge
                        variant={
                          contrast.isAccessible ? "default" : "destructive"
                        }
                        className="text-xs px-1 py-0 h-4"
                      >
                        {contrast.level}
                      </Badge>
                    </div>
                  )}
                </button>
                <div className="text-xs text-base-content/60 mt-1 capitalize truncate">
                  {colorName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind Colors */}
      <div className="flex flex-row gap-3 sm:gap-4 min-w-max">
        {(
          Object.keys(TAILWIND_COLORS) as Array<keyof typeof TAILWIND_COLORS>
        ).map((color) => {
          const shadesObj = TAILWIND_COLORS[color] as Record<
            string | number,
            string
          >;
          return (
            <div key={color} className="flex flex-col items-center">
              <div className="text-[10px] mb-1 capitalize text-base-content/60">
                {color}
              </div>
              <div className="flex flex-col items-center gap-1">
                {SHADE_KEYS.map((label) => {
                  const shade = shadesObj[label];
                  const isCurrentColor = isCurrentThemeColor(shade);
                  const contrast = getContrastWithBackground(shade);

                  return (
                    <div key={`${color}-${label}`} className="relative group">
                      <button
                        type="button"
                        title={`${color} ${label} — ${shade}${contrast ? ` (Contrast: ${contrast.ratio})` : ""}`}
                        aria-label={`${color} ${label}`}
                        onClick={() => onSelect?.(shade)}
                        className={[
                          "relative grid aspect-square w-6 sm:w-7 place-items-center rounded-full border",
                          "transition-transform hover:scale-105 focus:outline-none",
                          isSelected(shade)
                            ? "ring-2 ring-offset-1 ring-base-content/60 border-transparent"
                            : isCurrentColor
                              ? "ring-2 ring-primary ring-offset-1 border-primary"
                              : "border-base-content/10",
                        ].join(" ")}
                        style={{ backgroundColor: shade }}
                      >
                        {isCurrentColor && (
                          <Crown className="h-3 w-3 text-white drop-shadow-lg" />
                        )}
                      </button>

                      {/* Contrast info on hover */}
                      {contrast && (
                        <div className="absolute left-8 top-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-base-100 border border-base-300 rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                            <div className="flex items-center gap-1">
                              <Contrast className="h-3 w-3" />
                              <span
                                className={
                                  contrast.isAccessible
                                    ? "text-success"
                                    : "text-error"
                                }
                              >
                                {contrast.ratio} ({contrast.level})
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

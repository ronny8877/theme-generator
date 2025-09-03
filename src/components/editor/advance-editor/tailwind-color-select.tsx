import { TAILWIND_COLORS } from "@/lib/constants/tailwind-colors";

export function TailwindColors({
  onSelect,
  selected,
}: {
  onSelect?: (hex: string) => void;
  selected?: string | null;
}) {
  const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const isSelected = (hex?: string) =>
    !!hex && selected?.toLowerCase() === hex.toLowerCase();

  return (
    <div className="p-2 sm:p-4 pb-0 overflow-x-auto">
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
                  return (
                    <button
                      key={`${color}-${label}`}
                      type="button"
                      title={`${color} ${label} — ${shade}`}
                      aria-label={`${color} ${label}`}
                      onClick={() => onSelect?.(shade)}
                      className={[
                        "relative grid aspect-square w-6 sm:w-7 place-items-center rounded-full border",
                        "transition-transform hover:scale-105 focus:outline-none",
                        isSelected(shade)
                          ? "ring-2 ring-offset-1 ring-base-content/60 border-transparent"
                          : "border-base-content/10",
                      ].join(" ")}
                      style={{ backgroundColor: shade }}
                    />
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

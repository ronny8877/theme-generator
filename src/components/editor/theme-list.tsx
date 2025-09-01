import { setActiveTheme } from "@/store/nano-store";
import { cn } from "@/lib/utils";
import { useTemplateStore } from "@/store/hooks";
import { THEMES } from "@/lib/constants";
import { THEME_INFO } from "@/lib/constants/constants";

export default function ThemeList() {
  const templateStore = useTemplateStore();
  return (
    <div className="flex flex-col gap-3 h-full pr-2">
      {THEMES.map((theme) => {
        return (
          <div
            onClick={() => setActiveTheme(theme.name)}
            key={theme.id}
            className={cn(
              "hover:bg-base-200 border border-base-300 rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
              templateStore.active_theme.id === theme.name
                ? "bg-base-200 shadow-lg"
                : "bg-base-100",
            )}
          >
            <div className="flex flex-row justify-center items-center gap-3">
              {/* Four-color preview: base, accent, content, primary */}
              {(() => {
                const themeKey = String(theme.name).toLowerCase();
                const themeInfo: any = (THEME_INFO as any)[themeKey];
                const colors = [
                  // base
                  theme.colors?.["--color-base-100"] ?? themeInfo?.colors?.[0],
                  // accent
                  theme.colors?.["--color-accent"] ?? themeInfo?.colors?.[1],
                  // content
                  theme.colors?.["--color-base-content"] ??
                    themeInfo?.colors?.[2],
                  // primary
                  theme.colors?.["--color-primary"] ?? themeInfo?.colors?.[0],
                ];

                return (
                  <div className="grid grid-cols-2 gap-2">
                    {colors.map((color, index) => (
                      <div
                        key={`color-${index}`}
                        className="w-4 h-4 rounded-sm border border-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                    ))}
                  </div>
                );
              })()}

              {/* Theme name */}
              <span className="text-sm font-medium text-base-content capitalize tracking-wide">
                {theme.name.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

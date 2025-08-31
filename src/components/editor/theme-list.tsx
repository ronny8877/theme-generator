import {
  DAISY_UI_AVILABLE_THEMES,
  THEME_INFO,
} from "@/lib/constants/constants";
import { setActiveTheme } from "@/store/nano-store";
import { cn } from "@/lib/utils";
import { useTemplateStore } from "@/store/hooks";

export default function ThemeList() {
  const templateStore = useTemplateStore();
  return (
    <div className="flex flex-col gap-3 h-full pr-2">
      {DAISY_UI_AVILABLE_THEMES.map((theme) => {
        const themeInfo = THEME_INFO[theme as keyof typeof THEME_INFO];
        return (
          <div
            onClick={() => setActiveTheme(theme)}
            key={theme}
            className={cn(
              "hover:bg-base-200 border border-base-300 rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
              templateStore.active_theme.id === theme
                ? "bg-base-200 shadow-lg"
                : "bg-base-100",
            )}
          >
            <div className="flex flex-col items-center gap-3">
              {/* Three colored dots */}
              {themeInfo?.colors && (
                <div className="flex gap-2">
                  {themeInfo.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}

              {/* Theme name */}
              <span className="text-sm font-medium text-base-content capitalize tracking-wide">
                {themeInfo?.name || theme}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

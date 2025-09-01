import { setActiveTheme } from "@/store/nano-store";
import { cn } from "@/lib/utils";
import { useTemplateStore } from "@/store/hooks";
import { THEMES } from "@/lib/constants";
import { THEME_INFO } from "@/lib/constants/constants";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ThemeList() {
  const [query, setQuery] = React.useState("");
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const filteredThemes = THEMES.filter((theme) =>
    theme.name.toLowerCase().includes(query.toLowerCase())
  );
  const templateStore = useTemplateStore();
  return (
    <div ref={animationParent} className="flex flex-col gap-3 h-full pr-2">
      <input
        type="text"
        placeholder="Search themes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mx-1 mt-1 border border-base-300 p-2 rounded-3xl"
      />
      {filteredThemes.length === 0 && (
        <>
          <img
            src="https://picscave.com/assetstore/medium/raiden_shogun_3_pYGrM-LaT7dAIZ.jpeg"
            alt="No themes found"
            className="w-full h-60 object-cover object-top rounded-3xl"
          />
          PS CHANGE LATER
          <div className="text-sm text-base-content">No themes found</div>
        </>
      )}
      <h2 className="text-lg font-semibold">Daisy UI Themes</h2>
      <span className="divider my-0" />
      {filteredThemes.map((theme) => {
        return (
          <div
            onClick={() => setActiveTheme(theme.name)}
            key={theme.id}
                    style={{
                    backgroundColor: theme.colors?.["--color-base-200"],
                  }}
            className={cn(
              "hover:bg-base-200 border outline outline-white border-base-300 rounded-3xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
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
                  <div className="grid grid-cols-2 gap-2 p-2"
          >
                    {colors.map((color, index) => (
                      <div
                        key={`color-${index}`}
                        className="w-5 h-5 rounded-sm border border-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                    ))}
                  </div>
                );
              })()}

              {/* Theme name */}
              <span
                style={{
                  color: theme.colors?.["--color-base-content"],
                }}
                className="text-sm font-medium capitalize tracking-wide">
                {theme.name.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

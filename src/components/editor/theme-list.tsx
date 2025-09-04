import {
  useTemplateStore,
  useTemplateActions,
  useUserThemes,
  IThemeConfig,
  observer,
} from "@/store";
import { cn } from "@/lib/utils";
import { THEMES } from "@/lib/constants";
import { THEME_INFO } from "@/lib/constants/constants";
import React from "react";
import { Sparkles } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default observer(function ThemeList() {
  const [query, setQuery] = React.useState("");
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const userThemes = useUserThemes();
  const { setActiveTheme, setActiveThemeConfig, deleteUserTheme } =
    useTemplateActions();

  const filteredUserThemes = userThemes.filter((t: IThemeConfig) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredThemes = THEMES.filter((theme) =>
    theme.name.toLowerCase().includes(query.toLowerCase())
  );
  const templateStore = useTemplateStore();
  return (
    <div ref={animationParent} className="flex flex-col gap-3 h-full pr-2">
      {/* Randomize button */}
      <div className="flex items-center justify-between gap-2">
        <button className="btn btn-sm rounded-full px-4 shadow-md bg-gradient-to-r from-primary to-accent text-primary-content hover:opacity-90">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Surprise me
          </span>
        </button>
      </div>
      <input
        type="text"
        placeholder="Search themes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mx-1 mt-1 border border-base-300 p-2 rounded-3xl"
      />
      {filteredUserThemes.length === 0 && filteredThemes.length === 0 && (
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
      {filteredUserThemes.length > 0 && (
        <>
          <h2 className="text-lg font-semibold">Your Themes</h2>
          <span className="divider my-0" />
          {filteredUserThemes.map((theme: IThemeConfig) => (
            <div
              key={theme.id}
              onClick={() => setActiveThemeConfig(theme)}
              style={{
                backgroundColor: theme.colors?.["--color-base-200"],
              }}
              className={cn(
                "relative hover:bg-base-200 border outline outline-white border-base-300 rounded-4xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
                templateStore.active_theme.id === theme.id
                  ? "bg-base-200 shadow-lg"
                  : "bg-base-100"
              )}
            >
              {/* Delete button */}
              <button
                className="btn btn-xs btn-ghost absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUserTheme(theme.id);
                }}
                title="Delete theme"
              >
                Delete
              </button>

              <div className="flex flex-row justify-center items-center gap-3">
                {(() => {
                  const colors = [
                    theme.colors?.["--color-base-100"],
                    theme.colors?.["--color-accent"],
                    theme.colors?.["--color-base-content"],
                    theme.colors?.["--color-primary"],
                  ];
                  return (
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {colors.map((color, index) => (
                        <div
                          key={`user-color-${index}`}
                          className="w-5 h-5 rounded-lg border border-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                          style={{ backgroundColor: color }}
                          aria-hidden
                        />
                      ))}
                    </div>
                  );
                })()}
                <span
                  style={{
                    color: theme.colors?.["--color-base-content"],
                  }}
                  className="text-sm font-medium capitalize tracking-wide"
                >
                  {theme.name}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
      {filteredThemes.length > 0 && (
        <>
          <h2 className="text-lg font-semibold">Daisy UI Themes</h2>
          <span className="divider my-0" />
        </>
      )}
      {filteredThemes.map((theme) => {
        return (
          <div
            onClick={() => setActiveTheme(theme.name)}
            key={theme.id}
            style={{
              backgroundColor: theme.colors?.["--color-base-200"],
            }}
            className={cn(
              "hover:bg-base-200 border outline outline-white border-base-300 rounded-4xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
              templateStore.active_theme.name === theme.name
                ? "bg-base-200 shadow-lg"
                : "bg-base-100"
            )}
          >
            <div className="flex flex-row justify-center items-center gap-3">
              {/* Four-color preview: base, accent, content, primary */}
              {(() => {
                const themeKey = String(theme.name).toLowerCase();
                type ThemeInfoKey = keyof typeof THEME_INFO;
                const themeInfo = THEME_INFO[themeKey as ThemeInfoKey];

                const colors = [
                  theme.colors?.["--color-base-100"] ?? themeInfo?.colors?.[0],
                  theme.colors?.["--color-accent"] ?? themeInfo?.colors?.[1],
                  theme.colors?.["--color-base-content"] ??
                    themeInfo?.colors?.[2],
                  theme.colors?.["--color-primary"] ?? themeInfo?.colors?.[0],
                ];

                return (
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {colors.map((color, index) => (
                      <div
                        key={`color-${index}`}
                        className="w-5 h-5 rounded-lg border border-white shadow-sm group-hover:scale-110 transition-transform duration-200"
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
                className="text-sm font-medium capitalize tracking-wide"
              >
                {theme.name.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

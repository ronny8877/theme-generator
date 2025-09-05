import {
  $userThemes,
  initUserThemes,
  deleteUserTheme,
  type ThemeConfig,
} from "@/store/nano-store";
import { cn } from "@/lib/utils";
import {
  useActiveThemeId,
  useActiveThemeName,
  useIsThemeEdited,
  useTemplateActions,
} from "@/store/hooks";
import { THEMES } from "@/lib/constants";
import { THEME_INFO } from "@/lib/constants/constants";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useStore } from "@nanostores/react";

function ThemeListBase() {
  const [query, setQuery] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingApply, setPendingApply] = React.useState<
    | null
    | { type: "library"; name: string }
    | { type: "user"; config: ThemeConfig }
  >(null);
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const userThemes = useStore($userThemes);
  const isEdited = useIsThemeEdited();
  const {
    applyThemeAndResetBaseline,
    applyThemeConfigAndResetBaseline,
    saveEditedTheme,
  } = useTemplateActions();
  React.useEffect(() => {
    initUserThemes();
  }, []);

  const filteredUserThemes = userThemes.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()),
  );
  const filteredThemes = THEMES.filter((theme) =>
    theme.name.toLowerCase().includes(query.toLowerCase()),
  );
  const activeThemeId = useActiveThemeId();
  const activeThemeName = useActiveThemeName();

  const handleApplyLibraryTheme = (name: string) => {
    if (!isEdited) {
      applyThemeAndResetBaseline(name);
      return;
    }
    setPendingApply({ type: "library", name });
    setConfirmOpen(true);
  };

  const handleApplyUserTheme = (config: ThemeConfig) => {
    if (!isEdited) {
      applyThemeConfigAndResetBaseline(config);
      return;
    }
    setPendingApply({ type: "user", config });
    setConfirmOpen(true);
  };

  const onConfirmAction = (
    action: "save-apply" | "discard-apply" | "cancel",
  ) => {
    if (action === "cancel") {
      setConfirmOpen(false);
      setPendingApply(null);
      return;
    }
    if (!pendingApply) return;
    if (action === "save-apply") {
      saveEditedTheme();
    }
    if (pendingApply.type === "library") {
      applyThemeAndResetBaseline(pendingApply.name);
    } else if (pendingApply.type === "user") {
      applyThemeConfigAndResetBaseline(pendingApply.config);
    }
    setConfirmOpen(false);
    setPendingApply(null);
  };
  return (
    <div ref={animationParent} className="flex flex-col gap-3 h-full pr-2">
      {/* Unsaved changes dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved theme changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved edits. Save your current theme or discard changes
              before applying the new theme?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onConfirmAction("cancel")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onConfirmAction("discard-apply")}>
              Discard & Apply
            </AlertDialogAction>
            <AlertDialogAction onClick={() => onConfirmAction("save-apply")}>
              Save & Apply
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          {filteredUserThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleApplyUserTheme(theme)}
              style={{
                backgroundColor: theme.colors?.["--color-base-200"],
              }}
              className={cn(
                "relative hover:bg-base-200 border outline outline-white border-base-300 rounded-4xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
                activeThemeId === theme.id
                  ? "bg-base-200 shadow-lg"
                  : "bg-base-100",
              )}
            >
              {/* Delete button with confirm */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="btn btn-xs btn-ghost absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    title="Delete theme"
                  >
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete theme?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove
                      your saved theme &quot;{theme.name}&quot; from this
                      device.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUserTheme(theme.id);
                        toast.success("Theme deleted", {
                          description: theme.name,
                        });
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

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
            onClick={() => handleApplyLibraryTheme(theme.name)}
            key={theme.id}
            style={{
              backgroundColor: theme.colors?.["--color-base-200"],
            }}
            className={cn(
              "hover:bg-base-200 border outline outline-white border-base-300 rounded-4xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group",
              activeThemeName === theme.name
                ? "bg-base-200 shadow-lg"
                : "bg-base-100",
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
}
export default React.memo(ThemeListBase);

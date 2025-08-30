import { editEditorSettings } from "@/store";
import { useAppStore } from "@/store/hooks";
import { ImageUpscale, PictureInPicture, X } from "lucide-react";

export const EditorHeader = () => {
  const appStore = useAppStore();
  return (
    <div className="flex items-center justify-between border-b border-base-300">
      <button
        className="btn rounded-3xl"
        onClick={() =>
          editEditorSettings({
            ui_type:
              appStore.editor.ui_type === "default" ? "floating" : "default",
          })
        }
      >
        {appStore.editor.ui_type === "default" ? (
          <PictureInPicture />
        ) : (
          <ImageUpscale />
        )}
      </button>
      <h2> Editor </h2>
      <button
        className="btn rounded-3xl"
        onClick={() => editEditorSettings({ is_open: false })}
      >
        <X />
      </button>
    </div>
  );
};

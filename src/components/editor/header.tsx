import { editEditorSettings, $editorUiType } from "@/store";
import { useStore } from "@nanostores/react";
import { ImageUpscale, PictureInPicture, X } from "lucide-react";
import React from "react";

const EditorHeaderCmp = () => {
  const uiType = useStore($editorUiType);
  return (
    <div className="flex items-center justify-between border-b border-base-300">
      <button
        className="btn rounded-3xl"
        onClick={() =>
          editEditorSettings({
            ui_type: uiType === "default" ? "floating" : "default",
          })
        }
      >
        {uiType === "default" ? <PictureInPicture /> : <ImageUpscale />}
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

export const EditorHeader = React.memo(EditorHeaderCmp);
EditorHeader.displayName = "EditorHeader";

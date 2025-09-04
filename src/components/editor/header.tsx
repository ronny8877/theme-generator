import { useEditor, useAppActions, observer } from "@/store";
import { ImageUpscale, PictureInPicture, X } from "lucide-react";
import React from "react";

const EditorHeaderCmp = observer(() => {
  const editor = useEditor();
  const { editEditorSettings } = useAppActions();
  return (
    <div className="flex items-center justify-between border-b border-base-300">
      <button
        className="btn rounded-3xl"
        onClick={() =>
          editEditorSettings({
            ui_type: editor.ui_type === "default" ? "floating" : "default",
          })
        }
      >
        {editor.ui_type === "default" ? <PictureInPicture /> : <ImageUpscale />}
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
});

export const EditorHeader = EditorHeaderCmp;
EditorHeader.displayName = "EditorHeader";

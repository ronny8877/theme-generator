import { editEditorSettings } from "@/store";
import { useAppStore } from "@/store/hooks";
import { Palette } from "lucide-react";

export default function EditorToggle() {
  const appStore = useAppStore();
  if (appStore.editor.is_open) return null;

  return (
    <div
      onClick={() =>
        editEditorSettings({
          is_open: true,
        })
      }
      className="fixed bottom-20 md:bottom-5 z-50 right-5 md:right-20  rounded-full bg-primary p-2 shadow-lg hover:cursor-pointer hover:bg-primary/80 active:scale-95 transition-all"
    >
      <Palette className="m-3 h-6 w-6 text-base-content" />
    </div>
  );
}

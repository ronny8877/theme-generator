import { useAppStore, useAppActions, observer } from "@/store";

export default observer(function EditorToggle() {
  const appStore = useAppStore();
  const { editEditorSettings } = useAppActions();

  if (appStore.editor.is_open) return null;

  return (
    <div
      onClick={() =>
        editEditorSettings({
          is_open: true,
        })
      }
      className="fixed bottom-5 z-50 right-20  rounded-full bg-red-500"
    >
      <h2>Editor Toggle</h2>
    </div>
  );
});

import Editor from "./editor";

export default function EditorFloatingWrapper() {
  return (
    <div className="fixed  z-50 right-5 h-[95%]">
      <Editor />
    </div>
  );
}

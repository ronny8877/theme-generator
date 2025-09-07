import Editor from "./editor";

export default function EditorFloatingWrapper() {
  return (
    <div className="fixed  z-50 md:right-5 h-[98%]">
      <Editor />
    </div>
  );
}

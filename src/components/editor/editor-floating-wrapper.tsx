import Editor from "./editor";

export default function EditorFloatingWrapper() {
  return (
    <div className="fixed  z-50 right-5 h-[98%] 2xl:h-[95%] ">
      <Editor />
    </div>
  );
}

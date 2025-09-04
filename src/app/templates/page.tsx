"use client";
import TemplatePreview from "@/components/template-preview";
import { ToolSelect } from "@/components/navs/tool-select";
import DeviceSelect from "@/components/navs/device-select";
import TemplateSelector from "@/components/template-selector";
import EditorToggle from "@/components/editor-toggle";
// import ThemeInfo from "@/components/navs/theme-info";

export default function TemplatesPage() {
  return (
    <>
      {/* <ThemeInfo /> */}
      <TemplateSelector />
      <DeviceSelect />
      <div className="h-screen flex">
        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview />
        </div>
      </div>
      <ToolSelect />
      {/* <FloatingThemeSelector /> */}
      <EditorToggle />
    </>
  );
}

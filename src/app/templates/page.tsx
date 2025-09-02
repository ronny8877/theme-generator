"use client";
import TemplatePreview from "@/components/template-preview";
import { ToolSelect } from "@/components/navs/tool-select";
import DeviceSelect from "@/components/navs/device-select";
import FloatingThemeSelector from "@/components/navs/app-theme";
import FloatingSelect from "@/components/ui/floating-select";
import { useState } from "react";
import { TEMPLATES } from "@/lib/constants/constants";
import EditorToggle from "@/components/editor-toggle";
// import ThemeInfo from "@/components/navs/theme-info";

export default function TemplatesPage() {
  const [selectedValue, setSelectedValue] = useState<string>("dashboard");

  return (
    <>
      {/* <ThemeInfo /> */}
      <FloatingSelect
        sections={TEMPLATES}
        value={selectedValue}
        onValueChange={setSelectedValue}
        placeholder="Choose an option"
      />
      <DeviceSelect />
      <div className="h-screen flex">
        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview />
        </div>
      </div>
      <ToolSelect />
      <FloatingThemeSelector />
      <EditorToggle />
    </>
  );
}

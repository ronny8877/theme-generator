"use client";
import TemplatePreview from "@/components/TemplatePreview";
import { ToolSelect } from "@/components/navs/floating-mockup";
import TemplateSelect from "@/components/navs/templateSelect";
import DeviceSelect from "@/components/navs/device-select";
import FloatingThemeSelector from "@/components/navs/app-theme";
import FloatingSelect from "@/components/ui/floating-select";
import { useState } from "react";
import { TEMPLATES } from "@/lib/constants";

export default function () {
  const [selectedValue, setSelectedValue] = useState<string>("dashboard");

  return (
    <>
      <FloatingSelect
        sections={TEMPLATES}
        value={selectedValue}
        onValueChange={setSelectedValue}
        placeholder="Choose an option"
      />
      <DeviceSelect />
      <TemplateSelect />
      <div className="h-screen flex">
        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview />
        </div>
      </div>
      <ToolSelect />
      <FloatingThemeSelector />
    </>
  );
}

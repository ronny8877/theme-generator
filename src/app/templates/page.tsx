"use client";
import TemplatePreview from "@/components/TemplatePreview";
import { AppleStyleDock } from "@/components/navs/floating-mockup";
import { StoreProvider } from "@/store/hooks";
import TemplateSelect from "@/components/navs/templateSelect";
import DeviceSelect from "@/components/navs/device-select";

export default function () {
  return (
    <>
      <StoreProvider>
        <DeviceSelect />
        <TemplateSelect />
        <div className="h-screen flex">
          {/* Template Preview */}
          <div className="flex-1">
            <TemplatePreview />
          </div>
        </div>
        <AppleStyleDock />
      </StoreProvider>
    </>
  );
}

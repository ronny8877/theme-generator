"use client";
import TemplatePreview from "@/components/TemplatePreview";
import { AppleStyleDock } from "@/components/navs/floating-mockup";
import { StoreProvider } from "@/store/hooks";
import TemplateSelect from "@/components/navs/templateSelect";

export default function() {
  return (
    <>
    <StoreProvider>
         <TemplateSelect />
      <div className="h-screen flex">
        {/* Template Preview */}
        <div className="flex-1">
          <TemplatePreview/>
        </div>
      </div>
      <AppleStyleDock />
    </StoreProvider>
    </>
  );
}

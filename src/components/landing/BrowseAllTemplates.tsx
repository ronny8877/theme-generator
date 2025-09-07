"use client";
import React, { useCallback, useEffect, useState } from "react";
import PreviewFrame from "./PreviewFrame";
import TemplatePills from "./TemplatePills";
import DaisyThemeSelect from "./DaisyThemeSelect";
import FontSelect from "./FontSelect";
import {
  useAppActions,
  useFontActions,
  useTemplateActions,
} from "@/store/hooks";
import { editEditorSettings } from "@/store";
import { loadGoogleFont } from "@/store/font-store";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";

export type BrowseAllTemplatesProps = {
  className?: string;
};

const BrowseAllTemplates: React.FC<BrowseAllTemplatesProps> = ({
  className = "",
}) => {
  const [theme, setTheme] = useState<string>("autumn");
  const [templateId, setTemplateId] = useState<string>("landing");
  const [headingFont, setHeadingFont] = useState<string>("Poppins");
  const [bodyFont, setBodyFont] = useState<string>("Inter");

  const { setActiveTemplateById, applyThemeAndResetBaseline } =
    useTemplateActions();
  const { resetBaselineToCurrent, setActiveEditorTab, setActivePanel } =
    useAppActions();
  const { updateHeadingFont, updateBodyFont } = useFontActions();

  useEffect(() => {
    setActiveTemplateById(templateId as never);
    setActivePanel("templates");
    setActiveEditorTab("themes");
    editEditorSettings({ is_open: false });
  }, [templateId, setActiveTemplateById, setActivePanel, setActiveEditorTab]);

  useEffect(() => {
    (async () => {
      await loadGoogleFont(headingFont);
      updateHeadingFont({ family: headingFont, weight: "600" });
      await loadGoogleFont(bodyFont);
      updateBodyFont({ family: bodyFont, weight: "400" });
    })();
  }, [headingFont, bodyFont, updateHeadingFont, updateBodyFont]);

  const onSelectTheme = useCallback(
    (t: string) => {
      setTheme(t);
      applyThemeAndResetBaseline(t);
      resetBaselineToCurrent();
    },
    [applyThemeAndResetBaseline, resetBaselineToCurrent],
  );

  return (
    <section id="browse-all" className={`py-10 lg:py-14 ${className}`}>
      <div className="flex items-center justify-between mb-6 px-1 lg:px-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Browse all templates
        </h2>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <TemplatePills
          activeId={templateId}
          onSelect={setTemplateId}
          className="bg-base-200 py-5 px-3 rounded-4xl"
          limit={TEMPLATES_ARRAY.length}
        />

        <div className="relative w-full">
          {/* Floating controls on the right, stacked vertically */}
          <div className="hidden rounded-box glass lg:flex flex-col gap-2 absolute right-6 top-6 z-10">
            <DaisyThemeSelect
              label="Theme"
              value={theme}
              onSelect={onSelectTheme}
            />
            <FontSelect
              label="Heading"
              value={headingFont}
              onSelect={setHeadingFont}
            />
            <FontSelect label="Body" value={bodyFont} onSelect={setBodyFont} />
          </div>

          <div className="mx-auto">
            <PreviewFrame
              theme={theme}
              className="rounded-3xl overflow-hidden"
            />
            {/* SEO-friendly anchor for crawlers to index template preview pages. Clicks are prevented to keep SPA behavior. */}
            <a
              href={`/preview/${encodeURIComponent(templateId)}`}
              onClick={(e) => e.preventDefault()}
              aria-hidden="true"
              className="sr-only"
            >
              Preview {templateId}
            </a>
          </div>
        </div>

        {/* Stacked controls for mobile */}
        <div className="lg:hidden glass rounded-box grid grid-cols-1 gap-2 w-full max-w-xl">
          <DaisyThemeSelect
            label="Theme"
            value={theme}
            onSelect={onSelectTheme}
          />
          <FontSelect
            label="Heading"
            value={headingFont}
            onSelect={setHeadingFont}
          />
          <FontSelect label="Body" value={bodyFont} onSelect={setBodyFont} />
        </div>
      </div>
    </section>
  );
};

export default BrowseAllTemplates;

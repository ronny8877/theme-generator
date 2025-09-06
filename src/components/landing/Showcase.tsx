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

export type ShowcaseProps = {
  className?: string;
  onThemeChange?: (theme: string) => void; // called when theme changes
};

const Showcase: React.FC<ShowcaseProps> = ({
  className = "",
  onThemeChange,
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
    // Keep landing preview in sync with template selection
    setActiveTemplateById(templateId as never);
    // Keep UI focused on templates without editor for landing page
    setActivePanel("templates");
    setActiveEditorTab("themes");
    editEditorSettings({ is_open: false });
  }, [templateId, setActiveTemplateById, setActivePanel, setActiveEditorTab]);

  useEffect(() => {
    // Inform parent (e.g., navbar theme switcher) if needed
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  useEffect(() => {
    // Apply fonts to store so preview uses them
    (async () => {
      await loadGoogleFont(headingFont);
      updateHeadingFont({ family: headingFont, weight: "600" });
      await loadGoogleFont(bodyFont);
      updateBodyFont({ family: bodyFont, weight: "400" });
    })();
  }, [headingFont, bodyFont, updateHeadingFont, updateBodyFont]);

  const onSelectTheme = useCallback(
    (t: string) => {
      // Only affect the template: update template store + the scoped PreviewFrame
      setTheme(t);
      applyThemeAndResetBaseline(t);
      resetBaselineToCurrent();
    },
    [applyThemeAndResetBaseline, resetBaselineToCurrent],
  );

  return (
    <section className={`mt-10 ${className}`}>
      <div className="flex flex-col gap-5 items-center">
        <TemplatePills
          activeId={templateId}
          onSelect={setTemplateId}
          className="bg-base-200 py-5 px-3 rounded-4xl"
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

          {/* Smaller preview frame */}
          <div className=" mx-auto">
            <PreviewFrame
              theme={theme}
              className="rounded-3xl overflow-hidden"
            />
          </div>
        </div>

        {/* Stacked controls for mobile */}
        <div className="lg:hidden grid grid-cols-1 gap-2 w-full max-w-xl">
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

export default Showcase;

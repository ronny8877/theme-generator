"use client";
import React, { useEffect, useRef } from "react";
import TemplatePreview from "@/components/template-preview";

export type PreviewFrameProps = {
  theme: string; // daisyUI theme name
  className?: string;
  includeGlobals?: boolean;
  /** Optional: force a template id for this frame instead of store. */
  templateId?: string;
  /** Optional: render a specific component. Overrides templateId/store. */
  component?: React.ComponentType;
};

/**
 * A lightweight wrapper that scopes a data-theme to a container so
 * theme changes do not affect the whole app. It simply sets the attribute
 * on the container while allowing TemplatePreview to render normally.
 */
const PreviewFrame: React.FC<PreviewFrameProps> = ({
  theme,
  className = "",
  includeGlobals = false,
  templateId,
  component,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div ref={ref} className={className}>
      <div className=" origin-top h-screen md:h-[80vh] ">
        <TemplatePreview
          hideEditor
          includeGlobals={includeGlobals}
          templateId={templateId as never}
          component={component}
        />
      </div>
    </div>
  );
};

export default React.memo(PreviewFrame);

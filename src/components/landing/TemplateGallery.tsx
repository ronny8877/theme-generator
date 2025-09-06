"use client";
import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";
import TemplatePreview from "@/components/template-preview";
import { useTemplateActions } from "@/store/hooks";
import TemplateSelect from "./TemplateSelect";

const ALL_TEMPLATES = TEMPLATES_ARRAY;

export default function TemplateGallery() {
  const defaultId = useMemo(() => {
    return (
      ALL_TEMPLATES.find((t) => t.id === "landing")?.id ||
      ALL_TEMPLATES[0]?.id ||
      "landing"
    );
  }, []);
  const [active, setActive] = useState<string>(defaultId);
  const { setActiveTemplateById } = useTemplateActions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setInView] = useState(false);

  // Keep the underlying template state in sync for inline preview
  useEffect(() => {
    setActiveTemplateById(active);
  }, [active, setActiveTemplateById]);

  // Lazy render the preview when section is near viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 lg:py-14">
      <div className="flex items-center justify-between mb-6 px-4 lg:px-0 relative">
        <h2 className=" text-base md:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Browse all templates
        </h2>
        <TemplateSelect
          value={active}
          onSelect={(id) => setActive(id)}
          size="sm"
          className=" ml-5 bg-base-200 rounded-box inline-block"
          label="Template"
        />
      </div>

      {/* Preview card */}

      <div ref={containerRef}>
        <div className="rounded-3xl overflow-hidden border border-base-300 bg-base-100">
          {isInView ? (
            <Suspense fallback={<div className="w-full h-[60vh] skeleton" />}>
              <TemplatePreview hideEditor includeGlobals={false} />
            </Suspense>
          ) : (
            <div className="w-full h-[60vh] bg-base-100 flex items-center justify-center">
              <span className="loading loading-dots loading-lg" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

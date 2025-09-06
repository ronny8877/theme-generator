"use client";
import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";
import TemplatePreview from "@/components/template-preview";
import { useTemplateActions } from "@/store/hooks";

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
      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
        Browse all templates
      </h2>
      {/* Split view: sticky preview on the right; scrollable list on the left */}
      <div className="grid lg:grid-cols-[380px,1fr] gap-6 items-start">
        {/* Left: list */}
        <aside className="bg-base-200 rounded-3xl p-4 md:p-5 max-h-[80vh] overflow-y-auto">
          <ul className="space-y-2">
            {ALL_TEMPLATES.map((t) => {
              const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button
                    className={`w-full text-left flex items-start justify-between gap-3 p-3 rounded-box border transition-colors ${
                      isActive
                        ? "bg-primary/10 border-primary"
                        : "bg-base-100 border-base-300 hover:bg-base-100"
                    }`}
                    onClick={() => setActive(t.id)}
                    title={`${t.title} preview`}
                  >
                    <span>
                      <span className="block font-medium">{t.title}</span>
                      {t.description && (
                        <span className="block text-sm opacity-70">
                          {t.description}
                        </span>
                      )}
                    </span>
                    <span className="btn btn-xs rounded-box">Preview</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right: sticky preview without nested mockup chrome duplication */}
        <div className="sticky top-24">
          <div ref={containerRef} className="rounded-3xl bg-base-200 p-3 md:p-4">
            <div className="rounded-2xl overflow-hidden border border-base-300 bg-base-100">
              <div className="px-3 py-2 border-b border-base-300 flex items-center gap-2">
                <div className="badge badge-ghost">Preview</div>
                <div className="opacity-70 text-sm">{active}</div>
              </div>
              <div className="w-full">
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
          </div>
        </div>
      </div>
    </section>
  );
}

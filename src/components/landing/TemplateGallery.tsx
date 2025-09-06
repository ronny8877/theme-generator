"use client";
import React, { useMemo, useState } from "react";
import { TEMPLATES_ARRAY } from "@/lib/constants/constants";

const ALL_TEMPLATES = TEMPLATES_ARRAY;

export default function TemplateGallery() {
  const defaultId = useMemo(() => {
    return ALL_TEMPLATES.find((t) => t.id === "landing")?.id || ALL_TEMPLATES[0]?.id || "landing";
  }, []);
  const [active, setActive] = useState<string>(defaultId);

  const src = `/preview/${active}`;

  return (
    <section className="py-10 lg:py-14">
      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">Browse all templates</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: SEO-friendly list */}
        <aside className="bg-base-200 rounded-3xl p-4 md:p-5 max-h-[70vh] overflow-y-auto">
          <ul className="space-y-2">
            {ALL_TEMPLATES.map((t) => {
              const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <a
                    href={`/preview/${t.id}`}
                    className={`flex items-start justify-between gap-3 p-3 rounded-box border transition-colors ${
                      isActive ? "bg-primary/10 border-primary" : "bg-base-100 border-base-300 hover:bg-base-100"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(t.id);
                    }}
                    title={`${t.title} preview`}
                  >
                    <span>
                      <span className="block font-medium">{t.title}</span>
                      {t.description && (
                        <span className="block text-sm opacity-70">{t.description}</span>
                      )}
                    </span>
                    <span className="btn btn-xs rounded-box">Preview</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right: Embedded preview via /preview/[template] */}
        <div className="rounded-3xl bg-base-200 p-3 md:p-4">
          <div className="mockup-browser border border-base-300 bg-base-100 rounded-2xl overflow-hidden">
            <div className="mockup-browser-toolbar">
              <div className="input">{`/preview/${active}`}</div>
            </div>
            <iframe
              key={src}
              src={src}
              title={`${active} – Live preview`}
              className="w-full h-[68vh] md:h-[70vh] bg-base-100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

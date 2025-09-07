"use client";
import React from "react";
import Clock from "@/components/ui/clock";
import { Heart } from "lucide-react";

// A compact gallery of themed components to visualize current theme tokens.
export default function ComponentsGallery() {
  return (
    <div className="p-4 md:p-6 space-y-6 text-base-content">
      {/* Container-query root: fills available width from TemplatePreview */}
      <div
        className="cq-root mx-auto rounded-3xl @md:border border-base-300 bg-base-100 @md:shadow overflow-hidden @container"
        style={{ width: "100%", containerType: "inline-size" as never }}
      >
        <div className="p-6 space-y-8">
          {/* Hero / Clock */}
          <section className="grid grid-cols-1 @md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Components</h1>
              <p className="opacity-70 text-sm">
                Explore a set of UI widgets styled by your active theme. Tweak
                colors and typography to see them update live.
              </p>
              <p className="opacity-70 text-sm">
                All the components you see here are built with DaisyUI, and are
                available for free at
                <a
                  href="https://daisyui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  daisyui.com
                </a>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-neutral">Neutral</button>
                <button className="btn">Default</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow">
                <Clock size={260} className="[--thickScale:1.15]" />
              </div>
            </div>
          </section>

          {/* Buttons matrix - responsive via container queries */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold opacity-80">Buttons</h2>
            <div className="buttons-grid grid auto-rows-min gap-2">
              {[
                { label: "Default", cls: "" },
                { label: "Primary", cls: "btn-primary" },
                { label: "Secondary", cls: "btn-secondary" },
                { label: "Accent", cls: "btn-accent" },
                { label: "Info", cls: "btn-info" },
                { label: "Success", cls: "btn-success" },
                { label: "Warning", cls: "btn-warning" },
                { label: "Error", cls: "btn-error" },
              ].map((variant) => (
                <div
                  key={variant.label}
                  className="flex items-center gap-2 flex-wrap"
                >
                  <div className="w-24 text-xs opacity-60">{variant.label}</div>
                  <button className={`btn btn-lg rounded-box ${variant.cls}`}>
                    <Heart className="w-4 h-4" /> Button
                  </button>
                  <button className={`btn rounded-box ${variant.cls}`}>
                    <Heart className="w-4 h-4" /> Button
                  </button>
                  <button className={`btn btn-sm  rounded-box ${variant.cls}`}>
                    <Heart className="w-4 h-4" /> Button
                  </button>
                  <button className={`btn btn-xs rounded-box ${variant.cls}`}>
                    <Heart className="w-3 h-3" /> Button
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Cards */}
          <section className="cards grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card bg-base-100 border border-base-300 shadow-sm"
              >
                <div className="card-body">
                  <h2 className="card-title">Card {i}</h2>
                  <p className="text-sm opacity-80">
                    A simple card using base colors. Perfect for content blocks.
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm">Action</button>
                    <button className="btn btn-sm btn-primary">Primary</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Alerts & Badges */}
          <section className="alerts grid grid-cols-1 gap-6 @md:grid-cols-2">
            <div className="space-y-3">
              <div className="alert alert-info">
                <span>Info alert — theme aware.</span>
              </div>
              <div className="alert alert-success">
                <span>Success alert — nice work!</span>
              </div>
              <div className="alert alert-warning">
                <span>Warning alert — heads up.</span>
              </div>
              <div className="alert alert-error">
                <span>Error alert — something went wrong.</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-primary">Primary</div>
                <div className="badge badge-secondary">Secondary</div>
                <div className="badge badge-accent">Accent</div>
                <div className="badge badge-neutral">Neutral</div>
                <div className="badge">Default</div>
              </div>
              <div className="space-y-2">
                <progress
                  className="progress progress-primary w-full"
                  value={55}
                  max={100}
                />
                <progress
                  className="progress progress-secondary w-full"
                  value={35}
                  max={100}
                />
                <progress
                  className="progress progress-accent w-full"
                  value={75}
                  max={100}
                />
              </div>
            </div>
          </section>

          {/* Forms & Tabs */}
          <section className="forms grid grid-cols-1 gap-6 @md:grid-cols-2">
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body gap-3">
                <h3 className="card-title">Form controls</h3>
                <input
                  className="input input-bordered w-full"
                  placeholder="Text input"
                />
                <div className="flex gap-3 items-center">
                  <input type="checkbox" className="checkbox" defaultChecked />
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <input
                    type="checkbox"
                    className="checkbox checkbox-secondary"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="radio"
                    name="r"
                    className="radio"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="r"
                    className="radio radio-primary"
                  />
                  <input
                    type="radio"
                    name="r"
                    className="radio radio-secondary"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={40}
                    className="range"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={70}
                    className="range range-primary"
                  />
                </div>
                <select className="select select-bordered w-full max-w-xs">
                  <option>Selection</option>
                  <option>Alpha</option>
                  <option>Bravo</option>
                </select>
              </div>
            </div>
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body">
                <h3 className="card-title mb-2">Tabs</h3>
                <div role="tablist" className="tabs tabs-bordered">
                  <input
                    type="radio"
                    name="tabs"
                    role="tab"
                    className="tab"
                    aria-label="One"
                    defaultChecked
                  />
                  <div role="tabpanel" className="tab-content p-3">
                    Content for tab one with themed text and backgrounds.
                  </div>
                  <input
                    type="radio"
                    name="tabs"
                    role="tab"
                    className="tab"
                    aria-label="Two"
                  />
                  <div role="tabpanel" className="tab-content p-3">
                    Content for tab two — components stay in sync with theme.
                  </div>
                  <input
                    type="radio"
                    name="tabs"
                    role="tab"
                    className="tab"
                    aria-label="Three"
                  />
                  <div role="tabpanel" className="tab-content p-3">
                    Content for tab three.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Avatars & Tooltips */}
          <section className="grid grid-cols-1 gap-6">
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body gap-4">
                <h3 className="card-title">Avatars & Tooltips</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src="/logo.png" alt="avatar" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12 rounded">
                      <img src="/logo-transparent.png" alt="avatar" />
                    </div>
                  </div>
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-14">
                      <span>AB</span>
                    </div>
                  </div>
                  <div
                    className="tooltip tooltip-primary"
                    data-tip="Tooltip text"
                  >
                    <button className="btn btn-sm btn-primary">Hover me</button>
                  </div>
                  <div className="tooltip" data-tip="Neutral tooltip">
                    <span className="badge">Badge</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion (Collapse) & Timeline */}
          <section className="grid grid-cols-1 gap-6">
            <div className="grid gap-4 grid-cols-1 @md:grid-cols-2">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body gap-3">
                  <h3 className="card-title">Accordion</h3>
                  <div className="collapse collapse-arrow border border-base-300">
                    <input type="checkbox" defaultChecked />
                    <div className="collapse-title text-sm font-medium">
                      What is DaisyUI?
                    </div>
                    <div className="collapse-content text-sm opacity-80">
                      A component library for Tailwind CSS with themes and
                      utilities.
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-medium">
                      Container queries?
                    </div>
                    <div className="collapse-content text-sm opacity-80">
                      Components adapt to the container width inside this
                      preview.
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title mb-2">Timeline</h3>
                  <ul className="timeline timeline-vertical">
                    <li>
                      <div className="timeline-start">Start</div>
                      <div className="timeline-middle">
                        <div className="badge badge-primary" />
                      </div>
                      <div className="timeline-end timeline-box">
                        Initialize
                      </div>
                      <hr />
                    </li>
                    <li>
                      <hr />
                      <div className="timeline-start">Design</div>
                      <div className="timeline-middle">
                        <div className="badge badge-secondary" />
                      </div>
                      <div className="timeline-end timeline-box">
                        Components
                      </div>
                      <hr />
                    </li>
                    <li>
                      <hr />
                      <div className="timeline-start">Ship</div>
                      <div className="timeline-middle">
                        <div className="badge badge-accent" />
                      </div>
                      <div className="timeline-end timeline-box">Done</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Drawer Demo */}
          <section className="grid grid-cols-1 relative gap-6">
            <h3 className="card-title mb-2">MISC</h3>
            <div className="mockup-code w-full">
              <pre data-prefix="$">
                <code>npm i daisyui</code>
              </pre>
            </div>

            <div className="mockup-code w-full">
              <pre data-prefix="1">
                <code>npm i daisyui</code>
              </pre>
              <pre data-prefix="2">
                <code>installing...</code>
              </pre>
              <pre data-prefix="3" className="bg-warning text-warning-content">
                <code>Error!</code>
              </pre>
            </div>
          </section>

          {/* Stats, Rating & Radial progress */}
          <section className="grid grid-cols-1 gap-6">
            <div className="grid gap-6 grid-cols-1 @md:grid-cols-2">
              <div className="stats shadow bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-title">Downloads</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat">
                  <div className="stat-title">New Users</div>
                  <div className="stat-value text-primary">4,200</div>
                  <div className="stat-desc">↗︎ 40 (2%)</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Bounce Rate</div>
                  <div className="stat-value">27%</div>
                  <div className="stat-desc">↘︎ 5 (0.3%)</div>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body gap-4">
                  <h3 className="card-title">Rating & Progress</h3>
                  <div className="rating rating-md">
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                    />
                  </div>
                  <div className="flex gap-6 items-center">
                    <div
                      className="radial-progress text-primary"
                      style={{ ["--value" as unknown as string]: 70 } as never}
                    >
                      70%
                    </div>
                    <div
                      className="radial-progress text-secondary"
                      style={{ ["--value" as unknown as string]: 45 } as never}
                    >
                      45%
                    </div>
                    <div
                      className="radial-progress text-accent"
                      style={{ ["--value" as unknown as string]: 88 } as never}
                    >
                      88%
                    </div>
                  </div>
                  <div className="space-x-2 text-sm">
                    <kbd className="kbd">Ctrl</kbd>
                    <kbd className="kbd">K</kbd>
                    <span className="opacity-60">to open command palette</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="grid grid-cols-1 gap-6">
            <footer className="footer footer-center p-6 bg-base-200 rounded-2xl text-base-content">
              <aside>
                <p className="font-semibold">Theme Components</p>
                <p className="text-sm opacity-70">
                  All components are styled by your active theme.
                </p>
              </aside>
            </footer>
          </section>
        </div>
      </div>

      {/* Container query styles are provided via Tailwind's @container variants above */}
    </div>
  );
}

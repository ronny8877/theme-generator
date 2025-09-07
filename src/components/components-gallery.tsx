"use client";
import React from "react";
import Clock from "@/components/ui/clock";
import { BarChart3, Heart, MessageSquare, ShoppingBag } from "lucide-react";

// Story-driven, cohesive component showcase built with DaisyUI (on Tailwind).
export default function ComponentsGallery() {
  return (
    <div className="p-4 md:p-6 space-y-6 text-base-content">
      {/* Container-query root: fills available width from TemplatePreview */}
      <div
        className="cq-root mx-auto rounded-3xl @md:border border-base-300 bg-base-100 @md:shadow overflow-hidden @container"
        style={{ width: "100%", containerType: "inline-size" as never }}
      >
        <div className="p-6 space-y-10">
          {/* ——— Hero: what this page is ——— */}
          <section className="grid grid-cols-1 @md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-2xl font-bold">Theme Component Showcase</h1>
              <p className="opacity-70 text-sm mt-1">
                A curated walk-through of common UI patterns rendered with your
                active theme. Tweak tokens and see everything update live.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-ghost">Tailwind</span>
                <span className="badge badge-ghost">DaisyUI</span>
                <span className="badge badge-ghost">shadcn/ui</span>
                <span className="badge badge-ghost">Next.js</span>
                <span className="badge badge-ghost">Cloudflare Workers</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn btn-primary">Try primary</button>
                <button className="btn">Neutral</button>
                <button className="btn btn-ghost">Ghost</button>
                <a
                  href="https://daisyui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  Components at daisyui.com
                </a>
              </div>
              <div className="steps steps-horizontal mt-4 hidden @md:flex">
                <a className="step step-primary">Design</a>
                <a className="step step-primary">Compose</a>
                <a className="step step-primary">Preview</a>
                <a className="step">Ship</a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow">
                <Clock size={260} className="[--thickScale:1.15]" />
              </div>
            </div>
          </section>

          {/* ——— Scene 1: Messaging ——— */}
          <section className="space-y-3">
            <SectionHeader
              icon={<MessageSquare className="w-4 h-4" />}
              title="Messaging"
              subtitle="A component for everything"
            />
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
              <div className="mockup-window border bg-base-100">
                <div className="p-4 space-y-3 bg-base-200">
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full">
                        <img src="/logo.png" alt="avatar" />
                      </div>
                    </div>
                    <div className="chat-header">Leia • 12:41</div>
                    <div className="chat-bubble">
                      Hey! Theme looks great today 🔥
                    </div>
                    <div className="chat-footer opacity-60">seen</div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-image avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span>YO</span>
                      </div>
                    </div>
                    <div className="chat-header">You • 12:42</div>
                    <div className="chat-bubble chat-bubble-primary">
                      Thanks! Switched to the new accent.
                    </div>
                  </div>
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-secondary">
                      Nice. Colors update everywhere instantly.
                    </div>
                  </div>
                  <div className="mt-3 join w-full">
                    <input
                      className="input input-bordered join-item w-full"
                      placeholder="Write a message"
                    />
                    <button className="btn btn-primary join-item">Send</button>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 border border-base-300">
                <div className="card-body gap-3">
                  <p className="text-sm opacity-80">
                    Story: we start in a conversation where the new theme is
                    reviewed. Typography, spacing, and colors come from your
                    active theme tokens.
                  </p>
                  <div className="alert">
                    <div>
                      <span className="font-medium">Note</span>
                      <div className="text-sm opacity-70">
                        Chat UI and mockups are provided by DaisyUI on top of
                        Tailwind.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ——— Scene 2: Shop ——— */}
          <section className="space-y-3">
            <SectionHeader
              icon={<ShoppingBag className="w-4 h-4" />}
              title="Shop"
              subtitle="A product card with a cart and summary."
            />
            <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
              {/* Product takes two columns on md+ for balanced layout */}
              <div className="card bg-base-100 border border-base-300 @md:col-span-2">
                <figure className="bg-base-200">
                  <img
                    src="https://picscave.com/assetstore/medium/cute_maid_anime_waifu_O4GRKcDskGHwxu.jpeg"
                    alt="product"
                    className="h-48 @md:h-[40vh] w-full object-cover object-top"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Nike Shoes</h2>
                  <p className="opacity-70 text-sm">
                    Clean product card. Try switching theme to see the
                    difference.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="r1"
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="r1"
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="r1"
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="r1"
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="r1"
                        className="mask mask-star"
                      />
                    </div>
                    <span className="text-xs opacity-60">420 reviews</span>
                  </div>
                  <div className="card-actions justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">$120</span>
                      <span className="ml-2 line-through opacity-50">$150</span>
                    </div>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
              {/* Right column: stacked summary and cart */}
              <div className="@md:col-span-1 flex flex-col gap-6">
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body gap-4">
                    <h3 className="card-title">Order summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$120.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="opacity-60">Free</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$120.00</span>
                      </div>
                    </div>
                    <button className="btn btn-block">Checkout</button>
                  </div>
                </div>

                {/* New: Shopping Cart */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body gap-3">
                    <h3 className="card-title">Cart</h3>
                    <ul className="menu rounded-box bg-base-200/50 p-2">
                      <li>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-8 rounded">
                              <img src="/window.svg" alt="item" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm truncate">Window Sticker</p>
                            <p className="text-xs opacity-60">$18.00</p>
                          </div>
                          <div className="ml-auto join">
                            <button className="btn btn-xs join-item">-</button>
                            <input
                              className="input input-xs w-10 text-center join-item"
                              defaultValue={1}
                            />
                            <button className="btn btn-xs join-item">+</button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-8 rounded">
                              <img src="/logo.png" alt="item" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm truncate">Brand Tee</p>
                            <p className="text-xs opacity-60">$32.00</p>
                          </div>
                          <div className="ml-auto join">
                            <button className="btn btn-xs join-item">-</button>
                            <input
                              className="input input-xs w-10 text-center join-item"
                              defaultValue={2}
                            />
                            <button className="btn btn-xs join-item">+</button>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Promo code</span>
                      </label>
                      <div className="join">
                        <input
                          className="input input-bordered join-item w-full"
                          placeholder="SAVE20"
                        />
                        <button className="btn join-item">Apply</button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                      <span>Total</span>
                      <span className="font-semibold">$82.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ——— Scene 3: Dashboard ——— */}
          <section className="space-y-3">
            <SectionHeader
              icon={<BarChart3 className="w-4 h-4" />}
              title="Dashboard"
              subtitle="Stats, progress, and a tiny code/mock panel."
            />
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 items-stretch">
              <div className="stats shadow bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-title">Revenue</div>
                  <div className="stat-value">$32,4K</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
                <div className="stat">
                  <div className="stat-title">New Users</div>
                  <div className="stat-value text-primary">4,200</div>
                  <div className="stat-desc">↗︎ 40 (2%)</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Uptime</div>
                  <div className="stat-value text-secondary">99.9%</div>
                  <div className="stat-desc">Cloudflare edge</div>
                </div>
              </div>

              <div className="card bg-base-100 border border-base-300">
                <div className="card-body gap-4">
                  <div className="mockup-code w-full">
                    <pre data-prefix="$">
                      <code>npm i daisyui</code>
                    </pre>
                    <pre data-prefix=">">
                      <code>installing…</code>
                    </pre>
                    <pre data-prefix="✓" className="text-success">
                      <code>Done</code>
                    </pre>
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
                    <span className="opacity-60">Open command palette</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ——— Extras: Pricing ——— */}
          <section className="space-y-3">
            <SectionHeader
              title="Pricing"
              subtitle="A compact plan card with badges and CTA."
            />
            <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
              <div className="card bg-base-100 border border-base-300 @md:col-start-2">
                <div className="card-body items-start gap-4">
                  <div className="badge badge-secondary">Most popular</div>
                  <h3 className="card-title text-xl">Starter</h3>
                  <div className="text-3xl font-extrabold">
                    $20<span className="text-sm opacity-60">/mo</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• 20 tokens/day</li>
                    <li>• 10 projects</li>
                    <li>• Priority edge caching</li>
                  </ul>
                  <button className="btn btn-primary w-full">
                    Get started
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ——— Essentials: Buttons & Forms ——— */}
          <section className="grid grid-cols-1 gap-6 @md:grid-cols-2">
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body gap-3">
                <h3 className="card-title">Buttons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      className="flex items-center gap-2"
                    >
                      <div className="w-24 text-xs opacity-60">
                        {variant.label}
                      </div>
                      <button className={`btn rounded-box ${variant.cls}`}>
                        <Heart className="w-4 h-4" /> Button
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
          </section>

          {/* ——— Small bits: badges, alerts, tooltips ——— */}
          <section className="grid grid-cols-1 gap-6 @md:grid-cols-2">
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body gap-3">
                <h3 className="card-title">Badges & Progress</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-primary">Primary</div>
                  <div className="badge badge-secondary">Secondary</div>
                  <div className="badge badge-accent">Accent</div>
                  <div className="badge badge-neutral">Neutral</div>
                  <div className="badge">Default</div>
                </div>
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

            <div className="card bg-base-100 border border-base-300">
              <div className="card-body gap-4">
                <h3 className="card-title">Alerts & Tooltips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <div className="flex items-center gap-4 flex-wrap">
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
                <div className="toast">
                  <div className="alert alert-info">
                    <span>Heads up — UI powered by DaisyUI.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ——— Footer ——— */}
          <section className="grid grid-cols-1 gap-6">
            <footer className="footer items-center p-6 bg-base-200 rounded-2xl text-base-content">
              <aside className="grid-flow-col items-center">
                <p className="font-semibold">Built on Tailwind + DaisyUI</p>
                <p className="text-sm opacity-70">
                  with shadcn/ui patterns and Next.js running on the edge.
                </p>
              </aside>
              <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a
                  className="link link-hover"
                  href="https://daisyui.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  DaisyUI docs
                </a>
                <a
                  className="link link-hover"
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tailwind
                </a>
              </nav>
            </footer>
          </section>
        </div>
      </div>

      {/* Container query styles are provided via Tailwind's @container variants above */}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-base font-semibold opacity-90">{title}</h2>
      </div>
      {subtitle ? (
        <p className="text-xs opacity-60 hidden @md:block">{subtitle}</p>
      ) : null}
    </div>
  );
}

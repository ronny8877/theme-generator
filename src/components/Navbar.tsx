"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function Navbar() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storageKey = "theme";
    const stored =
      (typeof window !== "undefined" && localStorage.getItem(storageKey)) ||
      null;
    const current =
      stored || document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return (
    <div className="navbar bg-base-100 border-b border-base-300/60 sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Theme Demo
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* Theme select */}
        <label className="hidden sm:block">Theme</label>
        <select
          className="select select-bordered select-sm w-40"
          value={theme ?? "light"}
          onChange={(e) => setTheme(e.target.value)}
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {/* Quick toggle */}
        <label className="swap swap-rotate mx-2">
          <input
            aria-label="Toggle dark mode"
            type="checkbox"
            checked={
              theme === "dark" || theme === "dracula" || theme === "night"
            }
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.657A9 9 0 0018.36 6.343 7 7 0 1112 21a6.96 6.96 0 01-6.36-3.343z"></path>
          </svg>
          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5 12a7 7 0 1014 0 7 7 0 10-14 0m7-9v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
          </svg>
        </label>
      </div>
    </div>
  );
}

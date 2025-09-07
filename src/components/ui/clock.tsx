"use client";
import React, { useEffect, useRef } from "react";

type ClockProps = {
  /**
   * Overall square size for the clock. If provided, both width and height use this value.
   * Can be a number (pixels) or any CSS length/expression (e.g. "clamp(240px, 40vw, 560px)").
   */
  size?: number | string;
  /** Optional explicit width; overrides size for width only */
  width?: number | string;
  /** Optional explicit height; overrides size for height only */
  height?: number | string;
  /** Optional multiplier to make hands thicker/thinner without affecting layout */
  thicknessFactor?: number;
  className?: string;
};

export default function Clock({
  size = 200,
  width,
  height,
  thicknessFactor = 1,
  className = "",
}: ClockProps) {
  // If only width or only height is provided, mirror it so the clock stays square by default
  const finalWidth: number | string = width ?? height ?? size;
  const finalHeight: number | string = height ?? width ?? size;
  const thickScale = Math.max(0.5, Math.min(2.5, Number(thicknessFactor) || 1));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateOrbit = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const minSide = Math.min(rect.width, rect.height);
      const r = Math.max(18, minSide * 0.34);
      el.style.setProperty("--sizePx", `${Math.round(minSide)}px`);
      el.style.setProperty("--orbit", `${Math.round(r)}px`);
      // Scale clock parts relative to a design base of 260px
      const base = 260; // matches previous default visual size
      const scale = Math.max(0.5, Math.min(4, minSide / base));
      el.style.setProperty("--scale", String(scale));
    };

    const syncSecondDelay = () => {
      const el = rootRef.current;
      if (!el) return;
      const now = new Date();
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      el.style.setProperty("--sec-delay", `-${seconds}s`);
    };

    const setAngles = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const hours = (now.getHours() % 12) + minutes / 60;
      hourRef.current?.style.setProperty("--angle", `${hours * 30}deg`);
      minuteRef.current?.style.setProperty("--angle", `${minutes * 6}deg`);
    };

    updateOrbit();
    syncSecondDelay();
    setAngles();

    let resizeObs: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && rootRef.current) {
      resizeObs = new ResizeObserver(updateOrbit);
      resizeObs.observe(rootRef.current);
    } else {
      window.addEventListener("resize", updateOrbit);
    }

    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let minuteInterval: number | undefined;
    const timeout = window.setTimeout(
      () => {
        setAngles();
        minuteInterval = window.setInterval(
          setAngles,
          60 * 1000,
        ) as unknown as number;
      },
      Math.max(0, msToNextMinute),
    );

    return () => {
      resizeObs?.disconnect();
      window.clearTimeout(timeout);
      if (minuteInterval) window.clearInterval(minuteInterval);
      window.removeEventListener("resize", updateOrbit);
    };
  }, []);

  return (
    <div
      className={`clock ${className}`}
      id="analogClock"
      ref={rootRef}
      style={{
        display: "block",
        width: finalWidth,
        height: finalHeight,
        position: "relative",
        // Expose thickness scale for CSS
        // CSS custom properties are allowed on style objects via index signature
        ...{
          ["--thickScale" as unknown as string]: String(thickScale),
        },
      }}
      aria-hidden={false}
    >
      <svg
        fill="none"
        height="100%"
        viewBox="0 0 461 461"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="bgLightTint"
          clipRule="evenodd"
          fillRule="evenodd"
          d="M93.6379 63.9405C89.7543 78.4344 78.4333 89.7554 63.9394 93.639l-7.4405 1.9937c-22.4055 6.0033-35.702 29.0333-29.6984 51.4393l1.9196 7.164c3.8837 14.494-.2601 29.959-10.8704 40.569l-5.5482 5.548c-16.402 16.402-16.402 42.995 0 59.397l5.6221 5.622c10.6102 10.611 14.754 26.075 10.8704 40.569l-1.9936 7.441c-6.0036 22.405 7.2929 45.435 29.6985 51.439l7.4406 1.994c14.4939 3.883 25.8149 15.204 29.6985 29.698l1.9942 7.443c6.0038 22.405 29.0338 35.702 51.4388 29.698l7.442-1.994c14.494-3.883 29.959.26 40.569 10.871l5.271 5.271c16.402 16.402 42.995 16.402 59.397 0l5.347-5.347c10.61-10.61 26.075-14.754 40.569-10.87l7.717 2.068c22.405 6.003 45.435-7.293 51.439-29.699l1.993-7.439c3.884-14.494 15.205-25.815 29.699-29.699l7.441-1.994c22.406-6.003 35.702-29.033 29.699-51.439l-2.068-7.718c-3.884-14.493.26-29.958 10.87-40.569l5.346-5.346c16.402-16.402 16.402-42.995 0-59.397l-5.272-5.272c-10.61-10.61-14.754-26.075-10.87-40.569l1.994-7.441c6.003-22.406-7.293-45.436-29.699-51.4398l-7.441-1.9939c-14.494-3.8836-25.815-15.2046-29.699-29.6984l-1.993-7.4395c-6.004-22.4056-29.034-35.702-51.439-29.6985l-7.441 1.9937c-14.494 3.8836-29.959-.2601-40.569-10.8704l-5.623-5.6227c-16.402-16.402-42.995-16.402-59.397 0l-5.547 5.5476c-10.61 10.6102-26.075 14.754-40.569 10.8704l-7.166-1.92c-22.405-6.0036-45.435 7.2929-51.4388 29.6985l-1.9943 7.4425Z"
        ></path>
      </svg>

      <div className="sui" id="hour" ref={hourRef} />
      <div className="sui" id="second" />
      <div className="sui" id="minute" ref={minuteRef} />
    </div>
  );
}

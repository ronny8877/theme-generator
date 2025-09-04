"use client";
import { useEffect, useRef } from "react";

type Props = {
  targetSelector: string;
  variables: Record<string, string | number>;
};

export function CSSVariablesInjector({ targetSelector, variables }: Props) {
  const lastVarsRef = useRef<string>("");

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return;

    const entries = Object.entries(variables).filter(([k]) =>
      k.startsWith("--"),
    );
    const signature = JSON.stringify(entries);
    if (signature === lastVarsRef.current) return;
    lastVarsRef.current = signature;

    for (const [k, v] of entries) {
      el.style.setProperty(k, String(v));
    }
  }, [targetSelector, variables]);

  return null;
}

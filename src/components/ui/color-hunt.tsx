"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function ColorSwatch({ name, value }: { name: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div className="group rounded-xl overflow-hidden border border-base-300 bg-base-100">
      <div className="h-16 w-full" style={{ background: value }} />
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-xs font-mono truncate" title={name}>
          {name}
        </div>
        <button className="btn btn-ghost btn-xs rounded-full" onClick={copy}>
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
}

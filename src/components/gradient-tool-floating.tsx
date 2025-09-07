"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $activeAuxToolSel } from "@/store/nano-store";
import { useAppActions } from "@/store/hooks";
import GradientTool from "./gradient-tool";
import { X } from "lucide-react";

export default function GradientToolFloating() {
  const aux = useStore($activeAuxToolSel);
  const { switchTool } = useAppActions();
  const isOpen = aux === "gradient";

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    switchTool("gradient"); // toggles off
  };

  return (
    <div className="fixed left-5 top-5 z-50 h-[95vh] w-[400px] animate-in slide-in-from-left-5 duration-300 ease-out">
      <div className="h-full bg-base-100 rounded-3xl border border-base-300 shadow-xl backdrop-blur-sm relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center transition-colors"
          aria-label="Close gradient tool"
        >
          <X className="w-4 h-4" />
        </button>

        <GradientTool className="h-full" />
      </div>
    </div>
  );
}

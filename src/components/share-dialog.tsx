"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Link2, Share2, Check } from "lucide-react";
import { useActiveTemplateId } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $app } from "@/store";
import { $themeColors } from "@/store/nano-store";
import { $headingFont, $bodyFont } from "@/store/font-store";
import { buildPreviewUrl, captureCurrentState } from "@/lib/share-url";
import { toast } from "sonner";
import QR from "@/components/ui/qr";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export default function ShareDialog({ open, onOpenChange }: Props) {
  const templateId = useActiveTemplateId() || "landing";
  const app = useStore($app);
  // Track theme + fonts so URL updates when anything visual changes
  const colors = useStore($themeColors);
  const heading = useStore($headingFont);
  const body = useStore($bodyFont);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(4);

  // Start a short countdown whenever dialog opens; reveal content at 1
  useEffect(() => {
    if (!open) return;
    setCount(4);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 0) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  // Create a lightweight signature so URL regenerates on edits without
  // pulling large objects into the memo body.
  const themeSig = useMemo(
    () => JSON.stringify({ c: colors, h: heading, b: body }),
    [colors, heading, body],
  );

  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    // Reference signature to satisfy exhaustive-deps and rerun on edits
    void themeSig;
    const state = captureCurrentState(templateId, app.activePrimaryTool);
    return buildPreviewUrl(window.location.origin, state);
    // Depend on dialog open state and theme signature so a fresh link is created
    // whenever the user has edited the theme or fonts.
  }, [templateId, app.activePrimaryTool, themeSig]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      toast.success("Link copied");
    } catch {}
  };

  const webShare = async () => {
    try {
      const nav = navigator as Navigator & {
        share?: (data: { title?: string; url?: string }) => Promise<void>;
      };
      if (nav.share) {
        await nav.share({ title: "LiveTheme", url });
      } else {
        await copy();
      }
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[min(96vw,760px)] p-0 bg-base-200 border-base-300 rounded-3xl">
        <DialogHeader className="p-5 border-b border-base-300 bg-base-100 rounded-t-3xl">
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-5 grid gap-5">
            {/* Ad spot */}
            <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
              <div className="text-xs text-base-content/60 mb-2">
                Advertisement
              </div>
              <div className="h-24 rounded-xl bg-gradient-to-br from-base-200 to-base-300" />
            </section>

            {/* Unified loader: show until count reaches 0, then render link + QR */}
            {count > 0 ? (
              <div className="grid gap-4">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-6 grid place-items-center">
                  <div className="text-sm text-base-content/70">Generating</div>
                  <span
                    className="countdown font-mono text-6xl mt-2"
                    aria-live="polite"
                    aria-label={`countdown ${count}`}
                  >
                    <span
                      style={
                        { ["--value"]: count } as unknown as React.CSSProperties
                      }
                    >
                      {count}
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Link + actions */}
                <section className="rounded-2xl border border-base-300 bg-base-100 p-4 grid gap-3">
                  <div className="text-sm text-base-content/70">
                    Shareable link
                  </div>
                  <div className="flex items-center gap-2">
                    <textarea
                      className="textarea textarea-bordered w-full font-mono text-xs leading-5 resize-y min-h-10 max-h-28"
                      readOnly
                      value={url}
                    />
                    <button
                      className="btn btn-primary btn-sm rounded-full"
                      onClick={copy}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}{" "}
                      Copy
                    </button>
                    <button
                      className="btn btn-outline btn-sm rounded-full"
                      onClick={webShare}
                    >
                      <Link2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </section>

                {/* QR */}
                <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
                  <div className="text-sm text-base-content/70 mb-2">
                    QR Code
                  </div>
                  <QR url={url} />
                </section>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

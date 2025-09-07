"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Share2, Check } from "lucide-react";
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
      <DialogContent className="sm:max-w-2xl w-[min(96vw,760px)] p-0 bg-base-100 border-base-300 rounded-3xl">
        <DialogHeader className="p-5 border-b border-base-300 bg-base-100 rounded-t-3xl">
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] p-4">
          {/* Link + QR - simplified UI */}
          <section className="flex flex-nowrap flex-col">
            <div className="text-sm text-base-content/70">UwU</div>

            {/* Left: link and actions */}
            <div className="flex flex-col gap-3 p-5">
              <h3
                title={url}
                className="input text-3xl truncate input-bordered sm:max-w-xl w-[min(90vw,760px)]  font-mono whitespace-nowrap overflow-hidden"
                aria-label="Shareable link"
              >
                {" "}
                {url}
              </h3>
              <button
                className="btn btn-success btn-sm rounded-box rounded-full"
                onClick={copy}
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                className="btn btn-outline rounded-box"
                onClick={webShare}
                aria-label="Share via native"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>

            {/* Right: styled QR */}
            <div className="flex items-center justify-center">
              <QR url={url} />
            </div>
          </section>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

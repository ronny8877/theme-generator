"use client";
import React, { useMemo, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QR({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  // Pick a stable id so we can read the canvas for copy/download
  const qrId = useMemo(() => `qr-${Math.random().toString(36).slice(2)}`, []);

  const getCanvas = () => {
    const parent = containerRef.current;
    if (!parent) return null;
    return parent.querySelector("canvas") as HTMLCanvasElement | null;
  };

  const downloadPng = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "theme-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copyPng = async () => {
    try {
      setBusy(true);
      const canvas = getCanvas();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          // ClipboardItem API
          const item = new (
            window as unknown as { ClipboardItem: typeof ClipboardItem }
          ).ClipboardItem({
            "image/png": blob,
          });
          await navigator.clipboard.write([item]);
        } catch {}
      }, "image/png");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full grid place-items-center">
      <div
        ref={containerRef}
        className="rounded-xl border border-base-300 bg-base-100 p-3 grid place-items-center gap-2"
      >
        <QRCode
          value={url}
          size={320}
          id={qrId}
          eyeRadius={2}
          qrStyle="dots"
          quietZone={6}
        />
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-outline rounded-full"
            onClick={copyPng}
            disabled={busy}
          >
            Copy PNG
          </button>
          <button
            className="btn btn-xs btn-ghost rounded-full"
            onClick={downloadPng}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

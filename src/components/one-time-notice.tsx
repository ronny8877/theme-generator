"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Shows a one-time notice on first load, persisted via localStorage
export default function OneTimeNotice() {
  const STORAGE_KEY = "lt_one_time_notice_v1";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch {
      // ignore
    }
  }, []);

  const acknowledge = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : acknowledge())}
    >
      <DialogContent aria-describedby="one-time-notice-desc">
        <DialogHeader>
          <DialogTitle>UwU Heads up — we&#39;re still polishing</DialogTitle>
          <DialogDescription id="one-time-notice-desc">
            Hi! We&#39;re still building and polishing the site, so you might
            experience a few bugs or see some bigger updates soon.
          </DialogDescription>
        </DialogHeader>

        <div className="prose prose-sm max-w-none text-base-content/80">
          <p>If you encounter any bug, please reach out:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a
                href="https://x.com/its_me_roni3"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ronny8877/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@livetheme.app"
                target="_blank"
                rel="noreferrer"
              >
                contact@livetheme.app
              </a>
            </li>
          </ul>
          <p className="mt-2">This message only shows on your first visit.</p>
        </div>

        <DialogFooter>
          <button className="btn btn-primary" onClick={acknowledge}>
            Got it
          </button>
          <DialogClose className="btn">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

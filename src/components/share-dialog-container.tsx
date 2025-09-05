"use client";
import { useStore } from "@nanostores/react";
import { $shareOpen, setShareOpen } from "@/store/ui-store";
import ShareDialog from "@/components/share-dialog";

export default function ShareDialogContainer() {
  const open = useStore($shareOpen);
  return <ShareDialog open={open} onOpenChange={setShareOpen} />;
}

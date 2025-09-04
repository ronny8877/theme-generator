"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $exportOpen, setExportOpen } from "@/store/ui-store";
import { ExportDialog } from "@/components/export-dialog";

export default function ExportDialogContainer() {
  const open = useStore($exportOpen);
  return <ExportDialog open={open} onOpenChange={setExportOpen} />;
}

"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorLab from "./color-lab";
import { TailwindColors } from "./tailwind-color-select";

export function AdvancedColorPicker({
  value,
  onChange,
  title,
  description,
  open,
  onOpenChange,
}: {
  value: string;
  onChange: (hex: string) => void;
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild />
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>{title ?? "Pick color"}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <Tabs defaultValue="tw-colors">
            <TabsList className="w-full bg-base-100 rounded-full h-11 gap-2 px-1 cursor-pointer">
              <TabsTrigger
                value="tw-colors"
                className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer h-9"
              >
                Tailwind
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer h-9"
              >
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tw-colors">
              <TailwindColors
                selected={value}
                onSelect={(hex) => onChange(hex)}
              />
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <ColorLab initial={value} onChange={(v) => onChange(v.hex)} />
            </TabsContent>
          </Tabs>

          <DrawerFooter>
            <DrawerClose asChild>
              <button className="btn btn-sm rounded-full px-5">Close</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

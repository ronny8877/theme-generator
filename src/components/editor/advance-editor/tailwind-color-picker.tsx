"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { TAILWIND_COLORS } from "@/lib/constants/tailwind-colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorLab from "./color-lab";

export function TailwindColorSelect() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Tailwind colors</DrawerTitle>
            <DrawerDescription>Pick a color for base-100</DrawerDescription>
          </DrawerHeader>
          <Tabs defaultValue="tw-colors">
            <TabsList className="w-full bg-base-100 rounded-full h-12 gap-3 cursor-pointer">
              <TabsTrigger
                value="tw-colors"
                className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer"
              >
                Tailwind Colors
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer"
              >
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tw-colors">
              <TailwindColors />
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <ColorLab />
            </TabsContent>
          </Tabs>

          <DrawerFooter>
            <DrawerClose asChild>
              <button className="btn rounded-3xl w-96 mx-auto ">Close</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TailwindColors() {
  return (
    <div className="p-4 pb-0 flex flex-row gap-2 justify-center">
      {(() => {
        const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

        return (
          Object.keys(TAILWIND_COLORS) as Array<keyof typeof TAILWIND_COLORS>
        ).map((color: keyof typeof TAILWIND_COLORS) => (
          <div key={color}>
            <div className="flex flex-wrap flex-col items-center gap-1">
              {SHADE_KEYS.map((label) => {
                const shadesObj = TAILWIND_COLORS[color] as Record<
                  string | number,
                  string
                >;
                const shade = shadesObj[label];
                return (
                  <div
                    key={shade}
                    className="flex flex-col items-center text-sm"
                  >
                    <div
                      title={`${color} ${label} — ${shade}`}
                      aria-label={`${color} ${label}`}
                      className="border-base-content/10 relative grid aspect-square w-5 place-items-center rounded-full border bg-transparent select-none sm:m-px sm:w-7"
                      style={{ backgroundColor: shade }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ));
      })()}
    </div>
  );
}

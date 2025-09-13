"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import {
  $settingsOpen,
  $settingsActiveTab,
  closeSettings,
  setSettingsActiveTab,
} from "@/store/ui-store";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { X, Palette, Pipette, Blend, Info, Settings } from "lucide-react";
import { ColorLabTool } from "./tools/color-lab-tool";
import { PaletteTool } from "./tools/palette-tool";
import { GradientTool } from "./tools/gradient-tool";
import { AboutTool } from "./tools/about-tool";
import { AppSettingsTool } from "./tools/app-settings-tool";

const tabs = [
  {
    id: "color-lab" as const,
    label: "Color Lab",
    icon: Pipette,
    description: "Convert colors and analyze properties",
  },
  {
    id: "palette" as const,
    label: "Palette",
    icon: Palette,
    description: "Generate and manage color palettes",
  },
  {
    id: "gradient" as const,
    label: "Gradient",
    icon: Blend,
    description: "Create beautiful gradients",
  },
  {
    id: "app-settings" as const,
    label: "App Settings",
    icon: Settings,
    description: "Configure app theme and preferences",
  },
  {
    id: "about" as const,
    label: "About",
    icon: Info,
    description: "Learn more about this app",
  },
];

export function SettingsDialog() {
  const isOpen = useStore($settingsOpen);
  const activeTab = useStore($settingsActiveTab);
  const isDesktop = useIsDesktop();

  const handleTabChange = (value: string) => {
    setSettingsActiveTab(value as typeof activeTab);
  };

  const handleClose = () => {
    closeSettings();
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">Design Tools</h2>
          <p className="text-sm text-muted-foreground">
            Professional color and design utilities
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-5 m-4 mb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="color-lab" className="h-full m-0 p-4">
            <ColorLabTool />
          </TabsContent>

          <TabsContent value="palette" className="h-full m-0 p-4">
            <PaletteTool />
          </TabsContent>

          <TabsContent value="gradient" className="h-full m-0 p-4">
            <GradientTool />
          </TabsContent>

          <TabsContent value="app-settings" className="h-full m-0 p-4">
            <AppSettingsTool />
          </TabsContent>

          <TabsContent value="about" className="h-full m-0 p-4">
            <AboutTool />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="h-[90vh]">{content}</DrawerContent>
    </Drawer>
  );
}

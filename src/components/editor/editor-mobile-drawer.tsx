import React from "react";
import { useStore } from "@nanostores/react";
import { $isEditorOpen } from "@/store";
import { editEditorSettings } from "@/store/nano-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ThemeList from "./theme-list";
import { FontEditor } from "./fonts-editor";
import { ScrollArea } from "../ui/scroll-area";
import { $activeEditorTab } from "@/store";
import { useAppActions } from "../../store/hooks";
import { ThemeCreator } from "./advance-editor/theme-creator";
import { Share2, Code2, X, Settings, Type, Palette } from "lucide-react";
import { openExport } from "@/store/ui-store";

export function EditorMobileDrawer() {
  const isEditorOpen = useStore($isEditorOpen);
  const activeTab = useStore($activeEditorTab);
  const { setActiveEditorTab } = useAppActions();

  const handleTabChange = (value: string) => {
    setActiveEditorTab(value as "themes" | "fonts" | "advanced");
  };

  const closeEditor = () => {
    editEditorSettings({ is_open: false });
  };

  const tabConfig = [
    { value: "themes", label: "Themes", icon: <Palette className="w-4 h-4" /> },
    {
      value: "advanced",
      label: "Advanced",
      icon: <Settings className="w-4 h-4" />,
    },
    { value: "fonts", label: "Fonts", icon: <Type className="w-4 h-4" /> },
  ];

  return (
    <Drawer
      open={isEditorOpen}
      onOpenChange={(open) => editEditorSettings({ is_open: open })}
      direction="bottom"
    >
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">
              Theme Editor
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                className="btn btn-sm btn-ghost btn-circle"
                onClick={closeEditor}
              >
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full bg-base-100 rounded-full h-14 gap-1 mb-4 p-1">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full data-[state=active]:bg-base-200 data-[state=active]:shadow-sm shadow-none flex-1 flex-col py-2 px-3 gap-1"
                >
                  {tab.icon}
                  <span className="text-xs font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Main scrollable area - optimized for mobile */}
            <ScrollArea className="h-[45vh] mb-4">
              <TabsContent value="themes" className="mt-0">
                <ThemeList />
              </TabsContent>
              <TabsContent value="advanced" className="mt-0">
                <ThemeCreator />
              </TabsContent>
              <TabsContent value="fonts" className="mt-0">
                <FontEditor />
              </TabsContent>
            </ScrollArea>

            {/* Compact footer actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                className="btn btn-lg flex-1 rounded-full px-4 bg-base-200 hover:bg-base-300 border border-base-300 min-h-12"
                onClick={async () => {
                  const { openShare } = await import("@/store/ui-store");
                  openShare();
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </span>
              </button>
              <button
                className="btn btn-lg flex-1 rounded-full px-4 btn-primary text-primary-content min-h-12"
                onClick={() => openExport()}
              >
                <span className="inline-flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </span>
              </button>
            </div>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default React.memo(EditorMobileDrawer);

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EditorHeader } from "./header";
import ThemeList from "./theme-list";
import { FontEditor } from "./fonts-editor";
import { ScrollArea } from "../ui/scroll-area";
import { useActiveEditorTab, observer } from "@/store";
import { useAppActions } from "../../store/mst-hooks";
import { ThemeCreator } from "./advance-editor/theme-creator";
import { Share2, Code2 } from "lucide-react";
import { useState } from "react";
import { ExportDialog } from "@/components/export-dialog";

export default observer(function Editor() {
  const [exportOpen, setExportOpen] = useState(false);
  const activeTab = useActiveEditorTab();
  const { setActiveEditorTab } = useAppActions();

  const handleTabChange = (value: string) => {
    setActiveEditorTab(value as "themes" | "fonts" | "advanced");
  };

  return (
    <div className="w-[400px] h-full rounded-4xl p-3 bg-base-300">
      <EditorHeader />
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mt-3"
      >
        <TabsList className="w-full bg-base-100 rounded-full h-12 gap-3 cursor-pointer">
          <TabsTrigger
            value="themes"
            className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer"
          >
            Theme
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer"
          >
            Advanced
          </TabsTrigger>
          <TabsTrigger
            value="fonts"
            className="rounded-full data-[state=active]:bg-base-200 shadow-none cursor-pointer"
          >
            Fonts
          </TabsTrigger>
        </TabsList>

        {/* Main scrollable area */}
        <ScrollArea className="h-[74vh]">
          <TabsContent value="themes">
            <ThemeList />
          </TabsContent>
          <TabsContent value="advanced">
            <ThemeCreator />
          </TabsContent>
          <TabsContent value="fonts" className="mt-4">
            <FontEditor />
          </TabsContent>
        </ScrollArea>

        {/* Footer actions under scroller, visible for all tabs */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <button className="btn btn-sm rounded-full px-4 bg-base-200 hover:bg-base-300 border border-base-300">
            <span className="inline-flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </span>
          </button>
          <button
            className="btn btn-sm rounded-full px-4 btn-primary text-primary-content"
            onClick={() => setExportOpen(true)}
          >
            <span className="inline-flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Export
            </span>
          </button>
        </div>
      </Tabs>
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
});

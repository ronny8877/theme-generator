import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EditorHeader } from "./header";
import ThemeList from "./theme-list";
import { FontEditor } from "./fonts-editor";
import { ScrollArea } from "../ui/scroll-area";
import { useStore } from "@nanostores/react";
import { $app } from "../../store";
import { useAppActions } from "../../store/hooks";
import { ThemeCreator } from "./advance-editor/theme-creator";

export default function Editor() {
  const appStore = useStore($app);
  const { setActiveEditorTab } = useAppActions();

  const handleTabChange = (value: string) => {
    setActiveEditorTab(value as "themes" | "fonts" | "advanced");
  };

  return (
    <div className="w-[400px] h-full rounded-4xl p-3 bg-base-300">
      <EditorHeader />
      <Tabs
        value={appStore.activeEditorTab}
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

        <ScrollArea className="h-[82vh]   ">
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
      </Tabs>
    </div>
  );
}

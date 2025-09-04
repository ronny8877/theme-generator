import { Component, Dices, Laptop, PaintRoller, Text } from "lucide-react";
import React from "react";
import { useTemplateActions, useRootActions, IThemeConfig, observer } from "@/store";
import { Dock, DockIcon, DockItem, DockLabel } from "@/ui/dock";
import { THEMES } from "@/lib/constants";

const data = [
  {
    title: "Web / Apps",
    icon: <Laptop className="h-full w-full text-base-content" />,
    tool: "website" as const,
  },
  {
    title: "Components",
    icon: <Component className="h-full w-full text-base-content" />,
    tool: "app" as const,
  },
  // {
  //   title: "Poster",
  //   //THIS IS NOT IMAGE DUMABSSAA>???>>> TF IS THIS LINTING
  //   // eslint-disable-next-line jsx-a11y/alt-text
  //   icon: <Image className="h-full w-full text-base-content" />,
  //   tool: "poster" as const,
  // },
  {
    title: "Typography",
    icon: <Text className="h-full w-full text-base-content" />,
    tool: "typography" as const,
  },
  {
    title: "Gradient",
    icon: <PaintRoller className="h-full w-full text-base-content" />,
    tool: "gradient" as const,
  },

  {
    title: "Randomize",
    icon: <Dices className="h-full w-full text-base-content" />,
    tool: "randomize" as const,
  }, // Surprise me button
];

export const ToolSelect = observer(function ToolSelect() {
  console.log("🚀 ToolSelect component rendered");
  const { switchTool } = useRootActions();
  const { setActiveTheme } = useTemplateActions();

  const handleToolClick = (tool: (typeof data)[0]["tool"]) => {
    console.log("🎯 Tool clicked:", tool);
    if (tool === "randomize") {
      console.log("🎲 Randomize button clicked!");
      const allThemes: IThemeConfig[] = [...THEMES];
      console.log("🎨 All themes:", allThemes.length, allThemes.map(t => t.name));
      if (allThemes.length === 0) {
        console.error("❌ No themes available!");
        return;
      }
      const idx = Math.floor(Math.random() * allThemes.length);
      const t = allThemes[idx];
      console.log("✨ Selected random theme:", t.name, "at index:", idx);
      try {
        setActiveTheme(t.name); // Use name instead of the whole object
        console.log("✅ Theme set successfully!");
      } catch (error) {
        console.error("💥 Error setting theme:", error);
      }
    } else {
      console.log("🔧 Switching to tool:", tool);
      switchTool(tool);
    }
  };

  return (
    <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3 bg-base-300 rounded-full">
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full bg-gray-200 cursor-pointer dark:bg-neutral-800"
            onClick={() => handleToolClick(item.tool)}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
});

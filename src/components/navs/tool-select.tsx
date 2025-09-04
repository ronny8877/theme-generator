import { Component, Dices, Laptop, PaintRoller, Text } from "lucide-react";
import { useAppActions } from "@/store/hooks";
import { Dock, DockIcon, DockItem, DockLabel } from "@/ui/dock";
import { THEMES } from "@/lib/constants";
import { setActiveThemeConfig, ThemeConfig } from "@/store";

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
  },

];

export function ToolSelect() {
  const { switchTool } = useAppActions();

  const handleToolClick = (tool: (typeof data)[0]["tool"]) => {
    if(tool === "randomize")  {
            const allThemes: ThemeConfig[] = [...THEMES];
            if (allThemes.length === 0) return;
            const idx = Math.floor(Math.random() * allThemes.length);
            const t = allThemes[idx];
            setActiveThemeConfig(t);
          
    } else 
    switchTool(tool);
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
}

import {
  Component,
  Image,
  Laptop,
  PaintRoller,
  SunMoon,
  Text,
} from "lucide-react";
import { useStore } from "@nanostores/react";
import { $app } from "@/store/nano-store";
import { useAppActions } from "@/store/hooks";
import { Dock, DockIcon, DockItem, DockLabel } from "@/ui/dock";

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
  {
    title: "Poster",
    icon: <Image className="h-full w-full text-base-content" />,
    tool: "poster" as const,
  },
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
];

export function ToolSelect() {
  const appStore = useStore($app);
  const { switchTool } = useAppActions();

  const handleToolClick = (tool: (typeof data)[0]["tool"]) => {
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

import {
  Component,
  Image,
  Laptop,
  PaintRoller,
  SunMoon,
  Text,
} from "lucide-react";

import { Dock, DockIcon, DockItem, DockLabel } from "@/ui/dock";

const data = [
  {
    title: "Web / Apps",
    icon: <Laptop className="h-full w-full text-base-content" />,
    href: "#",
  },
  {
    title: "Poster",
    icon: <Image className="h-full w-full text-base-content" />,
    href: "#",
  },
  {
    title: "Typeography",
    icon: <Text className="h-full w-full text-base-content" />,
    href: "#",
  },
  {
    title: "Gradient",
    icon: <PaintRoller className="h-full w-full text-base-content" />,
    href: "#",
  },
  {
    title: "Componentss",
    icon: <Component className="h-full w-full text-base-content" />,
    href: "#",
  },
];

export function ToolSelect() {
  return (
    <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3 bg-base-300 rounded-full">
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full bg-base-200 cursor-pointer"
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}

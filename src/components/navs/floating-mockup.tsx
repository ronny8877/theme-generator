import {
  Activity,
  Component,
  HomeIcon,
  Image,
  LaptopMinimal,
  Mail,
  Package,
  PaintRoller,
  Phone,
  ScrollText,
  Smartphone,
  SunMoon,
  Text,
} from "lucide-react";

import { Dock, DockIcon, DockItem, DockLabel } from "@/ui/dock";

const data = [
  {
    title: "Website",
    icon: <LaptopMinimal className="h-full w-full text-base-content" />,
    href: "#",
  },
  {
    title: "Apps",
    icon: <Smartphone className="h-full w-full text-base-content" />,
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
    title: "Theme",
    icon: <SunMoon className="h-full w-full text-base-content" />,
    href: "#",
  },
];

export function AppleStyleDock() {
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

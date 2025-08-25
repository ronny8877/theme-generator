import { useState } from "react";
import { Palette, Monitor, Tablet, Smartphone } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { BlogPost, BlogLanding } from "@/templates/blog";
import { observer } from "mobx-react-lite";
import { useAppStore } from "@/store/hooks";
interface TemplatePreviewProps {
  template: React.ComponentType<any>;
  templateName: string;
  description?: string;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

const templates = [
  {
    id: "blog-post",
    name: "Blog Post",
    description:
      "A detailed blog post layout with header, content, interactions, and suggested articles",
    component: BlogPost,
  },
  {
    id: "blog-landing",
    name: "Blog Landing Page",
    description:
      "A complete blog homepage with featured posts, recent articles, trending content, and newsletter signup",
    component: BlogLanding,
  },
];

function TemplatePreview() {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [selectedColorScheme, setSelectedColorScheme] = useState("default");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[1]);

  const store = useAppStore();

  // Color schemes - similar to DaisyUI themes
  const colorSchemes = {
    default: {
      name: "Default",
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        accent: "#f59e0b",
        background: "#ffffff",
        surface: "#f8fafc",
        text: "#1e293b",
        textSecondary: "#64748b",
      },
    },
    dark: {
      name: "Dark",
      colors: {
        primary: "#60a5fa",
        secondary: "#94a3b8",
        accent: "#fbbf24",
        background: "#0f172a",
        surface: "#1e293b",
        text: "#f1f5f9",
        textSecondary: "#94a3b8",
      },
    },
    purple: {
      name: "Purple",
      colors: {
        primary: "#8b5cf6",
        secondary: "#64748b",
        accent: "#06b6d4",
        background: "#ffffff",
        surface: "#faf5ff",
        text: "#1e293b",
        textSecondary: "#64748b",
      },
    },
    green: {
      name: "Green",
      colors: {
        primary: "#10b981",
        secondary: "#64748b",
        accent: "#f59e0b",
        background: "#ffffff",
        surface: "#f0fdf4",
        text: "#1e293b",
        textSecondary: "#64748b",
      },
    },
    rose: {
      name: "Rose",
      colors: {
        primary: "#f43f5e",
        secondary: "#64748b",
        accent: "#8b5cf6",
        background: "#ffffff",
        surface: "#fdf2f8",
        text: "#1e293b",
        textSecondary: "#64748b",
      },
    },
  };

  const getViewportClasses = () => {
    switch (store.activePreviewDevice) {
      case "mobile":
        return "w-[430px] h-[900px]";
      case "tablet":
        return "w-[768px] h-full";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="h-full flex items-center justify-center  p-5">
      <div
        className={`${getViewportClasses()} bg-white rounded-4xl shadow-lg overflow-hidden transition-all duration-400`}
        style={{
          transform:
            viewport === "mobile"
              ? "scale(0.8)"
              : viewport === "tablet"
                ? "scale(0.7)"
                : "scale(1)",
          transformOrigin: "center",
        }}
      >
        <ScrollArea className="w-full h-full ">
          <selectedTemplate.component colors={colorSchemes["rose"].colors} />
        </ScrollArea>
      </div>
    </div>
  );
}

export default observer(TemplatePreview);

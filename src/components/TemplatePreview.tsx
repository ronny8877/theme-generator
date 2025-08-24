import { useState } from "react";
import { Palette, Monitor, Tablet, Smartphone } from "lucide-react";

interface TemplatePreviewProps {
  template: React.ComponentType<any>;
  templateName: string;
  description?: string;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export default function TemplatePreview({
  template: Template,
  templateName,
  description,
}: TemplatePreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [selectedColorScheme, setSelectedColorScheme] = useState("default");

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
    switch (viewport) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full h-full";
    }
  };

  const getViewportIcon = (size: ViewportSize) => {
    switch (size) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {templateName}
            </h1>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Color Scheme Selector */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-500" />
              <select
                value={selectedColorScheme}
                onChange={(e) => setSelectedColorScheme(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <option key={key} value={key}>
                    {scheme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Viewport Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {(["desktop", "tablet", "mobile"] as ViewportSize[]).map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => setViewport(size)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewport === size
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getViewportIcon(size)}
                      <span className="capitalize">{size}</span>
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Color Palette:
          </span>
          <div className="flex gap-1">
            {Object.entries(
              colorSchemes[selectedColorScheme as keyof typeof colorSchemes]
                .colors,
            ).map(([key, color]) => (
              <div
                key={key}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <div
            className={`${getViewportClasses()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
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
            <div className="w-full h-full overflow-auto">
              <Template
                colors={
                  colorSchemes[selectedColorScheme as keyof typeof colorSchemes]
                    .colors
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            Template: <span className="font-medium">{templateName}</span>
          </div>
          <div>
            Theme:{" "}
            <span className="font-medium">
              {
                colorSchemes[selectedColorScheme as keyof typeof colorSchemes]
                  .name
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

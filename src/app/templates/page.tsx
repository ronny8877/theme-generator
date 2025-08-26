"use client";
import TemplatePreview from "@/components/TemplatePreview";
import { ToolSelect } from "@/components/navs/floating-mockup";
import { StoreProvider } from "@/store/hooks";
import TemplateSelect from "@/components/navs/templateSelect";
import DeviceSelect from "@/components/navs/device-select";
import FloatingThemeSelector from "@/components/navs/app-theme";
import {
  FloatingSelect,
  SelectOption,
  SelectSection,
} from "@/components/ui/floating-select";
import { useState } from "react";

const sampleOptions: SelectOption[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    image: "/dashboard-icon.png",
    description: "Main overview page",
  },
  {
    id: "analytics",
    title: "Analytics",
    image: "/analytics-chart-icon.png",
    description: "View your statistics",
  },
];

const sampleSections: SelectSection[] = [
  {
    title: "Navigation",
    options: [
      {
        id: "home",
        title: "Home",
        image: "/home-icon.png",
        description: "Go to homepage",
      },
      {
        id: "profile",
        title: "Profile",
        image: "/user-profile-icon.png",
        description: "Manage your profile",
      },
      {
        id: "settings",
        title: "Settings",
        image: "/settings-gear-icon.png",
        description: "Configure preferences",
      },
    ],
  },
  {
    title: "Tools",
    options: [
      {
        id: "calculator",
        title: "Calculator",
        image: "/calculator-icon.png",
        description: "Perform calculations",
      },
      {
        id: "calendar",
        title: "Calendar",
        image: "/calendar-icon.png",
        description: "View your schedule",
      },
      {
        id: "notes",
        title: "Notes",
        image: "/notes-document-icon.png",
        description: "Take quick notes",
      },
    ],
  },
];
export default function () {
  const [selectedValue, setSelectedValue] = useState<string>("dashboard");

  return (
    <>
      <StoreProvider>
        <FloatingSelect
          options={sampleOptions}
          sections={sampleSections}
          value={selectedValue}
          onValueChange={setSelectedValue}
          placeholder="Choose an option"
        />
        <DeviceSelect />
        <TemplateSelect />
        <div className="h-screen flex">
          {/* Template Preview */}
          <div className="flex-1">
            <TemplatePreview />
          </div>
        </div>
        <ToolSelect />
        <FloatingThemeSelector />
      </StoreProvider>
    </>
  );
}

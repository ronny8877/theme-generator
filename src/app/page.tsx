import { AppleStyleDock } from "@/components/navs/floating-mockup";
import TemplateSelect from "@/components/navs/templateSelect";
import FloatingThemeSelector from "@/components/navs/app-theme";

export default function Home() {
  return (
    <>
      <TemplateSelect />

      <AppleStyleDock />
      <FloatingThemeSelector />
    </>
  );
}

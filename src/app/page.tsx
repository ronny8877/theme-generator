import { ToolSelect } from "@/components/navs/tool-select";
import TemplateSelect from "@/components/navs/template-select";
import FloatingThemeSelector from "@/components/navs/app-theme";
import ThemeInfo from "@/components/navs/theme-info";

export default function Home() {
  return (
    <>
      <ThemeInfo />
      <TemplateSelect />

      <ToolSelect />
      <FloatingThemeSelector />
    </>
  );
}

import { ToolSelect } from "@/components/navs/tool-select";
import TemplateSelect from "@/components/navs/template-select";
import FloatingThemeSelector from "@/components/navs/app-theme";

export default function Home() {
  return (
    <>
      <TemplateSelect />

      <ToolSelect />
      <FloatingThemeSelector />
    </>
  );
}

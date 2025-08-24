import { AppleStyleDock } from "@/components/navs/floating-mockup";
import TemplateSelect from "@/components/navs/templateSelect";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <TemplateSelect />

      <AppleStyleDock />
    </>
  );
}

"use client";

import { HeadingFontCard } from "./heading-font-card";
import { BodyFontCard } from "./body-font-card";
import { GlobalSettingsCard } from "./global-settings-card";

export const FontEditor = () => {
  return (
    <div className="space-y-6">
      <HeadingFontCard />
      <BodyFontCard />
      <GlobalSettingsCard />
    </div>
  );
};

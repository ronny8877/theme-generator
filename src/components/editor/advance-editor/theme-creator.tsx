"use client";

import * as React from "react";
import { useActiveTheme, useTemplateActions, observer } from "@/store";

export const ThemeCreator = observer(() => {
  const theme = useActiveTheme();
  const { saveCurrentThemeAs } = useTemplateActions();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Advanced Theme Creator</h3>
      <div className="space-y-4">
        <p className="text-sm text-base-content/70">
          Advanced theme creation functionality will be restored in the next
          update.
        </p>
        <div className="p-3 bg-base-200 rounded-lg">
          <p className="text-sm">
            <strong>Current theme:</strong> {theme.name}
          </p>
          <p className="text-sm">
            <strong>ID:</strong> {theme.id}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => saveCurrentThemeAs()}
        >
          Save Current Theme
        </button>
      </div>
    </div>
  );
});

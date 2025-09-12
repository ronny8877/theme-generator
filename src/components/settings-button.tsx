"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { openSettings } from '@/store/ui-store';
import { Settings } from 'lucide-react';

export function SettingsButton() {
  const handleOpenSettings = () => {
    openSettings();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleOpenSettings}
      className="h-10 w-10 p-0"
      title="Design Tools"
    >
      <Settings className="h-4 w-4" />
    </Button>
  );
}
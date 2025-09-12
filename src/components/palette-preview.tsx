"use client";

import React from 'react';
import { PaletteColor } from '@/lib/palette-utils';

interface PalettePreviewProps {
  colors: PaletteColor[];
  mockupType: 'website' | 'card' | 'dashboard' | 'mobile';
}

export function PalettePreview({ colors, mockupType }: PalettePreviewProps) {
  if (colors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-base-200 rounded-2xl">
        <p className="text-base-content/50">No colors to preview</p>
      </div>
    );
  }

  const primary = colors[0]?.hex || '#3B82F6';
  const secondary = colors[1]?.hex || '#64748B';
  const accent = colors[2]?.hex || '#F59E0B';
  const background = colors[colors.length - 1]?.hex || '#FFFFFF';
  const text = getContrastingColor(background);

  switch (mockupType) {
    case 'website':
      return <WebsiteMockup primary={primary} secondary={secondary} accent={accent} background={background} text={text} />;
    case 'card':
      return <CardMockup primary={primary} secondary={secondary} accent={accent} background={background} text={text} />;
    case 'dashboard':
      return <DashboardMockup primary={primary} secondary={secondary} accent={accent} background={background} text={text} />;
    case 'mobile':
      return <MobileMockup primary={primary} secondary={secondary} accent={accent} background={background} text={text} />;
    default:
      return <WebsiteMockup primary={primary} secondary={secondary} accent={accent} background={background} text={text} />;
  }
}

interface MockupProps {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

function WebsiteMockup({ primary, secondary, accent, background, text }: MockupProps) {
  return (
    <div 
      className="w-full h-64 rounded-2xl p-6 shadow-lg overflow-hidden"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div 
          className="px-4 py-2 rounded-lg font-bold text-white"
          style={{ backgroundColor: primary }}
        >
          LOGO
        </div>
        <div className="flex gap-3">
          <div className="w-16 h-2 rounded" style={{ backgroundColor: secondary, opacity: 0.6 }} />
          <div className="w-16 h-2 rounded" style={{ backgroundColor: secondary, opacity: 0.6 }} />
          <div className="w-16 h-2 rounded" style={{ backgroundColor: secondary, opacity: 0.6 }} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-6">
        <div className="w-32 h-3 rounded mb-2" style={{ backgroundColor: text, opacity: 0.8 }} />
        <div className="w-48 h-2 rounded mb-4" style={{ backgroundColor: text, opacity: 0.5 }} />
        <div 
          className="inline-block px-4 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: accent }}
        >
          Call to Action
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="p-3 rounded-lg"
            style={{ backgroundColor: secondary, opacity: 0.1 }}
          >
            <div className="w-full h-2 rounded mb-2" style={{ backgroundColor: primary, opacity: 0.7 }} />
            <div className="w-3/4 h-1 rounded" style={{ backgroundColor: text, opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardMockup({ primary, secondary, accent, background, text }: MockupProps) {
  return (
    <div className="flex justify-center items-center h-64 p-6" style={{ backgroundColor: secondary, opacity: 0.1 }}>
      <div 
        className="w-64 h-48 rounded-2xl p-6 shadow-xl"
        style={{ backgroundColor: background, color: text }}
      >
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: primary }}
          />
          <div 
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            FEATURED
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-24 h-3 rounded mb-2" style={{ backgroundColor: text, opacity: 0.8 }} />
          <div className="w-32 h-2 rounded mb-1" style={{ backgroundColor: text, opacity: 0.5 }} />
          <div className="w-28 h-2 rounded" style={{ backgroundColor: text, opacity: 0.3 }} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="w-16 h-6 rounded" style={{ backgroundColor: secondary, opacity: 0.8 }} />
          <div 
            className="w-16 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: primary }}
          >
            ACTION
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup({ primary, secondary, accent, background, text }: MockupProps) {
  return (
    <div 
      className="w-full h-64 rounded-2xl p-4 shadow-lg"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Sidebar */}
      <div className="flex h-full gap-4">
        <div 
          className="w-16 rounded-lg p-2"
          style={{ backgroundColor: primary, opacity: 0.1 }}
        >
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: i === 1 ? primary : secondary, opacity: i === 1 ? 1 : 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-24 h-3 rounded" style={{ backgroundColor: text, opacity: 0.8 }} />
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: secondary, opacity: 0.5 }} />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[primary, accent, secondary].map((color, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg"
                style={{ backgroundColor: color, opacity: 0.1 }}
              >
                <div className="w-12 h-2 rounded mb-2" style={{ backgroundColor: color }} />
                <div className="w-8 h-3 rounded" style={{ backgroundColor: text, opacity: 0.6 }} />
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div 
            className="h-20 rounded-lg p-3"
            style={{ backgroundColor: secondary, opacity: 0.1 }}
          >
            <div className="flex items-end justify-between h-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className="w-3 rounded-t"
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`,
                    backgroundColor: i % 2 === 0 ? primary : accent,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup({ primary, secondary, accent, background, text }: MockupProps) {
  return (
    <div className="flex justify-center items-center h-64 p-6">
      <div 
        className="w-40 h-56 rounded-3xl p-4 shadow-xl relative overflow-hidden"
        style={{ backgroundColor: background, color: text }}
      >
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-xs">
          <div className="w-8 h-1 rounded" style={{ backgroundColor: text, opacity: 0.6 }} />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: text, opacity: 0.6 }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: text, opacity: 0.6 }} />
            <div className="w-3 h-1 rounded" style={{ backgroundColor: text, opacity: 0.6 }} />
          </div>
        </div>

        {/* Header */}
        <div 
          className="h-12 rounded-2xl mb-4 flex items-center justify-between px-4"
          style={{ backgroundColor: primary }}
        >
          <div className="w-6 h-6 rounded-full bg-white opacity-80" />
          <div className="w-16 h-2 rounded bg-white opacity-80" />
          <div className="w-6 h-6 rounded-full bg-white opacity-80" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="flex items-center gap-3 p-2 rounded-xl"
              style={{ backgroundColor: secondary, opacity: 0.1 }}
            >
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: accent, opacity: 0.8 }}
              />
              <div className="flex-1">
                <div className="w-16 h-1 rounded mb-1" style={{ backgroundColor: text, opacity: 0.6 }} />
                <div className="w-12 h-1 rounded" style={{ backgroundColor: text, opacity: 0.4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div 
          className="absolute bottom-4 left-4 right-4 h-8 rounded-xl flex items-center justify-around"
          style={{ backgroundColor: secondary, opacity: 0.2 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="w-4 h-4 rounded"
              style={{ backgroundColor: i === 2 ? primary : text, opacity: i === 2 ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function getContrastingColor(backgroundColor: string): string {
  // Simple check for light vs dark background
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
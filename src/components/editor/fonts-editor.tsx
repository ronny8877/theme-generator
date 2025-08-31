"use client";

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { 
  $fontStore, 
  $headingFont, 
  $bodyFont, 
  $fontOverrides,
  updateHeadingFont, 
  updateBodyFont, 
  updateFontOverrides,
  loadGoogleFont,
  GOOGLE_FONTS,
  FONT_SIZES,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  getFontWeights
} from "@/store/font-store";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FontSelector = ({ value, onChange, isOpen, onToggle }: FontSelectorProps) => {
  const handleFontSelect = async (fontFamily: string) => {
    try {
      await loadGoogleFont(fontFamily);
      onChange(fontFamily);
      onToggle();
    } catch (error) {
      console.error("Failed to load font:", error);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={onToggle}
        className="w-full justify-between text-left font-normal h-10 px-3 rounded-xl bg-base-100 border-base-300 hover:bg-base-200"
      >
        <span style={{ fontFamily: `"${value}", sans-serif` }}>{value}</span>
        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <ScrollArea className="h-60">
            <div className="p-2">
              {GOOGLE_FONTS.map((font) => (
                <button
                  key={font.family}
                  onClick={() => handleFontSelect(font.family)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg hover:bg-base-200 transition-colors",
                    value === font.family && "bg-base-200"
                  )}
                  style={{ fontFamily: `"${font.family}", sans-serif` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{font.family}</span>
                    <span className="text-xs text-base-content/60 capitalize">{font.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const Select = ({ value, onChange, options, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between text-left font-normal h-10 px-3 rounded-xl bg-base-100 border-base-300 hover:bg-base-200"
      >
        <span>{options.find(opt => opt.value === value)?.label || placeholder}</span>
        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg max-h-40 overflow-hidden">
          <ScrollArea className="h-40">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg hover:bg-base-200 transition-colors",
                    value === option.value && "bg-base-200"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
}

const Input = ({ value, onChange, placeholder, suffix }: InputProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 pr-8 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-base-content/60">
          {suffix}
        </span>
      )}
    </div>
  );
};

export const FontEditor = () => {
  const headingFont = useStore($headingFont);
  const bodyFont = useStore($bodyFont);
  const fontOverrides = useStore($fontOverrides);
  
  const [headingFontOpen, setHeadingFontOpen] = useState(false);
  const [bodyFontOpen, setBodyFontOpen] = useState(false);

  const headingWeights = getFontWeights(headingFont.family).map(weight => ({
    label: weight,
    value: weight
  }));

  const bodyWeights = getFontWeights(bodyFont.family).map(weight => ({
    label: weight,
    value: weight
  }));

  return (
    <div className="space-y-6">
      {/* Heading Font Card */}
      <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-base-content">Heading Font</h3>
            <p className="text-sm text-base-content/60">Configure heading typography</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">Font Family</label>
            <FontSelector
              value={headingFont.family}
              onChange={(family) => updateHeadingFont({ family })}
              isOpen={headingFontOpen}
              onToggle={() => setHeadingFontOpen(!headingFontOpen)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Weight</label>
              <Select
                value={headingFont.weight}
                onChange={(weight) => updateHeadingFont({ weight })}
                options={headingWeights}
                placeholder="Select weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Size</label>
              <Select
                value={headingFont.size}
                onChange={(size) => updateHeadingFont({ size })}
                options={FONT_SIZES}
                placeholder="Select size"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Line Height</label>
              <Select
                value={headingFont.lineHeight}
                onChange={(lineHeight) => updateHeadingFont({ lineHeight })}
                options={LINE_HEIGHTS}
                placeholder="Select line height"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Letter Spacing</label>
              <Select
                value={headingFont.letterSpacing}
                onChange={(letterSpacing) => updateHeadingFont({ letterSpacing })}
                options={LETTER_SPACINGS}
                placeholder="Select spacing"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-base-200 rounded-xl p-4 border border-base-300">
            <p className="text-xs text-base-content/60 mb-2">Preview</p>
            <h2 
              style={{
                fontFamily: `"${headingFont.family}", sans-serif`,
                fontWeight: headingFont.weight,
                fontSize: headingFont.size,
                lineHeight: headingFont.lineHeight,
                letterSpacing: headingFont.letterSpacing,
              }}
            >
              Sample Heading Text
            </h2>
          </div>
        </div>
      </div>

      {/* Body Font Card */}
      <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-base-content">Body Font</h3>
            <p className="text-sm text-base-content/60">Configure body text typography</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">Font Family</label>
            <FontSelector
              value={bodyFont.family}
              onChange={(family) => updateBodyFont({ family })}
              isOpen={bodyFontOpen}
              onToggle={() => setBodyFontOpen(!bodyFontOpen)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Weight</label>
              <Select
                value={bodyFont.weight}
                onChange={(weight) => updateBodyFont({ weight })}
                options={bodyWeights}
                placeholder="Select weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Size</label>
              <Select
                value={bodyFont.size}
                onChange={(size) => updateBodyFont({ size })}
                options={FONT_SIZES}
                placeholder="Select size"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Line Height</label>
              <Select
                value={bodyFont.lineHeight}
                onChange={(lineHeight) => updateBodyFont({ lineHeight })}
                options={LINE_HEIGHTS}
                placeholder="Select line height"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Letter Spacing</label>
              <Select
                value={bodyFont.letterSpacing}
                onChange={(letterSpacing) => updateBodyFont({ letterSpacing })}
                options={LETTER_SPACINGS}
                placeholder="Select spacing"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-base-200 rounded-xl p-4 border border-base-300">
            <p className="text-xs text-base-content/60 mb-2">Preview</p>
            <p 
              style={{
                fontFamily: `"${bodyFont.family}", sans-serif`,
                fontWeight: bodyFont.weight,
                fontSize: bodyFont.size,
                lineHeight: bodyFont.lineHeight,
                letterSpacing: bodyFont.letterSpacing,
              }}
            >
              This is sample body text that demonstrates how your chosen font settings will look in actual content. It includes multiple sentences to show the line height and letter spacing effects.
            </p>
          </div>
        </div>
      </div>

      {/* Overall Font Controls */}
      <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-base-content">Global Settings</h3>
            <p className="text-sm text-base-content/60">Overall font controls and spacing</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Global Line Height</label>
              <Input
                value={fontOverrides.lineHeight}
                onChange={(lineHeight) => updateFontOverrides({ lineHeight })}
                placeholder="1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Global Letter Spacing</label>
              <Input
                value={fontOverrides.letterSpacing}
                onChange={(letterSpacing) => updateFontOverrides({ letterSpacing })}
                placeholder="0em"
                suffix="em"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Heading Margin Bottom</label>
              <Input
                value={fontOverrides.headingMarginBottom}
                onChange={(headingMarginBottom) => updateFontOverrides({ headingMarginBottom })}
                placeholder="1rem"
                suffix="rem"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Body Margin Bottom</label>
              <Input
                value={fontOverrides.bodyMarginBottom}
                onChange={(bodyMarginBottom) => updateFontOverrides({ bodyMarginBottom })}
                placeholder="1rem"
                suffix="rem"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Heading Min Margin</label>
              <Input
                value={fontOverrides.headingMinMargin}
                onChange={(headingMinMargin) => updateFontOverrides({ headingMinMargin })}
                placeholder="0.5rem"
                suffix="rem"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Body Min Margin</label>
              <Input
                value={fontOverrides.bodyMinMargin}
                onChange={(bodyMinMargin) => updateFontOverrides({ bodyMinMargin })}
                placeholder="0.25rem"
                suffix="rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

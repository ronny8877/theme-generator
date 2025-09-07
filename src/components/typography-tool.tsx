"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Type, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useStore } from "@nanostores/react";
import { $themeColors } from "@/store/nano-store";
import { $headingFont, $bodyFont } from "@/store/font-store";

interface TypographyToolProps {
  className?: string;
}

interface ColorSample {
  name: string;
  bgColor: string;
  textColor: string;
  colorKey: string;
}

const sampleTexts = [
  "Daisy grows happily under the warm sunlight",
  "The quick brown fox jumps over the lazy dog",
  "Design beautiful themes with DaisyUI",
  "Typography matters for great user experience",
  "Lorem ipsum dolor sit amet consectetur",
];

export const TypographyTool: React.FC<TypographyToolProps> = ({
  className = "",
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const themeColors = useStore($themeColors);
  const headingFont = useStore($headingFont);
  const bodyFont = useStore($bodyFont);

  // Create color samples from theme colors
  const colorSamples: ColorSample[] = [
    {
      name: "Base",
      bgColor: themeColors["--color-base-100"],
      textColor: themeColors["--color-base-content"],
      colorKey: "base",
    },
    {
      name: "Base 200",
      bgColor: themeColors["--color-base-200"],
      textColor: themeColors["--color-base-content"],
      colorKey: "base-200",
    },
    {
      name: "Base 300",
      bgColor: themeColors["--color-base-300"],
      textColor: themeColors["--color-base-content"],
      colorKey: "base-300",
    },
    {
      name: "Primary",
      bgColor: themeColors["--color-primary"],
      textColor: themeColors["--color-primary-content"],
      colorKey: "primary",
    },
    {
      name: "Secondary",
      bgColor: themeColors["--color-secondary"],
      textColor: themeColors["--color-secondary-content"],
      colorKey: "secondary",
    },
    {
      name: "Accent",
      bgColor: themeColors["--color-accent"],
      textColor: themeColors["--color-accent-content"],
      colorKey: "accent",
    },
    {
      name: "Neutral",
      bgColor: themeColors["--color-neutral"],
      textColor: themeColors["--color-neutral-content"],
      colorKey: "neutral",
    },
    {
      name: "Info",
      bgColor: themeColors["--color-info"],
      textColor: themeColors["--color-info-content"],
      colorKey: "info",
    },
    {
      name: "Success",
      bgColor: themeColors["--color-success"],
      textColor: themeColors["--color-success-content"],
      colorKey: "success",
    },
    {
      name: "Warning",
      bgColor: themeColors["--color-warning"],
      textColor: themeColors["--color-warning-content"],
      colorKey: "warning",
    },
    {
      name: "Error",
      bgColor: themeColors["--color-error"],
      textColor: themeColors["--color-error-content"],
      colorKey: "error",
    },
  ];

  const copyFontCSS = async (fontType: "heading" | "body") => {
    const font = fontType === "heading" ? headingFont : bodyFont;
    const css = `font-family: "${font.family}", sans-serif;\nfont-weight: ${font.weight};\nfont-size: ${font.size};\nline-height: ${font.lineHeight};\nletter-spacing: ${font.letterSpacing};`;

    try {
      await navigator.clipboard.writeText(css);
      setCopiedId(`${fontType}-css`);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success(
        `${fontType.charAt(0).toUpperCase() + fontType.slice(1)} font CSS copied!`,
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  const copyColorCSS = async (sample: ColorSample) => {
    const css = `background-color: ${sample.bgColor};\ncolor: ${sample.textColor};`;

    try {
      await navigator.clipboard.writeText(css);
      setCopiedId(`color-${sample.colorKey}`);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success(`${sample.name} color CSS copied!`);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="px-3 pt-8 border-b border-base-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
            <Type className="w-6 h-6 text-primary-content" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-base-content">
              Typography Preview
            </h1>
            <p className="text-base-content/70">
              Preview your fonts across all theme colors
            </p>
          </div>
        </div>

        {/* Font Info Cards (compact hover-reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Heading Font - compact with absolute details panel */}
          <div className="group card bg-base-200 border border-base-300 overflow-visible relative">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3 min-w-0 relative">
                <div
                  className="text-sm font-semibold truncate"
                  title={headingFont.family}
                >
                  {headingFont.family}
                </div>
                <div className="text-xs opacity-60 hidden sm:inline">
                  {headingFont.weight}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyFontCSS("heading")}
                  className="btn-xs"
                  aria-label="Copy heading font CSS"
                >
                  {copiedId === "heading-css" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>

            {/* Absolute details panel shown on hover (no layout shift) */}
            <div className="absolute left-3 top-full mt-2 w-[calc(100%-1.5rem)] bg-base-200 border border-base-300 rounded-md p-3 text-xs text-base-content/70 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-30">
              <div>Family: {headingFont.family}</div>
              <div>Weight: {headingFont.weight}</div>
              <div>Size: {headingFont.size}</div>
              <div>Line height: {headingFont.lineHeight}</div>
              <div>Letter spacing: {headingFont.letterSpacing}</div>
            </div>
          </div>

          {/* Body Font - compact with absolute details panel */}
          <div className="group card bg-base-200 border border-base-300 overflow-visible relative">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3 min-w-0 relative">
                <div
                  className="text-sm font-semibold truncate"
                  title={bodyFont.family}
                >
                  {bodyFont.family}
                </div>
                <div className="text-xs opacity-60 hidden sm:inline">
                  {bodyFont.weight}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyFontCSS("body")}
                  className="btn-xs"
                  aria-label="Copy body font CSS"
                >
                  {copiedId === "body-css" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>

            {/* Absolute details panel shown on hover (no layout shift) */}
            <div className="absolute left-3 top-full mt-2 w-[calc(100%-1.5rem)] bg-base-200 border border-base-300 rounded-md p-3 text-xs text-base-content/70 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-30">
              <div>Family: {bodyFont.family}</div>
              <div>Weight: {bodyFont.weight}</div>
              <div>Size: {bodyFont.size}</div>
              <div>Line height: {bodyFont.lineHeight}</div>
              <div>Letter spacing: {bodyFont.letterSpacing}</div>
            </div>
          </div>
        </div>

        {/* Sample Text Selector */}
      </div>

      {/* Typography Samples */}
      <div className="flex-1 overflow-hidden rounded-3xl">
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="flex flex-col gap-6">
              {colorSamples.map((sample) => (
                <div
                  key={sample.colorKey}
                  className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: sample.bgColor }}
                >
                  {/* Color Sample Header */}
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="card-title text-lg"
                        style={{ color: sample.textColor }}
                      >
                        {sample.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyColorCSS(sample)}
                        className="btn-sm hover:bg-current/10"
                        style={{ color: sample.textColor }}
                      >
                        {copiedId === `color-${sample.colorKey}` ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <div
                      className="text-xs opacity-70 mb-4"
                      style={{ color: sample.textColor }}
                    >
                      {sample.bgColor} / {sample.textColor}
                    </div>
                    {/* Typography Samples */}
                    <div className="space-y-6">
                      {/* Heading Sample */}
                      <div>
                        <div
                          className="text-xs uppercase tracking-wide opacity-60 mb-2"
                          style={{ color: sample.textColor }}
                        >
                          Heading Font
                        </div>
                        <h2
                          className="text-2xl leading-tight"
                          style={{
                            color: sample.textColor,
                            fontFamily: `"${headingFont.family}", sans-serif`,
                            fontWeight: headingFont.weight,
                          }}
                        >
                          {sampleTexts[selectedSampleIndex]}
                        </h2>
                      </div>

                      {/* Body Sample */}
                      <div>
                        <div
                          className="text-xs uppercase tracking-wide opacity-60 mb-2"
                          style={{ color: sample.textColor }}
                        >
                          Body Font
                        </div>
                        <p
                          className="text-base leading-relaxed"
                          style={{
                            color: sample.textColor,
                            fontFamily: `"${bodyFont.family}", sans-serif`,
                            fontWeight: bodyFont.weight,
                          }}
                        >
                          {sampleTexts[selectedSampleIndex]}
                        </p>
                      </div>

                      {/* Font Sizes Demo */}
                      <div className="space-y-2">
                        <div
                          className="text-xs uppercase tracking-wide opacity-60"
                          style={{ color: sample.textColor }}
                        >
                          Size Scale
                        </div>
                        <div
                          className="text-xs"
                          style={{
                            color: sample.textColor,
                            fontFamily: `"${bodyFont.family}", sans-serif`,
                          }}
                        >
                          Small text
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: sample.textColor,
                            fontFamily: `"${bodyFont.family}", sans-serif`,
                          }}
                        >
                          Regular text
                        </div>
                        <div
                          className="text-lg font-medium"
                          style={{
                            color: sample.textColor,
                            fontFamily: `"${headingFont.family}", sans-serif`,
                            fontWeight: headingFont.weight,
                          }}
                        >
                          Large heading
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm font-medium">Sample Text:</span>
        </label>
        <select
          value={selectedSampleIndex}
          onChange={(e) => setSelectedSampleIndex(Number(e.target.value))}
          className="select select-bordered select-sm w-full max-w-md"
        >
          {sampleTexts.map((text, index) => (
            <option key={index} value={index}>
              {text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TypographyTool;

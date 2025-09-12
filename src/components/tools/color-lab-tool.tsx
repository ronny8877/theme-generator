"use client";

import React, { useState } from 'react';
import { 
  convertColor,
  calculateContrast,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors
} from '@/lib/color-utils';
import { getWCAGRating } from '@/lib/palette-utils';
import { ColorPicker } from '@/components/ui/color-picker';
import { 
  Palette, 
  Eye, 
  Shield, 
  Shuffle,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

export function ColorLabTool() {
  const [mainColor, setMainColor] = useState('#3b82f6');
  const [contrastColor, setContrastColor] = useState('#ffffff');

  const colorInfo = convertColor(mainColor);
  const contrastResult = calculateContrast(mainColor, contrastColor);
  
  // Generate harmonies
  const complementary = getComplementaryColor(mainColor);
  const analogous = getAnalogousColors(mainColor, 2);
  const triadic = getTriadicColors(mainColor);
  
  const harmonies = {
    complementary: complementary ? [mainColor, complementary] : [mainColor],
    analogous: [mainColor, ...analogous],
    triadic: [mainColor, ...triadic]
  };

  const handleCopyColor = (color: string, format: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${format} copied to clipboard`);
  };

  const handleHarmonyColorClick = (color: string) => {
    setMainColor(color);
    toast.success('Color selected from harmony');
  };

  const rating = contrastResult ? getWCAGRating(contrastResult.ratio) : null;

  return (
    <div className="space-y-8">
      {/* Color Converter Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Palette className="h-6 w-6" />
            Color Converter
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Select Color</span>
              </label>
              <ColorPicker
                value={mainColor}
                onChange={setMainColor}
                onChangeDebounced={setMainColor}
                size="lg"
                className="w-full"
              />
            </div>

            {/* Color Display Grid */}
            {colorInfo && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HEX */}
                <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={() => handleCopyColor(colorInfo.hex, 'HEX')}>
                  <div className="card-body">
                    <h4 className="font-semibold text-lg flex items-center justify-between">
                      HEX
                      <Copy className="h-4 w-4 opacity-50 hover:opacity-100" />
                    </h4>
                    <div className="font-mono text-xl text-primary">{colorInfo.hex.toUpperCase()}</div>
                    <div className="text-sm text-base-content/70">Hexadecimal</div>
                  </div>
                </div>

                {/* RGB */}
                <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={() => handleCopyColor(colorInfo.rgb, 'RGB')}>
                  <div className="card-body">
                    <h4 className="font-semibold text-lg flex items-center justify-between">
                      RGB
                      <Copy className="h-4 w-4 opacity-50 hover:opacity-100" />
                    </h4>
                    <div className="font-mono text-xl text-primary">{colorInfo.rgb}</div>
                    <div className="text-sm text-base-content/70">Red, Green, Blue</div>
                  </div>
                </div>

                {/* HSL */}
                <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={() => handleCopyColor(colorInfo.hsl, 'HSL')}>
                  <div className="card-body">
                    <h4 className="font-semibold text-lg flex items-center justify-between">
                      HSL
                      <Copy className="h-4 w-4 opacity-50 hover:opacity-100" />
                    </h4>
                    <div className="font-mono text-xl text-primary">{colorInfo.hsl}</div>
                    <div className="text-sm text-base-content/70">Hue, Saturation, Lightness</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contrast Checker Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Eye className="h-6 w-6" />
            Contrast Checker
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Background Color</span>
              </label>
              <ColorPicker
                value={contrastColor}
                onChange={setContrastColor}
                onChangeDebounced={setContrastColor}
                size="md"
                placeholder="Background color..."
              />
            </div>

            {/* Contrast Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visual Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Preview</h4>
                <div 
                  className="p-8 rounded-2xl border-2 border-base-300 text-center shadow-inner"
                  style={{ 
                    backgroundColor: contrastColor, 
                    color: mainColor,
                    minHeight: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div>
                    <div className="text-2xl font-bold mb-2">Sample Text</div>
                    <div className="text-sm">This is how your text will look</div>
                  </div>
                </div>
              </div>

              {/* Contrast Results */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Accessibility</h4>
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <div className="stat">
                      <div className="stat-title">Contrast Ratio</div>
                      <div className="stat-value text-3xl">
                        {contrastResult ? `${contrastResult.ratio.toFixed(2)}:1` : 'N/A'}
                      </div>
                      {rating && (
                        <div className={`stat-desc font-semibold`}>
                          <div className={`badge ${rating.class} badge-lg mb-2`}>
                            {contrastResult && contrastResult.ratio >= 3 && <Check className="h-3 w-3 mr-1" />}
                            WCAG {rating.grade}
                          </div>
                          <div>{rating.desc}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WCAG Compliance Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Shield className="h-6 w-6" />
            WCAG Compliance Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-success/10 border border-success/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-success badge-lg">AAA</div>
                  <h4 className="font-semibold">Enhanced</h4>
                </div>
                <p className="text-sm">Contrast ratio ≥ 7:1</p>
                <p className="text-sm text-base-content/70">Perfect for all text sizes and users with vision impairments</p>
              </div>
            </div>

            <div className="card bg-info/10 border border-info/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-info badge-lg">AA</div>
                  <h4 className="font-semibold">Standard</h4>
                </div>
                <p className="text-sm">Contrast ratio ≥ 4.5:1</p>
                <p className="text-sm text-base-content/70">Good for normal text, meets legal requirements</p>
              </div>
            </div>

            <div className="card bg-warning/10 border border-warning/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-warning badge-lg">A</div>
                  <h4 className="font-semibold">Large Text</h4>
                </div>
                <p className="text-sm">Contrast ratio ≥ 3:1</p>
                <p className="text-sm text-base-content/70">Only for large text (18pt+ or 14pt+ bold)</p>
              </div>
            </div>

            <div className="card bg-warning/10 border border-warning/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-warning badge-lg">B</div>
                  <h4 className="font-semibold">Poor</h4>
                </div>
                <p className="text-sm">Contrast ratio ≥ 2:1</p>
                <p className="text-sm text-base-content/70">Below accessibility standards</p>
              </div>
            </div>

            <div className="card bg-error/10 border border-error/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-error badge-lg">C</div>
                  <h4 className="font-semibold">Very Poor</h4>
                </div>
                <p className="text-sm">Contrast ratio ≥ 1.5:1</p>
                <p className="text-sm text-base-content/70">Very poor contrast, avoid using</p>
              </div>
            </div>

            <div className="card bg-error/10 border border-error/20">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="badge badge-error badge-lg">D</div>
                  <h4 className="font-semibold">Fail</h4>
                </div>
                <p className="text-sm">Contrast ratio &lt; 1.5:1</p>
                <p className="text-sm text-base-content/70">Completely inaccessible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Harmonies Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Shuffle className="h-6 w-6" />
            Color Harmonies
          </h3>
          
          <div className="space-y-6">
            {Object.entries(harmonies).map(([harmonyType, colors]) => (
              <div key={harmonyType} className="space-y-3">
                <h4 className="font-semibold text-lg capitalize">
                  {harmonyType.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map((harmonyColor: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-16 h-16 rounded-2xl border-2 shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                          harmonyColor === mainColor ? 'border-primary border-4 ring-2 ring-primary/30' : 'border-base-300'
                        }`}
                        style={{ backgroundColor: harmonyColor }}
                        onClick={() => handleHarmonyColorClick(harmonyColor)}
                        title="Click to select this color"
                      />
                      <div className="font-mono text-sm text-base-content/70">
                        {harmonyColor.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
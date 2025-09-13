"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { PalettePreview } from "@/components/palette-preview";
import { CurrentThemeColors } from "./current-theme-colors";
import { AccessibilitySimulator } from "@/components/accessibility-simulator";
import { ColorComparison } from "@/components/color-comparison";
import { type SimulationType } from "@/lib/accessibility-simulation";
import {
  generatePalette,
  analyzePalette,
  improvePaletteAccessibility,
  exportPalette,
  extractColorsFromImage,
  generateColorName,
  suggestComplementaryColors,
  type PaletteColor,
  type ColorPalette,
  type PaletteGenerationMode,
  type PaletteAnalysis,
} from "@/lib/palette-utils";
import {
  savePalette,
  getSavedPalettes,
  deletePalette,
  searchPalettes,
  type SavedPaletteData,
} from "@/lib/palette-storage";
import {
  Shuffle,
  Copy,
  Lock,
  Unlock,
  Download,
  Eye,
  Palette as PaletteIcon,
  Settings,
  Sparkles,
  Check,
  Upload,
  Image as ImageIcon,
  Save,
  Search,
  Tag,
  Lightbulb,
  Monitor,
  Smartphone,
  CreditCard,
  BarChart3,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const GENERATION_MODES: {
  value: PaletteGenerationMode;
  label: string;
  description: string;
}[] = [
  { value: "random", label: "Random", description: "Completely random colors" },
  {
    value: "monochromatic",
    label: "Monochromatic",
    description: "Same hue, different lightness",
  },
  {
    value: "analogous",
    label: "Analogous",
    description: "Adjacent colors on color wheel",
  },
  {
    value: "complementary",
    label: "Complementary",
    description: "Opposite colors",
  },
  {
    value: "triadic",
    label: "Triadic",
    description: "Three evenly spaced colors",
  },
  {
    value: "tetradic",
    label: "Tetradic",
    description: "Four evenly spaced colors",
  },
  {
    value: "split-complementary",
    label: "Split Complementary",
    description: "Base + two adjacent to complement",
  },
];

export function PaletteTool() {
  const [currentPalette, setCurrentPalette] = useState<PaletteColor[]>([]);
  const [generationMode, setGenerationMode] =
    useState<PaletteGenerationMode>("random");
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [colorCount, setColorCount] = useState(5);
  const [analysis, setAnalysis] = useState<PaletteAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // New state for additional features
  const [isExtracting, setIsExtracting] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState<SavedPaletteData>({
    palettes: [],
    tags: [],
  });
  const [showSavedPalettes, setShowSavedPalettes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [palettePreviewMode, setPalettePreviewMode] = useState<
    "website" | "card" | "dashboard" | "mobile"
  >("website");
  const [suggestions, setSuggestions] = useState<PaletteColor[]>([]);
  const [currentPaletteName, setCurrentPaletteName] =
    useState("Generated Palette");
  const [currentPaletteTags, setCurrentPaletteTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Accessibility simulation state
  const [simulationType, setSimulationType] = useState<SimulationType | null>(
    null,
  );
  const [showAccessibilityTools, setShowAccessibilityTools] = useState(false);

  const generateNewPalette = React.useCallback(() => {
    const newColors = generatePalette(generationMode, baseColor, colorCount);

    // Preserve locked colors from previous palette
    const preservedColors = currentPalette.filter((color) => color.locked);

    // Replace unlocked colors with new ones
    const finalColors = newColors.map((newColor, index) => {
      const existingLocked = preservedColors.find(
        (_, lockedIndex) => lockedIndex === index,
      );
      return (
        existingLocked || {
          ...newColor,
          name: generateColorName(newColor.hex),
        }
      );
    });

    setCurrentPalette(finalColors);

    // Generate suggestions
    const newSuggestions = suggestComplementaryColors(finalColors, 5);
    setSuggestions(newSuggestions);
  }, [generationMode, baseColor, colorCount, currentPalette]);

  // Load saved palettes on mount
  useEffect(() => {
    const saved = getSavedPalettes();
    setSavedPalettes(saved);
  }, []);

  useEffect(() => {
    const newColors = generatePalette(generationMode, baseColor, colorCount);
    const namedColors = newColors.map((color) => ({
      ...color,
      name: generateColorName(color.hex),
    }));
    setCurrentPalette(namedColors);

    // Generate initial suggestions
    const newSuggestions = suggestComplementaryColors(namedColors, 5);
    setSuggestions(newSuggestions);
  }, [generationMode, baseColor, colorCount]);

  useEffect(() => {
    if (currentPalette.length > 0) {
      const paletteAnalysis = analyzePalette(currentPalette);
      setAnalysis(paletteAnalysis);
    }
  }, [currentPalette]);

  // Handle accessibility simulation changes
  const handleSimulationChange = (
    simulatedColors: string[],
    simulationType: SimulationType | null,
  ) => {
    setSimulationType(simulationType);
    // Note: simulatedColors are handled by the AccessibilitySimulator component itself
  };

  const handleColorChange = (colorId: string, newColor: string) => {
    setCurrentPalette((prev) =>
      prev.map((color) =>
        color.id === colorId
          ? {
              ...color,
              hex: newColor,
              name: generateColorName(newColor),
            }
          : color,
      ),
    );
  };

  const toggleColorLock = (colorId: string) => {
    setCurrentPalette((prev) =>
      prev.map((color) =>
        color.id === colorId ? { ...color, locked: !color.locked } : color,
      ),
    );
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success("Color copied to clipboard");
  };

  const handleCopyPalette = () => {
    const colors = currentPalette.map((c) => c.hex).join(", ");
    navigator.clipboard.writeText(colors);
    toast.success("Palette copied to clipboard");
  };

  // New handlers for image extraction
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const extractedColors = await extractColorsFromImage(file, colorCount);
      setCurrentPalette(extractedColors);

      const newSuggestions = suggestComplementaryColors(extractedColors, 5);
      setSuggestions(newSuggestions);

      toast.success(`Extracted ${extractedColors.length} colors from image`);
    } catch (error) {
      toast.error("Failed to extract colors from image");
      console.error(error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImageUrl = async () => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    setIsExtracting(true);
    try {
      const extractedColors = await extractColorsFromImage(url, colorCount);
      setCurrentPalette(extractedColors);

      const newSuggestions = suggestComplementaryColors(extractedColors, 5);
      setSuggestions(newSuggestions);

      toast.success(`Extracted ${extractedColors.length} colors from image`);
    } catch (error) {
      toast.error("Failed to extract colors from image URL");
      console.error(error);
    } finally {
      setIsExtracting(false);
    }
  };

  // Palette saving and management
  const handleSavePalette = () => {
    const palette: ColorPalette = {
      id: Date.now().toString(),
      name: currentPaletteName,
      colors: currentPalette,
      createdAt: new Date(),
      tags: currentPaletteTags,
    };

    try {
      savePalette(palette);
      const updated = getSavedPalettes();
      setSavedPalettes(updated);
      toast.success("Palette saved successfully");
    } catch (error) {
      toast.error("Failed to save palette");
      console.error(error);
    }
  };

  const handleLoadPalette = (palette: ColorPalette) => {
    setCurrentPalette(palette.colors);
    setCurrentPaletteName(palette.name);
    setCurrentPaletteTags(palette.tags || []);

    const newSuggestions = suggestComplementaryColors(palette.colors, 5);
    setSuggestions(newSuggestions);

    toast.success(`Loaded palette: ${palette.name}`);
  };

  const handleDeletePalette = (paletteId: string) => {
    try {
      deletePalette(paletteId);
      const updated = getSavedPalettes();
      setSavedPalettes(updated);
      toast.success("Palette deleted");
    } catch (error) {
      toast.error("Failed to delete palette");
      console.error(error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !currentPaletteTags.includes(newTag.trim())) {
      setCurrentPaletteTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentPaletteTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddSuggestion = (suggestion: PaletteColor) => {
    if (currentPalette.length < 10) {
      setCurrentPalette((prev) => [...prev, suggestion]);
      setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id));
      toast.success("Color added to palette");
    } else {
      toast.error("Maximum 10 colors allowed in palette");
    }
  };

  // Search and filter saved palettes
  const filteredPalettes = React.useMemo(() => {
    if (!searchQuery && selectedTags.length === 0) {
      return savedPalettes.palettes;
    }
    return searchPalettes(
      searchQuery,
      selectedTags.length > 0 ? selectedTags : undefined,
    );
  }, [savedPalettes.palettes, searchQuery, selectedTags]);

  const improvePalette = () => {
    const improved = improvePaletteAccessibility(currentPalette);
    setCurrentPalette(improved);
    toast.success("Palette improved for accessibility");
  };

  const exportPaletteAs = (
    format: "css" | "json" | "tailwind" | "svg" | "png",
  ) => {
    const palette: ColorPalette = {
      id: "current-palette",
      name: currentPaletteName,
      colors: currentPalette,
      createdAt: new Date(),
      tags: currentPaletteTags,
    };

    const exported = exportPalette(palette, format);

    if (format === "css" || format === "tailwind") {
      navigator.clipboard.writeText(exported);
      toast.success(`${format.toUpperCase()} code copied to clipboard`);
    } else if (format === "svg") {
      navigator.clipboard.writeText(exported);
      toast.success("SVG code copied to clipboard");
    } else if (format === "png") {
      // For PNG, create download link
      const link = document.createElement("a");
      link.href = exported; // This should be a data URL
      link.download = `${currentPaletteName.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();
      toast.success("PNG downloaded");
    } else {
      const blob = new Blob([exported], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentPaletteName.toLowerCase().replace(/\s+/g, "-")}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Palette exported as ${format.toUpperCase()}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Theme Colors Section */}
      {/* <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <CurrentThemeColors />
        </div>
      </div> */}

      {/* Generation Controls */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <PaletteIcon className="h-6 w-6" />
            Palette Generator
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="label">
                  <span className="label-text font-semibold">
                    Generation Mode
                  </span>
                </label>
                <select
                  value={generationMode}
                  onChange={(e) =>
                    setGenerationMode(e.target.value as PaletteGenerationMode)
                  }
                  className="select select-bordered w-full"
                >
                  {GENERATION_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-base-content/70">
                  {
                    GENERATION_MODES.find((m) => m.value === generationMode)
                      ?.description
                  }
                </p>
              </div>

              <div className="space-y-3">
                <label className="label">
                  <span className="label-text font-semibold">Base Color</span>
                </label>
                <ColorPicker
                  value={baseColor}
                  onChange={setBaseColor}
                  disabled={generationMode === "random"}
                  placeholder="Base color for palette..."
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="label-text font-semibold">Colors:</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={colorCount}
                  onChange={(e) => setColorCount(Number(e.target.value))}
                  className="range range-primary w-32"
                />
                <span className="text-sm font-semibold w-6">{colorCount}</span>
              </div>

              <Button
                onClick={generateNewPalette}
                className="btn-primary flex-1 max-w-xs"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Generate Palette
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Palette */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title text-2xl">Current Palette</h3>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={improvePalette}
                className="btn-sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Improve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyPalette}
                className="btn-sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentPalette.map((color) => (
              <div key={color.id} className="space-y-4">
                <div className="relative group">
                  {/* Color Display */}
                  <div
                    className="w-full h-32 rounded-2xl border-2 border-base-300 cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleCopyColor(color.hex)}
                    title="Click to copy color"
                  >
                    {/* Lock Button */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleColorLock(color.id);
                        }}
                        className={`btn btn-circle btn-sm shadow-lg transition-all duration-200 ${
                          color.locked
                            ? "btn-warning hover:btn-warning"
                            : "btn-ghost hover:btn-primary bg-base-100/80 hover:bg-primary hover:text-primary-content"
                        }`}
                      >
                        {color.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Copy Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="btn btn-circle btn-sm btn-success shadow-lg">
                        <Copy className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Locked Indicator */}
                    {color.locked && (
                      <div className="absolute bottom-3 left-3">
                        <div className="badge badge-warning shadow-lg">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Color Input */}
                  <div className="space-y-2">
                    <ColorPicker
                      value={color.hex}
                      onChange={(newColor) =>
                        handleColorChange(color.id, newColor)
                      }
                      size="sm"
                      placeholder="Edit color..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Tools */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title text-2xl">
              <Eye className="h-6 w-6" />
              Accessibility Testing
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAccessibilityTools(!showAccessibilityTools)}
              className="btn-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showAccessibilityTools ? "Hide Tools" : "Show Tools"}
            </Button>
          </div>

          {showAccessibilityTools && (
            <div className="space-y-6">
              <AccessibilitySimulator
                colors={currentPalette.map((color) => color.hex)}
                onSimulationChange={handleSimulationChange}
              />

              {simulationType && (
                <ColorComparison
                  colors={currentPalette.map((color) => color.hex)}
                  simulationType={simulationType}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Analysis */}
      {analysis && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title text-2xl">
                <Eye className="h-6 w-6" />
                Palette Analysis
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="btn-sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showAnalysis ? "Hide Details" : "Show Details"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="stat bg-base-200 rounded-2xl shadow-md">
                <div className="stat-value text-3xl">
                  {analysis.averageContrast.toFixed(1)}
                </div>
                <div className="stat-title">Avg Contrast</div>
                <div className="stat-desc">Higher is better</div>
              </div>

              <div className="stat bg-base-200 rounded-2xl shadow-md">
                <div className="stat-value text-3xl">
                  {(analysis.diversity * 100).toFixed(0)}%
                </div>
                <div className="stat-title">Diversity</div>
                <div className="stat-desc">Color variation</div>
              </div>

              <div className="stat bg-base-200 rounded-2xl shadow-md">
                <div className="stat-value text-2xl capitalize">
                  {analysis.harmony}
                </div>
                <div className="stat-title">Harmony</div>
                <div className="stat-desc">Color relationship</div>
              </div>

              <div className="stat bg-base-200 rounded-2xl shadow-md">
                <div className="stat-value text-3xl">
                  {analysis.contrastPairs.filter((p) => p.accessible).length}/
                  {analysis.contrastPairs.length}
                </div>
                <div className="stat-title">Accessible</div>
                <div className="stat-desc">WCAG compliant pairs</div>
              </div>
            </div>

            {showAnalysis && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Contrast Pairs</h4>
                <div className="grid gap-3">
                  {analysis.contrastPairs.map((pair, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-2xl border-2 border-base-300 bg-base-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-base-300 shadow-md"
                          style={{ backgroundColor: pair.color1 }}
                        />
                        <span className="text-lg font-semibold">vs</span>
                        <div
                          className="w-8 h-8 rounded-full border-2 border-base-300 shadow-md"
                          style={{ backgroundColor: pair.color2 }}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-lg font-mono font-semibold">
                          {pair.ratio.toFixed(1)}:1
                        </span>
                        <div className={`badge ${pair.rating.class} badge-lg`}>
                          {pair.ratio >= 3 && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                          {pair.rating.grade}
                        </div>
                        <div className="text-sm text-base-content/70">
                          {pair.rating.level}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Download className="h-6 w-6" />
            Export Palette
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => exportPaletteAs("css")}
              className="btn-outline btn-primary"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy CSS Variables
            </Button>
            <Button
              variant="outline"
              onClick={() => exportPaletteAs("tailwind")}
              className="btn-outline btn-secondary"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Tailwind Config
            </Button>
            <Button
              variant="outline"
              onClick={() => exportPaletteAs("json")}
              className="btn-outline btn-accent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download JSON
            </Button>
            <Button
              variant="outline"
              onClick={() => exportPaletteAs("svg")}
              className="btn-outline btn-info"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy SVG
            </Button>
            <Button
              variant="outline"
              onClick={() => exportPaletteAs("png")}
              className="btn-outline btn-success"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>

      {/* Image to Palette */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <ImageIcon className="h-6 w-6" />
            Extract from Image
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Upload Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full"
                  disabled={isExtracting}
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleImageUrl}
                  disabled={isExtracting}
                  className="w-full"
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isExtracting ? "Extracting..." : "Use Image URL"}
                </Button>
              </div>
            </div>

            {isExtracting && (
              <div className="flex items-center justify-center p-8">
                <div className="loading loading-spinner loading-lg"></div>
                <span className="ml-3">Extracting colors from image...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Palette Preview */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title text-2xl">
              <Eye className="h-6 w-6" />
              Palette Preview
            </h3>
            <div className="flex gap-2">
              {[
                { value: "website", icon: Monitor, label: "Website" },
                { value: "dashboard", icon: BarChart3, label: "Dashboard" },
                { value: "card", icon: CreditCard, label: "Card" },
                { value: "mobile", icon: Smartphone, label: "Mobile" },
              ].map((mode) => (
                <Button
                  key={mode.value}
                  size="sm"
                  variant={
                    palettePreviewMode === mode.value ? "default" : "outline"
                  }
                  onClick={() =>
                    setPalettePreviewMode(
                      mode.value as "website" | "card" | "dashboard" | "mobile",
                    )
                  }
                  className="btn-sm"
                >
                  <mode.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          <PalettePreview
            colors={currentPalette}
            mockupType={palettePreviewMode}
          />
        </div>
      </div>

      {/* Color Suggestions */}
      {suggestions.length > 0 && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-2xl mb-6">
              <Lightbulb className="h-6 w-6" />
              Suggested Colors
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="space-y-2">
                  <div
                    className="w-full h-20 rounded-xl border-2 border-base-300 cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                    style={{ backgroundColor: suggestion.hex }}
                    onClick={() => handleAddSuggestion(suggestion)}
                    title={`Add ${suggestion.name || suggestion.hex} to palette`}
                  >
                    <Plus className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{suggestion.name}</p>
                    <p className="text-xs text-base-content/60">
                      {suggestion.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Palette */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            <Save className="h-6 w-6" />
            Save Palette
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Palette Name</span>
                </label>
                <input
                  type="text"
                  value={currentPaletteName}
                  onChange={(e) => setCurrentPaletteName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter palette name..."
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Add Tag</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    className="input input-bordered flex-1"
                    placeholder="Enter tag..."
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {currentPaletteTags.length > 0 && (
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Tags</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentPaletteTags.map((tag) => (
                    <div
                      key={tag}
                      className="badge badge-primary badge-lg gap-2"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="btn btn-circle btn-ghost btn-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleSavePalette} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Palette
            </Button>
          </div>
        </div>
      </div>

      {/* Saved Palettes */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title text-2xl">
              <PaletteIcon className="h-6 w-6" />
              Saved Palettes ({savedPalettes.palettes.length})
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSavedPalettes(!showSavedPalettes)}
              className="btn-sm"
            >
              {showSavedPalettes ? "Hide" : "Show"} Saved
            </Button>
          </div>

          {showSavedPalettes && (
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Search Palettes
                    </span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-base-content/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input input-bordered w-full pl-10"
                      placeholder="Search by name, tag, or color..."
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Filter by Tags
                    </span>
                  </label>
                  <select
                    multiple
                    value={selectedTags}
                    onChange={(e) =>
                      setSelectedTags(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        ),
                      )
                    }
                    className="select select-bordered w-full"
                  >
                    {savedPalettes.tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Palette Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPalettes.map((palette) => (
                  <div
                    key={palette.id}
                    className="card card-compact bg-base-200 shadow-md"
                  >
                    <div className="card-body">
                      <h4 className="card-title text-sm">{palette.name}</h4>

                      {/* Color Preview */}
                      <div className="flex gap-1 mb-2">
                        {palette.colors.slice(0, 6).map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: color.hex }}
                            title={color.name || color.hex}
                          />
                        ))}
                        {palette.colors.length > 6 && (
                          <div className="w-6 h-6 rounded bg-base-300 flex items-center justify-center text-xs">
                            +{palette.colors.length - 6}
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {palette.tags && palette.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {palette.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="badge badge-xs badge-outline"
                            >
                              {tag}
                            </span>
                          ))}
                          {palette.tags.length > 3 && (
                            <span className="badge badge-xs badge-outline">
                              +{palette.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="card-actions justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleLoadPalette(palette)}
                          className="btn-xs btn-primary"
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePalette(palette.id)}
                          className="btn-xs btn-error"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPalettes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-base-content/50">No palettes found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

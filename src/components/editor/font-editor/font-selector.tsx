"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GOOGLE_FONTS, loadGoogleFont } from "@/store/font-store";

interface GoogleFont {
  family: string;
  category: string;
  weights: string[];
}

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Google Fonts API integration
const fetchGoogleFonts = async (query: string): Promise<GoogleFont[]> => {
  // For now, we'll use our predefined list but filter it
  // In a real implementation, you might want to fetch from Google Fonts API
  if (!query.trim()) {
    return GOOGLE_FONTS;
  }

  return GOOGLE_FONTS.filter((font) =>
    font.family.toLowerCase().includes(query.toLowerCase()),
  );
};

export const FontSelector = ({
  value,
  onChange,
  isOpen,
  onToggle,
}: FontSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFonts, setFilteredFonts] =
    useState<GoogleFont[]>(GOOGLE_FONTS);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchFonts = async () => {
      setIsLoading(true);
      try {
        const fonts = await fetchGoogleFonts(searchQuery);
        setFilteredFonts(fonts);
      } catch (error) {
        console.error("Failed to search fonts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchFonts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleFontSelect = async (fontFamily: string) => {
    try {
      setIsLoading(true);
      await loadGoogleFont(fontFamily);
      onChange(fontFamily);
      onToggle();
      setSearchQuery("");
    } catch (error) {
      console.error("Failed to load font:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full btn justify-between text-left font-normal h-10 px-3 rounded-xl bg-base-100 border-base-300 hover:bg-base-200"
      >
        <span
          style={{ fontFamily: `"${value}", sans-serif` }}
          className="truncate"
        >
          {value}
        </span>
        <svg
          className="w-4 h-4 opacity-50 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-base-300">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fonts..."
              className="w-full h-8 px-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          {/* Font List */}
          <ScrollArea className="h-60">
            <div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="ml-2 text-sm text-base-content/60">
                    Loading fonts...
                  </span>
                </div>
              ) : filteredFonts.length === 0 ? (
                <div className="text-center py-4 text-sm text-base-content/60">
                  No fonts found
                </div>
              ) : (
                filteredFonts.map((font) => (
                  <button
                    key={font.family}
                    onClick={() => handleFontSelect(font.family)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg hover:bg-base-200 transition-colors",
                      value === font.family && "bg-base-200",
                    )}
                    style={{ fontFamily: `"${font.family}", sans-serif` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{font.family}</span>
                      <span className="text-xs text-base-content/60 capitalize flex-shrink-0 ml-2">
                        {font.category}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

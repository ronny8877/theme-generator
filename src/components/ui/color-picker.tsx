"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { isValidColor } from '@/lib/color-utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  onChangeDebounced?: (color: string) => void;
  debounceMs?: number;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTextInput?: boolean;
  placeholder?: string;
}

export function ColorPicker({
  value,
  onChange,
  onChangeDebounced,
  debounceMs = 300,
  className = '',
  disabled = false,
  size = 'md',
  showTextInput = true,
  placeholder = 'Enter color...'
}: ColorPickerProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastValidColorRef = useRef(value);

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
    const valid = isValidColor(value);
    setIsValid(valid);
    if (valid) {
      lastValidColorRef.current = value;
    }
  }, [value]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Memoized size classes to prevent recalculation
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          colorInput: 'w-8 h-8',
          textInput: 'h-8 text-sm',
        };
      case 'lg':
        return {
          colorInput: 'w-16 h-16',
          textInput: 'h-16 text-lg',
        };
      default:
        return {
          colorInput: 'w-12 h-12',
          textInput: 'h-12',
        };
    }
  }, [size]);

  const handleColorChange = (newColor: string) => {
    setInternalValue(newColor);
    const valid = isValidColor(newColor);
    setIsValid(valid);
    
    // Immediate callback for valid colors only
    if (valid) {
      lastValidColorRef.current = newColor;
      onChange(newColor);
      
      // Clear existing debounce timer
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      // Debounced callback
      if (onChangeDebounced) {
        debounceRef.current = setTimeout(() => {
          onChangeDebounced(newColor);
        }, debounceMs);
      }
    }
  };

  // Optimized handlers with minimal re-renders
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    handleColorChange(newValue);
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    handleColorChange(newValue);
  };

  // Use last valid color for color input to prevent invalid values
  const safeColorValue = isValid ? internalValue : lastValidColorRef.current;

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      {/* Color Input */}
      <input
        type="color"
        value={safeColorValue}
        onChange={handleColorInputChange}
        disabled={disabled}
        className={`${sizeClasses.colorInput} rounded-2xl border-2 border-base-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary focus:border-primary transition-colors shadow-sm`}
        title="Pick a color"
      />
      
      {/* Text Input */}
      {showTextInput && (
        <input
          type="text"
          value={internalValue}
          onChange={handleTextInputChange}
          disabled={disabled}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          className={`${sizeClasses.textInput} flex-1 px-4 rounded-2xl border-2 border-base-300 focus:border-primary focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 font-mono shadow-sm ${
            !isValid ? 'border-error bg-error/10' : ''
          }`}
        />
      )}
    </div>
  );
}
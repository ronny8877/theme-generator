/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTemplateStore, useTemplateActions } from "@/store/hooks";

export interface SelectOption {
  id: string;
  title: string;
  image?: string;
  description?: string;
  theme_id?: string;
  fonts?: {
    heading?: { family?: string; weight?: string };
    body?: { family?: string; weight?: string };
  };
}

export interface SelectSection {
  title: string;
  options: SelectOption[];
}

export interface FloatingSelectProps {
  options?: SelectOption[];
  sections?: SelectSection[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}
const FloatingSelect = React.forwardRef<HTMLDivElement, FloatingSelectProps>(
  ({
    options = [],
    sections = [],
    value,
    onValueChange,
    placeholder = "Select an option",
    className,
  }) => {
    useTemplateStore(); // subscribe for reactivity; not directly used
    const { setActiveTemplateById } = useTemplateActions();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] =
      React.useState<SelectOption | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Flatten all options from sections and direct options
    const allOptions = React.useMemo(() => {
      const sectionOptions = sections.flatMap((section) => section.options);
      return [...options, ...sectionOptions];
    }, [options, sections]);

    // Find selected option
    React.useEffect(() => {
      if (value) {
        const option = allOptions.find((opt) => opt.id === value);
        setSelectedOption(option || null);
      }
    }, [value, allOptions]);

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: SelectOption) => {
      setActiveTemplateById(option.id);
      setSelectedOption(option);
      onValueChange?.(option.id);
      setIsOpen(false);
    };

    const renderOption = (option: SelectOption, isSelected = false) => (
      <div
        key={option.id}
        className={cn(
          "flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-base-200",
          isSelected && "bg-primary/10 border-l-2 border-primary",
        )}
        onClick={() => handleSelect(option)}
      >
        {option.image && (
          <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-base-200">
            <img
              src={option.image || "/placeholder.svg"}
              alt={option.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-base-content truncate">
            {option.title}
          </div>
          {option.description && (
            <div className="text-xs text-base-content/60 truncate">
              {option.description}
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div
        ref={containerRef}
        className={cn("fixed bottom-2 left-6 z-50 w-80", className)}
      >
        {/* Main trigger button */}
        <div
          className={cn(
            "bg-base-100 border border-base-300 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl rounded-4xl justify-end",
            isOpen && "shadow-2xl scale-[1.02]",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex gap-3 p-4 items-center border-0 opacity-100 rounded-4xl">
            {selectedOption?.image && (
              <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-base-200">
                <img
                  src={selectedOption.image || "/placeholder.svg"}
                  alt={selectedOption.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-base-content truncate">
                {selectedOption?.title || placeholder}
              </div>
              {selectedOption?.description && (
                <div className="text-sm text-base-content/60 truncate">
                  {selectedOption.description}
                </div>
              )}
            </div>
            <div
              className={cn(
                "transition-transform duration-300 text-base-content/60",
                isOpen ? "rotate-180" : "rotate-0",
              )}
            >
              <ChevronUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Dropdown panel */}
        <div
          className={cn(
            "absolute bottom-full left-0 right-0 mb-2 bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-bottom",
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          )}
        >
          <div className="max-h-[60vh] h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
            {/* Direct options */}
            {options.map((option) => renderOption(option, option.id === value))}

            {/* Sectioned options */}
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {(sectionIndex > 0 || options.length > 0) && (
                  <div className="border-t border-base-300" />
                )}
                <div className="px-3 py-2 text-xs font-medium text-base-content/60 uppercase tracking-wider bg-base-200/50">
                  {section.title}
                </div>
                {section.options.map((option) =>
                  renderOption(option, option.id === value),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

FloatingSelect.displayName = "FloatingSelect";

export default FloatingSelect;

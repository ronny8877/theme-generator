"use client";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: "text" | "number";
}

export const Input = ({
  value,
  onChange,
  placeholder,
  suffix,
  min,
  max,
  step = 0.1,
  type = "text",
}: InputProps) => {
  const parseValue = (val: string): number => {
    if (type === "number") {
      const num = parseFloat(val.replace(/[^\d.-]/g, ""));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const formatValue = (val: number): string => {
    if (type === "number") {
      return val.toString() + (suffix || "");
    }
    return val.toString();
  };

  const handleIncrement = () => {
    if (type === "number") {
      const currentVal = parseValue(value);
      const newVal = Math.min(max || Infinity, currentVal + step);
      onChange(formatValue(newVal));
    }
  };

  const handleDecrement = () => {
    if (type === "number") {
      const currentVal = parseValue(value);
      const newVal = Math.max(min || -Infinity, currentVal - step);
      onChange(formatValue(newVal));
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 pr-16 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
      />

      {/* Plus/Minus buttons for number inputs */}
      {type === "number" && (
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-6 h-6 flex items-center justify-center bg-base-200 hover:bg-base-300 rounded-md transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-6 h-6 flex items-center justify-center bg-base-200 hover:bg-base-300 rounded-md transition-colors ml-1"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Suffix text for regular inputs */}
      {suffix && type === "text" && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-base-content/60">
          {suffix}
        </span>
      )}
    </div>
  );
};

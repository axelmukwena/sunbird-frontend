"use client";

import React, { ClipboardEvent, KeyboardEvent, useEffect, useRef } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface CodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const CodeField: React.FC<CodeFieldProps> = ({
  value = "",
  onChange,
  onBlur,
  length = 6,
  error,
  disabled = false,
  className,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").slice(0, length);

  // Fill array to ensure we have exactly `length` elements
  while (digits.length < length) {
    digits.push("");
  }

  useEffect(() => {
    // Focus first empty input on mount
    const firstEmptyIndex = digits.findIndex((digit) => digit === "");
    const indexToFocus = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputRefs.current[indexToFocus]?.focus();
  }, []);

  const handleInputChange = (index: number, newValueRaw: string): void => {
    // Only allow single digits
    let newValue = newValueRaw.trim().slice(0, 1);
    if (newValue.length > 1) {
      newValue = newValue.slice(-1);
    }

    // Only allow numeric values
    if (newValue && !/^\d$/.test(newValue)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = newValue;

    const newCode = newDigits.join("");
    onChange(newCode);

    // Auto-focus next input if current is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
      } else if (digits[index]) {
        // Clear current input
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pastedData) {
      onChange(pastedData);
      // Focus the next empty input or last input
      const focusIndex = Math.min(pastedData.length, length - 1);
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus();
      }, 0);
    }
  };

  const handleFocus = (index: number): void => {
    // Select all text when focusing
    setTimeout(() => {
      inputRefs.current[index]?.select();
    }, 0);
  };

  return (
    <div className={mergeTailwind("space-y-2", className)}>
      <div className="flex gap-2 justify-center">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={onBlur}
            disabled={disabled}
            className={mergeTailwind(
              "w-8 h-8 md:w-12 md:h-12 text-center text-lg font-medium border rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-all duration-200",
              // Default state
              "border-input bg-background text-foreground",
              // Error state
              error && "border-destructive focus:ring-destructive",
              // Disabled state
              disabled && "opacity-50 cursor-not-allowed",
              // Filled state
              digit && "border-primary bg-primary/5",
            )}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
};

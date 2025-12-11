"use client";

import React, { forwardRef, useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

export interface TimePickerProps {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  id?: string;
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    { className, label, error, helperText, value, onChange, required, id },
    ref
  ) => {
    const inputId = id || `time-${Math.random().toString(36).substr(2, 9)}`;

    // Parse initial value
    const parseTime = (timeStr: string) => {
      if (!timeStr) return { hour: "", minute: "", period: "AM" };
      const [hours, minutes] = timeStr.split(":");
      const hour = parseInt(hours);
      const isPM = hour >= 12;
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return {
        hour: displayHour.toString(),
        minute: minutes,
        period: isPM ? "PM" : "AM",
      };
    };

    const [time, setTime] = useState(parseTime(value || ""));

    // Update when value changes externally
    useEffect(() => {
      if (value) {
        setTime(parseTime(value));
      }
    }, [value]);

    const handleChange = (
      field: "hour" | "minute" | "period",
      newValue: string
    ) => {
      const updated = { ...time, [field]: newValue };
      setTime(updated);

      // Convert to 24-hour format
      if (updated.hour && updated.minute && updated.period) {
        let hour24 = parseInt(updated.hour);
        if (updated.period === "PM" && hour24 !== 12) {
          hour24 += 12;
        } else if (updated.period === "AM" && hour24 === 12) {
          hour24 = 0;
        }
        const timeString = `${hour24.toString().padStart(2, "0")}:${
          updated.minute
        }`;

        if (onChange) {
          const syntheticEvent = {
            target: { value: timeString },
            currentTarget: { value: timeString },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, "");
      if (val) {
        const num = parseInt(val);
        if (num > 12) val = "12";
        if (num < 1) val = "1";
      }
      handleChange("hour", val);
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, "");
      if (val.length > 2) val = val.slice(0, 2);
      if (val) {
        const num = parseInt(val);
        if (num > 59) val = "59";
      }
      handleChange("minute", val.padStart(2, "0"));
    };

    const handleHourBlur = () => {
      if (time.hour && time.hour.length === 1) {
        handleChange("hour", time.hour.padStart(2, "0"));
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
            {required && (
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {/* Clock Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Time Input Container */}
          <div
            className={cn(
              "flex items-center gap-2 w-full pl-11 pr-4 py-3 sm:py-2.5 rounded-lg border transition-all",
              "bg-white dark:bg-gray-800",
              "focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent",
              "hover:border-gray-400 dark:hover:border-gray-500",
              error
                ? "border-red-500 dark:border-red-400 focus-within:ring-red-500"
                : "border-gray-300 dark:border-gray-600",
              className
            )}
          >
            {/* Hour Input */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="12"
              id={inputId}
              value={time.hour}
              onChange={handleHourChange}
              onBlur={handleHourBlur}
              maxLength={2}
              className={cn(
                "w-12 text-center text-base font-medium",
                "bg-transparent text-gray-900 dark:text-gray-100",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "focus:outline-none",
                "touch-manipulation"
              )}
              aria-label="Hour"
            />

            {/* Separator */}
            <span className="text-xl font-bold text-gray-400 dark:text-gray-500 select-none">
              :
            </span>

            {/* Minute Input */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="00"
              value={time.minute}
              onChange={handleMinuteChange}
              maxLength={2}
              className={cn(
                "w-12 text-center text-base font-medium",
                "bg-transparent text-gray-900 dark:text-gray-100",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "focus:outline-none",
                "touch-manipulation"
              )}
              aria-label="Minute"
            />

            {/* AM/PM Toggle */}
            <div className="flex ml-auto border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleChange("period", "AM")}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:z-10",
                  time.period === "AM"
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                aria-label="AM"
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => handleChange("period", "PM")}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold transition-all border-l border-gray-300 dark:border-gray-600",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:z-10",
                  time.period === "PM"
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                aria-label="PM"
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

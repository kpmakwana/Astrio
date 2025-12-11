"use client";

import "react-datepicker/dist/react-datepicker.css";

import React, { forwardRef } from "react";

import DatePicker from "react-datepicker";
import { cn } from "@/lib/utils/cn";
import { format } from "date-fns";

export interface DatePickerProps {
  label?: string;
  value: string; // ISO date string
  onChange: (date: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
  className?: string;
}

export const CustomDatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({
    label,
    value,
    onChange,
    error,
    helperText,
    required,
    maxDate,
    minDate,
    placeholder = "Select date",
    className,
  }) => {
    const selectedDate = value ? new Date(value) : null;
    const maxDateValue = maxDate || new Date(); // Default to today

    const handleDateChange = (date: Date | null) => {
      if (date) {
        onChange(date.toISOString().split("T")[0]);
      } else {
        onChange("");
      }
    };

    const CustomInput = forwardRef<
      HTMLInputElement,
      React.InputHTMLAttributes<HTMLInputElement>
    >(({ value, onClick, onChange, ...props }, inputRef) => {
      return (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value || ""}
            onClick={onClick}
            onChange={onChange}
            readOnly
            className={cn(
              "w-full px-4 py-3 sm:py-2.5 rounded-lg border transition-colors text-base",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:bg-gray-100 disabled:cursor-not-allowed",
              "cursor-pointer touch-manipulation",
              "pr-12",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 hover:border-gray-400",
              className
            )}
            placeholder={placeholder}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      );
    });
    CustomInput.displayName = "CustomInput";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          maxDate={maxDateValue}
          minDate={minDate}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          customInput={<CustomInput />}
          className="w-full"
          wrapperClassName="w-full"
          popperClassName="!z-50"
          popperPlacement="bottom-start"
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && !selectedDate && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
        {selectedDate && !error && (
          <p className="mt-1.5 text-sm text-gray-500">
            Selected: {format(selectedDate, "dd MMMM yyyy")}
          </p>
        )}
      </div>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";

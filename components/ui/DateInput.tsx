'use client'

import React, { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { cn } from '@/lib/utils/cn'
import 'react-datepicker/dist/react-datepicker.css'

export interface DateInputProps {
  label?: string
  error?: string
  helperText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  max?: string
  className?: string
  id?: string
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, label, error, helperText, value, onChange, required, max, id }, _ref) => {
    const inputId = id || `date-${Math.random().toString(36).substr(2, 9)}`

    // Convert string value to Date object
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value ? new Date(value) : null
    )

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date)
      if (onChange && date) {
        // Convert Date to ISO string format for form
        const isoString = date.toISOString().split('T')[0]
        const syntheticEvent = {
          target: { value: isoString },
          currentTarget: { value: isoString },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const maxDate = max ? new Date(max) : new Date()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {/* Calendar Icon */}
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <DatePicker
            id={inputId}
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            maxDate={maxDate}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            placeholderText="Select your birth date"
            className={cn(
              'w-full pl-11 pr-4 py-3 sm:py-2.5 rounded-lg border transition-all text-base',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'hover:border-gray-400 dark:hover:border-gray-500',
              'disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed',
              'touch-manipulation cursor-pointer',
              error
                ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600',
              className
            )}
            wrapperClassName="w-full"
            calendarClassName="custom-calendar"
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}

        <style jsx global>{`
          /* Custom DatePicker Styles */
          .react-datepicker-wrapper {
            width: 100%;
          }

          .react-datepicker-popper {
            z-index: 9999 !important;
          }

          .react-datepicker {
            font-family: inherit;
            border: 1px solid rgb(229, 231, 235);
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            background: white;
          }

          .dark .react-datepicker {
            background: rgb(31, 41, 55);
            border-color: rgb(75, 85, 99);
          }

          .react-datepicker__header {
            background: linear-gradient(to bottom, rgb(249, 250, 251), rgb(243, 244, 246));
            border-bottom: 1px solid rgb(229, 231, 235);
            border-radius: 12px 12px 0 0;
            padding-top: 12px;
          }

          .dark .react-datepicker__header {
            background: linear-gradient(to bottom, rgb(55, 65, 81), rgb(31, 41, 55));
            border-bottom-color: rgb(75, 85, 99);
          }

          .react-datepicker__current-month {
            color: rgb(17, 24, 39);
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 8px;
          }

          .dark .react-datepicker__current-month {
            color: rgb(243, 244, 246);
          }

          .react-datepicker__day-name {
            color: rgb(107, 114, 128);
            font-weight: 600;
            font-size: 0.875rem;
            width: 2.5rem;
            line-height: 2.5rem;
            margin: 0.125rem;
          }

          .dark .react-datepicker__day-name {
            color: rgb(156, 163, 175);
          }

          .react-datepicker__day {
            color: rgb(55, 65, 81);
            width: 2.5rem;
            line-height: 2.5rem;
            margin: 0.125rem;
            border-radius: 8px;
            transition: all 0.2s;
            font-weight: 500;
          }

          .dark .react-datepicker__day {
            color: rgb(209, 213, 219);
          }

          .react-datepicker__day:hover {
            background: rgb(243, 244, 246);
            transform: scale(1.05);
          }

          .dark .react-datepicker__day:hover {
            background: rgb(55, 65, 81);
          }

          .react-datepicker__day--selected {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            font-weight: 600;
            transform: scale(1.05);
          }

          .react-datepicker__day--keyboard-selected {
            background: rgb(224, 231, 255);
            color: rgb(79, 70, 229);
          }

          .dark .react-datepicker__day--keyboard-selected {
            background: rgb(55, 48, 163);
            color: rgb(199, 210, 254);
          }

          .react-datepicker__day--today {
            font-weight: 700;
            color: rgb(99, 102, 241);
            background: rgb(238, 242, 255);
          }

          .dark .react-datepicker__day--today {
            color: rgb(165, 180, 252);
            background: rgb(49, 46, 129);
          }

          .react-datepicker__day--disabled {
            color: rgb(209, 213, 219) !important;
            cursor: not-allowed;
          }

          .dark .react-datepicker__day--disabled {
            color: rgb(75, 85, 99) !important;
          }

          .react-datepicker__day--outside-month {
            color: rgb(209, 213, 219);
          }

          .dark .react-datepicker__day--outside-month {
            color: rgb(75, 85, 99);
          }

          .react-datepicker__navigation {
            top: 16px;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            transition: all 0.2s;
          }

          .react-datepicker__navigation:hover {
            background: rgb(243, 244, 246);
          }

          .dark .react-datepicker__navigation:hover {
            background: rgb(55, 65, 81);
          }

          .react-datepicker__navigation-icon::before {
            border-color: rgb(107, 114, 128);
            border-width: 2px 2px 0 0;
            height: 8px;
            width: 8px;
          }

          .dark .react-datepicker__navigation-icon::before {
            border-color: rgb(156, 163, 175);
          }

          .react-datepicker__month-container {
            padding: 8px;
          }

          .react-datepicker__month-dropdown,
          .react-datepicker__year-dropdown {
            background: white;
            border: 1px solid rgb(229, 231, 235);
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }

          .dark .react-datepicker__month-dropdown,
          .dark .react-datepicker__year-dropdown {
            background: rgb(31, 41, 55);
            border-color: rgb(75, 85, 99);
          }

          .react-datepicker__month-option,
          .react-datepicker__year-option {
            padding: 8px 12px;
            color: rgb(55, 65, 81);
          }

          .dark .react-datepicker__month-option,
          .dark .react-datepicker__year-option {
            color: rgb(209, 213, 219);
          }

          .react-datepicker__month-option:hover,
          .react-datepicker__year-option:hover {
            background: rgb(243, 244, 246);
          }

          .dark .react-datepicker__month-option:hover,
          .dark .react-datepicker__year-option:hover {
            background: rgb(55, 65, 81);
          }

          .react-datepicker__month-option--selected,
          .react-datepicker__year-option--selected {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: 600;
          }
        `}</style>
      </div>
    )
  }
)

DateInput.displayName = 'DateInput'

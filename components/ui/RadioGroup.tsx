'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface RadioOption {
  value: string
  label: string
}

export interface RadioGroupProps {
  label?: string
  error?: string
  helperText?: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  required?: boolean
  className?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, error, helperText, options, value, onChange, name, required, className }, ref) => {
    return (
      <div className={cn('w-full', className)} ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all',
                'hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50/50 dark:hover:bg-primary-900/20',
                'touch-manipulation flex-1 min-w-[100px] justify-center',
                value === option.value
                  ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100 font-medium'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                required={required}
              />
              <span className="text-base">{option.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

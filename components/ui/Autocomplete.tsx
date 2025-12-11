'use client'

import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

export interface AutocompleteOption {
  value: string
  label: string
}

export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  error?: string
  helperText?: string
  options: AutocompleteOption[]
  onOptionSelect: (value: string) => void
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ className, label, error, helperText, options, onOptionSelect, id, value, ...props }, ref) => {
    const inputId = id || `autocomplete-${Math.random().toString(36).substr(2, 9)}`
    const [inputValue, setInputValue] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(options)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowDropdown(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)

      if (value.trim() === '') {
        setFilteredOptions(options)
        setShowDropdown(false)
      } else {
        const filtered = options.filter(option =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredOptions(filtered)
        setShowDropdown(true)
      }
    }

    const handleOptionClick = (option: AutocompleteOption) => {
      setInputValue(option.label)
      setShowDropdown(false)
      onOptionSelect(option.value)
    }

    const handleFocus = () => {
      if (inputValue.trim() !== '') {
        setShowDropdown(true)
      }
    }

    return (
      <div className="w-full" ref={containerRef}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={cn(
              'w-full px-4 py-3 sm:py-2.5 rounded-lg border transition-colors text-base',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed',
              'touch-manipulation',
              error
                ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            autoComplete="off"
            {...props}
          />
          {showDropdown && filteredOptions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg dark:shadow-2xl max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-base text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
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
      </div>
    )
  }
)

Autocomplete.displayName = 'Autocomplete'

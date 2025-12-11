/**
 * Date utility functions
 */

import { format } from 'date-fns'

/**
 * Format date for display
 */
export function formatDate(date: Date, formatStr: string = 'MMMM d, yyyy'): string {
  return format(date, formatStr)
}

/**
 * Parse time string (HH:mm) to hours and minutes
 */
export function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return { hours: hours || 0, minutes: minutes || 0 }
}

/**
 * Combine date and time into a single Date object
 */
export function combineDateAndTime(date: Date, timeStr: string): Date {
  const { hours, minutes } = parseTime(timeStr)
  const combined = new Date(date)
  combined.setHours(hours, minutes, 0, 0)
  return combined
}

/**
 * Get current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

/**
 * Check if date is valid
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime())
}


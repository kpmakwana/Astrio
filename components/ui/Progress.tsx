import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, showLabel = false, color = 'primary', ...props }, ref) => {
    const normalizedValue = Math.max(0, Math.min(100, value))
    
    const colorClasses = {
      primary: 'bg-primary-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600',
    }
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="flex items-center justify-between mb-1">
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">
              {normalizedValue}%
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300 ease-out rounded-full', colorClasses[color])}
            style={{ width: `${normalizedValue}%` }}
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'


import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { ImportantDate } from '@/lib/types'
import { format } from 'date-fns'
import { cn } from '@/lib/utils/cn'

interface ImportantDatesProps {
  dates: ImportantDate[]
}

const dateTypeStyles = {
  auspicious: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700',
  challenging: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
  neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600',
}

export function ImportantDates({ dates }: ImportantDatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dates.map((date, index) => (
            <div
              key={index}
              className={cn(
                'p-3 sm:p-4 rounded-lg border-2',
                dateTypeStyles[date.type]
              )}
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-semibold text-sm sm:text-base">
                      {format(date.date, 'MMMM d, yyyy')}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 self-start">
                      {date.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1 leading-relaxed">{date.description}</p>
                  <p className="text-sm opacity-90 leading-relaxed">{date.significance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


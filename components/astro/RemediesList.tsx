import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Remedy } from '@/lib/types'

interface RemediesListProps {
  remedies: Remedy[]
}

const remedyIcons: Record<Remedy['type'], string> = {
  mantra: '🕉️',
  gemstone: '💎',
  donation: '🙏',
  ritual: '🕯️',
  diet: '🥗',
}

export function RemediesList({ remedies }: RemediesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Remedies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {remedies.map((remedy, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors bg-white dark:bg-gray-800/50"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl flex-shrink-0">{remedyIcons[remedy.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{remedy.title}</h4>
                    <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2 py-1 rounded self-start">
                      {remedy.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{remedy.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-2 sm:p-3 rounded border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{remedy.instructions}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Frequency:</span> {remedy.frequency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


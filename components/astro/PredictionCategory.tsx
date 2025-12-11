import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import type { PredictionCategory as PredictionCategoryType } from '@/lib/types'

interface PredictionCategoryProps {
  title: string
  category: PredictionCategoryType
}

export function PredictionCategory({ title, category }: PredictionCategoryProps) {
  const getProgressColor = (score: number): 'primary' | 'success' | 'warning' | 'danger' => {
    if (score >= 70) return 'success'
    if (score >= 50) return 'primary'
    if (score >= 30) return 'warning'
    return 'danger'
  }
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{category.score}</span>
        </div>
        <Progress value={category.score} color={getProgressColor(category.score)} showLabel />
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{category.description}</p>

        {category.positiveAspects.length > 0 && (
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Positive Aspects</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {category.positiveAspects.map((aspect, index) => (
                <li key={index}>{aspect}</li>
              ))}
            </ul>
          </div>
        )}

        {category.challenges.length > 0 && (
          <div>
            <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Challenges</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {category.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {category.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {category.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


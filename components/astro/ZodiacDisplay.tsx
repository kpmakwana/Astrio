import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ZODIAC_SIGNS } from '@/lib/constants'
import type { ZodiacSign } from '@/lib/types'
import { cn } from '@/lib/utils/cn'

interface ZodiacDisplayProps {
  sign: ZodiacSign
  title?: string
  className?: string
}

export function ZodiacDisplay({ sign, title, className }: ZodiacDisplayProps) {
  const zodiacInfo = ZODIAC_SIGNS[sign]
  
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="text-xl">{title || zodiacInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-5xl sm:text-6xl flex-shrink-0">{zodiacInfo.symbol}</div>
          <div className="min-w-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-medium">Element:</span> {zodiacInfo.element}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Sign:</span> {zodiacInfo.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


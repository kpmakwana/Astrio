import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PLANETS, ZODIAC_SIGNS } from '@/lib/constants'
import type { PlanetaryPosition } from '@/lib/types'

interface PlanetaryPositionsProps {
  positions: PlanetaryPosition[]
}

export function PlanetaryPositions({ positions }: PlanetaryPositionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planetary Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {positions
            .filter((position) => {
              // Filter out invalid positions
              return PLANETS[position.planet] && ZODIAC_SIGNS[position.sign]
            })
            .map((position) => {
            const planetInfo = PLANETS[position.planet]!
            const signInfo = ZODIAC_SIGNS[position.sign]!
            
            return (
              <div
                key={position.planet}
                className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{planetInfo.symbol}</span>
                    <span className="font-semibold text-gray-900">
                      {planetInfo.name}
                    </span>
                  </div>
                  {planetInfo.isRetrograde && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Retrograde
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Sign:</span>{' '}
                    <span className="text-gray-900">{signInfo.symbol} {signInfo.name}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">House:</span>{' '}
                    <span className="text-gray-900">{position.house}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Degree:</span>{' '}
                    <span className="text-gray-900">{position.degree.toFixed(2)}°</span>
                  </p>
                  {position.nakshatra && (
                    <p className="text-gray-600">
                      <span className="font-medium">Nakshatra:</span>{' '}
                      <span className="text-gray-900">{position.nakshatra}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}


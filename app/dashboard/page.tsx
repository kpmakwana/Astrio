'use client'

import { useState } from 'react'
import { BirthDetailsForm } from '@/components/forms/BirthDetailsForm'
import { ZodiacDisplay } from '@/components/astro/ZodiacDisplay'
import { PlanetaryPositions } from '@/components/astro/PlanetaryPositions'
import { PredictionCategory } from '@/components/astro/PredictionCategory'
import { RemediesList } from '@/components/astro/RemediesList'
import { ImportantDates } from '@/components/astro/ImportantDates'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAstroData } from '@/hooks/useAstroData'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

export default function DashboardPage() {
  const { chart, prediction, isLoading, error, generateReport, reset } = useAstroData()
  const [selectedYear] = useState(new Date().getFullYear())
  
  const handleFormSubmit = async (formData: BirthDetailsFormInput) => {
    await generateReport(formData, selectedYear)
  }
  
  const handleReset = () => {
    reset()
  }
  
  if (chart && prediction) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Your Astrology Report
                </h1>
                <p className="text-sm sm:text-base text-gray-600 break-words">
                  Generated for {chart.birthDetails.name} • Year {prediction.year}
                </p>
              </div>
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base"
              >
                Generate New Report
              </Button>
            </div>
          </div>
          
          {/* Overall Summary */}
          <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl">Overall Prediction</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Overall Score: <span className="font-bold text-primary-600">{prediction.overallScore}/100</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{prediction.summary}</p>
            </CardContent>
          </Card>
          
          {/* Dasha Influence */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Dasha Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-700">{prediction.dashaInfluence.influence}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Effects:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {prediction.dashaInfluence.effects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Birth Chart Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <ZodiacDisplay sign={chart.ascendant} title="Ascendant (Lagna)" />
            <PlanetaryPositions positions={chart.planetaryPositions} />
          </div>
          
          {/* Predictions */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Yearly Predictions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <PredictionCategory title="Career" category={prediction.career} />
              <PredictionCategory title="Finance" category={prediction.finance} />
              <PredictionCategory title="Health" category={prediction.health} />
              <PredictionCategory title="Relationships" category={prediction.relationships} />
              <PredictionCategory title="Education" category={prediction.education} />
              <PredictionCategory title="Travel" category={prediction.travel} />
            </div>
          </div>
          
          {/* Important Dates */}
          <div className="mb-8">
            <ImportantDates dates={prediction.importantDates} />
          </div>
          
          {/* Remedies */}
          <div className="mb-8">
            <RemediesList remedies={prediction.remedies} />
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        {error && (
          <Card className="mb-6 border-red-300 bg-red-50 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm sm:text-base">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <BirthDetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}


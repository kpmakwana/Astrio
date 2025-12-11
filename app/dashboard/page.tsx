'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { BirthDetailsForm } from '@/components/forms/BirthDetailsForm'
import { ZodiacDisplay } from '@/components/astro/ZodiacDisplay'
import { PlanetaryPositions } from '@/components/astro/PlanetaryPositions'
import { PredictionCategory } from '@/components/astro/PredictionCategory'
import { RemediesList } from '@/components/astro/RemediesList'
import { ImportantDates } from '@/components/astro/ImportantDates'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { useAstroData } from '@/hooks/useAstroData'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

export default function DashboardPage() {
  const { chart, prediction, isLoading, error, generateReport, reset } = useAstroData()
  const [selectedYear] = useState(new Date().getFullYear())

  // Scroll to top when report is generated
  useEffect(() => {
    if (chart && prediction) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [chart, prediction])
  
  const handleFormSubmit = async (formData: BirthDetailsFormInput) => {
    await generateReport(formData, selectedYear)
  }
  
  const handleReset = () => {
    reset()
  }
  
  if (chart && prediction) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header showActions onNewReport={handleReset} />

        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Report Info */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Your Astrology Report
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {chart.birthDetails.name} • Year {prediction.year}
            </p>
          </div>
          
          {/* Overall Summary */}
          <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 border-primary-200 dark:border-primary-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white">Overall Prediction</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2 text-gray-700 dark:text-gray-300">
                Overall Score: <span className="font-bold text-primary-600 dark:text-primary-400">{prediction.overallScore}/100</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">{prediction.summary}</p>
            </CardContent>
          </Card>
          
          {/* Dasha Influence */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Dasha Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">{prediction.dashaInfluence.influence}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Effects:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />

      {/* Main Content */}
      <main className="py-6 sm:py-8 md:py-12 px-3 sm:px-4">
        <div className="max-w-lg mx-auto">
          {error && (
            <Card className="mb-4 sm:mb-6 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 dark:text-red-300 text-sm sm:text-base">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <BirthDetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              © 2025 Astrio. Vedic astrology predictions for your life journey.
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              <button className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy</button>
              <span>•</span>
              <button className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms</button>
              <span>•</span>
              <button className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


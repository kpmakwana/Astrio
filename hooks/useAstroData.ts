'use client'

import { useState, useCallback } from 'react'
import type { BirthChart, YearlyPrediction } from '@/lib/types'
import { processBirthDetailsAndGeneratePrediction } from '@/app/actions/astrology'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

interface UseAstroDataReturn {
  chart: BirthChart | null
  prediction: YearlyPrediction | null
  isLoading: boolean
  error: string | null
  generateReport: (formData: BirthDetailsFormInput, year?: number) => Promise<void>
  reset: () => void
}

/**
 * Custom hook for managing astrology data and predictions
 */
export function useAstroData(): UseAstroDataReturn {
  const [chart, setChart] = useState<BirthChart | null>(null)
  const [prediction, setPrediction] = useState<YearlyPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const generateReport = useCallback(async (
    formData: BirthDetailsFormInput,
    year: number = new Date().getFullYear()
  ) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await processBirthDetailsAndGeneratePrediction(formData, year)
      setChart(result.chart)
      setPrediction(result.prediction)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      setChart(null)
      setPrediction(null)
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  const reset = useCallback(() => {
    setChart(null)
    setPrediction(null)
    setError(null)
    setIsLoading(false)
  }, [])
  
  return {
    chart,
    prediction,
    isLoading,
    error,
    generateReport,
    reset,
  }
}


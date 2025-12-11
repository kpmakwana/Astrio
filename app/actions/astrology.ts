'use server'

/**
 * Server Actions for astrology calculations and predictions
 * These run on the server to keep calculation logic secure and performant
 */

import { generateBirthChart } from '@/lib/astrology/calculations'
import { generateYearlyPrediction } from '@/lib/prediction/generator'
import type { BirthDetails, BirthChart, YearlyPrediction } from '@/lib/types'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

/**
 * Convert form input to BirthDetails type
 */
function formDataToBirthDetails(data: BirthDetailsFormInput): BirthDetails {
  return {
    name: data.name,
    dateOfBirth: new Date(data.dateOfBirth),
    timeOfBirth: data.timeOfBirth,
    placeOfBirth: data.placeOfBirth,
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
    timezone: data.timezone,
    gender: data.gender,
  }
}

/**
 * Generate birth chart from birth details
 */
export async function calculateBirthChart(
  formData: BirthDetailsFormInput
): Promise<BirthChart> {
  try {
    const birthDetails = formDataToBirthDetails(formData)
    const chart = generateBirthChart(birthDetails)
    return chart
  } catch (error) {
    console.error('Error calculating birth chart:', error)
    throw new Error('Failed to calculate birth chart. Please check your input data.')
  }
}

/**
 * Generate yearly prediction from birth chart
 */
export async function generatePrediction(
  chart: BirthChart,
  year: number = new Date().getFullYear()
): Promise<YearlyPrediction> {
  try {
    const prediction = generateYearlyPrediction(chart, year)
    return prediction
  } catch (error) {
    console.error('Error generating prediction:', error)
    throw new Error('Failed to generate prediction. Please try again.')
  }
}

/**
 * Combined action: Calculate chart and generate prediction
 */
export async function processBirthDetailsAndGeneratePrediction(
  formData: BirthDetailsFormInput,
  year: number = new Date().getFullYear()
): Promise<{ chart: BirthChart; prediction: YearlyPrediction }> {
  try {
    const chart = await calculateBirthChart(formData)
    const prediction = await generatePrediction(chart, year)
    return { chart, prediction }
  } catch (error) {
    console.error('Error processing birth details:', error)
    throw error
  }
}


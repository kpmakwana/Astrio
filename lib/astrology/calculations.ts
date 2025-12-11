/**
 * Core astrology calculation functions
 * These functions compute planetary positions, houses, and chart data
 * 
 * Note: In production, you would integrate with Swiss Ephemeris (swisseph)
 * or a similar astronomical calculation library for accurate positions.
 * This is a simplified implementation for demonstration.
 */

import type {
  BirthDetails,
  BirthChart,
  PlanetaryPosition,
  ZodiacSign,
  Planet,
  House,
  DashaPeriod,
  SubDashaPeriod,
} from '../types'
import { DASHA_ORDER, DASHA_DURATIONS, NAKSHATRAS } from '../constants'

/**
 * Calculate zodiac sign from degree (0-360)
 */
export function getZodiacSign(degree: number): ZodiacSign {
  // Ensure degree is a valid number
  if (isNaN(degree) || !isFinite(degree)) {
    return 'aries' // Default fallback
  }
  
  // Normalize degree to 0-360 range
  const normalizedDegree = ((degree % 360) + 360) % 360
  const signIndex = Math.floor(normalizedDegree / 30)
  const signs: ZodiacSign[] = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ]
  return signs[signIndex % 12]
}

/**
 * Calculate house number from degree and ascendant
 */
export function getHouse(degree: number, ascendantDegree: number): House {
  const diff = (degree - ascendantDegree + 360) % 360
  const house = Math.floor(diff / 30) + 1
  return (house > 12 ? house - 12 : house) as House
}

/**
 * Calculate nakshatra from moon degree
 */
export function getNakshatra(moonDegree: number): { name: string; lord: Planet } {
  const nakshatraIndex = Math.floor(moonDegree / (360 / 27))
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27]
  
  // Nakshatra lords cycle: Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury
  const lords: Planet[] = ['ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury']
  const lordIndex = Math.floor(nakshatraIndex / 3) % 9
  const lord = lords[lordIndex]
  
  return { name: nakshatra, lord }
}

/**
 * Calculate planetary positions
 * In production, use Swiss Ephemeris for accurate calculations
 */
export function calculatePlanetaryPositions(
  birthDetails: BirthDetails
): PlanetaryPosition[] {
  const birthDate = new Date(birthDetails.dateOfBirth)
  const [hours, minutes] = birthDetails.timeOfBirth.split(':').map(Number)
  birthDate.setHours(hours, minutes, 0, 0)
  
  // Simplified calculation - in production, use astronomical libraries
  // This is a placeholder that generates realistic-looking positions
  const baseTime = birthDate.getTime() / (1000 * 60 * 60 * 24) // days since epoch
  
  const planets: Planet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'rahu', 'ketu']
  
  return planets.map((planet, index) => {
    // Simplified: each planet moves at different rates
    const rates = [1, 13, 4, 1.6, 0.5, 0.08, 0.03, -0.05, -0.05]
    const baseDegrees = [0, 30, 60, 90, 120, 150, 180, 210, 240]
    const degree = (baseDegrees[index] + baseTime * rates[index]) % 360
    
    // Ensure degree is valid
    const validDegree = isNaN(degree) || !isFinite(degree) ? 0 : degree
    const sign = getZodiacSign(validDegree)
    
    return {
      planet,
      sign,
      degree: validDegree,
      house: 1 as House, // Will be recalculated after ascendant
      nakshatra: '',
      nakshatraLord: 'sun',
    }
  })
}

/**
 * Calculate ascendant (Lagna)
 */
export function calculateAscendant(birthDetails: BirthDetails): { sign: ZodiacSign; degree: number } {
  // Simplified calculation - in production, use proper sidereal time calculation
  const [hours, minutes] = birthDetails.timeOfBirth.split(':').map(Number)
  const localTime = hours + minutes / 60
  
  // Rough approximation based on time and location
  const baseDegree = (localTime * 15 + birthDetails.longitude) % 360
  const sign = getZodiacSign(baseDegree)
  
  return { sign, degree: baseDegree }
}

/**
 * Calculate house cusps
 */
export function calculateHouses(ascendantDegree: number): Record<House, ZodiacSign> {
  const houses: Partial<Record<House, ZodiacSign>> = {}
  
  for (let i = 1; i <= 12; i++) {
    const houseDegree = (ascendantDegree + (i - 1) * 30) % 360
    houses[i as House] = getZodiacSign(houseDegree)
  }
  
  return houses as Record<House, ZodiacSign>
}

/**
 * Calculate Vimshottari Dasha periods
 */
export function calculateDashaPeriods(
  birthDate: Date,
  moonNakshatraLord: Planet
): DashaPeriod[] {
  const periods: DashaPeriod[] = []
  let currentDate = new Date(birthDate)
  
  // Find starting dasha based on moon's nakshatra lord
  const startIndex = DASHA_ORDER.indexOf(moonNakshatraLord)
  
  for (let i = 0; i < 9; i++) {
    const planetIndex = (startIndex + i) % 9
    const planet = DASHA_ORDER[planetIndex]
    const duration = DASHA_DURATIONS[planet]
    
    const startDate = new Date(currentDate)
    const endDate = new Date(currentDate)
    endDate.setFullYear(endDate.getFullYear() + duration)
    
    // Calculate sub-periods
    const subPeriods = calculateSubDashaPeriods(startDate, planet)
    
    periods.push({
      planet,
      startDate,
      endDate,
      subPeriods,
    })
    
    currentDate = endDate
  }
  
  return periods
}

/**
 * Calculate sub-dasha periods (Antar Dasha)
 */
function calculateSubDashaPeriods(startDate: Date, mainPlanet: Planet): DashaPeriod['subPeriods'] {
  const subPeriods: Array<SubDashaPeriod> = []
  let currentDate = new Date(startDate)
  const mainDuration = DASHA_DURATIONS[mainPlanet]
  
  const startIndex = DASHA_ORDER.indexOf(mainPlanet)
  
  for (let i = 0; i < 9; i++) {
    const planetIndex = (startIndex + i) % 9
    const planet = DASHA_ORDER[planetIndex]
    const subDuration = (DASHA_DURATIONS[planet] / 120) * mainDuration
    
    const subStartDate = new Date(currentDate)
    const subEndDate = new Date(currentDate)
    subEndDate.setFullYear(subEndDate.getFullYear() + subDuration)
    
    subPeriods.push({
      planet,
      startDate: subStartDate,
      endDate: subEndDate,
    })
    
    currentDate = subEndDate
  }
  
  return subPeriods
}

/**
 * Main function to generate complete birth chart
 */
export function generateBirthChart(birthDetails: BirthDetails): BirthChart {
  const ascendant = calculateAscendant(birthDetails)
  const houses = calculateHouses(ascendant.degree)
  const planetaryPositions = calculatePlanetaryPositions(birthDetails)
  
  // Update house positions for each planet
  const updatedPositions = planetaryPositions.map((pos) => ({
    ...pos,
    house: getHouse(pos.degree, ascendant.degree),
  }))
  
  // Calculate moon's nakshatra for dasha calculation
  const moonPosition = updatedPositions.find((p) => p.planet === 'moon')
  const moonNakshatra = moonPosition
    ? getNakshatra(moonPosition.degree)
    : { name: 'Ashwini', lord: 'ketu' as Planet }
  
  // Update moon's nakshatra info
  if (moonPosition) {
    const moonIndex = updatedPositions.findIndex((p) => p.planet === 'moon')
    updatedPositions[moonIndex] = {
      ...moonPosition,
      nakshatra: moonNakshatra.name,
      nakshatraLord: moonNakshatra.lord,
    }
  }
  
  const birthDate = new Date(birthDetails.dateOfBirth)
  const [hours, minutes] = birthDetails.timeOfBirth.split(':').map(Number)
  birthDate.setHours(hours, minutes, 0, 0)
  
  const dashaPeriods = calculateDashaPeriods(birthDate, moonNakshatra.lord as Planet)
  
  return {
    birthDetails,
    ascendant: ascendant.sign,
    planetaryPositions: updatedPositions,
    houses,
    dashaPeriods,
  }
}


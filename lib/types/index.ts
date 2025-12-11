/**
 * Core TypeScript types for the Astrology application
 * All types are strictly typed with no 'any' usage
 */

export type Gender = 'male' | 'female' | 'other'

export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces'

export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'rahu'
  | 'ketu'

export type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type DashaPeriod = {
  planet: Planet
  startDate: Date
  endDate: Date
  subPeriods: SubDashaPeriod[]
}

export type SubDashaPeriod = {
  planet: Planet
  startDate: Date
  endDate: Date
}

/**
 * User birth details input
 */
export interface BirthDetails {
  name: string
  dateOfBirth: Date
  timeOfBirth: string // HH:mm format
  placeOfBirth: string
  latitude: number
  longitude: number
  timezone: string
  gender: Gender
}

/**
 * Calculated planetary positions
 */
export interface PlanetaryPosition {
  planet: Planet
  sign: ZodiacSign
  degree: number // 0-360
  house: House
  nakshatra: string
  nakshatraLord: Planet
}

/**
 * Complete birth chart data
 */
export interface BirthChart {
  birthDetails: BirthDetails
  ascendant: ZodiacSign
  planetaryPositions: PlanetaryPosition[]
  houses: Record<House, ZodiacSign>
  dashaPeriods: DashaPeriod[]
}

/**
 * Yearly prediction data
 */
export interface YearlyPrediction {
  year: number
  overallScore: number // 0-100
  summary: string
  career: PredictionCategory
  finance: PredictionCategory
  health: PredictionCategory
  relationships: PredictionCategory
  education: PredictionCategory
  travel: PredictionCategory
  importantDates: ImportantDate[]
  remedies: Remedy[]
  dashaInfluence: DashaInfluence
}

export interface PredictionCategory {
  score: number // 0-100
  description: string
  positiveAspects: string[]
  challenges: string[]
  recommendations: string[]
}

export interface ImportantDate {
  date: Date
  type: 'auspicious' | 'challenging' | 'neutral'
  description: string
  significance: string
}

export interface Remedy {
  type: 'mantra' | 'gemstone' | 'donation' | 'ritual' | 'diet'
  title: string
  description: string
  instructions: string
  frequency: string
}

export interface DashaInfluence {
  currentDasha: Planet
  currentSubDasha: Planet
  influence: string
  effects: string[]
}

/**
 * Form state types
 */
export interface BirthDetailsFormData {
  name: string
  dateOfBirth: string // ISO date string
  timeOfBirth: string // HH:mm
  placeOfBirth: string
  latitude: string
  longitude: string
  timezone: string
  gender: Gender
}


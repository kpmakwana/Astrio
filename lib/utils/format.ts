/**
 * Formatting utility functions
 */

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Format zodiac sign name (e.g., "aries" -> "Aries")
 */
export function formatZodiacSign(sign: string): string {
  return capitalize(sign)
}

/**
 * Format planet name (e.g., "sun" -> "Sun")
 */
export function formatPlanetName(planet: string): string {
  return capitalize(planet)
}

/**
 * Format score with percentage
 */
export function formatScore(score: number): string {
  return `${Math.round(score)}/100`
}

/**
 * Format degree with symbol
 */
export function formatDegree(degree: number): string {
  return `${degree.toFixed(2)}°`
}


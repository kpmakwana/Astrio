'use client'

import { useState, useCallback } from 'react'
import type { BirthChart, YearlyPrediction } from '@/lib/types'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

interface UseAstroDataReturn {
  chart: BirthChart | null
  prediction: YearlyPrediction | null
  isLoading: boolean
  error: string | null
  generateReport: (formData: BirthDetailsFormInput, year?: number) => Promise<void>
  reset: () => void
}

// Hardcoded sample data
const createHardcodedData = (formData: BirthDetailsFormInput, year: number) => {
  const birthDate = new Date(formData.dateOfBirth)

  const chart: BirthChart = {
    birthDetails: {
      name: formData.name,
      dateOfBirth: birthDate,
      timeOfBirth: formData.timeOfBirth,
      placeOfBirth: formData.placeOfBirth,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      timezone: formData.timezone,
      gender: formData.gender,
    },
    ascendant: 'leo',
    planetaryPositions: [
      { planet: 'sun', sign: 'aries', degree: 15.5, house: 9, nakshatra: 'Bharani', nakshatraLord: 'venus' },
      { planet: 'moon', sign: 'taurus', degree: 22.3, house: 10, nakshatra: 'Rohini', nakshatraLord: 'moon' },
      { planet: 'mercury', sign: 'aries', degree: 8.2, house: 9, nakshatra: 'Ashwini', nakshatraLord: 'ketu' },
      { planet: 'venus', sign: 'pisces', degree: 28.7, house: 8, nakshatra: 'Revati', nakshatraLord: 'mercury' },
      { planet: 'mars', sign: 'gemini', degree: 12.1, house: 11, nakshatra: 'Ardra', nakshatraLord: 'rahu' },
      { planet: 'jupiter', sign: 'sagittarius', degree: 18.9, house: 5, nakshatra: 'Purva Ashadha', nakshatraLord: 'venus' },
      { planet: 'saturn', sign: 'capricorn', degree: 25.4, house: 6, nakshatra: 'Dhanishta', nakshatraLord: 'mars' },
      { planet: 'rahu', sign: 'cancer', degree: 6.8, house: 12, nakshatra: 'Pushya', nakshatraLord: 'saturn' },
      { planet: 'ketu', sign: 'capricorn', degree: 6.8, house: 6, nakshatra: 'Uttara Ashadha', nakshatraLord: 'sun' },
    ],
    houses: {
      1: 'leo',
      2: 'virgo',
      3: 'libra',
      4: 'scorpio',
      5: 'sagittarius',
      6: 'capricorn',
      7: 'aquarius',
      8: 'pisces',
      9: 'aries',
      10: 'taurus',
      11: 'gemini',
      12: 'cancer',
    },
    dashaPeriods: [],
  }

  const prediction: YearlyPrediction = {
    year,
    overallScore: 75,
    summary: `${year} promises to be a transformative year with significant opportunities for personal and professional growth. Your planetary alignments suggest a period of balanced energies, with Jupiter's favorable aspect bringing wisdom and expansion to your endeavors.`,
    career: {
      score: 78,
      description: 'Strong professional growth is indicated this year. Leadership opportunities and recognition for your hard work are on the horizon.',
      positiveAspects: [
        'Excellent chances for promotion or new job offers',
        'Recognition from superiors and peers',
        'Success in collaborative projects and team leadership',
      ],
      challenges: [
        'May face initial resistance to new ideas',
        'Busy schedule could lead to work-life balance issues',
      ],
      recommendations: [
        'Network actively and build professional relationships',
        'Take on challenging projects that showcase your skills',
        'Maintain work-life balance to avoid burnout',
      ],
    },
    finance: {
      score: 72,
      description: 'Financial stability with opportunities for growth through investments and new income streams.',
      positiveAspects: [
        'Steady income with potential for raises or bonuses',
        'Good time for long-term investments',
        'Unexpected financial gains through partnerships',
      ],
      challenges: [
        'Tendency to overspend on luxury items',
        'Need to be cautious with speculative investments',
      ],
      recommendations: [
        'Create a solid savings plan for future goals',
        'Diversify income sources',
        'Seek professional financial advice before major investments',
      ],
    },
    health: {
      score: 68,
      description: 'Overall health remains stable with need for preventive care and stress management.',
      positiveAspects: [
        'Good energy levels for physical activities',
        'Strong recovery ability from minor ailments',
        'Mental clarity and emotional balance',
      ],
      challenges: [
        'Stress from work could affect sleep quality',
        'Need to watch diet and digestive health',
      ],
      recommendations: [
        'Establish regular exercise routine',
        'Practice meditation or yoga for stress relief',
        'Get regular health checkups',
      ],
    },
    relationships: {
      score: 80,
      description: 'Harmonious period for relationships with deepening bonds and new meaningful connections.',
      positiveAspects: [
        'Strengthening of existing relationships',
        'New friendships and romantic opportunities',
        'Better communication with family members',
      ],
      challenges: [
        'Need to balance personal time with social commitments',
        'Occasional misunderstandings due to communication gaps',
      ],
      recommendations: [
        'Express appreciation to loved ones regularly',
        'Make time for quality interactions',
        'Work on active listening and clear communication',
      ],
    },
    education: {
      score: 76,
      description: 'Favorable period for learning and intellectual pursuits with enhanced comprehension abilities.',
      positiveAspects: [
        'Quick grasp of new concepts and skills',
        'Success in competitive exams or certifications',
        'Opportunities for higher education or specialized training',
      ],
      challenges: [
        'Distractions from multiple interests',
        'Need for consistent study schedule',
      ],
      recommendations: [
        'Set clear learning goals and deadlines',
        'Join study groups or find mentors',
        'Balance theoretical knowledge with practical application',
      ],
    },
    travel: {
      score: 70,
      description: 'Good prospects for travel with opportunities for both leisure and professional journeys.',
      positiveAspects: [
        'Beneficial travel for career advancement',
        'Enriching cultural experiences',
        'Safe and comfortable journeys',
      ],
      challenges: [
        'Possible delays or changes in travel plans',
        'Need to be mindful of travel expenses',
      ],
      recommendations: [
        'Plan trips well in advance',
        'Keep travel documents organized',
        'Combine business travel with leisure when possible',
      ],
    },
    importantDates: [
      {
        date: new Date(year, 0, 15),
        type: 'auspicious',
        description: 'Makar Sankranti - Excellent for new beginnings',
        significance: 'Start new projects or ventures. Favorable for financial decisions.',
      },
      {
        date: new Date(year, 2, 8),
        type: 'auspicious',
        description: 'Maha Shivaratri - Spiritual awakening',
        significance: 'Perfect for meditation, spiritual practices, and self-reflection.',
      },
      {
        date: new Date(year, 3, 14),
        type: 'neutral',
        description: 'Solar Eclipse',
        significance: 'Time for introspection. Avoid major decisions or new ventures.',
      },
      {
        date: new Date(year, 5, 21),
        type: 'auspicious',
        description: 'International Yoga Day',
        significance: 'Begin new health routines or wellness practices.',
      },
      {
        date: new Date(year, 8, 17),
        type: 'challenging',
        description: 'Mercury Retrograde begins',
        significance: 'Exercise caution in communication and contracts. Review rather than start new projects.',
      },
      {
        date: new Date(year, 9, 24),
        type: 'auspicious',
        description: 'Diwali - Festival of Lights',
        significance: 'Highly auspicious for business ventures and financial investments.',
      },
    ],
    remedies: [
      {
        type: 'mantra',
        title: 'Gayatri Mantra',
        description: 'Powerful Vedic mantra for wisdom and spiritual enlightenment',
        instructions: 'Chant "Om Bhur Bhuvaḥ Swaḥ, Tat Savitur Varenyam, Bhargo Devasya Dhīmahi, Dhiyo Yo Naḥ Prachodayāt" with devotion',
        frequency: 'Daily at sunrise, 108 times',
      },
      {
        type: 'gemstone',
        title: 'Yellow Sapphire (Pukhraj)',
        description: 'Strengthens Jupiter, brings wisdom, prosperity, and good fortune',
        instructions: 'Wear on index finger of right hand in gold setting, minimum 3 carats. Consult astrologer for activation ritual.',
        frequency: 'Wear continuously after proper activation',
      },
      {
        type: 'donation',
        title: 'Feed the Needy',
        description: 'Charitable acts to reduce karmic debts and attract positive energy',
        instructions: 'Donate food, clothes, or money to underprivileged people or charitable organizations',
        frequency: 'Weekly, preferably on Thursdays',
      },
      {
        type: 'ritual',
        title: 'Hanuman Chalisa Recitation',
        description: 'Removes obstacles, brings courage, and protects from negative influences',
        instructions: 'Recite the complete Hanuman Chalisa with faith and concentration',
        frequency: 'Daily, especially on Tuesdays and Saturdays',
      },
      {
        type: 'diet',
        title: 'Sattvic Diet',
        description: 'Pure vegetarian diet to maintain mental clarity and spiritual growth',
        instructions: 'Include fresh fruits, vegetables, whole grains, dairy, nuts. Avoid processed foods, excessive spices, meat, and alcohol.',
        frequency: 'Follow consistently, especially during important planetary transits',
      },
    ],
    dashaInfluence: {
      currentDasha: 'jupiter',
      currentSubDasha: 'mercury',
      influence: 'Jupiter Mahadasha with Mercury Antardasha brings a harmonious blend of wisdom and communication skills. This is a favorable period for intellectual pursuits, education, and business growth.',
      effects: [
        'Enhanced learning capabilities and retention',
        'Success in communication-based professions',
        'Opportunities for travel and knowledge expansion',
        'Financial growth through intelligent investments',
        'Spiritual inclination and philosophical understanding',
      ],
    },
  }

  return { chart, prediction }
}

/**
 * Simplified hook with hardcoded astrology data
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const { chart: newChart, prediction: newPrediction } = createHardcodedData(formData, year)
      setChart(newChart)
      setPrediction(newPrediction)
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

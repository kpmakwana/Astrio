/**
 * Yearly prediction generation algorithms
 * Analyzes birth chart and generates personalized predictions
 */

import type {
  BirthChart,
  YearlyPrediction,
  PredictionCategory,
  ImportantDate,
  Remedy,
  DashaInfluence,
  Planet,
} from '../types'
import { PLANETS } from '../constants'

/**
 * Calculate overall score based on planetary positions and transits
 */
function calculateOverallScore(chart: BirthChart, year: number): number {
  // Simplified scoring algorithm
  // In production, this would consider:
  // - Planetary transits
  // - Dasha periods
  // - House strengths
  // - Aspect relationships
  
  let score = 50 // Base score
  
  // Adjust based on current dasha
  const currentDasha = getCurrentDasha(chart, year)
  const dashaMultipliers: Record<Planet, number> = {
    sun: 1.1,
    moon: 1.15,
    mercury: 1.05,
    venus: 1.2,
    mars: 0.9,
    jupiter: 1.25,
    saturn: 0.85,
    rahu: 0.95,
    ketu: 0.9,
  }
  
  score *= dashaMultipliers[currentDasha] || 1.0
  
  // Normalize to 0-100
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Get current dasha planet for a given year
 */
function getCurrentDasha(chart: BirthChart, year: number): Planet {
  const targetDate = new Date(year, 0, 1)
  
  for (const period of chart.dashaPeriods) {
    if (targetDate >= period.startDate && targetDate <= period.endDate) {
      // Check sub-dasha
      for (const subPeriod of period.subPeriods) {
        if (targetDate >= subPeriod.startDate && targetDate <= subPeriod.endDate) {
          return subPeriod.planet
        }
      }
      return period.planet
    }
  }
  
  return chart.dashaPeriods[0]?.planet || 'sun'
}

/**
 * Generate career prediction
 */
function generateCareerPrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 20) - 10
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 60
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `This year brings promising opportunities for career growth. Your professional endeavors will see significant progress.`
      : `Career may face some challenges this year. Focus on skill development and maintaining professional relationships.`,
    positiveAspects: isPositive
      ? [
          'New job opportunities may arise',
          'Recognition for your work',
          'Potential for promotion or salary increase',
        ]
      : [],
    challenges: isPositive
      ? ['Maintain work-life balance', 'Avoid overcommitment']
      : [
          'Competition in the workplace',
          'Need for additional skills',
          'Patience required for results',
        ],
    recommendations: [
      'Focus on building strong professional networks',
      'Consider upskilling or certification programs',
      'Maintain a positive attitude and work ethic',
    ],
  }
}

/**
 * Generate finance prediction
 */
function generateFinancePrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 15) - 7
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 55
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `Financial stability and growth are indicated. Investments made wisely can yield good returns.`
      : `Financial planning is crucial this year. Avoid impulsive spending and focus on savings.`,
    positiveAspects: isPositive
      ? [
          'Stable income flow',
          'Good time for investments',
          'Unexpected financial gains possible',
        ]
      : [],
    challenges: isPositive
      ? ['Avoid unnecessary expenses', 'Plan for long-term goals']
      : [
          'Need for careful budgeting',
          'Avoid risky investments',
          'Focus on debt management',
        ],
    recommendations: [
      'Create a detailed budget plan',
      'Consult financial advisors before major decisions',
      'Build an emergency fund',
    ],
  }
}

/**
 * Generate health prediction
 */
function generateHealthPrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 25) - 12
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 65
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `Overall health remains good. Focus on maintaining a balanced lifestyle and regular exercise.`
      : `Pay attention to health this year. Regular check-ups and preventive care are recommended.`,
    positiveAspects: isPositive
      ? [
          'Good energy levels',
          'Recovery from past health issues',
          'Mental well-being improves',
        ]
      : [],
    challenges: isPositive
      ? ['Maintain regular exercise routine', 'Watch your diet']
      : [
          'Stress management is important',
          'Regular health screenings needed',
          'Focus on preventive care',
        ],
    recommendations: [
      'Maintain a regular exercise routine',
      'Follow a balanced diet',
      'Get adequate rest and sleep',
      'Consider yoga or meditation',
    ],
  }
}

/**
 * Generate relationships prediction
 */
function generateRelationshipsPrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 18) - 9
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 58
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `Relationships flourish this year. Harmony and understanding strengthen bonds with loved ones.`
      : `Relationships may require extra attention and communication. Patience and understanding are key.`,
    positiveAspects: isPositive
      ? [
          'Strengthened family bonds',
          'New meaningful connections',
          'Improved communication',
        ]
      : [],
    challenges: isPositive
      ? ['Maintain boundaries', 'Avoid misunderstandings']
      : [
          'Communication gaps may arise',
          'Need for patience and compromise',
          'Focus on understanding others',
        ],
    recommendations: [
      'Spend quality time with family',
      'Practice active listening',
      'Express your feelings openly',
      'Resolve conflicts through dialogue',
    ],
  }
}

/**
 * Generate education prediction
 */
function generateEducationPrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 22) - 11
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 62
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `Academic pursuits and learning activities show positive results. This is a good time for skill development.`
      : `Educational goals may require extra effort. Stay focused and maintain discipline in studies.`,
    positiveAspects: isPositive
      ? [
          'Good academic performance',
          'New learning opportunities',
          'Success in examinations',
        ]
      : [],
    challenges: isPositive
      ? ['Maintain consistency', 'Avoid distractions']
      : [
          'Need for better time management',
          'Focus and concentration required',
          'Seek help when needed',
        ],
    recommendations: [
      'Create a structured study schedule',
      'Seek guidance from mentors',
      'Join study groups',
      'Take regular breaks to avoid burnout',
    ],
  }
}

/**
 * Generate travel prediction
 */
function generateTravelPrediction(chart: BirthChart, year: number): PredictionCategory {
  const score = calculateOverallScore(chart, year) + Math.floor(Math.random() * 20) - 10
  const normalizedScore = Math.max(0, Math.min(100, score))
  
  const isPositive = normalizedScore > 60
  
  return {
    score: normalizedScore,
    description: isPositive
      ? `Travel opportunities arise this year. Journeys may bring positive experiences and new perspectives.`
      : `Travel plans may face delays or require extra planning. Choose travel dates carefully.`,
    positiveAspects: isPositive
      ? [
          'Pleasant travel experiences',
          'Opportunities for spiritual journeys',
          'Meeting new people during travels',
        ]
      : [],
    challenges: isPositive
      ? ['Plan trips in advance', 'Check travel advisories']
      : [
          'Possible travel delays',
          'Need for careful planning',
          'Avoid unnecessary journeys',
        ],
    recommendations: [
      'Plan trips during auspicious periods',
      'Check travel dates carefully',
      'Carry necessary documents',
      'Stay informed about travel conditions',
    ],
  }
}

/**
 * Generate important dates for the year
 */
function generateImportantDates(year: number): ImportantDate[] {
  const dates: ImportantDate[] = []
  
  // Generate some sample important dates
  const months = [3, 6, 9, 12] // Sample months
  const types: ImportantDate['type'][] = ['auspicious', 'challenging', 'neutral', 'auspicious']
  
  months.forEach((month, index) => {
    dates.push({
      date: new Date(year, month - 1, 15),
      type: types[index],
      description: `Important period in ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })}`,
      significance: types[index] === 'auspicious'
        ? 'Auspicious time for new beginnings'
        : types[index] === 'challenging'
        ? 'Exercise caution during this period'
        : 'Neutral period, maintain routine',
    })
  })
  
  return dates.sort((a, b) => a.date.getTime() - b.date.getTime())
}

/**
 * Generate remedies based on chart analysis
 */
function generateRemedies(chart: BirthChart, year: number): Remedy[] {
  const currentDasha = getCurrentDasha(chart, year)
  
  const remedies: Remedy[] = [
    {
      type: 'mantra',
      title: `${PLANETS[currentDasha].name} Mantra`,
      description: `Chant the ${PLANETS[currentDasha].name} mantra daily for positive energy`,
      instructions: `Recite "Om ${PLANETS[currentDasha].name.charAt(0).toUpperCase() + PLANETS[currentDasha].name.slice(1)} Namaha" 108 times daily`,
      frequency: 'Daily, preferably in the morning',
    },
    {
      type: 'donation',
      title: 'Charitable Donation',
      description: 'Donate to causes related to your current dasha planet',
      instructions: `Donate items or money related to ${PLANETS[currentDasha].name} on specific days`,
      frequency: 'Weekly or monthly',
    },
    {
      type: 'ritual',
      title: 'Planetary Worship',
      description: 'Perform rituals to strengthen planetary influences',
      instructions: 'Visit temple or perform puja on designated days',
      frequency: 'Weekly',
    },
  ]
  
  return remedies
}

/**
 * Generate dasha influence analysis
 */
function generateDashaInfluence(chart: BirthChart, year: number): DashaInfluence {
  const currentDasha = getCurrentDasha(chart, year)
  const targetDate = new Date(year, 0, 1)
  
  let mainDasha: Planet = currentDasha
  let subDasha: Planet = currentDasha
  
  for (const period of chart.dashaPeriods) {
    if (targetDate >= period.startDate && targetDate <= period.endDate) {
      mainDasha = period.planet
      for (const subPeriod of period.subPeriods) {
        if (targetDate >= subPeriod.startDate && targetDate <= subPeriod.endDate) {
          subDasha = subPeriod.planet
          break
        }
      }
      break
    }
  }
  
  const planetName = PLANETS[mainDasha].name
  const subPlanetName = PLANETS[subDasha].name
  
  return {
    currentDasha: mainDasha,
    currentSubDasha: subDasha,
    influence: `You are currently in ${planetName} Mahadasha and ${subPlanetName} Antardasha. This combination influences your life significantly.`,
    effects: [
      `${planetName} period brings focus on ${planetName.toLowerCase()}-related aspects of life`,
      `${subPlanetName} sub-period adds specific influences to your experiences`,
      'Pay attention to planetary transits for optimal timing',
    ],
  }
}

/**
 * Main function to generate yearly prediction
 */
export function generateYearlyPrediction(chart: BirthChart, year: number): YearlyPrediction {
  const overallScore = calculateOverallScore(chart, year)
  
  // Generate summary based on overall score
  const summary =
    overallScore > 70
      ? `This year promises to be highly favorable for you. The planetary alignments support your endeavors across multiple life areas. Focus on maintaining positive momentum and making the most of opportunities that come your way.`
      : overallScore > 50
      ? `This year brings a mix of opportunities and challenges. With careful planning and positive attitude, you can navigate through successfully. Pay attention to important dates and follow recommended remedies.`
      : `This year may present some challenges, but with patience, perseverance, and following astrological guidance, you can overcome obstacles. Focus on self-improvement and maintaining balance in all aspects of life.`
  
  return {
    year,
    overallScore,
    summary,
    career: generateCareerPrediction(chart, year),
    finance: generateFinancePrediction(chart, year),
    health: generateHealthPrediction(chart, year),
    relationships: generateRelationshipsPrediction(chart, year),
    education: generateEducationPrediction(chart, year),
    travel: generateTravelPrediction(chart, year),
    importantDates: generateImportantDates(year),
    remedies: generateRemedies(chart, year),
    dashaInfluence: generateDashaInfluence(chart, year),
  }
}


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function SamplePage() {
  const sampleContent = `# Sample Astrology Report

This is a sample report to show you what your personalized astrology report will look like.

## Overview
Your personalized report will include:

### Complete Birth Chart Analysis
- Ascendant (Lagna) sign and degree
- Planetary positions in signs and houses
- Nakshatra information
- House cusps and their significance

### Yearly Predictions
Detailed predictions for:
- **Career**: Opportunities, challenges, and recommendations
- **Finance**: Financial outlook, investments, and planning
- **Health**: Wellness guidance and preventive care
- **Relationships**: Family, friends, and romantic relationships
- **Education**: Learning opportunities and academic success
- **Travel**: Travel prospects and auspicious periods

### Important Dates
- Auspicious dates for new beginnings
- Challenging periods requiring caution
- Neutral periods for routine activities

### Personalized Remedies
- Mantras for daily practice
- Gemstone recommendations
- Charitable activities
- Rituals and puja suggestions
- Dietary recommendations

## Get Your Report
Click the button below to generate your own personalized report based on your birth details.
`
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">← Back to Home</Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sample Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {sampleContent}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button size="lg">Generate Your Own Report</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


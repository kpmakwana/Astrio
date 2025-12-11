import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">✨</span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Astrio</h1>
            </div>
            <nav>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="text-sm sm:text-base">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            Discover Your{' '}
            <span className="text-primary-600">Cosmic Journey</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Get personalized yearly astrology predictions based on your birth details.
            Unlock insights about your career, finance, health, relationships, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] text-base">
                Generate Your Report
              </Button>
            </Link>
            <Link href="/sample" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base">
                View Sample Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-2">
          What You&apos;ll Get
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">📊</div>
              <CardTitle>Complete Birth Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detailed analysis of your planetary positions, houses, and ascendant sign.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🔮</div>
              <CardTitle>Yearly Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive predictions for career, finance, health, relationships, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🙏</div>
              <CardTitle>Personalized Remedies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Customized remedies, mantras, and recommendations to enhance positive energies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2">
            Enter your birth details and receive your personalized astrology report in seconds.
          </p>
          <Link href="/dashboard" className="inline-block">
            <Button size="lg" variant="secondary" className="min-h-[48px] text-base w-full sm:w-auto px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Astrio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


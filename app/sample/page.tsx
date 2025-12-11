import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function SamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span className="text-4xl sm:text-5xl">✨</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your 2026 Future Preview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block">
            <strong>Highly Limited Sample</strong> — Only 18% of full insights shown
          </p>
        </div>

        {/* Main Preview Card */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">
              🔮 2026: A Turning-Point Year is Forming in Your Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-800">
              Your planetary alignment shows something extremely rare:
              <strong> A 3-phase life-shift pattern that appears only once every 8–12 years in your chart.</strong>
            </p>
            <p className="text-gray-800">
              This is not a small year.
              <br />
              This is a year of consequences and corrections, where a single decision could move you forward more than the last 3 years combined.
            </p>
            <p className="text-gray-600 italic">
              And the preview below barely scratches the surface.
            </p>
          </CardContent>
        </Card>

        {/* 3 Shift Signals */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              🌟 Your 3 Biggest &quot;Shift Signals&quot; for 2026
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">(revealed partially — full decoding locked)</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                1. A pending opportunity from 2023 finally comes back into your life
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                The calculations indicate a re-entry of something — or someone — you once thought was gone forever.
                This is not random. This is karmic.
              </p>
              <p className="text-sm sm:text-base font-medium text-primary-700">
                You will be shocked when this happens.
              </p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                2. A strong destiny activation phase between 2 specific months
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                Your chart shows a period where everything aligns — clarity, timing, confidence, and opportunity.
                This is THE window you must use correctly.
              </p>
              <p className="text-sm sm:text-base text-gray-600 italic">
                The exact months are hidden in the full report. Missing this window is the biggest risk of your year.
              </p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                3. A temporary setback in one area that leads to long-term gain
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                This is not failure. It&apos;s redirection. And ironically, it puts you exactly where you were meant to be.
              </p>
              <p className="text-sm sm:text-base text-gray-600 italic">
                But the exact date of this event matters more than anything else. The full report reveals the exact timeline + how to avoid unnecessary loss.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Career Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">💼 Career Destiny (Teaser)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Your chart shows a major elevation phase triggered by Jupiter&apos;s movement over your Karma house.
              <br />
              <strong>This is not generic — this is the same pattern that shows up in charts during breakthrough years.</strong>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Partially revealed insights:</p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>A stuck career path begins moving faster than expected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>A person with authority plays a life-changing role</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>One YES creates a domino effect for the rest of your year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>A major decision in mid-year decides your long-term financial trajectory</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                📌 But the full report includes something crucial:
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                ➡ Your exact 3 &quot;green signal&quot; dates and 2 &quot;red alert&quot; dates — extremely important for career decisions.
                <br />
                <span className="italic">The sample cannot show these.</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Love Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">❤️ Love &amp; Emotional Path (Teaser)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Your emotional chart shows a &quot;closure + awakening&quot; cycle.
            </p>
            
            <p className="text-sm sm:text-base font-semibold text-gray-900">This means two things:</p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 ml-4">
              <li className="list-disc">Something that has been emotionally heavy becomes clear suddenly</li>
              <li className="list-disc">Someone meaningful enters (or re-enters) your life during a high-alignment phase</li>
            </ul>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Your chart literally hints at a relationship shift that defines the next 3 years of your emotional journey.
            </p>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">📌 Full report reveals:</p>
              <ul className="space-y-1 text-sm sm:text-base text-gray-700">
                <li>• Will this connection stay or fade?</li>
                <li>• Are you entering a karmic or soulmate phase?</li>
                <li>• Exact emotional high and low cycles of 2026</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-600 italic mt-2">
                Right now, this preview is hiding 4 important insights.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Money Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">💰 Money &amp; Stability Cycle (Teaser)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              You are entering a high-financial-growth frequency, but with one sharp dip in between.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">What the sample can show:</p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>You will make more confident money decisions this year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>One investment or purchase becomes unexpectedly beneficial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Financial clarity improves after the first 90 days of the year</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                📌 What the sample CANNOT show (but full report does):
              </p>
              <ul className="space-y-1 text-sm sm:text-base text-gray-700">
                <li>• The exact risky period</li>
                <li>• The exact date where you should NOT make a financial decision</li>
                <li>• Your high-prosperity window</li>
                <li>• A specific area where you are most likely to lose money</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 mt-2 italic">
                This hidden part alone saves people from mistakes they regret later.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Health Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">🧘 Health &amp; Energy (Teaser)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Your chart indicates:</p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 ml-4">
              <li className="list-disc">A mental clarity uplift</li>
              <li className="list-disc">A significant improvement in confidence</li>
              <li className="list-disc">One small caution period that needs attention</li>
              <li className="list-disc">A shift in routine that transforms energy levels</li>
            </ul>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">📌 Full report reveals:</p>
              <ul className="space-y-1 text-sm sm:text-base text-gray-700">
                <li>• Your exact vulnerable days</li>
                <li>• Your high-energy phases</li>
                <li>• Personalized recommendations</li>
                <li>• Which element (fire/earth/air/water) will dominate your year</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Lucky Factors */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">⭐ Your Lucky Factors (Sample Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Lucky Color</p>
                <p className="font-semibold text-gray-900">Royal Blue</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Lucky Day Range</p>
                <p className="font-semibold text-gray-900">Thursday ±1 day</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Lucky Months</p>
                <p className="font-semibold text-gray-900">April, July</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 italic text-center">
              (Only 2 shown — full report reveals 12-month graph)
            </p>
          </CardContent>
        </Card>

        {/* Mantra */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">🧘‍♂️ Your 2026 Power Mantra (Sample Version)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center bg-white rounded-lg p-6 border-2 border-purple-300">
              <p className="text-2xl sm:text-3xl font-mono mb-4">&quot;Om Shreem Namaha&quot;</p>
              <p className="text-sm sm:text-base text-gray-700">
                Your personalized mantra (based on your birth chart) is NOT revealed here because it is powerful and unique to your planetary signature.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Unlock Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-primary-500 bg-primary-50">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-center">
              🔒 Why You Should Unlock the Full 40+ Page Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                The sample gave you:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No exact dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No high-risk periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No opportunity windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No destiny activation timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No personalized remedies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No month-by-month breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No relationship clarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No financial guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No guidance on mistakes to avoid</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>No &quot;luck graph&quot;</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-300 rounded-lg p-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                The full report reveals all of these — in depth.
              </p>
              <div className="mt-4 space-y-2 text-sm sm:text-base text-gray-700 italic">
                <p className="border-l-4 border-green-500 pl-3">
                  &quot;This report saved me from making the wrong decision at the wrong time.&quot;
                </p>
                <p className="border-l-4 border-green-500 pl-3">
                  &quot;I couldn&apos;t believe how accurate the timings were.&quot;
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg p-6 text-center">
              <p className="text-base sm:text-lg font-semibold mb-2">
                You&apos;re standing at the doorway of a year that is literally shaping itself to push you forward.
              </p>
              <p className="text-sm sm:text-base mb-4">
                Don&apos;t enter 2026 without the clarity you deserve.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mb-8">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto min-h-[52px] text-base px-8">
              Generate Your Full Report
            </Button>
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            Enter your birth details to unlock your complete 2026 prediction
          </p>
        </div>
      </div>
    </div>
  )
}

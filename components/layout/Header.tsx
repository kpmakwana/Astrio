'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface HeaderProps {
  showActions?: boolean
  onNewReport?: () => void
}

export function Header({ showActions = false, onNewReport }: HeaderProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">✨</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Astrio</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Your Personal Astrology Guide</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {showActions && onNewReport ? (
              <Button
                onClick={onNewReport}
                variant="outline"
                size="sm"
                className="min-h-[36px] sm:min-h-[40px] text-sm"
              >
                New Report
              </Button>
            ) : !isHome ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="text-sm hidden sm:inline-flex">
                  Get Started
                </Button>
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

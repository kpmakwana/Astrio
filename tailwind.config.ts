import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde4b8',
          200: '#fbcb7e',
          300: '#f9a842',
          400: '#f78b1c',
          500: '#e86d0c',
          600: '#c95207',
          700: '#a03d0a',
          800: '#81310f',
          900: '#6a2a10',
        },
        astro: {
          gold: '#d4af37',
          deep: '#1a1a2e',
          purple: '#6c5ce7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config


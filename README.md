# Astrio - Indian Astrology Web App

A modern, production-ready Next.js application for generating personalized Indian astrology predictions based on birth details.

## 🚀 Features

- **Complete Birth Chart Analysis**: Calculate planetary positions, houses, ascendant, and nakshatra
- **Yearly Predictions**: Comprehensive predictions for career, finance, health, relationships, education, and travel
- **Personalized Remedies**: Customized mantras, gemstones, and recommendations
- **Important Dates**: Auspicious and challenging periods throughout the year
- **Dasha Analysis**: Vimshottari Dasha period calculations and influences
- **Modern UI**: Clean, accessible, and responsive design with TailwindCSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS
- **Validation**: Zod
- **Architecture**: Server Components by default, Client Components only when needed
- **Server Actions**: For data processing and calculations

## 📁 Project Structure

```
/
├── app/
│   ├── (marketing)/       # Landing pages
│   ├── (dashboard)/       # Authenticated user area
│   ├── actions/           # Server Actions
│   ├── dashboard/         # Dashboard page
│   ├── sample/            # Sample report page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   └── astro/             # Astrology-specific components
│
├── lib/
│   ├── astrology/         # Core astrology calculations
│   ├── prediction/        # Prediction algorithms
│   ├── types/             # TypeScript types
│   ├── constants/         # Constants and configurations
│   └── utils/             # Utility functions
│
├── hooks/                 # Custom React hooks
├── content/               # Markdown content files
│   ├── zodiac/           # Zodiac descriptions
│   └── remedies/         # Remedy information
│
└── public/                # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Astrio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

1. Navigate to the dashboard page
2. Enter your birth details:
   - Full name
   - Date of birth
   - Time of birth (24-hour format)
   - Place of birth (select from cities or enter coordinates)
   - Gender
3. Click "Generate Report"
4. View your personalized astrology report with:
   - Birth chart analysis
   - Yearly predictions
   - Important dates
   - Personalized remedies

## 🏗️ Architecture

### Server Components (Default)
- Pages and layouts use Server Components by default
- Data fetching happens on the server
- Better performance and SEO

### Client Components
- Used only for:
  - Forms and user input
  - Interactive components
  - Components using React hooks

### Server Actions
- All astrology calculations run on the server
- Secure and performant
- Located in `app/actions/astrology.ts`

### Type Safety
- Strict TypeScript configuration
- Zod schemas for runtime validation
- No `any` types used

## 🔧 Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## 📚 Key Components

### UI Components (`components/ui/`)
- `Button`: Reusable button with variants
- `Input`: Form input with validation
- `Select`: Dropdown select component
- `Card`: Card container with header/content/footer
- `Progress`: Progress bar component

### Astrology Components (`components/astro/`)
- `ZodiacDisplay`: Display zodiac sign information
- `PlanetaryPositions`: Show planetary positions
- `PredictionCategory`: Display prediction categories
- `RemediesList`: List of recommended remedies
- `ImportantDates`: Important dates display

### Forms (`components/forms/`)
- `BirthDetailsForm`: Multi-step form for birth details

## 🧮 Astrology Calculations

The application includes simplified astrology calculations. For production use, consider integrating:

- **Swiss Ephemeris**: For accurate planetary positions
- **Professional astrology libraries**: For precise calculations
- **Sidereal time calculations**: For accurate ascendant calculation

Current implementation provides a solid foundation that can be enhanced with professional libraries.

## 🎨 Styling

- TailwindCSS for utility-first styling
- Custom color palette for astrology theme
- Responsive design (mobile-first)
- Accessible components (ARIA labels, keyboard navigation)

## 📖 Content Management

Static content is stored in Markdown files:
- Zodiac descriptions: `content/zodiac/`
- Remedies: `content/remedies/`
- Sample reports: `content/sample-report.md`

This allows non-developers to edit content without code changes.

## 🔒 Security

- Server-side validation with Zod
- No sensitive data exposed to client
- Type-safe API boundaries
- Input sanitization

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 📝 Notes

- The astrology calculations are simplified for demonstration purposes
- For production use, integrate professional astrology calculation libraries
- Consider adding database storage for user reports
- Add authentication for saving multiple reports
- Consider adding PDF export functionality

## 🤝 Contributing

1. Follow the coding style guidelines
2. Use TypeScript strict mode
3. Write reusable components
4. Add proper error handling
5. Update documentation

## 📄 License

MIT License

## 🙏 Acknowledgments

Built with modern web technologies and best practices for scalability and maintainability.


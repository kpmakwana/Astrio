# Quick Setup Guide

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure Overview

### Key Directories

- **`app/`** - Next.js App Router pages and layouts
  - `page.tsx` - Landing page
  - `dashboard/page.tsx` - Main dashboard for generating reports
  - `actions/` - Server Actions for data processing

- **`components/`** - React components
  - `ui/` - Reusable UI components (Button, Input, Card, etc.)
  - `forms/` - Form components
  - `astro/` - Astrology-specific components

- **`lib/`** - Core business logic
  - `astrology/` - Birth chart calculations
  - `prediction/` - Prediction generation algorithms
  - `types/` - TypeScript type definitions
  - `constants/` - Application constants
  - `utils/` - Utility functions

- **`hooks/`** - Custom React hooks
  - `useAstroData` - Manages astrology data and predictions
  - `useUserForm` - Manages form state

- **`content/`** - Markdown content files
  - `zodiac/` - Zodiac sign descriptions
  - `remedies/` - Remedy information

## Development Workflow

### Adding New Features

1. **New UI Component**: Add to `components/ui/` or appropriate subdirectory
2. **New Astrology Feature**: Add logic to `lib/astrology/` or `lib/prediction/`
3. **New Page**: Add to `app/` directory following Next.js App Router conventions
4. **New Type**: Add to `lib/types/index.ts`

### Code Style

- Use TypeScript strict mode
- Prefer Server Components (default)
- Use Client Components only when needed (forms, interactivity)
- Follow the existing component patterns
- Add proper error handling
- Use Zod for validation

## Testing the Application

1. Start the dev server: `npm run dev`
2. Navigate to the dashboard
3. Fill in sample birth details:
   - Name: Test User
   - Date: 1990-01-15
   - Time: 10:30
   - Place: Select Mumbai (or any city)
   - Gender: Any
4. Click "Generate Report"
5. View the generated report

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Next Steps for Production

1. **Integrate Professional Astrology Library**
   - Consider Swiss Ephemeris for accurate calculations
   - Or use a professional astrology API

2. **Add Database**
   - Store user reports
   - Save birth details securely

3. **Add Authentication**
   - Allow users to save multiple reports
   - User accounts and profiles

4. **Enhance Features**
   - PDF export functionality
   - Email reports
   - Share reports with others
   - Multiple year predictions

5. **Performance Optimization**
   - Add caching for calculations
   - Optimize images and assets
   - Implement ISR for static content

6. **Testing**
   - Add unit tests for calculations
   - Integration tests for forms
   - E2E tests for user flows

## Troubleshooting

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Check that TypeScript version matches package.json

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Styling Issues
- Ensure TailwindCSS is properly configured
- Check `tailwind.config.ts` for correct content paths


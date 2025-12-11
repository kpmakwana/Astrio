# Astrio - Indian Astrology Web App

A modern, production-ready Next.js application for generating personalized Indian astrology predictions based on birth details.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/astrio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

**That's it!** Your app will be live in ~2 minutes.

📖 **For detailed deployment instructions, see [DEPLOY_STEPS.md](./DEPLOY_STEPS.md)**

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
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions
│   ├── dashboard/         # Dashboard page
│   ├── sample/            # Sample report page
│   └── layout.tsx         # Root layout
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
│   └── utils/             # Utility functions
│
└── hooks/                 # Custom React hooks
```

## ✨ Features

- **Complete Birth Chart Analysis**: Calculate planetary positions, houses, ascendant, and nakshatra
- **Yearly Predictions**: Comprehensive predictions for career, finance, health, relationships, education, and travel
- **Personalized Remedies**: Customized mantras, gemstones, and recommendations
- **Important Dates**: Auspicious and challenging periods throughout the year
- **Dasha Analysis**: Vimshottari Dasha period calculations and influences
- **Mobile-First Design**: Optimized for mobile users with responsive design

## 📱 Mobile Optimized

This app is designed with mobile users as the primary audience:
- Touch-friendly interface (44-52px touch targets)
- Responsive typography and spacing
- Mobile-first layouts
- Optimized performance

## 🔧 Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Development setup instructions
- [Deployment Guide](./DEPLOY_STEPS.md) - Step-by-step deployment
- [Deployment Options](./DEPLOYMENT.md) - Multiple deployment platforms

## 🚀 Deployment

### Quick Deploy

```bash
# Run setup script
./setup-deploy.sh

# Or follow DEPLOY_STEPS.md for detailed instructions
```

### Supported Platforms

- ✅ **Vercel** (Recommended - Made by Next.js team)
- ✅ **Netlify**
- ✅ **Railway**
- ✅ **AWS Amplify**
- ✅ **Docker** (Any platform)

## 📝 Notes

- The astrology calculations are simplified for demonstration purposes
- For production use, consider integrating professional astrology calculation libraries
- Consider adding database storage for user reports
- Add authentication for saving multiple reports

## 📄 License

MIT License

## 🙏 Acknowledgments

Built with modern web technologies and best practices for scalability and maintainability.

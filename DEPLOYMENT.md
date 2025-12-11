# Deployment Guide for Astrio

This guide covers multiple deployment options for your Next.js astrology application.

## 🚀 Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform for Next.js applications and offers the easiest deployment process.

### Prerequisites
- A GitHub, GitLab, or Bitbucket account
- Your code pushed to a Git repository

### Steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **That's it!** Your app will be live in ~2 minutes.

### Vercel CLI (Alternative):
```bash
npm i -g vercel
vercel login
vercel
```

Your app will be deployed at: `https://your-project-name.vercel.app`

---

## 🌐 Option 2: Netlify

### Steps:

1. **Push code to Git repository** (same as above)

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Or use Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## 🐳 Option 3: Docker (Any Platform)

### Create Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Update next.config.js:

Add output: 'standalone' to your Next.js config:

```javascript
const nextConfig = {
  // ... existing config
  output: 'standalone',
}
```

### Build and Run:
```bash
docker build -t astrio .
docker run -p 3000:3000 astrio
```

---

## ☁️ Option 4: AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Output directory: `.next`
5. Deploy

---

## 📱 Option 5: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js
6. Deploy!

---

## 🔧 Environment Variables

If you need environment variables (currently none required):

### Vercel:
- Go to Project Settings → Environment Variables
- Add variables for Production, Preview, and Development

### Netlify:
- Site Settings → Build & Deploy → Environment Variables

### Other Platforms:
- Check platform-specific documentation for environment variable setup

---

## ✅ Pre-Deployment Checklist

- [x] Build passes locally (`npm run build`)
- [x] All TypeScript errors resolved
- [x] No linting errors
- [x] Mobile-responsive design tested
- [ ] Environment variables configured (if needed)
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)

---

## 🎯 Quick Deploy Commands

### Vercel (Fastest):
```bash
npm i -g vercel
vercel
```

### Netlify:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## 📊 Post-Deployment

After deployment:
1. Test all pages on mobile devices
2. Check performance with Lighthouse
3. Set up custom domain (if desired)
4. Configure analytics (optional)
5. Set up monitoring/error tracking (optional)

---

## 🆘 Troubleshooting

### Build Fails:
- Check Node.js version (should be 18+)
- Ensure all dependencies are in package.json
- Check for TypeScript errors: `npm run type-check`

### Runtime Errors:
- Check browser console for errors
- Verify environment variables are set
- Check server logs in deployment platform

### Performance Issues:
- Enable Next.js Image Optimization
- Check bundle sizes
- Consider code splitting

---

## 📝 Notes

- **Vercel** is recommended for Next.js apps (made by Next.js team)
- **Netlify** is also excellent and free tier friendly
- **Docker** gives you flexibility to deploy anywhere
- All platforms support automatic deployments from Git

Your app is ready to deploy! 🚀


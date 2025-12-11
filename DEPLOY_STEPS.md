# 🚀 Step-by-Step Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `astrio` (or your preferred name)
3. Description: "Indian Astrology Web App - Personalized yearly predictions"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd /Users/kaushik/Documents/Dev/Personal/Astrio
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/astrio.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Deploy to Vercel

### Option A: Via Web Interface (Easiest - Recommended)

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account
5. Click **"Add New Project"**
6. You'll see your repositories - click **"Import"** next to `astrio`
7. Vercel will auto-detect:
   - Framework: Next.js ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
   - Install Command: `npm install` ✅
8. Click **"Deploy"**
9. Wait 2-3 minutes for deployment
10. **Done!** Your app is live 🎉

Your app will be available at: `https://astrio.vercel.app` (or similar)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd /Users/kaushik/Documents/Dev/Personal/Astrio
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? astrio (or press Enter)
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

## Step 4: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Step 5: Set Up Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

No additional setup needed! 🎉

## ✅ Post-Deployment Checklist

- [ ] Test the live URL
- [ ] Test on mobile devices
- [ ] Verify all pages load correctly
- [ ] Test form submission
- [ ] Check performance (Lighthouse)
- [ ] Set up custom domain (optional)
- [ ] Add analytics (optional)

## 🆘 Troubleshooting

### If push fails:
```bash
# Check remote URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/astrio.git
```

### If Vercel build fails:
- Check build logs in Vercel dashboard
- Ensure Node.js version is 18+ (Vercel auto-detects)
- Verify all dependencies are in package.json

### If deployment succeeds but app doesn't work:
- Check browser console for errors
- Verify environment variables (if any)
- Check Vercel function logs

## 📝 Quick Reference Commands

```bash
# Git commands
git status                    # Check status
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push                      # Push to GitHub

# Vercel commands
vercel                        # Deploy preview
vercel --prod                 # Deploy production
vercel logs                   # View logs
```

---

**Your app is ready to deploy! Follow the steps above and you'll be live in minutes.** 🚀


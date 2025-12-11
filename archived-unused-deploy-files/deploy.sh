#!/bin/bash

echo "🚀 Astrio Deployment Helper"
echo "=========================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Astrio astrology app"
    echo "✅ Git initialized"
    echo ""
    echo "⚠️  Next steps:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin YOUR_REPO_URL"
    echo "3. Run: git push -u origin main"
    echo ""
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "🌐 Deployment Options:"
echo ""
echo "Option 1: Vercel (Recommended)"
echo "  npm install -g vercel"
echo "  vercel login"
echo "  vercel"
echo ""
echo "Option 2: Netlify"
echo "  npm install -g netlify-cli"
echo "  netlify login"
echo "  netlify deploy --prod"
echo ""
echo "Option 3: Via Web"
echo "  - Push code to GitHub"
echo "  - Go to vercel.com or netlify.com"
echo "  - Import repository"
echo "  - Deploy!"
echo ""

#!/bin/bash

echo "🚀 Astrio Deployment Setup"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ -d ".git" ]; then
    echo -e "${GREEN}✅ Git repository initialized${NC}"
    echo ""
    
    # Check if remote is set
    if git remote -v | grep -q "origin"; then
        echo -e "${BLUE}📡 Remote repository configured:${NC}"
        git remote -v
        echo ""
        echo -e "${GREEN}✅ Ready to push!${NC}"
        echo ""
        echo "Run: git push -u origin main"
    else
        echo -e "${YELLOW}⚠️  No remote repository configured${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Create a repository on GitHub: https://github.com/new"
        echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/astrio.git"
        echo "3. Run: git branch -M main"
        echo "4. Run: git push -u origin main"
    fi
else
    echo -e "${YELLOW}⚠️  Git not initialized${NC}"
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Astrio - Indian Astrology Web App"
    echo -e "${GREEN}✅ Git initialized${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create a repository on GitHub: https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/astrio.git"
    echo "3. Run: git branch -M main"
    echo "4. Run: git push -u origin main"
fi

echo ""
echo -e "${BLUE}🌐 Deployment Options:${NC}"
echo ""
echo -e "${GREEN}Option 1: Vercel (Recommended)${NC}"
echo "  Web: https://vercel.com → Import GitHub repo"
echo "  CLI: npm install -g vercel && vercel"
echo ""
echo -e "${GREEN}Option 2: Netlify${NC}"
echo "  Web: https://netlify.com → Import GitHub repo"
echo "  CLI: npm install -g netlify-cli && netlify deploy --prod"
echo ""
echo ""
echo -e "${BLUE}📖 For detailed instructions, see: DEPLOY_STEPS.md${NC}"
echo ""

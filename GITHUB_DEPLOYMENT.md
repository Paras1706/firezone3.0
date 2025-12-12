# GitHub Pages Deployment Guide

## Enable GitHub Pages for Frontend

### Step 1: Build Static Site
```bash
npm run build
```

### Step 2: Enable in GitHub Settings
1. Go to: https://github.com/Paras1706/firezone3.0
2. Click "Settings" tab
3. Click "Pages" (left sidebar)
4. Source: Select "GitHub Actions"
5. Save

### Step 3: Deploy with GitHub Actions
The workflow file will automatically deploy on every push!

---

## GitHub Secrets Setup

To enable automatic deployments, add these secrets to GitHub:

### For Frontend (Vercel):
1. Go to repo → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - From Vercel project settings
   - `VERCEL_PROJECT_ID` - From Vercel project settings
   - `VITE_API_URL` - Your backend URL

### For Backend (Railway):
1. Add secret:
   - `RAILWAY_TOKEN` - Get from https://railway.app/account/tokens

---

## Quick Setup (5 minutes)

### 1. Get Vercel Tokens
- Go to https://vercel.com/account/tokens
- Create new token
- Copy it

### 2. Get Vercel Project IDs
```bash
vercel project ls
# Copy org-id and project-id
```

### 3. Add to GitHub Secrets
1. GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add all required secrets above

### 4. Get Railway Token
- Go to https://railway.app/account/tokens
- Create new token
- Copy it

### 5. Push Code
```bash
git add .
git commit -m "setup: Add GitHub Actions deployment workflows"
git push origin main
```

GitHub Actions will automatically deploy! ✅

---

## Verify Deployments

### Check Frontend Deploy
1. Go to repo → Actions tab
2. Select "Deploy Frontend to Vercel"
3. Click latest run
4. View logs

### Check Backend Deploy
1. Go to repo → Actions tab
2. Select "Deploy Backend to Railway"
3. Click latest run
4. View logs

---

## Status Badge

Add to your README.md:

```markdown
[![Deploy Frontend](https://github.com/Paras1706/firezone3.0/actions/workflows/deploy-frontend.yml/badge.svg)](https://github.com/Paras1706/firezone3.0/actions/workflows/deploy-frontend.yml)

[![Deploy Backend](https://github.com/Paras1706/firezone3.0/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/Paras1706/firezone3.0/actions/workflows/deploy-backend.yml)
```

---

## Auto-Deployment Flow

```
Code Push to GitHub
        ↓
GitHub Actions triggers
        ↓
├─→ Deploy Frontend to Vercel
│   └─→ Live at: your-app.vercel.app ✅
│
└─→ Deploy Backend to Railway
    └─→ Live at: your-backend.up.railway.app ✅
```

Every time you push, your app automatically updates! 🚀

---

## Environment Variables

Update in GitHub Secrets and your deployment platforms:

**Frontend:**
```
VITE_API_URL=https://your-backend.railway.app/api
```

**Backend:**
```
PORT=5000
ADMIN_PASSWORD=Paras@1318
NODE_ENV=production
```

---

## Rollback

If deployment fails:
1. Check Actions tab for error logs
2. Fix the issue
3. Commit and push
4. GitHub Actions will redeploy automatically

---

**Automatic deployment is now enabled!** 🎉

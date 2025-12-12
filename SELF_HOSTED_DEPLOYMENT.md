# Self-Hosted Deployment Guide

## Frontend: GitHub Pages (Free ✅)

### Setup (2 minutes)
1. Go to: https://github.com/Paras1706/firezone3.0/settings/pages
2. Source: Select "GitHub Actions"
3. Save

Frontend will auto-deploy at: **https://Paras1706.github.io/Fire-Zone-2.0/**

---

## Backend: Self-Hosted Options

### Option 1: Keep Running Locally (Development)
```bash
# Terminal 1 - Run backend
cd server
npm run dev

# Terminal 2 - Run frontend (local)
npm run dev
```
- Access locally: http://localhost:3000/Fire-Zone-2.0/
- Best for: Development & testing

---

### Option 2: Free Hosting Services

#### A. Heroku Alternatives (Free tier with credit card)
- **Render**: https://render.com (free tier)
- **Railway**: (you have token - use this!)
- **Koyeb**: https://www.koyeb.com (free tier)
- **Fly.io**: https://fly.io (free tier)

#### B. Deploy to Render (Free)
```bash
1. Go to https://render.com
2. Sign up with GitHub
3. New Web Service → Select firezone3.0
4. Settings:
   - Name: firezone3-backend
   - Build command: cd server && npm install
   - Start command: cd server && npm start
   - Root directory: (leave blank)
5. Deploy
```

Backend URL: `https://firezone3-backend.onrender.com/api`

---

### Option 3: Using Ngrok/Tunnel (Quick Testing)

```bash
# Install ngrok
npm install -g ngrok

# Run backend locally
cd server
npm run dev

# In another terminal, expose it
ngrok http 5000

# You'll get a public URL like:
# https://abc123.ngrok.io/api
```

Update frontend API URL with the ngrok URL.

---

### Option 4: Docker + Self-Host VPS

#### Create Docker image:
```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

Deploy to:
- AWS EC2 (free tier)
- DigitalOcean ($5/month)
- Linode ($5/month)
- Heroku alternative

---

## Current Setup

### Frontend
- **Hosted**: GitHub Pages
- **URL**: https://Paras1706.github.io/Fire-Zone-2.0/
- **Status**: Auto-deploys on every push ✅

### Backend - Choose One:

#### Recommended: Render (Free)
```bash
1. Visit: https://render.com
2. New Web Service
3. Deploy firezone3-backend
4. Free tier includes 750 hours/month ✅
```

#### Or: Keep Local + Tunnel
```bash
1. Run backend locally: npm run dev
2. Expose via ngrok: ngrok http 5000
3. Update frontend with ngrok URL
```

#### Or: Use Railway (You have token!)
```bash
1. Go to: https://railway.app
2. New Project → Deploy from GitHub
3. Select firezone3.0 repo
4. Deploy
```

---

## Update Frontend API URL

After deploying backend, update in GitHub:

**Settings → Secrets and variables → Actions**

Add secret:
- Name: `VITE_API_URL`
- Value: `https://your-backend-url/api`

Then push code to trigger redeploy.

---

## Total Cost

| Component | Cost |
|-----------|------|
| Frontend (GitHub Pages) | **FREE** ✅ |
| Backend (Render free tier) | **FREE** ✅ |
| Backend (Railway if used) | **FREE** ✅ |
| **Total** | **FREE** 🎉 |

---

## Quick Summary

```
Push to GitHub
        ↓
Frontend: Auto-deploys to GitHub Pages ✅
        ↓
Backend: Deploy to Render or Railway ✅
        ↓
App accessible globally! 🚀
```

### Next Steps:
1. ✅ Frontend: Already setup for GitHub Pages
2. ⏳ Backend: Choose Render or Railway
3. ⏳ Update VITE_API_URL secret
4. ⏳ Push code → Auto-deploy

---

## Troubleshooting

**Frontend not deploying:**
- Check: GitHub Actions tab → Deploy-Frontend
- Check: Repo Settings → Pages

**Backend not connecting:**
- Verify API URL in GitHub secrets
- Check CORS in `server/server.js`
- View Railway/Render logs

**Local testing:**
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
npm run dev
```

Done! 🎉

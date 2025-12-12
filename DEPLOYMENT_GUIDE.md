# Fire Zone 3.0 - Deployment Guide

## Easy Deployment Options

### Option 1: Frontend + Backend on Vercel (Recommended - Easiest)

#### Frontend Deployment on Vercel

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub (authorize it)
3. **Import project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repo: `Paras1706/firezone3.0`
   - Click "Import"
4. **Configure**:
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables**:
   - `VITE_API_URL=https://your-backend-url/api`
6. **Deploy** - Click Deploy button

**Frontend Live URL** will be provided automatically! ✅

---

#### Backend Deployment on Railway or Render

#### Option A: Railway (Easiest)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Select `firezone3.0` repo
4. **Configure**:
   - Root Directory: `server`
   - Start Command: `npm start` or `node server.js`
5. **Add Variables**:
   - `PORT=5000`
   - `ADMIN_PASSWORD=Paras@1318`
6. **Deploy** - Railway auto-deploys from GitHub

**Backend Live URL** will be provided! ✅

#### Option B: Render (Also Easy)

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **Create new service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repo
4. **Configure**:
   - Name: `firezone-backend`
   - Root: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add environment variables**:
   - `PORT=5000`
   - `ADMIN_PASSWORD=Paras@1318`
6. **Deploy**

**Backend will be live!** ✅

---

### Option 2: Deploy Locally (Testing)

Keep running locally for now:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server && npm run dev
```

---

## Quick Deployment Checklist

### Before Deploying

- [ ] Code pushed to GitHub ✅ (Already done)
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] API URLs updated
- [ ] No hardcoded IPs/ports

### Deployment Steps

**Fastest Path (5-10 minutes):**

1. **Deploy Frontend to Vercel**
   - Go to vercel.com
   - Import GitHub repo
   - Set `VITE_API_URL` environment variable
   - Deploy ✅

2. **Deploy Backend to Railway**
   - Go to railway.app
   - Import same GitHub repo
   - Set `server` as root directory
   - Deploy ✅

3. **Update Frontend Config**
   - In Vercel settings, update `VITE_API_URL` to your Railway backend URL
   - Redeploy frontend

4. **Done!** 🎉

---

## Production Checklist

After deployment, verify:

- [ ] Frontend loads at deployed URL
- [ ] Backend responds at deployed URL
- [ ] API calls from frontend work
- [ ] Data persists in JSON files
- [ ] Admin login works
- [ ] Player registration works
- [ ] Match details update works

---

## Troubleshooting

### Frontend won't load
- Check build logs on Vercel
- Verify `VITE_API_URL` is set correctly
- Check browser console (F12)

### Backend won't start
- Check deployment logs
- Verify `server` is root directory
- Ensure `npm start` script exists

### API calls fail
- Update `VITE_API_URL` in frontend
- Check CORS settings in backend
- Verify backend is running

### Data not persisting
- Check `/data/` folder exists
- Verify file permissions
- Check server logs

---

## Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url/api
```

### Backend (Railway/Render)
```
PORT=5000
ADMIN_PASSWORD=Paras@1318
NODE_ENV=production
STORAGE=JSON
```

---

## After Deployment

### Update GitHub README

Add to your GitHub repo's README.md:

```markdown
## Live Demo

- **Frontend**: [Your Vercel URL]
- **Backend API**: [Your Railway URL]/api
- **Admin Panel**: [Your Frontend URL]/admin

## Quick Start

### Development
\`\`\`bash
npm install
cd server && npm install
npm run dev  # Terminal 1
cd server && npm run dev  # Terminal 2
\`\`\`

### Production
- Frontend: Deployed on Vercel
- Backend: Deployed on Railway
- Storage: JSON files
```

---

## Domain Setup (Optional)

### Add Custom Domain

**Vercel:**
1. Go to project settings
2. Domains tab
3. Add your domain
4. Follow DNS instructions

**Railway:**
1. Go to project settings
2. Domain tab
3. Add custom domain

---

## Monitoring

### Frontend (Vercel)
- Automatic logs
- Performance metrics
- Deployment history

### Backend (Railway/Render)
- View logs in dashboard
- Monitor resource usage
- Set up alerts

---

## Next Steps

1. **Choose deployment platform** (Vercel + Railway recommended)
2. **Deploy frontend** (5 minutes)
3. **Deploy backend** (5 minutes)
4. **Update API URL** (1 minute)
5. **Test everything** (5 minutes)
6. **Share with team!** 🎉

---

## Estimated Costs

### Free Tier (Recommended for hobby/demo)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | ✅ Yes | Free |
| Railway | ✅ Yes | Free ($5 credit) |
| Render | ✅ Yes | Free (limited) |

### Paid Tiers (When you scale)
- Vercel: $20+/month
- Railway: Pay as you go (~$5/month)
- Render: $7+/month

---

## Which Option is Best?

### For Learning/Demo
👉 **Vercel + Railway** (Both free, easy setup)

### For Production
👉 **Vercel + Render** (More reliable, better SLA)

### For Full Control
👉 **AWS/DigitalOcean** (More complex but powerful)

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

**Ready to deploy?** Start with Vercel for frontend! ✅

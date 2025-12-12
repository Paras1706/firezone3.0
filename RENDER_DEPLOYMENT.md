# Fire Zone 3.0 - Render Deployment Guide

## Deploying to Render.com

### Prerequisites
- GitHub account with repository pushed (✓ Done)
- Render account: https://render.com (free tier available)

---

## Step 1: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click "New +"** → Select **"Blueprint"**
3. **Connect GitHub**
   - Click "Connect account" and authorize GitHub
   - Select repository: `Paras1706/firezone3.0`
4. **Click "Create Resources"**
   - Render will automatically detect `render.yaml`
   - It will create Web Service for backend
5. **Wait for deployment** (~2-3 minutes)
6. **Get Backend URL:** After deployment, copy the service URL (e.g., `https://firezone-backend.onrender.com`)

### Option B: Manual Setup

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click "New +"** → Select **"Web Service"**
3. **Connect GitHub**
   - Authorize and select `Paras1706/firezone3.0`
4. **Configure Web Service:**
   - **Name:** `firezone-backend`
   - **Environment:** Node
   - **Build Command:** `npm install && cd server && npm install`
   - **Start Command:** `npm start --prefix server`
   - **Plan:** Free tier is fine

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable")
   ```
   PORT = 3001
   NODE_ENV = production
   FRONTEND_URL = (leave empty for now, update later)
   ```

6. **Click "Deploy Service"** and wait for it to build

---

## Step 2: Deploy Frontend to Render

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click "New +"** → Select **"Static Site"**
3. **Connect GitHub**
   - Select `Paras1706/firezone3.0` repository
4. **Configure Static Site:**
   - **Name:** `firezone-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Plan:** Free tier

5. **Add Environment Variables:**
   ```
   VITE_API_URL = https://firezone-backend.onrender.com/api
   (Replace with your actual backend URL from Step 1)
   ```

6. **Click "Create Static Site"** and wait for deployment

---

## Step 3: Link Frontend and Backend

After both are deployed:

1. **Get URLs:**
   - Backend: `https://your-backend-name.onrender.com`
   - Frontend: `https://your-frontend-name.onrender.com`

2. **Update Frontend Environment:**
   - Go to **Static Site settings**
   - Update `VITE_API_URL` to your backend URL
   - Trigger redeploy

3. **Update Backend CORS (if needed):**
   - Go to **Web Service settings**
   - Update `FRONTEND_URL` environment variable
   - Trigger redeploy

---

## Step 4: Test the Deployment

1. **Open frontend:** https://your-frontend-name.onrender.com
2. **Test registration:** Fill in player details and submit
3. **Check backend logs:** View logs in Render dashboard to confirm data is being saved

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check logs in Render dashboard, ensure `render.yaml` is correct |
| API not responding | Verify `VITE_API_URL` points to correct backend URL |
| CORS errors | Check `FRONTEND_URL` in backend environment variables |
| Database not found | SQLite database is created automatically on first run |
| Port conflicts | Render auto-assigns ports; don't set PORT manually |

---

## Important Notes

- **Free tier:** Apps sleep after 15 mins of inactivity
- **Database:** SQLite persists between deployments on same Render service
- **Logs:** Check Render dashboard logs for errors
- **Redeploy:** Manual redeployment from git push to GitHub (Settings → Auto Deploy)

---

## Environment Variables Summary

**Backend (.env or Render settings):**
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url
```

**Frontend (.env or Render settings):**
```
VITE_API_URL=https://your-backend-url/api
```

---

## Next Steps (Optional)

- Set up custom domain (Render paid feature)
- Add monitoring/alerts (Render dashboard)
- Set up GitHub Actions for automated tests
- Add database backups

---

For more info: https://render.com/docs

# Connect Local Backend to GitHub Pages Frontend

## Option 1: Using Ngrok (Easiest - 2 minutes)

### Step 1: Install Ngrok
```bash
npm install -g ngrok
```

### Step 2: Start Backend Locally
```bash
cd server
npm start
```
Backend runs at: `http://localhost:5000/api`

### Step 3: Expose with Ngrok
Open a **new terminal** and run:
```bash
ngrok http 5000
```

You'll see output like:
```
Forwarding    https://abc123def456.ngrok.io -> http://localhost:5000
```

**Copy this URL**: `https://abc123def456.ngrok.io`

### Step 4: Update GitHub Frontend
1. Go to: https://github.com/Paras1706/firezone3.0/settings/secrets/actions
2. Add/Update secret:
   - Name: `VITE_API_URL`
   - Value: `https://abc123def456.ngrok.io/api` (replace with your ngrok URL)
3. Save

### Step 5: Trigger Redeploy
Push any change to GitHub:
```bash
git add .
git commit -m "test: update api url"
git push origin main
```

Frontend auto-deploys and connects to your local backend! ✅

---

## Option 2: Keep Running Locally (Development)

Just run both servers locally:

```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend  
npm run dev
```

Access at: `http://localhost:3000/Fire-Zone-2.0/`

---

## Ngrok URL Changes

⚠️ **Important**: Ngrok URL changes every time you restart. To keep the same URL:

1. Get Ngrok auth token: https://dashboard.ngrok.com/get-started
2. Connect to account:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```
3. Create static domain: https://dashboard.ngrok.com/domains
4. Run with custom domain:
   ```bash
   ngrok http 5000 --domain your-static-domain.ngrok.io
   ```

---

## Troubleshooting

**Frontend can't connect?**
- Check CORS in `server/server.js` - your ngrok URL should be allowed
- Check GitHub secret `VITE_API_URL` is correct
- Restart frontend after updating secret

**Ngrok keeps disconnecting?**
- Keep the ngrok terminal open
- Use static domain (paid feature or free trial)

**Want permanent solution?**
- Deploy to Render (free tier)
- Or use Railway with your token

---

## Summary

| Method | Cost | Setup Time | Best For |
|--------|------|-----------|----------|
| **Ngrok + Local** | FREE | 2 min | Testing |
| **Local Only** | FREE | 1 min | Development |
| **Render** | FREE | 5 min | Production |

**Current Setup:** Ngrok is fastest to get working! 🚀

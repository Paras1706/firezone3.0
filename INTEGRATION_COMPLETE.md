# Fire Zone 2.0 - Frontend & Backend Integration Complete ✅

## What's Been Set Up

### Backend Infrastructure
✅ **Express.js Server** on port 5000
✅ **MongoDB Database** for persistent data storage
✅ **REST API Endpoints** for players and match management
✅ **Admin Authentication** system
✅ **CORS Configuration** for frontend-backend communication

### Frontend Integration
✅ **API Client Service** (`api/backend.ts`) for all backend calls
✅ **Updated TournamentContext** to use backend APIs
✅ **Async/Await** support with loading and error states
✅ **Local storage fallback** when backend is unavailable

## Current Status

### ✅ Running Servers
1. **Frontend** - http://127.0.0.1:3000/Fire-Zone-2.0/
2. **Backend** - http://localhost:5000/api

Both servers are running and ready to use!

## File Structure

```
Fire-Zone-2.0-main/
├── server/                          # Backend directory
│   ├── server.js                   # Main server file
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   ├── Player.js              # Player schema
│   │   └── MatchDetails.js        # Match schema
│   └── routes/
│       ├── players.js             # Player endpoints
│       ├── match.js               # Match endpoints
│       └── admin.js               # Admin endpoints
├── api/
│   └── backend.ts                 # Frontend API client
├── context/
│   └── TournamentContext.tsx      # Updated with backend calls
└── BACKEND_SETUP.md               # Setup documentation
```

## API Endpoints Reference

### Players Management
```
GET    /api/players                 → Get all players
GET    /api/players/:id             → Get single player
POST   /api/players                 → Register new player
PATCH  /api/players/:id/verify      → Verify player payment
DELETE /api/players/:id             → Delete player
POST   /api/players/delete/bulk     → Delete multiple players
```

### Match Details
```
GET    /api/match                   → Get match details
PATCH  /api/match                   → Update all details
PATCH  /api/match/:field            → Update specific field
```

### Admin
```
POST   /api/admin/login             → Admin login
```

## Example: Register a Player

### Frontend Code
```typescript
import { useTournament } from './context/TournamentContext';

function RegisterForm() {
  const { registerPlayer, loading, error } = useTournament();

  const handleSubmit = async (formData) => {
    try {
      await registerPlayer(formData);
      alert('Registered successfully!');
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### What Happens Internally
1. `registerPlayer()` calls `playerAPI.create()`
2. API sends POST request to backend
3. Backend validates data and saves to MongoDB
4. Response returns to frontend
5. Context updates local state
6. Component re-renders with new player

## Database Setup

### Option 1: Local MongoDB (Recommended for Development)
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Backend will connect to `mongodb://localhost:27017/firezone`

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`
5. Restart backend

## Environment Variables

### Frontend (.env or vite.config.ts)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/firezone
PORT=5000
ADMIN_PASSWORD=Paras@1318
NODE_ENV=development
```

## Features Implemented

### Data Persistence
- ✅ Register players → Stored in MongoDB
- ✅ Update match details → Persisted in database
- ✅ Verify players → Status saved permanently
- ✅ Delete players → Removed from database
- ✅ Admin login → Password validation

### Real-time Sync
- Frontend automatically fetches data on load
- Updates are sent to backend immediately
- Multiple users see the same data
- Admin changes apply system-wide

### Fallback Mechanism
- If backend is down, app uses localStorage
- Data continues to work locally
- Auto-syncs when backend comes back online

## Testing the Integration

### 1. Check if Backend is Running
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running","timestamp":"..."}
```

### 2. Register a Test Player
```bash
curl -X POST http://localhost:5000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Player",
    "uid": "TEST123",
    "whatsapp": "+919876543210",
    "email": "test@example.com",
    "paymentRef": "TXN123456"
  }'
```

### 3. Get All Players
```bash
curl http://localhost:5000/api/players
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Check port 5000 is not in use: `netstat -ano | findstr :5000`
- Check `.env` file exists in server directory

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check CORS in `server/server.js`
- Check `VITE_API_URL` in environment

### MongoDB connection errors
- Local: Ensure MongoDB service is running
- Atlas: Check connection string in `.env`
- Check username/password if using auth

## Next Steps

### To Deploy
1. Deploy backend to Railway/Render/Heroku
2. Update `VITE_API_URL` to production backend URL
3. Deploy frontend to Vercel/Netlify

### To Add More Features
- Authentication for players
- Email verification
- Payment gateway integration
- Real-time notifications
- Match analytics dashboard

## Contact Information
For issues or questions about the setup, check [BACKEND_SETUP.md](BACKEND_SETUP.md)

---
**Status**: ✅ Backend and Frontend Integration Complete
**Frontend Running**: http://127.0.0.1:3000/Fire-Zone-2.0/
**Backend Running**: http://localhost:5000/api

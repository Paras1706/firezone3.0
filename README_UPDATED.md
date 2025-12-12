# Fire Zone 2.0 - Tournament Management System

A complete tournament registration and management platform built with React + TypeScript frontend and Node.js + MongoDB backend.

## Features

✅ **Player Registration** - Register players with UID, WhatsApp, Email  
✅ **Payment Verification** - Admin verification system for payments  
✅ **Match Management** - Configure match details, map, mode, time  
✅ **Real-time Sync** - Data syncs across all users instantly  
✅ **Admin Dashboard** - Manage players, verify payments, update match info  
✅ **Persistent Storage** - MongoDB database for reliable data storage  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  

## Project Structure

```
Fire-Zone-2.0-main/
├── Frontend (React + TypeScript)
│   ├── components/           # Reusable UI components
│   ├── pages/               # Page components
│   ├── context/             # Tournament context with backend integration
│   ├── api/                 # Backend API client
│   └── styles/              # Tailwind CSS styles
│
├── Backend (Node.js + Express)
│   ├── server/
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # MongoDB schemas
│   │   ├── config/          # Database configuration
│   │   └── server.js        # Main server file
│
├── Documentation
│   ├── BACKEND_SETUP.md     # Detailed backend setup
│   ├── INTEGRATION_COMPLETE.md  # Integration overview
│   └── README.md            # This file
```

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Install Dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

2. **Configure Environment**
```bash
# Create .env in server directory
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and settings
cd ..
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env
```

4. **Start Both Servers**
```bash
# Option 1: Run startup script (Windows)
start.bat

# Option 2: Manual start in two terminals
# Terminal 1:
cd server && npm run dev

# Terminal 2:
npm run dev
```

5. **Open in Browser**
```
Frontend: http://127.0.0.1:3000/Fire-Zone-2.0/
Backend:  http://localhost:5000/api
```

## API Documentation

### Get All Players
```bash
GET /api/players
```

### Register Player
```bash
POST /api/players
Content-Type: application/json

{
  "name": "Player Name",
  "uid": "UID123456",
  "whatsapp": "+919876543210",
  "email": "player@example.com",
  "paymentRef": "TXN123456789"
}
```

### Verify Player
```bash
PATCH /api/players/{playerId}/verify
```

### Get Match Details
```bash
GET /api/match
```

### Update Match Details
```bash
PATCH /api/match
Content-Type: application/json

{
  "map": "Nuketown Island",
  "mode": "Team Deathmatch",
  "roomId": "ROOM123",
  "roomPassword": "password123"
}
```

### Admin Login
```bash
POST /api/admin/login
Content-Type: application/json

{
  "password": "Paras@1318"
}
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin support

## Environment Variables

### Frontend (Vite)
```
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_PASSWORD=Paras@1318
VITE_UPI_ID=
VITE_PAYEE_NAME=
```

### Backend
```
MONGODB_URI=mongodb://localhost:27017/firezone
PORT=5000
ADMIN_PASSWORD=Paras@1318
NODE_ENV=development
```

## Usage

### As a Player
1. Navigate to Home page
2. Click "Register" button
3. Fill in player details
4. Complete payment via UPI
5. Submit registration
6. Wait for admin verification
7. View match details once verified

### As an Admin
1. Go to Admin page
2. Enter password: `Paras@1318`
3. View all registered players
4. Verify player payments
5. Update match room credentials
6. Delete players if needed

## Database Schemas

### Player
```javascript
{
  name: String,
  uid: String (unique),
  whatsapp: String,
  email: String,
  paymentRef: String,
  verified: Boolean,
  registrationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Match
```javascript
{
  map: String,
  mode: String,
  time: String,
  date: String,
  roomId: String,
  roomPassword: String,
  prizePool: String,
  entryFee: String,
  isRoomVisible: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, ensure IP whitelist includes your IP

### CORS Error
- Ensure backend server.js has correct origins
- Check that frontend and backend have matching URLs

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` is correct
- Clear browser cache and restart

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist folder
```

### Backend (Railway/Render/Heroku)
```bash
# Push server directory
# Set environment variables in platform
# Update VITE_API_URL to production backend URL
```

## Development

### Running in Development Mode
```bash
# Frontend with hot reload
npm run dev

# Backend with nodemon
cd server && npm run dev
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
# Just deploy server.js with npm dependencies
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For issues or questions:
1. Check [BACKEND_SETUP.md](BACKEND_SETUP.md) for setup help
2. Check [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md) for integration details
3. Review console logs for error messages

## Contact

For more information about this tournament platform, contact the development team.

---

**Version**: 2.0  
**Last Updated**: December 2024  
**Status**: Production Ready ✅

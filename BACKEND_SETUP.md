# Fire Zone Backend Setup Guide

## Overview
This backend provides REST APIs for storing and managing tournament data with MongoDB.

## Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm/yarn

## Setup Instructions

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
MONGODB_URI=mongodb://localhost:27017/firezone
PORT=5000
ADMIN_PASSWORD=Paras@1318
NODE_ENV=development
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Replace `MONGODB_URI` in `.env`

### 4. Start the Backend Server
```bash
cd server
npm run dev
```

Expected output:
```
🔥 Fire Zone Backend Server Running on http://localhost:5000
📝 Players API: http://localhost:5000/api/players
🎮 Match API: http://localhost:5000/api/match
🔐 Admin API: http://localhost:5000/api/admin
```

### 5. Start the Frontend (in another terminal)
```bash
npm run dev
```

## API Endpoints

### Players API (`/api/players`)
- **GET** `/api/players` - Get all players
- **GET** `/api/players/:id` - Get single player
- **POST** `/api/players` - Register new player
- **PATCH** `/api/players/:id/verify` - Verify player payment
- **DELETE** `/api/players/:id` - Delete single player
- **POST** `/api/players/delete/bulk` - Delete multiple players

### Match API (`/api/match`)
- **GET** `/api/match` - Get match details
- **PATCH** `/api/match` - Update all match details
- **PATCH** `/api/match/:field` - Update specific field

### Admin API (`/api/admin`)
- **POST** `/api/admin/login` - Admin login

## Data Structure

### Player Schema
```javascript
{
  name: String,
  uid: String (unique),
  whatsapp: String,
  email: String,
  paymentRef: String,
  verified: Boolean (default: false),
  registrationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Match Schema
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

## Running Both Services

### Terminal 1 (Backend)
```bash
cd server
npm run dev
```

### Terminal 2 (Frontend)
```bash
npm run dev
```

Both servers will run simultaneously:
- Frontend: http://localhost:3000/Fire-Zone-2.0/
- Backend: http://localhost:5000/api

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check MongoDB credentials if using Atlas

### "Backend not responding"
- Ensure backend is running on port 5000
- Check CORS settings if frontend is on different origin
- Check firewall settings

### "Port already in use"
Change port in `.env`:
```
PORT=5001
```

## Testing API with Thunder Client / Postman

### Register Player
```
POST http://localhost:5000/api/players
Content-Type: application/json

{
  "name": "John Doe",
  "uid": "CODM12345",
  "whatsapp": "+919876543210",
  "email": "john@example.com",
  "paymentRef": "TXN123456789"
}
```

### Get All Players
```
GET http://localhost:5000/api/players
```

### Verify Player
```
PATCH http://localhost:5000/api/players/{playerId}/verify
Content-Type: application/json
```

### Update Match Details
```
PATCH http://localhost:5000/api/match
Content-Type: application/json

{
  "map": "Nuketown Island",
  "mode": "Team Deathmatch",
  "roomId": "ROOM123",
  "roomPassword": "pass123"
}
```

## Production Deployment

For production, deploy to services like:
- **Heroku**
- **Railway**
- **Render**
- **AWS**
- **Azure**

Update `VITE_API_URL` in production environment to your deployed backend URL.

# Fire Zone Tournament - Full Stack Web App

A tournament management system for Fire Zone with React frontend and Express.js backend using SQLite.

## Features

- 🎮 Player registration with validation
- 💳 Payment reference tracking
- 📊 Tournament admin dashboard
- 🔐 Admin authentication
- 📱 Responsive design with Neon UI
- 💾 SQLite database for persistent storage

## Project Structure

```
Fire-Zone-2.0-main/
├── /                          # Frontend (React + Vite)
│   ├── src/
│   ├── pages/                 # Page components
│   ├── components/            # Reusable components
│   ├── context/               # React context (state)
│   ├── api/                   # API client
│   ├── package.json
│   └── vite.config.ts
│
└── server/                    # Backend (Express.js)
    ├── server.js              # Main server
    ├── db.js                  # SQLite setup
    ├── routes/                # API routes
    │   ├── players.js
    │   ├── match.js
    │   └── admin.js
    ├── package.json
    └── .env
```

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js + Express.js
- SQLite3
- CORS enabled
- dotenv for config

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Step 1: Clone the repository
```bash
git clone <your-repo-url>
cd Fire-Zone-2.0-main
```

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### Step 3: Environment Configuration

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001/api
```

**Backend (server/.env):**
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 4: Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✓ Runs on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✓ Runs on http://127.0.0.1:3000/Fire-Zone-2.0/

## API Endpoints

### Players
- `GET /api/players` - Get all players
- `POST /api/players` - Register new player
- `GET /api/players/:id` - Get single player
- `PATCH /api/players/:id/verify` - Verify player
- `DELETE /api/players/:id` - Delete player
- `POST /api/players/delete/bulk` - Delete multiple players

### Match
- `GET /api/match` - Get match details
- `PATCH /api/match` - Update match details
- `PATCH /api/match/:field` - Update specific field

### Admin
- `POST /api/admin/login` - Admin login

### Health
- `GET /api/health` - Server health check

## Database Schema

### Players Table
```sql
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  uid INTEGER NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  paymentRef TEXT NOT NULL,
  verified INTEGER DEFAULT 0,
  registrationDate TEXT,
  createdAt TEXT,
  updatedAt TEXT
)
```

### Match Details Table
```sql
CREATE TABLE match_details (
  id TEXT PRIMARY KEY,
  map TEXT,
  mode TEXT,
  time TEXT,
  date TEXT,
  roomId TEXT,
  roomPassword TEXT,
  prizePool TEXT,
  entryFee TEXT,
  isRoomVisible INTEGER DEFAULT 0,
  createdAt TEXT,
  updatedAt TEXT
)
```

### Admin Table
```sql
CREATE TABLE admin (
  id TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  createdAt TEXT
)
```

## Build & Production

### Build Frontend
```bash
npm run build
```
Creates optimized build in `dist/` folder.

### Production Deployment

**Render.com (Backend):**
1. Push to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy

**Vercel/GitHub Pages (Frontend):**
1. Push to GitHub
2. Connect repo to Vercel
3. Set `VITE_API_URL` to production backend URL
4. Deploy

## Default Credentials

- **Admin Password:** `admin123` (change in production!)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `PORT` in `server/.env` |
| API connection fails | Verify `VITE_API_URL` points to backend |
| Database errors | Delete `firezone.db` to reinitialize |
| CORS errors | Check frontend URL in `server/server.js` |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

**Made with 🔥 for Fire Zone Tournament**

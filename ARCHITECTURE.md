# Fire Zone 2.0 - Complete Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER DEVICES                              │
│        (Browser, Mobile, Tablet)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                    FRONTEND LAYER                                │
│  (React 19 + TypeScript + Vite)                                 │
│                                                                  │
│  Pages:                                                          │
│  • Home - Tournament overview                                    │
│  • Register - Player registration                               │
│  • MatchInfo - Match details                                    │
│  • Admin - Admin dashboard                                      │
│  • Contact - Contact information                                │
│                                                                  │
│  Components:                                                     │
│  • Layout - Main layout wrapper                                 │
│  • NeonButton, NeonCard, NeonInput - UI components             │
│                                                                  │
│  State Management:                                              │
│  • TournamentContext - Global state                            │
│  • API Client (backend.ts)                                     │
│                                                                  │
│  URL: http://127.0.0.1:3000/Fire-Zone-2.0/                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ REST API (JSON)
                         │ http://localhost:5000/api/*
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                    BACKEND LAYER                                 │
│  (Node.js + Express.js)                                         │
│                                                                  │
│  Routes:                                                         │
│  • /api/players         - Player CRUD                           │
│  • /api/match           - Match management                      │
│  • /api/admin           - Admin auth                            │
│  • /api/health          - Server health check                   │
│                                                                  │
│  Features:                                                       │
│  • Request validation                                           │
│  • Error handling                                               │
│  • CORS enabled                                                 │
│  • Environment config                                           │
│                                                                  │
│  URL: http://localhost:5000                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ MongoDB Driver
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                   DATABASE LAYER                                 │
│  (MongoDB + Mongoose)                                           │
│                                                                  │
│  Collections:                                                    │
│  • players         - Tournament registrations                   │
│  • matchdetails    - Match information                          │
│                                                                  │
│  Database: firezone                                             │
│  Connection: mongodb://localhost:27017                          │
│             (or MongoDB Atlas)                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Request/Response Flow Example

### Example: Player Registration

```
1. USER ACTION
   User fills registration form and clicks "Register"
   
   ↓
   
2. FRONTEND (TournamentContext)
   registerPlayer() async function called
   
   ↓
   
3. API CLIENT (backend.ts)
   POST request to /api/players
   Body: {name, uid, whatsapp, email, paymentRef}
   Headers: Content-Type: application/json
   
   ↓
   
4. BACKEND (routes/players.js)
   POST /api/players handler
   - Validate input
   - Check duplicate UID
   - Create Player document
   
   ↓
   
5. DATABASE (models/Player.js)
   MongoDB saves player
   - Generates _id
   - Sets registrationDate
   - Sets verified: false
   
   ↓
   
6. RESPONSE (Backend → Frontend)
   Status: 201 Created
   Body: {_id, name, uid, verified, registrationDate, ...}
   
   ↓
   
7. FRONTEND UPDATE
   - setPlayers() updates context
   - Local state reflects change
   - Component re-renders
   - localStorage synced
   
   ↓
   
8. USER SEES
   Success message
   Player added to admin list
   Data persists across refresh
```

## Technology Stack Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND                                   │
├──────────────────────────────────────────────────────────────┤
│ Framework:    React 19 + TypeScript                          │
│ Build:        Vite 6                                          │
│ Styling:      Tailwind CSS                                    │
│ Icons:        Lucide React                                    │
│ State:        React Context API                              │
│ HTTP:         Fetch API                                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    BACKEND                                    │
├──────────────────────────────────────────────────────────────┤
│ Runtime:      Node.js                                         │
│ Framework:    Express.js                                      │
│ Language:     JavaScript                                      │
│ Middleware:   CORS, Body Parser                              │
│ Validation:   Built-in                                        │
│ Auth:         Basic password auth                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    DATABASE                                   │
├──────────────────────────────────────────────────────────────┤
│ Type:         NoSQL Document Database                        │
│ Database:     MongoDB                                         │
│ ODM:          Mongoose                                        │
│ Collections:  players, matchdetails                          │
│ Deployment:   Local or MongoDB Atlas                         │
└──────────────────────────────────────────────────────────────┘
```

## File Organization

```
Fire-Zone-2.0-main/
│
├── 📄 Frontend App Files
│   ├── App.tsx                         (Main app component)
│   ├── index.tsx                       (Entry point)
│   ├── types.ts                        (TypeScript types)
│   ├── constants.ts                    (App constants)
│   ├── vite.config.ts                  (Vite config)
│   └── index.html                      (HTML template)
│
├── 📁 Frontend Source Code
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx              (Main wrapper)
│   │   │   ├── Navbar.tsx              (Top navigation)
│   │   │   └── BottomNav.tsx           (Bottom navigation)
│   │   └── ui/
│   │       ├── NeonButton.tsx          (Styled button)
│   │       ├── NeonCard.tsx            (Styled card)
│   │       └── NeonInput.tsx           (Styled input)
│   │
│   ├── pages/
│   │   ├── Home.tsx                    (Home page)
│   │   ├── Register.tsx                (Registration)
│   │   ├── MatchInfo.tsx               (Match details)
│   │   ├── Admin.tsx                   (Admin panel)
│   │   └── Contact.tsx                 (Contact page)
│   │
│   ├── context/
│   │   └── TournamentContext.tsx       (State management)
│   │
│   ├── api/
│   │   ├── backend.ts                  (NEW - API client)
│   │   └── client.ts                   (Existing)
│   │
│   └── assets/                         (Images, media)
│
├── 📁 Backend Server (NEW)
│   └── server/
│       ├── server.js                   (Main server)
│       ├── package.json                (Dependencies)
│       ├── .env                        (Config)
│       ├── .env.example                (Config template)
│       │
│       ├── config/
│       │   └── db.js                   (MongoDB setup)
│       │
│       ├── models/
│       │   ├── Player.js               (Player schema)
│       │   └── MatchDetails.js         (Match schema)
│       │
│       └── routes/
│           ├── players.js              (Player endpoints)
│           ├── match.js                (Match endpoints)
│           └── admin.js                (Auth endpoints)
│
├── 📚 Documentation (NEW)
│   ├── SETUP_COMPLETE.md               (This overview)
│   ├── BACKEND_SETUP.md                (Backend guide)
│   ├── MONGODB_SETUP.md                (Database guide)
│   ├── INTEGRATION_COMPLETE.md         (Integration guide)
│   ├── README_UPDATED.md               (Project README)
│   │
│   └── Startup Scripts (NEW)
│       ├── start.bat                   (Windows launcher)
│       └── start.sh                    (Linux/Mac launcher)
│
└── 📄 Config Files
    ├── package.json                    (Frontend deps)
    ├── tsconfig.json                   (TypeScript config)
    ├── vite.config.ts                  (Vite config)
    └── .gitignore                      (Git ignore)
```

## Data Models

### Player Schema
```javascript
{
  _id: ObjectId,                    // Auto-generated by MongoDB
  name: String,                     // Player full name
  uid: String,                      // Unique Game UID
  whatsapp: String,                 // WhatsApp number
  email: String,                    // Email address
  paymentRef: String,               // Payment reference/receipt
  verified: Boolean,                // Payment verified by admin
  registrationDate: Date,           // Registration timestamp
  createdAt: Date,                  // Created timestamp (auto)
  updatedAt: Date                   // Updated timestamp (auto)
}
```

### Match Details Schema
```javascript
{
  _id: ObjectId,                    // Auto-generated
  map: String,                      // Map name
  mode: String,                     // Game mode
  time: String,                     // Match time
  date: String,                     // Match date
  roomId: String,                   // Game room ID
  roomPassword: String,             // Room password
  prizePool: String,                // Prize pool amount
  entryFee: String,                 // Entry fee
  isRoomVisible: Boolean,           // Visible to verified players
  createdAt: Date,                  // Created timestamp
  updatedAt: Date                   // Updated timestamp
}
```

## Environment Variables

### Frontend (vite.config.ts defines)
```
VITE_API_URL        → http://localhost:5000/api
VITE_ADMIN_PASSWORD → Paras@1318
VITE_UPI_ID         → (payment ID)
VITE_PAYEE_NAME     → (payee name)
```

### Backend (server/.env file)
```
MONGODB_URI         → mongodb://localhost:27017/firezone
PORT                → 5000
ADMIN_PASSWORD      → Paras@1318
NODE_ENV            → development
```

## Deployment Architecture

### Development
```
Your Computer
├── Frontend (localhost:3000)
├── Backend (localhost:5000)
└── MongoDB (localhost:27017)
```

### Production
```
Cloud Provider (Vercel, Netlify, etc.)
├── Frontend CDN
└── Backend Server
    └── MongoDB Atlas Cloud
```

## Security Considerations

```
┌─────────────────────────────────────────┐
│        CURRENT IMPLEMENTATION           │
├─────────────────────────────────────────┤
│ ✓ Basic admin password auth            │
│ ✓ CORS whitelist configured            │
│ ✓ Input validation on backend          │
│ ✓ Environment variables for secrets    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      RECOMMENDED FOR PRODUCTION         │
├─────────────────────────────────────────┤
│ → JWT token authentication              │
│ → Password hashing with bcrypt          │
│ → HTTPS encryption                      │
│ → Rate limiting                         │
│ → Request logging                       │
│ → Database backups                      │
│ → Firewall rules                        │
│ → DDoS protection                       │
└─────────────────────────────────────────┘
```

## Performance Considerations

```
Frontend Optimization:
├── Code splitting with Vite
├── Lazy loading components
├── Local storage caching
└── Error boundary handling

Backend Optimization:
├── MongoDB indexes
├── Request validation
├── Error handling
└── Connection pooling

Database Optimization:
├── Schema design
├── Indexing strategy
├── Query optimization
└── Regular backups
```

## Monitoring & Logging

```
Frontend:
├── Browser console errors
├── Network tab (API calls)
└── React DevTools

Backend:
├── Console.log statements
├── Error responses
└── Request/response logging

Database:
├── MongoDB Compass GUI
├── Collection stats
└── Query performance
```

---

## 📋 Checklist for Full Setup

- [ ] Install Node.js (v16+)
- [ ] Install MongoDB locally OR create Atlas account
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] .env file created in server directory
- [ ] MongoDB is running
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://127.0.0.1:3000/Fire-Zone-2.0/
- [ ] Can access http://localhost:5000/api/health
- [ ] Can register a player and see in MongoDB
- [ ] Admin login works
- [ ] Player verification works
- [ ] Match details can be updated

---

## 🎓 Key Concepts

### Context API
Store shared state (players, match details) available to all components without prop drilling.

### REST API
Standard HTTP methods (GET, POST, PATCH, DELETE) for server communication.

### MongoDB Documents
Flexible JSON-like documents stored in collections, no rigid schema.

### Mongoose
Makes MongoDB easier with schema validation and built-in methods.

### Async/Await
Modern JavaScript for handling asynchronous API calls cleanly.

### Error Handling
Graceful failure with fallback options and user feedback.

---

**Next Step**: Follow [MONGODB_SETUP.md](MONGODB_SETUP.md) to complete the setup! 🚀

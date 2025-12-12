import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db.js';
import playersRouter from './routes/players.js';
import matchRouter from './routes/match.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'https://paras1706.github.io',
      'https://Paras1706.github.io',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || 
        allowedOrigins.includes(origin) || 
        origin.includes('ngrok') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for development
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
initializeDatabase();

// Routes
app.use('/api/players', playersRouter);
app.use('/api/match', matchRouter);
app.use('/api/admin', adminRouter);

// Root endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fire Zone Tournament Backend',
    version: '1.0.0',
    status: 'Running',
    database: 'SQLite',
    visit: 'http://localhost:5000/api'
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Fire Zone API',
    version: '1.0.0',
    database: 'SQLite',
    endpoints: {
      players: '/api/players',
      match: '/api/match',
      admin: '/api/admin',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(), 
    database: 'SQLite'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`\n🔥 Fire Zone Backend Server Running on http://localhost:${PORT}`);
  console.log(`💾 Database: SQLite (firezone.db)`);
  console.log(`📝 Players API: http://localhost:${PORT}/api/players`);
  console.log(`🎮 Match API: http://localhost:${PORT}/api/match`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`⚡ Health Check: http://localhost:${PORT}/api/health\n`);
});

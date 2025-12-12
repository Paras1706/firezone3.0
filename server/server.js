import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import playersRouter from './routes/players.js';
import matchRouter from './routes/match.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/players', playersRouter);
app.use('/api/match', matchRouter);
app.use('/api/admin', adminRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fire Zone Tournament Backend',
    version: '1.0.0',
    status: 'Running',
    visit: 'http://localhost:5000/api'
  });
});

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Fire Zone API',
    version: '1.0.0',
    storage: 'JSON Files',
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
  res.json({ status: 'Server is running', timestamp: new Date(), storage: 'JSON' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🔥 Fire Zone Backend Server Running on http://localhost:${PORT}`);
  console.log(`💾 Storage: JSON Files (data/ folder)`);
  console.log(`📝 Players API: http://localhost:${PORT}/api/players`);
  console.log(`🎮 Match API: http://localhost:${PORT}/api/match`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
});

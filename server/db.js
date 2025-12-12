import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'firezone.db');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✓ SQLite database connected at', dbPath);
  }
});

// Initialize database tables
export const initializeDatabase = () => {
  db.serialize(() => {
    // Players table
    db.run(`
      CREATE TABLE IF NOT EXISTS players (
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
    `, (err) => {
      if (err) console.error('Players table error:', err);
      else console.log('✓ Players table ready');
    });

    // Match details table
    db.run(`
      CREATE TABLE IF NOT EXISTS match_details (
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
    `, (err) => {
      if (err) console.error('Match details table error:', err);
      else console.log('✓ Match details table ready');
    });

    // Admin credentials table (simple password storage)
    db.run(`
      CREATE TABLE IF NOT EXISTS admin (
        id TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        createdAt TEXT
      )
    `, (err) => {
      if (err) console.error('Admin table error:', err);
      else console.log('✓ Admin table ready');
    });

    // Initialize default data
    initializeDefaultData();
  });
};

const initializeDefaultData = () => {
  const now = new Date().toISOString();

  // Check if match details exist
  db.get('SELECT * FROM match_details LIMIT 1', (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO match_details (id, map, mode, time, date, roomId, roomPassword, prizePool, entryFee, isRoomVisible, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, ['match-1', 'Nuketown Island', 'Team Deathmatch', '7:00 PM', '', '', '', '₹5000', '₹50', 0, now, now], (err) => {
        if (err) console.error('Error inserting default match:', err);
        else console.log('✓ Default match details initialized');
      });
    }
  });

  // Check if admin exists
  db.get('SELECT * FROM admin LIMIT 1', (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO admin (id, password, createdAt)
        VALUES (?, ?, ?)
      `, ['admin-1', 'admin123', now], (err) => {
        if (err) console.error('Error inserting default admin:', err);
        else console.log('✓ Default admin credentials initialized (password: admin123)');
      });
    }
  });
};

// Helper functions for database operations
export const runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const getAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const allAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

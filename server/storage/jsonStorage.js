import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const playersFile = path.join(dataDir, 'players.json');
const matchFile = path.join(dataDir, 'match.json');

// Initialize files if they don't exist
if (!fs.existsSync(playersFile)) {
  fs.writeFileSync(playersFile, JSON.stringify([], null, 2));
}

if (!fs.existsSync(matchFile)) {
  const defaultMatch = {
    id: 'match-1',
    map: 'Nuketown Island',
    mode: 'Team Deathmatch',
    time: '7:00 PM',
    date: '',
    roomId: '',
    roomPassword: '',
    prizePool: '₹5000',
    entryFee: '₹50',
    isRoomVisible: false
  };
  fs.writeFileSync(matchFile, JSON.stringify(defaultMatch, null, 2));
}

// Players operations
export const players = {
  getAll() {
    const data = fs.readFileSync(playersFile, 'utf-8');
    return JSON.parse(data);
  },

  getById(id) {
    const all = this.getAll();
    return all.find(p => p.id === id);
  },

  create(playerData) {
    const all = this.getAll();
    const newPlayer = {
      id: Date.now().toString(),
      ...playerData,
      verified: false,
      registrationDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.push(newPlayer);
    fs.writeFileSync(playersFile, JSON.stringify(all, null, 2));
    return newPlayer;
  },

  update(id, updateData) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(playersFile, JSON.stringify(all, null, 2));
    return all[index];
  },

  delete(id) {
    const all = this.getAll();
    const filtered = all.filter(p => p.id !== id);
    fs.writeFileSync(playersFile, JSON.stringify(filtered, null, 2));
    return true;
  },

  deleteMultiple(ids) {
    const all = this.getAll();
    const filtered = all.filter(p => !ids.includes(p.id));
    fs.writeFileSync(playersFile, JSON.stringify(filtered, null, 2));
    return filtered.length;
  }
};

// Match details operations
export const matchDetails = {
  get() {
    const data = fs.readFileSync(matchFile, 'utf-8');
    return JSON.parse(data);
  },

  update(updateData) {
    const current = this.get();
    const updated = {
      ...current,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(matchFile, JSON.stringify(updated, null, 2));
    return updated;
  }
};

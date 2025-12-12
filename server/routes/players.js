import express from 'express';
import { allAsync, getAsync, runAsync } from '../db.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await allAsync('SELECT * FROM players');
    res.json(players || []);
  } catch (error) {
    console.error('Get players error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single player
router.get('/:id', async (req, res) => {
  try {
    const player = await getAsync('SELECT * FROM players WHERE id = ?', [req.params.id]);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    console.error('Get player error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create player
router.post('/', async (req, res) => {
  const { name, uid, whatsapp, email, paymentRef } = req.body;

  // Validation
  if (!name || !uid || !whatsapp || !email || !paymentRef) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if UID already exists
    const existing = await getAsync('SELECT * FROM players WHERE uid = ?', [uid]);
    if (existing) {
      return res.status(400).json({ message: 'Player with this UID already registered' });
    }

    const id = Date.now().toString();
    const now = new Date().toISOString();

    await runAsync(
      `INSERT INTO players (id, name, uid, whatsapp, email, paymentRef, verified, registrationDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, uid, whatsapp, email, paymentRef, 0, now, now, now]
    );

    const newPlayer = await getAsync('SELECT * FROM players WHERE id = ?', [id]);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Create player error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Verify player
router.patch('/:id/verify', async (req, res) => {
  try {
    const now = new Date().toISOString();
    await runAsync('UPDATE players SET verified = 1, updatedAt = ? WHERE id = ?', [now, req.params.id]);
    const player = await getAsync('SELECT * FROM players WHERE id = ?', [req.params.id]);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    console.error('Verify player error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete single player
router.delete('/:id', async (req, res) => {
  try {
    const player = await getAsync('SELECT * FROM players WHERE id = ?', [req.params.id]);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    await runAsync('DELETE FROM players WHERE id = ?', [req.params.id]);
    res.json({ message: 'Player deleted', player });
  } catch (error) {
    console.error('Delete player error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete multiple players
router.post('/delete/bulk', async (req, res) => {
  try {
    const { playerIds } = req.body;
    if (!playerIds || !Array.isArray(playerIds)) {
      return res.status(400).json({ message: 'playerIds must be an array' });
    }

    for (const id of playerIds) {
      await runAsync('DELETE FROM players WHERE id = ?', [id]);
    }

    res.json({ message: 'Players deleted', deletedCount: playerIds.length });
  } catch (error) {
    console.error('Delete bulk error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

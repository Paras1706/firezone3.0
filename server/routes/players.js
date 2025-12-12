import express from 'express';
import { players } from '../storage/jsonStorage.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const allPlayers = players.getAll();
    res.json(allPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single player
router.get('/:id', async (req, res) => {
  try {
    const player = players.getById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
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
    const existing = players.getAll().find(p => p.uid === uid);
    if (existing) {
      return res.status(400).json({ message: 'Player with this UID already registered' });
    }

    const newPlayer = players.create({
      name,
      uid,
      whatsapp,
      email,
      paymentRef
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify player
router.patch('/:id/verify', async (req, res) => {
  try {
    const player = players.update(req.params.id, { verified: true });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete single player
router.delete('/:id', async (req, res) => {
  try {
    const player = players.getById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    players.delete(req.params.id);
    res.json({ message: 'Player deleted', player });
  } catch (error) {
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

    const deletedCount = players.deleteMultiple(playerIds);
    res.json({ message: 'Players deleted', deletedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

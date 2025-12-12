import express from 'express';
import { getAsync, runAsync, allAsync } from '../db.js';

const router = express.Router();

// Get match details
router.get('/', async (req, res) => {
  try {
    const match = await getAsync('SELECT * FROM match_details WHERE id = ?', ['match-1']);
    res.json(match);
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update match details
router.patch('/', async (req, res) => {
  try {
    const { map, mode, time, date, roomId, roomPassword, prizePool, entryFee, isRoomVisible } = req.body;
    const now = new Date().toISOString();

    const updates = [];
    const values = [];

    if (map !== undefined) { updates.push('map = ?'); values.push(map); }
    if (mode !== undefined) { updates.push('mode = ?'); values.push(mode); }
    if (time !== undefined) { updates.push('time = ?'); values.push(time); }
    if (date !== undefined) { updates.push('date = ?'); values.push(date); }
    if (roomId !== undefined) { updates.push('roomId = ?'); values.push(roomId); }
    if (roomPassword !== undefined) { updates.push('roomPassword = ?'); values.push(roomPassword); }
    if (prizePool !== undefined) { updates.push('prizePool = ?'); values.push(prizePool); }
    if (entryFee !== undefined) { updates.push('entryFee = ?'); values.push(entryFee); }
    if (isRoomVisible !== undefined) { updates.push('isRoomVisible = ?'); values.push(isRoomVisible); }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updates.push('updatedAt = ?');
    values.push(now);
    values.push('match-1');

    const sql = `UPDATE match_details SET ${updates.join(', ')} WHERE id = ?`;
    await runAsync(sql, values);

    const match = await getAsync('SELECT * FROM match_details WHERE id = ?', ['match-1']);
    res.json(match);
  } catch (error) {
    console.error('Update match error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update single field
router.patch('/:field', async (req, res) => {
  try {
    const { field } = req.params;
    const { value } = req.body;
    const now = new Date().toISOString();

    const allowedFields = ['map', 'mode', 'time', 'date', 'roomId', 'roomPassword', 'prizePool', 'entryFee', 'isRoomVisible'];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: 'Invalid field' });
    }

    const sql = `UPDATE match_details SET ${field} = ?, updatedAt = ? WHERE id = ?`;
    await runAsync(sql, [value, now, 'match-1']);

    const match = await getAsync('SELECT * FROM match_details WHERE id = ?', ['match-1']);
    res.json(match);
  } catch (error) {
    console.error('Update field error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

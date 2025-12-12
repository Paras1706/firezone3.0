import express from 'express';
import { matchDetails } from '../storage/jsonStorage.js';

const router = express.Router();

// Get match details
router.get('/', async (req, res) => {
  try {
    const match = matchDetails.get();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update match details
router.patch('/', async (req, res) => {
  try {
    const updated = matchDetails.update(req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update specific match field
router.patch('/:field', async (req, res) => {
  try {
    const { value } = req.body;
    const updated = matchDetails.update({ [req.params.field]: value });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

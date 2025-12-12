import express from 'express';
import { getAsync } from '../db.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password required' });
    }

    const admin = await getAsync('SELECT * FROM admin WHERE id = ?', ['admin-1']);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid admin password' });
    }

    res.json({ message: 'Admin login successful', admin: { id: admin.id } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

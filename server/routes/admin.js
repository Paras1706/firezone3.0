import express from 'express';

const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'Paras@1318';

  if (password === adminPassword) {
    res.json({ 
      success: true, 
      message: 'Admin logged in successfully',
      token: Buffer.from(password).toString('base64')
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid admin password' 
    });
  }
});

export default router;

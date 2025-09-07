const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    
    const token = jwt.sign(
      { userId: 1, email, role: 'normal_user' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: { id: 1, name, email, role: 'normal_user' },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let role = 'normal_user';
    if (email === 'admin@storerating.com') role = 'system_admin';
    if (email === 'john.store@electronics.com') role = 'store_owner';
    
    const token = jwt.sign(
      { userId: 1, email, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }  
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: 1, name: 'Demo User', email, role },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

router.get('/verify', (req, res) => {
  res.json({ 
    success: true, 
    data: { user: { id: 1, name: 'Demo User', role: 'system_admin' } } 
  });
});

router.put('/password', (req, res) => {
  res.json({ success: true, message: 'Password updated successfully' });
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      dashboard: { 
        totalUsers: 8, 
        totalStores: 3, 
        totalRatings: 15 
      } 
    } 
  });
});

router.post('/users', (req, res) => {
  res.json({ success: true, message: 'User created successfully' });
});

router.get('/users', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      users: [
        { id: 1, name: 'System Administrator User', email: 'admin@storerating.com', role: 'system_admin', created_at: new Date() },
        { id: 2, name: 'John Store Owner Manager', email: 'john.store@electronics.com', role: 'store_owner', created_at: new Date() },
        { id: 3, name: 'Alice Johnson Normal User', email: 'alice.johnson@email.com', role: 'normal_user', created_at: new Date() }
      ] 
    } 
  });
});

router.get('/stores', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      stores: [
        { id: 1, name: 'TechWorld Electronics Store', email: 'contact@techworld.com', address: '456 Business Ave', owner_name: 'John Store Owner Manager', average_rating: 4.5, total_ratings: 10 }
      ] 
    } 
  });
});

router.post('/stores', (req, res) => {
  res.json({ success: true, message: 'Store created successfully' });
});

module.exports = router;

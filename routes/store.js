const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      store: {
        id: 1,
        name: 'TechWorld Electronics Store',
        email: 'contact@techworld.com',
        address: '456 Business Ave',
        average_rating: 4.5,
        total_ratings: 12
      },
      ratings: [
        { id: 1, user_name: 'Alice Johnson', user_email: 'alice@email.com', rating: 5, created_at: new Date() },
        { id: 2, user_name: 'Bob Wilson', user_email: 'bob@email.com', rating: 4, created_at: new Date() }
      ],
      stats: {
        averageRating: 4.5,
        totalRatings: 12
      }
    } 
  });
});

module.exports = router;

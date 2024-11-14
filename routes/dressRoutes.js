const express = require('express');
const { getPurchasedDresses } = require('../controllers/dressController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to check authentication

const router = express.Router();

// Route to get purchased dresses (only accessible if logged in)
router.get('/dresses', authMiddleware, getPurchasedDresses);

module.exports = router;

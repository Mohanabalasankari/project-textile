const express = require('express');
const router = express.Router();
const { getPurchasedDresses } = require('../controllers/purchasedDressesController');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed

router.get('/purchased-dresses', authMiddleware, getPurchasedDresses);

module.exports = router;

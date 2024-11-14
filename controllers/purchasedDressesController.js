const PurchasedDress = require('../models/PurchasedDress');
const User = require('../models/User');


// Example function to get purchased dresses
const getPurchasedDresses = async (req, res) => {
    try {
      const userId = req.user?.id; // Access the ID from req.user
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const dresses = await PurchasedDress.find({ userId });
      res.json(dresses);
    } catch (error) {
      console.error('Error fetching purchased dresses:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

module.exports = { getPurchasedDresses };

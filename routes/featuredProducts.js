const express = require('express');
const multer = require('multer');
const FeaturedProduct = require('../models/FeaturedProduct');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the uploads directory

// Add a new featured product
router.post('/', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const image = req.file.filename; // Get the uploaded image path

  const featuredProduct = new FeaturedProduct({ 
    name, 
    image: `/uploads/${image}`, });

  try {
    await featuredProduct.save();
    res.status(201).json(featuredProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding featured product', error });
  }
});

// Get all featured products
router.get('/', async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.find();
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured products', error });
  }
});

// Delete a featured product
router.delete('/:id', async (req, res) => {
  try {
    await FeaturedProduct.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting featured product', error });
  }
});

module.exports = router;

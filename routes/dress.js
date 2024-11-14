const express = require('express');
const multer = require('multer');
const router = express.Router();
const Dress = require('../models/Dress'); // Adjust the path as necessary

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to avoid filename collisions
  },
});

const upload = multer({ storage });

// Route for adding a dress
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file.filename; // Use the filename for the image

    const newDress = new Dress({
      name,
      description,
      price,
      image: `/uploads/${image}`, // Serve images from the uploads directory
    });

    await newDress.save();
    res.status(201).json(newDress);
  } catch (error) {
    console.error('Error adding dress:', error);
    res.status(500).json({ message: 'Failed to add dress' });
  }
});

module.exports = router;

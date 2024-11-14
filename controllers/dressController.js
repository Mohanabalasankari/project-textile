const Dress = require('../models/Dress'); // Assuming you have a Dress model

// Get all dresses
const getDresses = async (req, res) => {
  try {
    const dresses = await Dress.find();
    res.json(dresses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dresses', error: error.message });
  }
};

// Add a new dress
const addDress = async (req, res) => {
  try {
    const newDress = new Dress(req.body);
    await newDress.save();
    res.status(201).json(newDress);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add dress', error: error.message });
  }
};

// Update an existing dress
const updateDress = async (req, res) => {
  try {
    const updatedDress = await Dress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDress) return res.status(404).json({ message: 'Dress not found' });
    res.json(updatedDress);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update dress', error: error.message });
  }
};

// Delete a dress
const deleteDress = async (req, res) => {
  try {
    const deletedDress = await Dress.findByIdAndDelete(req.params.id);
    if (!deletedDress) return res.status(404).json({ message: 'Dress not found' });
    res.json({ message: 'Dress deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete dress', error: error.message });
  }
};

module.exports = { getDresses, addDress, updateDress, deleteDress };

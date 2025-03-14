const mongoose = require('mongoose');

const dressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store the image path
});

const Dress = mongoose.model('Dress', dressSchema);
module.exports = Dress;

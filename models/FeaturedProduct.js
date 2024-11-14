const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Store the image path
});

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);
module.exports = FeaturedProduct;

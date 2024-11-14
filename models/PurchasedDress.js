const mongoose = require('mongoose');

const purchasedDressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true, // URL or path to the dress image
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },

});

const PurchasedDress = mongoose.model('PurchasedDress', purchasedDressSchema);



const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      dressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dress', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

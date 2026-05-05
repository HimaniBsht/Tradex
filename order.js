const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stock',
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],  // only BUY or SELL allowed
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true          // price at which order was executed
  },
  total: {
    type: Number,
    required: true          // quantity × price
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
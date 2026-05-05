const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',        // links to User model
    required: true
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stock',       // links to Stock model
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1              // must own at least 1 share
  },
  avgBuyPrice: {
    type: Number,
    required: true      // average price at which user bought
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
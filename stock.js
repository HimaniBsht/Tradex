const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  changePercent: {
    type: Number,
    default: 0
  },
  sector: {
    type: String,
    default: 'General'
  },
  volume: {
    type: Number,
    default: 0
  },
  // Stores last 20 prices for chart
  priceHistory: {
    type: [Number],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
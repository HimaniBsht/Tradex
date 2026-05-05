const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['ABOVE', 'BELOW'],  // price goes above or below target
    required: true
  },
  targetPrice: {
    type: Number,
    required: true
  },
  isTriggered: {
    type: Boolean,
    default: false             // becomes true when alert fires
  },
  isActive: {
    type: Boolean,
    default: true              // user can deactivate alerts
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
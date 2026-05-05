const Alert = require('../models/alert');
const Stock = require('../models/stock');

// ─── CREATE ALERT ────────────────────────────────────────
const createAlert = async (req, res) => {
  try {
    const { symbol, type, targetPrice } = req.body;
    const userId = req.user._id;

    if (!symbol || !type || !targetPrice) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if stock exists
    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const alert = await Alert.create({
      user: userId,
      symbol: symbol.toUpperCase(),
      type,
      targetPrice: Number(targetPrice)
    });

    res.status(201).json({
      message: `Alert created! You will be notified when ${symbol} goes ${type} ₹${targetPrice}`,
      alert
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET ALL ALERTS ──────────────────────────────────────
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    // Get current prices for each alert
    const alertsWithPrice = await Promise.all(alerts.map(async (alert) => {
      const stock = await Stock.findOne({ symbol: alert.symbol });
      return {
        ...alert.toObject(),
        currentPrice: stock ? stock.price : 0
      };
    }));

    res.status(200).json(alertsWithPrice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── DELETE ALERT ────────────────────────────────────────
const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    await Alert.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── CHECK ALERTS (called by price updater) ──────────────
const checkAlerts = async () => {
  try {
    // Get all active untriggered alerts
    const alerts = await Alert.find({
      isActive: true,
      isTriggered: false
    });

    for (const alert of alerts) {
      const stock = await Stock.findOne({ symbol: alert.symbol });
      if (!stock) continue;

      let triggered = false;

      if (alert.type === 'ABOVE' && stock.price >= alert.targetPrice) {
        triggered = true;
      }
      if (alert.type === 'BELOW' && stock.price <= alert.targetPrice) {
        triggered = true;
      }

      if (triggered) {
        alert.isTriggered = true;
        await alert.save();
        console.log(`🔔 Alert triggered! ${alert.symbol} is ${alert.type} ₹${alert.targetPrice} (Current: ₹${stock.price})`);
      }
    }
  } catch (error) {
    console.error('Alert check error:', error.message);
  }
};

module.exports = { createAlert, getAlerts, deleteAlert, checkAlerts };
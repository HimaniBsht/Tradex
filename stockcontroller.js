const Stock = require('../models/stock');
const Order = require('../models/order');
const Portfolio = require('../models/portfolio');
const User = require('../models/user');

// ─── GET ALL STOCKS ─────────────────────────────────────
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET SINGLE STOCK ───────────────────────────────────
const getStockBySymbol = async (req, res) => {
  try {
    const foundStock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!foundStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.status(200).json(foundStock);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── BUY STOCK ──────────────────────────────────────────
const buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Please provide valid symbol and quantity' });
    }

    const foundStock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!foundStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const totalCost = foundStock.price * quantity;

    const user = await User.findById(userId);
    if (user.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= totalCost;
    await user.save();

    const existingHolding = await Portfolio.findOne({
      user: userId,
      symbol: foundStock.symbol
    });

    if (existingHolding) {
      const totalQuantity = existingHolding.quantity + quantity;
      const totalValue = (existingHolding.avgBuyPrice * existingHolding.quantity) + totalCost;
      existingHolding.avgBuyPrice = totalValue / totalQuantity;
      existingHolding.quantity = totalQuantity;
      await existingHolding.save();
    } else {
      await Portfolio.create({
        user: userId,
        stock: foundStock._id,
        symbol: foundStock.symbol,
        quantity,
        avgBuyPrice: foundStock.price
      });
    }

    await Order.create({
      user: userId,
      stock: foundStock._id,
      symbol: foundStock.symbol,
      type: 'BUY',
      quantity,
      price: foundStock.price,
      total: totalCost
    });

    res.status(200).json({
      message: `Successfully bought ${quantity} shares of ${symbol.toUpperCase()}`,
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── SELL STOCK ─────────────────────────────────────────
const sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Please provide valid symbol and quantity' });
    }

    const foundStock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!foundStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const holding = await Portfolio.findOne({
      user: userId,
      symbol: foundStock.symbol
    });

    if (!holding) {
      return res.status(400).json({ message: 'You do not own this stock' });
    }

    if (holding.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient shares' });
    }

    const totalValue = foundStock.price * quantity;

    const user = await User.findById(userId);
    user.balance += totalValue;
    await user.save();

    if (holding.quantity === quantity) {
      await Portfolio.findByIdAndDelete(holding._id);
    } else {
      holding.quantity -= quantity;
      await holding.save();
    }

    await Order.create({
      user: userId,
      stock: foundStock._id,
      symbol: foundStock.symbol,
      type: 'SELL',
      quantity,
      price: foundStock.price,
      total: totalValue
    });

    res.status(200).json({
      message: `Successfully sold ${quantity} shares of ${symbol.toUpperCase()}`,
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET PORTFOLIO ──────────────────────────────────────
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching portfolio for user:', userId);

    const portfolio = await Portfolio.find({ user: userId }).populate({
      path: 'stock',
      model: 'Stock'
    });
    console.log('Raw portfolio:', portfolio);

    const populated = await Portfolio.find({ user: userId }).populate({
      path: 'stock',
      model: 'Stock'
    });
    console.log('Populated portfolio:', populated);

    const validHoldings = populated.filter(item => item.stock !== null && item.stock !== undefined);

    const holdings = validHoldings.map(item => ({
      symbol: item.symbol,
      quantity: item.quantity,
      avgBuyPrice: item.avgBuyPrice,
      currentPrice: item.stock.price,
      currentValue: item.stock.price * item.quantity,
      investedValue: item.avgBuyPrice * item.quantity,
      profitLoss: (item.stock.price - item.avgBuyPrice) * item.quantity
    }));

    res.status(200).json(holdings);

  } catch (error) {
    console.error('Portfolio error details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET ORDER HISTORY ──────────────────────────────────
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllStocks,
  getStockBySymbol,
  buyStock,
  sellStock,
  getPortfolio,
  getOrders
};
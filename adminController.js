const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const Order = require('../models/order');
const Stock = require('../models/stock');

// ─── GET ALL USERS ───────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET USER DETAILS ────────────────────────────────────
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user portfolio
    const portfolio = await Portfolio.find({ user: req.params.id }).populate({
      path: 'stock',
      model: 'Stock'
    });

    const validHoldings = portfolio.filter(item => item.stock !== null);
    const holdings = validHoldings.map(item => ({
      symbol: item.symbol,
      quantity: item.quantity,
      avgBuyPrice: item.avgBuyPrice,
      currentPrice: item.stock.price,
      currentValue: item.stock.price * item.quantity,
      investedValue: item.avgBuyPrice * item.quantity,
      profitLoss: (item.stock.price - item.avgBuyPrice) * item.quantity
    }));

    // Get order count
    const orderCount = await Order.countDocuments({ user: req.params.id });

    res.status(200).json({ user, holdings, orderCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── TOGGLE USER STATUS ──────────────────────────────────
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      isActive: user.isActive
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── UPDATE USER BALANCE ─────────────────────────────────
const updateUserBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.balance = balance;
    await user.save();

    res.status(200).json({
      message: 'Balance updated successfully',
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET LEADERBOARD ─────────────────────────────────────
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({ role: 'user', isActive: true }).select('-password');

    // Calculate total portfolio value for each user
    const leaderboard = await Promise.all(users.map(async (user) => {
      const portfolio = await Portfolio.find({ user: user._id }).populate({
        path: 'stock',
        model: 'Stock'
      });

      const validHoldings = portfolio.filter(item => item.stock !== null);

      const portfolioValue = validHoldings.reduce((sum, item) => {
        return sum + (item.stock.price * item.quantity);
      }, 0);

      const investedValue = validHoldings.reduce((sum, item) => {
        return sum + (item.avgBuyPrice * item.quantity);
      }, 0);

      const totalValue = user.balance + portfolioValue;
      const profitLoss = portfolioValue - investedValue;
      const orderCount = await Order.countDocuments({ user: user._id });

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        portfolioValue,
        totalValue,
        profitLoss,
        orderCount,
        createdAt: user.createdAt
      };
    }));

    // Sort by total value descending
    leaderboard.sort((a, b) => b.totalValue - a.totalValue);

    // Add rank
    const ranked = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.status(200).json(ranked);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET PLATFORM STATS ──────────────────────────────────
const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalStocks = await Stock.countDocuments();

    res.status(200).json({
      totalUsers,
      activeUsers,
      totalOrders,
      totalStocks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
  toggleUserStatus,
  updateUserBalance,
  getLeaderboard,
  getPlatformStats
};
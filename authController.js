const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ─── REGISTER ───────────────────────────────────────────
// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, balance } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use custom balance if provided, otherwise default to 10000
    const startingBalance = balance && balance >= 1000 ? Number(balance) : 10000;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      balance: startingBalance
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── LOGIN ──────────────────────────────────────────────
// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response back to frontend
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── ADD FUNDS ──────────────────────────────────────────
// POST /api/auth/add-funds
const addFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please enter a valid amount' });
    }

    if (amount > 1000000) {
      return res.status(400).json({ message: 'Maximum addition is ₹10,00,000 at once' });
    }

    const user = await User.findById(userId);
    user.balance += Number(amount);
    await user.save();

    res.status(200).json({
      message: `₹${Number(amount).toLocaleString('en-IN')} added successfully!`,
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, addFunds };
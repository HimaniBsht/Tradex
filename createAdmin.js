require('dotenv').config();
const connectDB = require('./db');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  await connectDB();

  // Check if admin already exists
  const existing = await User.findOne({ email: 'admin@tradex.com' });
  if (existing) {
    console.log('Admin already exists!');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Admin',
    email: 'admin@tradex.com',
    password: hashedPassword,
    balance: 999999999,
    role: 'admin'
  });

  console.log('Admin created successfully!');
  console.log('Email:    admin@tradex.com');
  console.log('Password: admin123');
  process.exit();
};

createAdmin();
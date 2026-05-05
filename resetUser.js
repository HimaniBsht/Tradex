require('dotenv').config();
const connectDB = require('./db');
const mongoose = require('mongoose');

const reset = async () => {
  await connectDB();
  await mongoose.connection.collection('portfolios').deleteMany({});
  await mongoose.connection.collection('orders').deleteMany({});
  console.log('Portfolio and orders cleared!');
  process.exit();
};

reset();
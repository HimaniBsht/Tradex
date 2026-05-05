require('dotenv').config();
const mongoose = require('mongoose');
const Stock = require('../models/stock');
const connectDB = require('./db');

const stocks = [
  { symbol: 'TCS',       name: 'Tata Consultancy Services', price: 3450, change: 25,  changePercent: 0.73,  sector: 'IT',      volume: 1200000 },
  { symbol: 'RELIANCE',  name: 'Reliance Industries',       price: 2890, change: -15, changePercent: -0.52, sector: 'Energy',  volume: 3400000 },
  { symbol: 'HDFCBANK',  name: 'HDFC Bank',                 price: 1678, change: 12,  changePercent: 0.72,  sector: 'Banking', volume: 2100000 },
  { symbol: 'INFY',      name: 'Infosys',                   price: 1456, change: -8,  changePercent: -0.55, sector: 'IT',      volume: 1800000 },
  { symbol: 'WIPRO',     name: 'Wipro Limited',             price: 456,  change: 5,   changePercent: 1.11,  sector: 'IT',      volume: 900000  },
  { symbol: 'TATAMOTORS',name: 'Tata Motors',               price: 789,  change: 18,  changePercent: 2.33,  sector: 'Auto',    volume: 2500000 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical',        price: 1123, change: -5,  changePercent: -0.44, sector: 'Pharma',  volume: 750000  },
  { symbol: 'ONGC',      name: 'Oil & Natural Gas Corp',    price: 234,  change: 3,   changePercent: 1.30,  sector: 'Energy',  volume: 4200000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank',                price: 987,  change: 9,   changePercent: 0.92,  sector: 'Banking', volume: 1900000 },
  { symbol: 'BAJFINANCE',name: 'Bajaj Finance',             price: 6789, change: -45, changePercent: -0.66, sector: 'Finance', volume: 450000  },
];

const seedDB = async () => {
  await connectDB();
  await Stock.deleteMany({});
  console.log('Old stocks deleted');
  await Stock.insertMany(stocks);
  console.log('10 stocks seeded successfully!');
  process.exit();
};

seedDB();
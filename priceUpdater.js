const Stock = require('../models/stock');
const { checkAlerts } = require('../controllers/alertControllers');

const updatePrices = async () => {
  try {
    const stocks = await Stock.find();

    for (const stock of stocks) {
      const oldPrice = stock.price;
      const changePercent = (Math.random() * 4 - 2);
      const priceChange = (oldPrice * changePercent) / 100;
      const newPrice = Math.max(1, oldPrice + priceChange);

      const roundedPrice = Math.round(newPrice * 100) / 100;
      const roundedChange = Math.round(priceChange * 100) / 100;
      const roundedPercent = Math.round(changePercent * 100) / 100;

      const currentStock = await Stock.findById(stock._id);
      const updatedHistory = [...(currentStock.priceHistory || []), roundedPrice];
      if (updatedHistory.length > 20) updatedHistory.shift();

      await Stock.findByIdAndUpdate(
        stock._id,
        {
          price: roundedPrice,
          change: roundedChange,
          changePercent: roundedPercent,
          $inc: { volume: Math.floor(Math.random() * 10000) },
          priceHistory: updatedHistory
        },
        { returnDocument: 'after' }
      );
    }

    // Check alerts after every price update
    await checkAlerts();

    console.log(`[${new Date().toLocaleTimeString()}] Stock prices updated`);
  } catch (error) {
    console.error('Price update error:', error.message);
  }
};

const startPriceUpdater = () => {
  console.log('Stock price updater started — updates every 10 seconds');
  setInterval(updatePrices, 10000);
};

module.exports = startPriceUpdater;
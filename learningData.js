const lessons = [
    {
      id: 1,
      title: 'What is the Stock Market?',
      category: 'Basics',
      duration: '5 min read',
      icon: '📈',
      content: `
        The stock market is a place where people buy and sell shares of companies.
        When you buy a share, you become a part-owner of that company.
        
        Key Points:
        • Stock markets help companies raise money
        • Investors can earn money through price appreciation
        • Indian stock market has BSE and NSE as main exchanges
        • SENSEX and NIFTY are major market indices
        
        How it works:
        Companies list their shares on the stock exchange through an IPO (Initial Public Offering).
        After listing, investors can buy and sell these shares freely.
        The price of a share is determined by supply and demand.
        
        Example:
        If TCS has 1000 shares and you buy 10, you own 1% of TCS.
        If TCS grows, your shares become more valuable!
      `,
      quiz: [
        {
          question: 'What happens when you buy a share of a company?',
          options: [
            'You lend money to the company',
            'You become a part-owner of the company',
            'You get a fixed interest rate',
            'You get a guaranteed profit'
          ],
          correct: 1
        },
        {
          question: 'What are the two main Indian stock exchanges?',
          options: [
            'NYSE and NASDAQ',
            'BSE and NSE',
            'MCX and NCDEX',
            'RBI and SEBI'
          ],
          correct: 1
        },
        {
          question: 'What is an IPO?',
          options: [
            'International Payment Order',
            'Initial Price Offering',
            'Initial Public Offering',
            'Internal Purchase Order'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Understanding Stock Prices',
      category: 'Basics',
      duration: '6 min read',
      icon: '💹',
      content: `
        Stock prices change every second during market hours based on buyers and sellers.
        
        What affects stock prices?
        • Company performance and profits
        • Economic conditions
        • News and events
        • Investor sentiment
        • Supply and demand
        
        Key Price Terms:
        • Open Price — price at market open (9:15 AM)
        • Close Price — price at market close (3:30 PM)
        • High — highest price of the day
        • Low — lowest price of the day
        • Volume — number of shares traded
        
        Price Change:
        If a stock was ₹100 yesterday and is ₹105 today,
        the change is +₹5 or +5%.
        Green color means price went up.
        Red color means price went down.
        
        Market Hours:
        Indian stock market is open Monday to Friday
        from 9:15 AM to 3:30 PM IST.
      `,
      quiz: [
        {
          question: 'What does green color indicate for a stock price?',
          options: [
            'Price went down',
            'Price stayed same',
            'Price went up',
            'Stock is unavailable'
          ],
          correct: 2
        },
        {
          question: 'When does Indian stock market close?',
          options: [
            '5:00 PM',
            '3:30 PM',
            '4:00 PM',
            '6:00 PM'
          ],
          correct: 1
        },
        {
          question: 'What is Volume in stocks?',
          options: [
            'The price of a stock',
            'The profit from stocks',
            'Number of shares traded',
            'Market capitalization'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: 'What is a Portfolio?',
      category: 'Investing',
      duration: '5 min read',
      icon: '💼',
      content: `
        A portfolio is your complete collection of investments.
        It shows all the stocks you own and their current value.
        
        Portfolio Components:
        • Holdings — stocks you currently own
        • Invested Value — total money you spent buying stocks
        • Current Value — current market value of your stocks
        • P&L — Profit and Loss (difference between current and invested value)
        
        Understanding P&L:
        If you bought TCS at ₹3000 and it is now ₹3500,
        your profit is ₹500 per share.
        P&L = Current Value - Invested Value
        
        Positive P&L = Profit (shown in green)
        Negative P&L = Loss (shown in red)
        
        Diversification:
        Never put all money in one stock!
        Spread investments across different sectors like:
        IT, Banking, Energy, Pharma, Auto
        
        This reduces risk because if one sector falls,
        others may still perform well.
      `,
      quiz: [
        {
          question: 'What is P&L in investing?',
          options: [
            'Price and Liquidity',
            'Profit and Loss',
            'Purchase and Listing',
            'Portfolio and Leverage'
          ],
          correct: 1
        },
        {
          question: 'What is diversification?',
          options: [
            'Buying only one stock',
            'Selling all stocks',
            'Spreading investments across different stocks/sectors',
            'Investing only in IT sector'
          ],
          correct: 2
        },
        {
          question: 'If you bought a stock at ₹1000 and it is now ₹800, what is your P&L?',
          options: [
            '+₹200 profit',
            '-₹200 loss',
            '₹1800 profit',
            'No change'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 4,
      title: 'How to Buy and Sell Stocks',
      category: 'Trading',
      duration: '7 min read',
      icon: '🔄',
      content: `
        Buying and selling stocks is called trading.
        On TradeX you can practice trading with virtual money!
        
        How to Buy a Stock:
        1. Go to the Stocks page
        2. Choose a stock you want to buy
        3. Enter the quantity (number of shares)
        4. Click the Buy button
        5. The cost is deducted from your balance
        
        How to Sell a Stock:
        1. Go to the Stocks page
        2. Find the stock you own
        3. Enter quantity to sell
        4. Click the Sell button
        5. Money is added back to your balance
        
        Important Rules:
        • You can only sell stocks you own
        • You need enough balance to buy
        • You cannot sell more shares than you own
        
        Average Buy Price:
        If you buy TCS at ₹3000 (2 shares) and then at ₹3500 (2 shares),
        your average buy price = (6000 + 7000) / 4 = ₹3250
        
        This helps track your actual profit or loss accurately.
      `,
      quiz: [
        {
          question: 'What happens to your balance when you buy a stock?',
          options: [
            'It increases',
            'It stays the same',
            'It decreases',
            'It doubles'
          ],
          correct: 2
        },
        {
          question: 'Can you sell more shares than you own?',
          options: [
            'Yes always',
            'No never',
            'Only with admin permission',
            'Only for profit'
          ],
          correct: 1
        },
        {
          question: 'You bought 2 shares at ₹100 and 2 shares at ₹200. What is your average buy price?',
          options: [
            '₹100',
            '₹200',
            '₹150',
            '₹300'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 5,
      title: 'Reading Stock Charts',
      category: 'Analysis',
      duration: '8 min read',
      icon: '📊',
      content: `
        Stock charts show price movement over time.
        Learning to read charts helps make better decisions.
        
        Types of Charts:
        • Line Chart — shows price over time as a line
        • Bar Chart — shows volume (how many shares traded)
        • Candlestick — shows open, close, high, low prices
        
        Line Chart Reading:
        • Going UP = bullish trend (good sign)
        • Going DOWN = bearish trend (caution)
        • Flat line = sideways movement
        
        Volume Chart:
        High volume means many people are trading that stock.
        High volume + price rise = strong buying interest
        High volume + price fall = strong selling pressure
        
        Key Chart Patterns:
        • Uptrend — higher highs and higher lows
        • Downtrend — lower highs and lower lows
        • Support — price level where stock stops falling
        • Resistance — price level where stock stops rising
        
        On TradeX Dashboard:
        You can view line charts for each stock
        and see how prices change over time!
      `,
      quiz: [
        {
          question: 'What does a line chart going UP indicate?',
          options: [
            'Bearish trend',
            'Sideways movement',
            'Bullish trend',
            'Stock is crashing'
          ],
          correct: 2
        },
        {
          question: 'What does high volume with price rise indicate?',
          options: [
            'Weak buying interest',
            'Strong buying interest',
            'Stock will fall tomorrow',
            'No significance'
          ],
          correct: 1
        },
        {
          question: 'What is a Support level?',
          options: [
            'Price where stock stops rising',
            'Price where stock stops falling',
            'Average price of a stock',
            'Opening price of a stock'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 6,
      title: 'Risk Management',
      category: 'Strategy',
      duration: '6 min read',
      icon: '🛡️',
      content: `
        Risk management is about protecting your money while investing.
        Even experienced investors follow strict risk rules!
        
        Golden Rules of Investing:
        1. Never invest money you cannot afford to lose
        2. Always diversify across sectors
        3. Do research before buying any stock
        4. Don't panic sell during market dips
        5. Think long term not short term
        
        Common Mistakes Beginners Make:
        • Putting all money in one stock
        • Following tips blindly without research
        • Selling in panic during temporary dips
        • Expecting quick profits
        • Not tracking portfolio regularly
        
        Risk vs Reward:
        Higher risk investments can give higher returns
        but can also cause bigger losses.
        
        Example:
        Small company stocks = High risk, High reward
        Large company stocks = Lower risk, Steady returns
        
        Start Small:
        Always start with small amounts to learn.
        On TradeX you can practice without real money risk!
        
        The best investors are patient and disciplined.
        Warren Buffett said — Be fearful when others are greedy
        and greedy when others are fearful!
      `,
      quiz: [
        {
          question: 'What is the most important rule of investing?',
          options: [
            'Always buy expensive stocks',
            'Never invest money you cannot afford to lose',
            'Follow tips from friends',
            'Buy only one stock'
          ],
          correct: 1
        },
        {
          question: 'What should you do when the market temporarily dips?',
          options: [
            'Panic sell everything',
            'Stay calm and don\'t panic sell',
            'Buy more of the same stock',
            'Close your account'
          ],
          correct: 1
        },
        {
          question: 'Which type of stocks have higher risk?',
          options: [
            'Large company stocks',
            'Government bonds',
            'Small company stocks',
            'Fixed deposits'
          ],
          correct: 2
        }
      ]
    }
  ];
  
  module.exports = lessons;
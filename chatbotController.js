const Groq = require('groq-sdk');

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Build conversation history
    const messages = [
      {
        role: 'system',
        content: `You are TradeX Assistant, a helpful AI for the TradeX virtual stock trading platform.
        
        Your role is to:
        - Help users understand stock trading concepts
        - Explain how to use TradeX platform features
        - Give general investment education (not financial advice)
        - Help beginners learn about stocks, portfolios, and trading
        - Answer questions about the Indian stock market
        - Explain terms like P&L, portfolio, buy/sell, market cap etc.
        
        Platform features you know about:
        - Users start with a virtual balance they set during registration
        - Users can buy and sell 10 Indian stocks (TCS, Reliance, HDFC Bank, Infosys, Wipro, Tata Motors, Sun Pharma, ONGC, ICICI Bank, Bajaj Finance)
        - Stock prices update every 10 seconds simulating real market
        - Users can view portfolio performance with charts
        - Leaderboard shows top traders by total value
        - Add Funds button lets users add virtual money
        
        Important rules:
        - Always clarify this is a virtual/simulated platform for learning
        - Never give real financial advice
        - Keep responses concise and friendly
        - Use Indian Rupee when discussing money
        - Be encouraging to beginners`
      },
      // Add previous messages for context
      ...(history || []).slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // Add current message
      {
        role: 'user',
        content: message
      }
    ];

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',   // Free and fast model
      messages,
      max_tokens: 1024,
      temperature: 0.7
    });

    const reply = response.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {
    console.error('Chatbot error:', error.message);
    res.status(500).json({
      message: 'Chatbot error',
      error: error.message
    });
  }
};

module.exports = { chat };
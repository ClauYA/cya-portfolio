const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://yaczoe.com',
    'https://www.yaczoe.com',
    'http://localhost:5173'
  ]
}));
// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'CYA API is running ✅' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
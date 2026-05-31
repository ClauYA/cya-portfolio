const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://yaczoe.com', 'https://www.yaczoe.com', 'http://localhost:5173']
}));
app.use(express.json());

// API routes
app.use('/api/contact', contactRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'CYA API is running ✅' });
});

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
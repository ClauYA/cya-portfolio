const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST /api/contact — Save contact form submission
router.post('/', async (req, res) => {
  const { firstName, lastName, email, company, budget, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_submissions 
        (first_name, last_name, email, company, budget, message, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id`,
      [firstName, lastName, email, company, budget, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you within 24 hours.',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/contact — Get all submissions (you can view these)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

module.exports = router;
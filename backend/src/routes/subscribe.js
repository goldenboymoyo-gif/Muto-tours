const express = require('express');
const rateLimit = require('express-rate-limit');
const { addSubscriber } = require('../lib/subscribers');

const router = express.Router();

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', subscribeLimiter, async (req, res) => {
  const { email, website } = req.body || {};

  // Honeypot, same pattern as /api/contact.
  if (website) {
    return res.status(201).json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  try {
    await addSubscriber(String(email).trim().toLowerCase());
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[subscribe] failed to save subscriber:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;

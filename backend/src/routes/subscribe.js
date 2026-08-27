const express = require('express');
const rateLimit = require('express-rate-limit');
const { addSubscriber } = require('../lib/subscribers');
const { sendSubscribeWelcomeEmail } = require('../lib/mailer');

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

  const cleanEmail = String(email).trim().toLowerCase();

  try {
    const isNew = await addSubscriber(cleanEmail);
    res.status(201).json({ ok: true });

    // Only welcome genuinely new subscribers — resubmitting the same email
    // shouldn't re-send it. Fired after the response so a slow/misconfigured
    // mail server never delays the user-facing request.
    if (isNew) {
      try {
        await sendSubscribeWelcomeEmail(cleanEmail);
      } catch (err) {
        console.error('[subscribe] failed to send welcome email:', err.message);
      }
    }
  } catch (err) {
    console.error('[subscribe] failed to save subscriber:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;

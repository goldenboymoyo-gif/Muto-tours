const express = require('express');
const rateLimit = require('express-rate-limit');
const { signAdminToken, requireAdmin } = require('../lib/auth');
const store = require('../lib/store');

const router = express.Router();

// Brute-force protection on the login endpoint specifically — this is the
// one place an attacker gets to guess a secret.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const VALID_STATUSES = ['new', 'contacted', 'closed'];

router.post('/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};

  if (!process.env.ADMIN_PASSWORD) {
    console.error('[admin] ADMIN_PASSWORD is not set — refusing all logins.');
    return res.status(503).json({ error: 'Admin login is not configured yet.' });
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  res.json({ token: signAdminToken() });
});

router.get('/enquiries', requireAdmin, async (_req, res) => {
  try {
    const enquiries = await store.readAll();
    res.json({ enquiries });
  } catch (err) {
    console.error('[admin] failed to load enquiries:', err.message);
    res.status(500).json({ error: 'Failed to load enquiries.' });
  }
});

router.patch('/enquiries/:id', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const updated = await store.updateStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Enquiry not found.' });
    res.json({ enquiry: updated });
  } catch (err) {
    console.error('[admin] failed to update enquiry:', err.message);
    res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

module.exports = router;

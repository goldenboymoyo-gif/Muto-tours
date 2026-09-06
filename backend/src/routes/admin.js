const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  signAdminToken,
  requireAdmin,
  setAdminCookie,
  clearAdminCookie,
} = require('../lib/auth');
const store = require('../lib/store');
const { log } = require('../lib/securityLog');

const router = express.Router();

// Brute-force protection on the login endpoint specifically — this is the
// one place an attacker gets to guess a secret.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// A gentler ceiling for every other admin API call (listings, status changes,
// session checks) so a single copied token can't be used to hammer the DB.
const adminApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const VALID_STATUSES = ['new', 'contacted', 'closed'];

router.post('/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};

  if (!process.env.ADMIN_PASSWORD) {
    log('admin_login_not_configured');
    console.error('[admin] ADMIN_PASSWORD is not set — refusing all logins.');
    return res.status(503).json({ error: 'Admin login is not configured yet.' });
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    log('admin_login_failed', { ip: req.ip });
    // Deliberately vague: don't reveal whether the account exists vs a bad password.
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  const token = signAdminToken();
  setAdminCookie(res, token);
  log('admin_login_success', { ip: req.ip });

  // Return the token too (non-browser tooling can use it in the Authorization
  // header); the browser flow relies solely on the HttpOnly cookie and never
  // stores this in localStorage.
  res.json({ token });
});

// Lets the admin UI answer "am I logged in?" without reading the cookie from
// JavaScript (it can't — HttpOnly).
router.get('/me', adminApiLimiter, requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// No requireAdmin here: clearing an expired/invalid cookie should always work.
router.post('/logout', adminApiLimiter, (_req, res) => {
  clearAdminCookie(res);
  res.status(204).end();
});

// Everything below this line requires an admin session.
router.use(adminApiLimiter, requireAdmin);

router.get('/enquiries', async (_req, res) => {
  try {
    const enquiries = await store.readAll();
    res.json({ enquiries });
  } catch (err) {
    console.error('[admin] failed to load enquiries:', err.message);
    res.status(500).json({ error: 'Failed to load enquiries.' });
  }
});

router.patch('/enquiries/:id', async (req, res) => {
  const { status } = req.body || {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const updated = await store.updateStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Enquiry not found.' });
    log('admin_enquiry_status_changed', { id: req.params.id, status });
    res.json({ enquiry: updated });
  } catch (err) {
    console.error('[admin] failed to update enquiry:', err.message);
    res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

module.exports = router;
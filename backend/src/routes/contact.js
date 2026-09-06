const express = require('express');
const rateLimit = require('express-rate-limit');
const { append } = require('../lib/store');
const { sendEnquiryEmail, sendEnquiryConfirmationEmail } = require('../lib/mailer');
const { sanitizeField, isValidEmail } = require('../lib/validate');
const { log } = require('../lib/securityLog');

const router = express.Router();

// A handful of submissions per IP every 15 minutes is plenty for a real
// enquiry form and blunts basic spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, async (req, res) => {
  const {
    full_name,
    email,
    phone,
    destination_interest,
    travel_dates,
    party_size,
    message,
    website, // honeypot
  } = req.body || {};

  // Honeypot: a field real visitors never see or fill in (hidden off-screen
  // in the form), but simple bots that auto-fill every input will. Silently
  // accept-and-drop rather than erroring, so bots don't learn to skip it.
  if (website) {
    log('enquiry_honeypot_triggered', { ip: req.ip });
    return res.status(201).json({ ok: true });
  }

  // Server-side sanitization is the enforcement boundary — everything that
  // gets stored or emailed passes through here (length caps + markup stripped).
  const safe = {
    full_name: sanitizeField(full_name, 'full_name'),
    email: sanitizeField(email, 'email'),
    phone: sanitizeField(phone, 'phone'),
    party_size: sanitizeField(party_size, 'party_size'),
    destination_interest: sanitizeField(destination_interest, 'destination_interest'),
    travel_dates: sanitizeField(travel_dates, 'travel_dates'),
    message: sanitizeField(message, 'message'),
  };

  const errors = [];
  if (!safe.full_name) errors.push('Name is required.');
  if (!safe.email || !isValidEmail(safe.email)) errors.push('A valid email is required.');
  if (!safe.message) errors.push('A message is required.');
  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const enquiry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    ...safe,
    email: safe.email.toLowerCase(),
    status: 'new',
    receivedAt: new Date().toISOString(),
  };

  try {
    await append(enquiry);
  } catch (err) {
    console.error('[contact] failed to save enquiry:', err.message);
    return res.status(500).json({ error: 'Something went wrong saving your enquiry. Please try again.' });
  }

  log('enquiry_received', { id: enquiry.id }); // intentionally no PII in the log

  try {
    await sendEnquiryEmail(enquiry);
  } catch (err) {
    // The enquiry is already saved — email is best-effort on top.
    console.error('[contact] failed to send notification email:', err.message);
  }

  try {
    await sendEnquiryConfirmationEmail(enquiry);
  } catch (err) {
    console.error('[contact] failed to send confirmation email:', err.message);
  }

  res.status(201).json({ ok: true });
});

module.exports = router;
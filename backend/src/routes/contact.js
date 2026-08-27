const express = require('express');
const rateLimit = require('express-rate-limit');
const { append } = require('../lib/store');
const { sendEnquiryEmail } = require('../lib/mailer');

const router = express.Router();

// A handful of submissions per IP every 15 minutes is plenty for a real
// enquiry form and blunts basic spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

function validate(body) {
  const errors = [];
  if (!body.full_name || !String(body.full_name).trim()) errors.push('Name is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('A valid email is required.');
  if (!body.message || !String(body.message).trim()) errors.push('A message is required.');
  return errors;
}

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
    return res.status(201).json({ ok: true });
  }

  const errors = validate({ full_name, email, message });
  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const enquiry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    full_name: String(full_name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : '',
    party_size: party_size ? String(party_size).trim() : '',
    destination_interest: destination_interest ? String(destination_interest).trim() : '',
    travel_dates: travel_dates ? String(travel_dates).trim() : '',
    message: String(message).trim(),
    status: 'new',
    receivedAt: new Date().toISOString(),
  };

  try {
    await append(enquiry);
  } catch (err) {
    console.error('[contact] failed to save enquiry:', err.message);
    return res.status(500).json({ error: 'Something went wrong saving your enquiry. Please try again.' });
  }

  try {
    await sendEnquiryEmail(enquiry);
  } catch (err) {
    // The enquiry is already saved — email is best-effort on top.
    console.error('[contact] failed to send notification email:', err.message);
  }

  res.status(201).json({ ok: true });
});

module.exports = router;

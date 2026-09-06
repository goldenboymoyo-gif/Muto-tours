// Shared server-side input validation and sanitization.
// Every route uses these helpers so the rules live in one place: length
// caps, type coercion, and stripping of markup/control characters. Client
// validation is convenience only — this is the enforcement boundary.

const MAX_LENGTHS = {
  full_name: 120,
  email: 254,
  phone: 40,
  party_size: 60,
  destination_interest: 200,
  travel_dates: 200,
  message: 5000,
};

// Reduces arbitrary input to a safe plain-text string: strips <> so markup
// can never be interpreted, removes control characters, normalizes runs of
// whitespace, and trims.
function sanitizeText(value) {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

// Sanitize + clamp to the per-field maximum.
function sanitizeField(value, field = 'message') {
  const max = MAX_LENGTHS[field] || MAX_LENGTHS.message;
  return sanitizeText(value).slice(0, max);
}

function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

module.exports = { sanitizeText, sanitizeField, isValidEmail, MAX_LENGTHS };
const jwt = require('jsonwebtoken');

// A random fallback secret means tokens stop working on every restart (fine
// for a first boot before this is configured) — always set JWT_SECRET in
// production so admin sessions survive a deploy/restart.
const SECRET = process.env.JWT_SECRET || (() => {
  console.warn(
    '[auth] JWT_SECRET is not set — using a random secret for this process only. ' +
    'Set JWT_SECRET in the environment so admin logins survive a restart.'
  );
  return require('crypto').randomBytes(32).toString('hex');
})();

const COOKIE_NAME = 'muto_admin_session';
const IS_PROD = process.env.NODE_ENV === 'production';

function signAdminToken() {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '7d' });
}

function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

// The admin session lives in an HttpOnly + Secure + SameSite=None cookie so
// JavaScript can never read it (XSS can't exfiltrate it) while still working
// across the separate frontend (Vercel) and API (Render) origins.
// SameSite=None is required for a cross-site cookie; CSRF is mitigated by
// Origin validation (see lib/origin.js).
function cookieOptions() {
  return {
    httpOnly: true,
    secure: IS_PROD,          // local dev is http:// so Secure is skipped there
    sameSite: IS_PROD ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // matches the JWT's 7-day lifetime
  };
}

function setAdminCookie(res, token) {
  res.cookie(COOKIE_NAME, token, cookieOptions());
}

function clearAdminCookie(res) {
  // maxAge must not be passed to clearCookie (Express deprecation): clearing
  // expires the cookie immediately regardless.
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: IS_PROD ? 'none' : 'lax',
    path: '/',
  });
}

// Accepts the session cookie, or a Bearer token in the Authorization header
// (used by non-browser clients / tooling). Never falls back to a value that
// JavaScript can read.
function getToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  if (req.cookies && req.cookies[COOKIE_NAME]) return req.cookies[COOKIE_NAME];
  return null;
}

function requireAdmin(req, res, next) {
  const token = getToken(req);
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

module.exports = {
  COOKIE_NAME,
  signAdminToken,
  verifyAdminToken,
  setAdminCookie,
  clearAdminCookie,
  requireAdmin,
};
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

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

module.exports = { signAdminToken, requireAdmin };

// CSRF defense-in-depth.
//
// We use an HttpOnly SameSite=None cookie for the admin session, which means
// the browser will attach it to cross-site requests. SameSite=None exists so
// the Vercel-hosted frontend can call the Render-hosted API, but it also means
// a malicious site could try to trigger state-changing calls while a logged-in
// admin has an active session. Browsers attach an `Origin` header to all
// cross-site (and most same-site) POST/PUT/PATCH/DELETE requests, so we reject
// any state-changing request whose Origin isn't one we explicitly trust.
// Non-browser clients (curl, server-to-server, health checks) send no Origin
// and are allowed through.

const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

function validateOrigin(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }

  const origin = req.get('origin');
  if (!origin) return next();

  if (ALLOWED_ORIGINS.includes(origin)) return next();

  const { log } = require('./securityLog');
  log('origin_rejected', { method: req.method, path: req.path, origin });
  return res.status(403).json({ error: 'Forbidden' });
}

module.exports = { validateOrigin, ALLOWED_ORIGINS };
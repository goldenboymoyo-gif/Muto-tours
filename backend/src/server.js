require('dotenv').config();

// Persistence check marker (no behavior change).
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const contactRouter = require('./routes/contact');
const adminRouter = require('./routes/admin');
const subscribeRouter = require('./routes/subscribe');
const contentRouter = require('./routes/content');
const { validateOrigin } = require('./lib/origin');

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

// The API runs behind a reverse proxy (Render), which is where IP-based rate
// limiting gets its value. Trusting the first hop means req.ip reflects the
// real client instead of the proxy.
app.set('trust proxy', 1);

// Standard security headers (X-Content-Type-Options, disables sniffing,
// hides X-Powered-By, sets a sane Referrer-Policy, etc.)
app.use(helmet());

// Only the configured frontend origin(s) may call this API from a browser —
// this isn't a public API, just the backend for one specific site.
// credentials:true is required so the admin session cookie is sent/stored.
app.use(
  cors({
    allowedHeaders: ['Content-Type'],
    credentials: true,
    origin(origin, callback) {
      // Allow non-browser clients (curl, health checks, server-to-server),
      // which don't send an Origin header.
      if (!origin || CORS_ORIGIN.includes(origin)) return callback(null, true);
      return callback(null, false); // omit CORS headers → browser blocks reading the response
    },
  })
);

// Small cap: this API only ever needs to accept a short contact form body,
// so there's no reason to accept large payloads.
app.use(express.json({ limit: '20kb' }));

// Required for the HttpOnly admin session cookie (SameSite=None; Secure).
app.use(cookieParser());

// CSRF defense-in-depth. State-changing requests (POST/PUT/PATCH/DELETE) must
// come from a browser origin we explicitly trust; otherwise 403. Browsers that
// can't see the response can't act on it anyway — this double-guards.
app.use(validateOrigin);

// Blanket limiter on top of the stricter per-route ones — keeps any endpoint
// from being hammered, not just /api/contact.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'muto-tours-backend' });
});

app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/subscribe', subscribeRouter);
app.use(contentRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Client errors (bad JSON, oversized body) should come back as 4xx with a
  // safe message — never leak internals, and don't class them as 500s.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }
  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
    return res.status(err.statusCode).json({ error: err.message || 'Bad request.' });
  }
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Muto Tours backend listening on http://localhost:${PORT}`);
});
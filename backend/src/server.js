require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

// Standard security headers (X-Content-Type-Options, disables sniffing,
// hides X-Powered-By, sets a sane Referrer-Policy, etc.)
app.use(helmet());

// Only the configured frontend origin(s) may call this API from a browser —
// this isn't a public API, just the backend for one specific site.
app.use(cors({ origin: CORS_ORIGIN }));

// Small cap: this API only ever needs to accept a short contact form body,
// so there's no reason to accept large payloads.
app.use(express.json({ limit: '20kb' }));

// Blanket limiter on top of the stricter per-route one in routes/contact.js —
// keeps any endpoint from being hammered, not just /api/contact.
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

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Muto Tours backend listening on http://localhost:${PORT}`);
});

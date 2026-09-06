# Security

Living security documentation for the Muto Tours site. Reviewed as part of the
September 2026 hardening pass; the full findings are in [SECURITY_REPORT.md](./SECURITY_REPORT.md).

## Scope & deployment

- **Frontend** — Next.js 14 (App Router), hosted on Vercel (`https://muto-tours.vercel.app`).
- **Backend API** — Express on Render (`https://muto-tours-backend.onrender.com`).
- **Database** — Postgres on Neon; enquiry/subscriber records only.
- **Admin** — password login (env `ADMIN_PASSWORD`) issuing a signed JWT session cookie.

## Controls in place

| Area | Control |
|---|---|
| Transport | HTTPS everywhere; HSTS (prod); `upgrade-insecure-requests` in CSP |
| Headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, CSP per `next.config.mjs`; backend uses Helmet |
| Admin sessions | HttpOnly + Secure + SameSite=None cookie (`muto_admin_session`, 7 days); JWT never stored in localStorage/JS |
| Authentication | Server-side check via `/api/admin/me`; login limited to 10 tries/15 min; no account enumeration (single password, single 401 message) |
| CSRF | Origin validation rejects state-changing requests from untrusted origins (403), plus SameSite handling |
| XSS | No `dangerouslySetInnerHTML`; `lib/safeUrl.js` allow-lists schemes and strips control chars from editable URLs; email HTML escaped (`escapeHtml`) |
| Injection | All SQL is parameterized (pg); input sanitized server-side via `lib/validate.js` (length caps, markup/control-char stripping) |
| Rate limiting | Blanket 100/15 min; contact & subscribe 10/15 min; admin login 10/15 min; admin API 300/15 min; content writes 120/15 min |
| Spam | Honeypot fields on contact/subscribe; silent accept-and-drop |
| Payload limits | JSON bodies capped at 20kb |
| Logging | Structured `[security]` events (logins, origin rejections, honeypot hits, content writes); no PII/passwords/tokens logged |
| Dependencies | Backend: 0 vulnerabilities (nodemailer 10, qs override). See roadmap for frontend |

## Known / pending items

1. **Next.js major upgrade** — npm audit flags all Next.js 14.x. Only ≥16.3.4
   is patched (requires React 19 + async-params migrations in dynamic routes).
   The flagged vectors target configurations this site does not use (custom
   servers, middleware, server actions, rewrites, i18n/pages router,
   `beforeInteractive` scripts, nonces). Site is hosted on managed Vercel.
   **Plan: migrate to Next 16 + React 19 as its own tested change.**
2. **CSP script-src `'unsafe-inline'`** — required by Next.js 14 inline
   bootstrap. Migration path: adopt nonces for scripts (Next 16 supports this
   better). No third-party scripts exist, so exposure is limited.
3. **Legal pages** — `/privacy`, `/cookies`, `/terms` ship with clearly marked
   `[PLACEHOLDER — …]` items (retention periods, governing law, DPO contact,
   booking terms). These must be completed by the owner before relying on them.
4. **Email** — SMTP env vars are not configured on Render, so enquiry
   notification/confirmation and welcome emails are silent no-ops (enquiries
   still save to the DB). Configure `SMTP_HOST/PORT/USER/PASS` when ready.
5. **Admin password rotation** — rotate `ADMIN_PASSWORD` and `JWT_SECRET`
   periodically and after any staff change; both are env vars only.

## Operational checklist

- `npm audit` before each release (backend must stay at 0).
- Review Render logs for `[security]` events (failed logins, rejected origins).
- Rotate secrets in Render/Vercel; never commit `.env` files (`.gitignore`
  covers `.env*` and `backend/data/`).
- Re-run the smoke tests in SECURITY_REPORT.md after any infra change.
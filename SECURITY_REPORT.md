# Security Hardening Report — Muto Tours

September 6, 2026. Committed after the admin CMS build (`b67f69c`) at the
owner's request, before any further release.

> Honesty statement: this report describes controls that were implemented and
> tested, not a guarantee of absolute security. Residual risks are listed
> explicitly in Section K. No legal or regulatory compliance is claimed.

## A. Scope & assets

| Asset | Tech | Host | Access |
|---|---|---|---|
| Frontend | Next.js 14 App Router | Vercel (`muto-tours.vercel.app`) | Public |
| Backend API | Express 4 | Render | Public endpoints + admin |
| Database | Postgres | Neon | Backend only (DATABASE_URL env) |
| Admin area | `/admin` + `/api/admin/*` | — | Single password + JWT cookie |

Enquiries, subscribe list, and CMS content sections are the only data handled.

## B. Summary

- **Backend dependency audit: 0 vulnerabilities** (nodemailer 9→10, qs 6.16
  override resolved the remaining express/body-parser chain).
- Frontend audit: residual high-severity advisories against Next.js 14 are
  documented as a planned upgrade (Section K) — none of the flagged attack
  vectors are present in this code base.
- All backend hardening was smoke-tested against a running instance
  (Section L).
- Admin sessions moved from `localStorage` JWT to an HttpOnly cookie with
  Origin-based CSRF defense.

## C. Transport & headers

Backend: `helmet()` (nosniff, x-powered-by off, sane referrer-policy).
Frontend: `next.config.mjs` `headers()` for every route:

```
Content-Security-Policy (see below)
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload  (prod)
```

Verified via `curl -I` on the production build: all headers present; HSTS only
in prod; `poweredByHeader: false` removes `X-Powered-By`.

### CSP
```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' https: data: blob:; font-src 'self' data:; connect-src 'self' <API_URL>;
worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';
frame-ancestors 'none'; upgrade-insecure-requests (prod)
```
- `connect-src` includes only the Muto Tours API (Render) and `http://localhost:4000`
  for local dev.
- `img-src https:` required for admin-supplied remote images and the
  OpenStreetMap tile server (route map). No iframes on the site, so
  `frame-ancestors 'none'`.
- `'unsafe-inline'` for scripts is required by Next.js 14 RSC bootstrap; no
  third-party/inline scripts are used (GSAP, Leaflet are bundled). Nonce
  migration deferred to the Next 16 upgrade (Sec. K).

## D. Authentication & session management

- Login: `POST /api/admin/login` → returns `{ token }` and sets an **HttpOnly,
  Secure (prod), SameSite=None** cookie `muto_admin_session` (7-day JWT).
- Browser flow never reads or stores the token: admin UI checks `/api/admin/me`
  (cookie-only), logout clears via `/api/admin/logout` (no auth required).
- `localStorage` token (`muto_admin_token`) removed from all admin code.
- Brute force: login limited to **10 attempts / 15 min / IP**; generic
  "Incorrect password." (no account enumeration — single credential model);
  login refused with 503 until `ADMIN_PASSWORD` is set.
- Bearer token still accepted for non-browser tooling; cookie path untouched
  by XSS (HttpOnly).

## E. CSRF

Admin cookie is cross-site (SameSite=None) by necessity. Defense in depth:
- Server middleware rejects any POST/PUT/PATCH/DELETE carrying an `Origin`
  header not equal to a configured origin (`lib/origin.js`) with 403, and
  logs `origin_rejected`.
- CORS `credentials: true` limits echo to configured origins; disallowed
  origins get no CORS headers so browsers can't read the response.
- Verified: POST with `Origin: https://evil.example` → 403.

## F. Injection

- **SQL**: all queries parameterized (`pg` upstream `$1`/`$2`); no string
  interpolation of user input.
- **XSS**: zero `dangerouslySetInnerHTML`; `lib/safeUrl.js` allow-lists
  `https/http/mailto/tel/sms/whatsapp` URL schemes and rejects control chars
  for every CMS-editable href; persistence layer strips `<`/`>`; email HTML
  is escaped before interpolation (`escapeHtml`).
- **Email header injection**: SMTP recipients/reply-to derive from
  server env or validated sanisations; message bodies are text/HTML-escaped.
  nodemailer upgraded to 10.0.0 which resolves the CRLF/injection advisories.

## G. Rate limiting & DoS

| Scope | Limit |
|---|---|
| Global API | 100 req / 15 min / IP |
| Contact & subscribe | 10 / 15 min + honeypot |
| Admin login | 10 / 15 min |
| Admin API (post-login) | 300 / 15 min |
| Content writes | 120 / 15 min |
| Request body | 20kb JSON cap |

`app.set('trust proxy', 1)` on Render so `req.ip` reflects real clients.
Postgres/Neon connections are pooled and limited; no unbounded endpoints.

## H. Dependency audit

Backend (production): **0 vulnerabilities**. Changes:
- `nodemailer` `^6.9.15` → `^10.0.0` (semver-major; usage verified compatible).
- Added `overrides: { "qs": "^6.16.0" }` to clear the express/body-parser chain.

Frontend (production): 2 high-severity advisory groups against **Next.js 14.2.x** and its
bundled postcss. Only Next ≥ 16.3.4 is patched (needs React 19). All 20+ listed
advisories target self-hosted deployments, middleware, server actions, custom
servers, rewrites, i18n (pages router), or `beforeInteractive` scripts —
**none present here**; the site runs on managed Vercel and uses none of those
features. Decision (owner-approved): keep Next 14 for this release and migrate
as a dedicated change.

## I. Data protection

- **Minimization**: the contact form collects only what trip planning needs;
  no accounts, no payments, no analytics, no marketing pixels.
- **Cookies set**: `muto_cc` (consent preference, necessary, 1 yr) and
  `muto_admin_session` (admin, HttpOnly, 7 days). No ad/analytics/functional
  cookies exist — the consent categories are forward-looking.
- **Privacy**: GDPR-style data subject request handling described in
  `/privacy` (owner must fill `[PLACEHOLDER]` for retention/lawful basis/DPO).
- **Logging**: structured `[security]` events carry event name, IP, ids only —
  never passwords, tokens, emails, or message bodies.
- **Secrets**: `ADMIN_PASSWORD`, `JWT_SECRET`, `DATABASE_URL` are env-only on
  Render; `.env*` and `backend/data/` are git-ignored; `.env.example` files
  contain placeholders only.

## J. Compliance & user-facing pages

- `/privacy`, `/cookies`, `/terms` published, linked from both footers, and
  added to `/sitemap.xml`. Cookie-consent banner (Accept all / Reject
  non-essential / Manage preferences) with persistent preference cookie, plus
  a footer "Cookie Preferences" control.
- All legal pages mark owner decisions with `[PLACEHOLDER — …]`; they must be
  completed before being relied upon.

## K. Residual risks & roadmap

1. **Next.js 14 → 16 + React 19** upgrade (async `params`/`searchParams` in
   the 6 dynamic destination/experience routes). Highest-priority follow-up.
2. **CSP nonce migration** so `script-src 'unsafe-inline'` can be removed.
3. **Legal placeholders** must be filled by the owner (retention, basis,
   governing law, DPO, booking terms).
4. **SMTP not configured** on Render — enquiry emails are no-ops until set.
5. **Admin credential rotation** cadence should be adopted (single shared
   password is a pragmatic MVP; per-administrator accounts are a future step).

## L. Test evidence (2026-09-06)

Backend (local, hardened build, Redis-free file/Postgres store):
- `/api/health` → 200 `{"ok":true,"service":"muto-tours-backend"}`
- Login wrong password → 401; correct → 200 `{token}`; Set-Cookie shows
  `HttpOnly; SameSite=Lax` (local) and Secure+SameSite=None on prod.
- `/api/admin/me` with cookie → 200 `{ok:true}`; without → 401.
- `/api/admin/logout` → 204; `/me` after logout → 401.
- POST `/api/contact` `Origin: https://evil.example` → 403 (logged).
- POST `/api/contact` good origin → 201; honeypot field → silent 201.
- Malformed JSON → 400 (not 500); body over 20kb → 413.
- Security log lines present for each event; no PII in them.

Frontend (production build, 33 routes):
- Build green; `/privacy`, `/cookies`, `/terms` return 200.
- `curl -I` on `/`: all headers + CSP present, `X-Powered-By` absent.

Source grep: zero `dangerouslySetInnerHTML`, zero remaining `localStorage`
admin token reads.
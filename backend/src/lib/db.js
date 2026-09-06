const { Pool } = require('pg');

// Strip `sslmode=` / `ssl=` from a Postgres connection string. Managed
// providers append `?sslmode=require` and modern node-postgres remaps
// `require`/`prefer`/`verify-ca` to `verify-full`, emitting a security
// warning. We pass our own `ssl` option below instead, so the URL's sslmode
// is redundant — dropping it silences the warning and keeps our explicit ssl
// config authoritative.
function stripSslParams(url) {
  return url
    .replace(/([?&])sslmode=[^&#]*/g, '$1')
    .replace(/([?&])ssl=[^&#]*/g, '$1')
    .replace(/([?&])+$/, '');
}

// Postgres is optional: when DATABASE_URL isn't set (e.g. local dev before
// a database has been provisioned), `pool` stays null and lib/store.js
// falls back to a JSON file on disk instead. Set DATABASE_URL in production
// (e.g. Render's managed Postgres connection string) to use a real database.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: stripSslParams(process.env.DATABASE_URL),
      // Most managed Postgres providers (Render, Supabase, etc.) require SSL
      // and use certs not in Node's default trust store — this is the
      // standard relaxed setting for that case.
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    })
  : null;

let readyPromise = null;

// Creates the table on first use so there's no separate migration step to
// run by hand — safe to call repeatedly (IF NOT EXISTS).
function ensureSchema() {
  if (!pool) return Promise.resolve();
  if (!readyPromise) {
    readyPromise = pool.query(`
      create table if not exists contact_submissions (
        id text primary key,
        full_name text not null,
        email text not null,
        phone text,
        party_size text,
        destination_interest text,
        travel_dates text,
        message text not null,
        status text not null default 'new',
        received_at timestamptz not null default now()
      );
    `);
  }
  return readyPromise;
}

module.exports = { pool, ensureSchema, isConfigured: Boolean(pool) };

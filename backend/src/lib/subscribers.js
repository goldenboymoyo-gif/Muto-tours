const fs = require('fs');
const path = require('path');
const { pool, isConfigured } = require('./db');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json');

let schemaReady = null;
function ensureSchema() {
  if (!pool) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = pool.query(`
      create table if not exists subscribers (
        email text primary key,
        subscribed_at timestamptz not null default now()
      );
    `);
  }
  return schemaReady;
}

function ensureFileStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// Returns true if newly added, false if the email was already subscribed
// (treated as success either way by the route — subscribing twice isn't an error).
async function addSubscriber(email) {
  if (isConfigured) {
    await ensureSchema();
    const { rowCount } = await pool.query(
      `insert into subscribers (email) values ($1) on conflict (email) do nothing`,
      [email]
    );
    return rowCount > 0;
  }

  ensureFileStore();
  const all = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  if (all.some((s) => s.email === email)) return false;
  all.push({ email, subscribedAt: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
  return true;
}

module.exports = { addSubscriber };

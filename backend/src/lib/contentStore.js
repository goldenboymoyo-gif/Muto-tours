const fs = require('fs');
const path = require('path');
const { pool, isConfigured } = require('./db');

// Site content is stored as whole sections (brand, destinations, experiences,
// journeys, gallery), mirroring the shape of the frontend's data/*.js modules.
// The frontend merges whatever is stored here over its static defaults, so an
// empty store simply means "use the defaults shipped with the site".
//
// Same dual-mode pattern as lib/store.js: PostgreSQL when DATABASE_URL is set,
// otherwise a JSON file on disk (data/content.json). Sections only exist in
// the store once an admin saves one for the first time.

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');

let schemaReady = null;
function ensureSchema() {
  if (!pool) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = pool.query(`
      create table if not exists site_content (
        section text primary key,
        data jsonb not null,
        updated_at timestamptz not null default now()
      );
    `);
  }
  return schemaReady;
}

function ensureFileStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '{}', 'utf8');
}

function readAllFromFile() {
  ensureFileStore();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeAllToFile(all) {
  ensureFileStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
}

// Returns { section: data } — only sections that have been saved.
async function readAll() {
  if (isConfigured) {
    await ensureSchema();
    const { rows } = await pool.query('select section, data from site_content');
    const out = {};
    for (const row of rows) out[row.section] = row.data;
    return out;
  }
  return readAllFromFile();
}

async function saveSection(section, data) {
  if (isConfigured) {
    await ensureSchema();
    await pool.query(
      `insert into site_content (section, data, updated_at) values ($1, $2, now())
       on conflict (section) do update set data = $2, updated_at = now()`,
      [section, data]
    );
    return;
  }
  const all = readAllFromFile();
  all[section] = data;
  writeAllToFile(all);
}

async function deleteSection(section) {
  if (isConfigured) {
    await ensureSchema();
    await pool.query('delete from site_content where section = $1', [section]);
    return;
  }
  const all = readAllFromFile();
  if (section in all) {
    delete all[section];
    writeAllToFile(all);
  }
}

module.exports = { readAll, saveSection, deleteSection };
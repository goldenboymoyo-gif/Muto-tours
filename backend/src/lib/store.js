const fs = require('fs');
const path = require('path');
const { pool, ensureSchema, isConfigured } = require('./db');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// --- JSON file fallback (used only when DATABASE_URL isn't set) -----------

function ensureFileStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

function readAllFromFile() {
  ensureFileStore();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeAllToFile(all) {
  ensureFileStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
}

// --- Public API -------------------------------------------------------------
// Same shape either way: enquiry objects with
// { id, full_name, email, phone, party_size, destination_interest,
//   travel_dates, message, status, receivedAt }

async function append(enquiry) {
  if (isConfigured) {
    await ensureSchema();
    await pool.query(
      `insert into contact_submissions
         (id, full_name, email, phone, party_size, destination_interest, travel_dates, message, status, received_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        enquiry.id,
        enquiry.full_name,
        enquiry.email,
        enquiry.phone,
        enquiry.party_size,
        enquiry.destination_interest,
        enquiry.travel_dates,
        enquiry.message,
        enquiry.status,
        enquiry.receivedAt,
      ]
    );
    return enquiry;
  }

  const all = readAllFromFile();
  all.push(enquiry);
  writeAllToFile(all);
  return enquiry;
}

async function readAll() {
  if (isConfigured) {
    await ensureSchema();
    const { rows } = await pool.query(
      `select id, full_name, email, phone, party_size, destination_interest,
              travel_dates, message, status, received_at as "receivedAt"
       from contact_submissions
       order by received_at desc`
    );
    return rows;
  }

  return readAllFromFile().sort((a, b) => (a.receivedAt < b.receivedAt ? 1 : -1));
}

async function updateStatus(id, status) {
  if (isConfigured) {
    await ensureSchema();
    const { rows } = await pool.query(
      `update contact_submissions set status = $1 where id = $2
       returning id, full_name, email, phone, party_size, destination_interest,
                 travel_dates, message, status, received_at as "receivedAt"`,
      [status, id]
    );
    return rows[0] || null;
  }

  const all = readAllFromFile();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  all[idx].status = status;
  writeAllToFile(all);
  return all[idx];
}

module.exports = { append, readAll, updateStatus };

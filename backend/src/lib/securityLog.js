// Minimal structured security logging.
// Output goes to stdout so platform log systems (e.g. Render) pick it up.
// Rules: never log passwords, tokens, email addresses, full messages, or any
// other personal/sensitive payload — only event names and small non-sensitive
// attributes like ids and IPs.

function log(event, meta = {}) {
  const safe = {};
  for (const [key, value] of Object.entries(meta || {})) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      safe[key] = value;
    }
  }
  console.log(`[security] ${event} ${JSON.stringify(safe)}`);
}

module.exports = { log };
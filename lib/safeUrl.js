// Validates URLs before they're allowed into an `href` attribute.
//
// Brand content is editable via the admin CMS, so every URL rendered on the
// site must be vetted. An attacker who compromises the CMS must not be able
// to inject `javascript:` (or friends) into a link and run script in a
// visitor's browser. Relative internal links and safe schemes pass through.

const PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;

// Returns a safe URL string, or an empty string (which the caller should drop
// rather than render) if the value can't be made safe.
export function safeUrl(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();

  // Relative paths (/about, #contact) and protocol-relative URLs (//…) are fine.
  if (!PROTOCOL_RE.test(trimmed)) return trimmed;

  const protocol = trimmed.slice(0, trimmed.indexOf(":")).toLowerCase();
  const allowlist = new Set([
    "https",
    "http",
    "mailto",
    "tel",
    "sms",
    "whatsapp", // wa.me links may arrive as whatsapp:…
  ]);
  if (!allowlist.has(protocol)) return "";

  // Never allow javascript:/data:/vbscript: (blocked above by the allowlist),
  // and reject control characters that could smuggle markup or other tricks.
  if (/[\u0000-\u001f\u007f]/.test(trimmed)) return "";

  return trimmed;
}

// A safe `target`+`rel`/`referrerpolicy` bundle for external links.
export function externalLinkProps(url) {
  if (safeUrl(url) && /^https?:\/\//i.test(url)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
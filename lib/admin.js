// Admin session helpers for the browser.
//
// The session lives in an HttpOnly cookie set by the backend, so we never read
// or store a token in JavaScript (localStorage/XSS can't steal it). Every
// request uses `credentials: "include"` so the cookie is sent cross-origin to
// the API. CSRF is handled server-side via Origin validation.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function post(path, body) {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function adminLogin(password) {
  return post("/api/admin/login", { password });
}

export async function adminLogout() {
  return post("/api/admin/logout", {});
}

// Lets the UI answer "is the admin session valid?" without JavaScript ever
// seeing the cookie itself (it can't — HttpOnly).
export async function checkAdminSession() {
  try {
    const res = await fetch(`${API_URL}/api/admin/me`, { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}
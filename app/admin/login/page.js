"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await adminLogin(password);
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(body?.error || "Something went wrong. Please try again.");
        return;
      }

      // The session is set as an HttpOnly cookie by the backend; nothing secret
      // is stored in JavaScript.
      router.push("/admin");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Is the backend running?");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="font-archivo uppercase text-2xl text-ink">Muto Tours Admin</h1>
      <p className="mt-2 text-sm text-ink/60">Sign in to manage enquiries.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest2 text-ink/50">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink focus:border-clay focus:outline-none focus:ring-0"
          />
        </label>

        {status === "error" && <p className="text-sm text-clay-dark">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-fit rounded-full bg-clay px-7 py-3 text-sm font-medium text-ivory transition hover:bg-clay-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const TOKEN_KEY = "muto_admin_token";

const STATUS_STYLES = {
  new: "bg-clay/10 text-clay-dark",
  contacted: "bg-gold/20 text-ink",
  closed: "bg-ink/10 text-ink/60",
};

export default function EnquiriesTable({ token }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    router.push("/admin/login");
  }, [router]);

  const loadEnquiries = useCallback(
    async (authToken) => {
      try {
        const res = await fetch(`${API_URL}/api/admin/enquiries`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (res.status === 401) {
          logout();
          return;
        }
        if (!res.ok) throw new Error("Failed to load enquiries.");

        const body = await res.json();
        setEnquiries(body.enquiries || []);
        setStatus("ready");
      } catch {
        setStatus("error");
        setError("Couldn't load enquiries. Is the backend running?");
      }
    },
    [logout]
  );

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadEnquiries(token);
  }, [token, router, loadEnquiries]);

  async function updateStatus(id, newStatus) {
    const prev = enquiries;
    setEnquiries((es) => es.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));

    try {
      const res = await fetch(`${API_URL}/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.status === 401) {
        logout();
        return;
      }
      if (!res.ok) throw new Error("update failed");
    } catch {
      setEnquiries(prev);
    }
  }

  if (status === "loading") {
    return <p className="text-sm text-ink/60">Loading enquiries…</p>;
  }

  if (status === "error") {
    return <p className="text-sm text-clay-dark">{error}</p>;
  }

  const visible = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">
            {enquiries.length} total · {enquiries.filter((e) => e.status === "new").length} new
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {["all", "new", "contacted", "closed"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest2 transition ${
              filter === f ? "bg-ink text-ivory" : "bg-ink/5 text-ink/60 hover:bg-ink/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-ink/50">No enquiries here yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-widest2 text-ink/40">
                <th className="py-3 pr-4 font-normal">Received</th>
                <th className="py-3 pr-4 font-normal">Name</th>
                <th className="py-3 pr-4 font-normal">Contact</th>
                <th className="py-3 pr-4 font-normal">Interest</th>
                <th className="py-3 pr-4 font-normal">Message</th>
                <th className="py-3 pr-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((e) => (
                <tr key={e.id} className="border-b border-ink/5 align-top">
                  <td className="py-4 pr-4 whitespace-nowrap text-ink/60">
                    {new Date(e.receivedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 pr-4 font-medium text-ink">{e.full_name}</td>
                  <td className="py-4 pr-4 text-ink/70">
                    <div>{e.email}</div>
                    {e.phone && <div className="text-ink/50">{e.phone}</div>}
                  </td>
                  <td className="py-4 pr-4 text-ink/70">
                    {e.destination_interest || "—"}
                    {e.travel_dates && <div className="text-ink/50">{e.travel_dates}</div>}
                    {e.party_size && <div className="text-ink/50">{e.party_size}</div>}
                  </td>
                  <td className="py-4 pr-4 max-w-xs text-ink/70">{e.message}</td>
                  <td className="py-4 pr-4">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-clay ${STATUS_STYLES[e.status] || ""}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
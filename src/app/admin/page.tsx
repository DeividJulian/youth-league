"use client";
import { useCallback, useEffect, useState } from "react";

type Team = { id: string; name: string };
type Fixture = { id: string; date: string; home: string; away: string; homeGoals: number | null; awayGoals: number | null };

async function api(url: string, body?: unknown) {
  const res = await fetch(url, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

// CSR: all data is fetched in the browser after hydration.
export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [msg, setMsg] = useState("");
  const [scores, setScores] = useState<Record<string, [string, string]>>({});
  const [form, setForm] = useState({ name: "", birthYear: "2011", position: "MF", teamId: "", number: "" });

  const load = useCallback(async () => {
    const d = await api("/api/league");
    setTeams(d.teams); setFixtures(d.fixtures);
    setForm((f) => ({ ...f, teamId: f.teamId || d.teams[0]?.id || "" }));
  }, []);
  useEffect(() => { load().catch((e) => setMsg(e.message)); }, [load]);

  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try { await fn(); setMsg(ok); await load(); } catch (e) { setMsg((e as Error).message); }
  };

  return (
    <>
      <h1>Admin panel</h1><span className="badge">CSR</span>
      {msg && <p><b>{msg}</b></p>}
      <div className="card">
        <h2>Register player</h2>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="number" placeholder="Birth year" value={form.birthYear} onChange={(e) => setForm({ ...form, birthYear: e.target.value })} />
        <input type="number" placeholder="Shirt #" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
        <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
          {["GK", "DF", "MF", "FW"].map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={form.teamId} onChange={(e) => setForm({ ...form, teamId: e.target.value })}>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button onClick={() => run(() => api("/api/players", form), "Player registered")}>Register</button>
      </div>
      <div className="card">
        <h2>Load results</h2>
        {fixtures.map((f) => {
          const s = scores[f.id] ?? [String(f.homeGoals ?? ""), String(f.awayGoals ?? "")];
          return (
            <div key={f.id}>
              {f.date} · {f.home}
              <input style={{ width: 55 }} type="number" value={s[0]} onChange={(e) => setScores({ ...scores, [f.id]: [e.target.value, s[1]] })} />
              -
              <input style={{ width: 55 }} type="number" value={s[1]} onChange={(e) => setScores({ ...scores, [f.id]: [s[0], e.target.value] })} />
              {f.away}
              <button onClick={() => run(() => api(`/api/matches/${f.id}/result`, { homeGoals: s[0], awayGoals: s[1] }), "Result saved")}>Save</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

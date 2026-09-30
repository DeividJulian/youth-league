import { StandingRow } from "@/services/StandingsStrategy";

export function Standings({ rows }: { rows: StandingRow[] }) {
  return (
    <table>
      <thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th></tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.teamId}><td>{i + 1}</td><td>{r.teamName}</td><td>{r.played}</td><td>{r.won}</td><td>{r.drawn}</td><td>{r.lost}</td><td>{r.goalsFor}</td><td>{r.goalsAgainst}</td><td><b>{r.points}</b></td></tr>
        ))}
      </tbody>
    </table>
  );
}

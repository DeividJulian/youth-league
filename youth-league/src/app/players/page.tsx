import Link from "next/link";
import { getLeagueService } from "@/lib/container";

// ISR: static page regenerated at most every 60s (and on demand after admin changes).
export const revalidate = 60;

export default async function PlayersPage() {
  const players = await getLeagueService().listPlayers();
  return (
    <>
      <h1>Players</h1><span className="badge">ISR · 60s</span>
      <table>
        <thead><tr><th>#</th><th>Name</th><th>Team</th><th>Pos</th></tr></thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}><td>{p.number}</td><td><Link href={`/players/${p.id}`}>{p.name}</Link></td><td>{p.team}</td><td>{p.position}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { notFound } from "next/navigation";
import { getLeagueService } from "@/lib/container";

export const revalidate = 60;

// Pre-render known players at build; new ones are generated on first request (ISR).
export async function generateStaticParams() {
  const players = await getLeagueService().listPlayers();
  return players.map((p) => ({ id: p.id }));
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getLeagueService().getPlayerView(id);
  if (!player) notFound();
  return (
    <div className="card">
      <h1>#{player.number} {player.name}</h1>
      <p>Team: {player.team}<br />Position: {player.position}<br />Born: {player.birthYear}</p>
      <span className="badge">ISR · 60s</span>
    </div>
  );
}

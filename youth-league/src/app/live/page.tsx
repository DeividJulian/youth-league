import { FixtureList } from "@/components/FixtureList";
import { Standings } from "@/components/Standings";
import { getLeagueService } from "@/lib/container";

// SSR: rendered on every request, never cached.
export const dynamic = "force-dynamic";

export default async function LivePage() {
  const service = getLeagueService();
  const [standings, fixtures] = await Promise.all([service.getStandings(), service.getFixtures()]);
  return (
    <>
      <h1>Live scores &amp; standings</h1><span className="badge">SSR</span>
      <h2>Standings</h2><Standings rows={standings} />
      <h2>Results</h2><FixtureList fixtures={fixtures.filter((f) => f.homeGoals !== null)} />
    </>
  );
}

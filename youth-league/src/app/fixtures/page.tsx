import { FixtureList } from "@/components/FixtureList";
import { getLeagueService } from "@/lib/container";

// ISR
export const revalidate = 60;

export default async function FixturesPage() {
  const fixtures = await getLeagueService().getFixtures();
  return (<><h1>Fixtures</h1><span className="badge">ISR · 60s</span><FixtureList fixtures={fixtures} /></>);
}

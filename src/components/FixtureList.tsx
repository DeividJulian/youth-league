import { FixtureView } from "@/services/LeagueService";

export function FixtureList({ fixtures }: { fixtures: FixtureView[] }) {
  return (
    <table>
      <tbody>
        {fixtures.map((f) => (
          <tr key={f.id}>
            <td>{f.date}</td><td>{f.home}</td>
            <td><b>{f.homeGoals === null ? "vs" : `${f.homeGoals} - ${f.awayGoals}`}</b></td>
            <td>{f.away}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

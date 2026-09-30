import { Match } from "@/domain/Match";
import { Team } from "@/domain/Team";

export interface StandingRow {
  teamId: string; teamName: string; played: number; won: number; drawn: number;
  lost: number; goalsFor: number; goalsAgainst: number; points: number;
}

/** Strategy pattern: change scoring/tie-break rules by adding a new implementation. */
export interface StandingsStrategy {
  calculate(teams: Team[], matches: Match[]): StandingRow[];
}

export class ClassicStandingsStrategy implements StandingsStrategy {
  constructor(private readonly winPoints = 3, private readonly drawPoints = 1) {}

  calculate(teams: Team[], matches: Match[]): StandingRow[] {
    const rows = new Map<string, StandingRow>(
      teams.map((t) => [t.id, { teamId: t.id, teamName: t.name, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }]),
    );
    for (const m of matches.filter((x) => x.isPlayed)) {
      this.apply(rows.get(m.homeTeamId)!, m.homeGoals!, m.awayGoals!);
      this.apply(rows.get(m.awayTeamId)!, m.awayGoals!, m.homeGoals!);
    }
    return [...rows.values()].sort(
      (a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || b.goalsFor - a.goalsFor,
    );
  }

  private apply(row: StandingRow, gf: number, ga: number) {
    row.played++; row.goalsFor += gf; row.goalsAgainst += ga;
    if (gf > ga) { row.won++; row.points += this.winPoints; }
    else if (gf === ga) { row.drawn++; row.points += this.drawPoints; }
    else row.lost++;
  }
}

import { Match } from "@/domain/Match";
import { Player } from "@/domain/Player";
import { Team } from "@/domain/Team";
import { LeagueRepository } from "./LeagueRepository";

export class InMemoryLeagueRepository implements LeagueRepository {
  private teams: Team[] = ["Eagles", "Lions", "Sharks", "Wolves"].map((n, i) => new Team(`t${i + 1}`, `${n} U15`));
  private players: Player[] = [];
  private matches: Match[] = [];

  constructor() {
    const names = ["Leo Ruiz", "Sam Torres", "Dan Vega", "Ivan Mora", "Kai Soto", "Noah Paz", "Eli Cruz", "Max Rey"];
    names.forEach((n, i) => {
      const pos = (["GK", "DF", "MF", "FW"] as const)[i % 4];
      this.players.push(new Player(`p${i + 1}`, n, 2010 + (i % 2), pos, `t${(i % 4) + 1}`, Math.floor(i / 4) + 1));
    });
    const pairs = [["t1", "t2"], ["t3", "t4"], ["t1", "t3"], ["t2", "t4"], ["t1", "t4"], ["t2", "t3"]];
    pairs.forEach(([h, a], i) => {
      const m = new Match(`m${i + 1}`, h, a, `2026-10-${String(4 + i * 7).padStart(2, "0")}`);
      if (i < 2) m.setResult(i + 2, i);
      this.matches.push(m);
    });
  }

  async getTeams() { return this.teams; }
  async getPlayers() { return this.players; }
  async getPlayer(id: string) { return this.players.find((p) => p.id === id); }
  async addPlayer(player: Player) { this.players.push(player); }
  async getMatches() { return this.matches; }
  async getMatch(id: string) { return this.matches.find((m) => m.id === id); }
}

import { Player, Position } from "@/domain/Player";
import { LeagueRepository } from "@/repositories/LeagueRepository";
import { StandingRow, StandingsStrategy } from "./StandingsStrategy";

export interface NewPlayerInput { name: string; birthYear: number; position: Position; teamId: string; number: number }
export interface FixtureView { id: string; date: string; home: string; away: string; homeGoals: number | null; awayGoals: number | null }
export interface PlayerView { id: string; name: string; birthYear: number; position: Position; number: number; team: string }

export class LeagueService {
  constructor(private readonly repo: LeagueRepository, private readonly standings: StandingsStrategy) {}

  async getTeams() { return this.repo.getTeams(); }

  async listPlayers(): Promise<PlayerView[]> {
    const [players, teams] = await Promise.all([this.repo.getPlayers(), this.repo.getTeams()]);
    return players.map((p) => ({ id: p.id, name: p.name, birthYear: p.birthYear, position: p.position, number: p.number, team: teams.find((t) => t.id === p.teamId)?.name ?? "-" }));
  }

  async getPlayerView(id: string) { return (await this.listPlayers()).find((p) => p.id === id); }

  async registerPlayer(input: NewPlayerInput): Promise<Player> {
    const [teams, players] = await Promise.all([this.repo.getTeams(), this.repo.getPlayers()]);
    if (!teams.some((t) => t.id === input.teamId)) throw new Error("Team not found");
    if (players.some((p) => p.teamId === input.teamId && p.number === input.number)) throw new Error("Shirt number already taken in this team");
    const player = new Player(crypto.randomUUID(), input.name, input.birthYear, input.position, input.teamId, input.number);
    await this.repo.addPlayer(player);
    return player;
  }

  async getFixtures(): Promise<FixtureView[]> {
    const [matches, teams] = await Promise.all([this.repo.getMatches(), this.repo.getTeams()]);
    const name = (id: string) => teams.find((t) => t.id === id)?.name ?? "-";
    return matches.map((m) => ({ id: m.id, date: m.date, home: name(m.homeTeamId), away: name(m.awayTeamId), homeGoals: m.homeGoals, awayGoals: m.awayGoals }));
  }

  async recordResult(matchId: string, home: number, away: number): Promise<void> {
    const match = await this.repo.getMatch(matchId);
    if (!match) throw new Error("Match not found");
    match.setResult(home, away);
  }

  async getStandings(): Promise<StandingRow[]> {
    const [teams, matches] = await Promise.all([this.repo.getTeams(), this.repo.getMatches()]);
    return this.standings.calculate(teams, matches);
  }
}

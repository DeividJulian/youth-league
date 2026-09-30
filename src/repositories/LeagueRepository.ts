import { Match } from "@/domain/Match";
import { Player } from "@/domain/Player";
import { Team } from "@/domain/Team";

/** Abstraction: swap the in-memory implementation for a real DB without touching services. */
export interface LeagueRepository {
  getTeams(): Promise<Team[]>;
  getPlayers(): Promise<Player[]>;
  getPlayer(id: string): Promise<Player | undefined>;
  addPlayer(player: Player): Promise<void>;
  getMatches(): Promise<Match[]>;
  getMatch(id: string): Promise<Match | undefined>;
}

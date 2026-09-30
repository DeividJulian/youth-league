import { InMemoryLeagueRepository } from "@/repositories/InMemoryLeagueRepository";
import { LeagueService } from "@/services/LeagueService";
import { ClassicStandingsStrategy } from "@/services/StandingsStrategy";

// Singleton stored on globalThis so it survives hot reloads in dev.
const g = globalThis as unknown as { __leagueService?: LeagueService };

export function getLeagueService(): LeagueService {
  return (g.__leagueService ??= new LeagueService(new InMemoryLeagueRepository(), new ClassicStandingsStrategy()));
}

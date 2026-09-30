export class Match {
  constructor(
    public readonly id: string,
    public readonly homeTeamId: string,
    public readonly awayTeamId: string,
    public readonly date: string,
    public homeGoals: number | null = null,
    public awayGoals: number | null = null,
  ) {
    if (homeTeamId === awayTeamId) throw new Error("A team cannot play itself");
  }

  get isPlayed(): boolean {
    return this.homeGoals !== null && this.awayGoals !== null;
  }

  setResult(home: number, away: number): void {
    if (![home, away].every((g) => Number.isInteger(g) && g >= 0)) {
      throw new Error("Goals must be non-negative integers");
    }
    this.homeGoals = home;
    this.awayGoals = away;
  }
}

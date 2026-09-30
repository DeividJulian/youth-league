export type Position = "GK" | "DF" | "MF" | "FW";
export const POSITIONS: Position[] = ["GK", "DF", "MF", "FW"];

export class Player {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly birthYear: number,
    public readonly position: Position,
    public readonly teamId: string,
    public readonly number: number,
  ) {
    if (!name.trim()) throw new Error("Player name is required");
    if (!POSITIONS.includes(position)) throw new Error("Invalid position");
    if (number < 1 || number > 99) throw new Error("Shirt number must be 1-99");
  }
}

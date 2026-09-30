import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { getLeagueService } from "@/lib/container";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const player = await getLeagueService().registerPlayer({
      name: String(b.name ?? ""), birthYear: Number(b.birthYear), position: b.position, teamId: String(b.teamId), number: Number(b.number),
    });
    revalidatePath("/players"); // refresh the ISR page on demand
    return NextResponse.json(player, { status: 201 });
  } catch (e) { return fail(e); }
}

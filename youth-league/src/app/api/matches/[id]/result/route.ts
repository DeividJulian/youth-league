import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { getLeagueService } from "@/lib/container";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await req.json();
    await getLeagueService().recordResult(id, Number(b.homeGoals), Number(b.awayGoals));
    revalidatePath("/fixtures");
    revalidatePath("/live");
    return NextResponse.json({ ok: true });
  } catch (e) { return fail(e); }
}

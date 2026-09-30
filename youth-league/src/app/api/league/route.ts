import { NextResponse } from "next/server";
import { getLeagueService } from "@/lib/container";

export const dynamic = "force-dynamic";

export async function GET() {
  const service = getLeagueService();
  const [teams, fixtures] = await Promise.all([service.getTeams(), service.getFixtures()]);
  return NextResponse.json({ teams, fixtures });
}

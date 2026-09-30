import { NextResponse } from "next/server";

export function fail(e: unknown, status = 400) {
  return NextResponse.json({ error: e instanceof Error ? e.message : "Unexpected error" }, { status });
}

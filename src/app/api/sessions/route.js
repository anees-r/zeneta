import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllSessions, createSession } from "@/lib/queries";

export async function GET() {
  try {
    const sessions = await getAllSessions();
    return NextResponse.json(sessions);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { gameSlug } = await req.json();
    if (!gameSlug) return NextResponse.json({ error: "gameSlug is required" }, { status: 400 });
    const created = await createSession(gameSlug);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Failed to create session" }, { status: 409 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllGames, createGame } from "@/lib/queries";

export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json(games);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const game = await createGame(name.trim());
    return NextResponse.json(game, { status: 201 });
  } catch (e) {
    if (e.message?.includes("unique")) {
      return NextResponse.json({ error: "Game already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
  }
}

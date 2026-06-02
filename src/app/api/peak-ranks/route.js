import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllPeakRanks, upsertPeakRank } from "@/lib/queries";

export async function GET() {
  try {
    const ranks = await getAllPeakRanks();
    return NextResponse.json(ranks);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch peak ranks" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { gameSlug, rank, subheading } = await req.json();
    if (!gameSlug) return NextResponse.json({ error: "gameSlug required" }, { status: 400 });
    const updated = await upsertPeakRank(gameSlug, rank || "", subheading || "");
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update peak rank" }, { status: 500 });
  }
}

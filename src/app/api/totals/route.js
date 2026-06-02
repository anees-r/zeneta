import { NextResponse } from "next/server";
import { getGameTotals } from "@/lib/queries";

export async function GET() {
  try {
    const totals = await getGameTotals();
    return NextResponse.json(totals);
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

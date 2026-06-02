import { NextResponse } from "next/server";
import { getOverlayData } from "@/lib/queries";

// Public endpoint — polled by OBS overlay pages every 5s
export async function GET(req, { params }) {
  try {
    const data = await getOverlayData(params.game);
    if (!data) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch overlay data" }, { status: 500 });
  }
}

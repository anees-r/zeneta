import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateSession, endSession, deleteSession } from "@/lib/queries";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    let updated;

    if (body.action === "end") {
      updated = await endSession(Number(params.id));
    } else {
      updated = await updateSession(Number(params.id), {
        wins:   body.wins,
        losses: body.losses,
      });
    }

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await deleteSession(Number(params.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}

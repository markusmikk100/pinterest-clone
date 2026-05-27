import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const board = await prisma.board.findUnique({ where: { id } });
    if (!board) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (board.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const pinId = typeof body.pinId === "string" ? body.pinId : null;

    if (pinId) {
      await prisma.boardPin.deleteMany({ where: { boardId: id, pinId } });
      return NextResponse.json({ success: true });
    }

    await prisma.boardPin.deleteMany({ where: { boardId: id } });
    await prisma.board.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete board error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
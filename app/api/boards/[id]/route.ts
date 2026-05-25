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

    const board = await prisma.board.findUnique({ where: { id } });
    if (!board) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Unlink pins from board before deleting
    await prisma.pin.updateMany({
      where: { boardId: id },
      data: { boardId: null },
    });

    await prisma.board.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete board error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
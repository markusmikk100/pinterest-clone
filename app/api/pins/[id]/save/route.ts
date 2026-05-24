import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const existing = await prisma.save.findUnique({
      where: { userId_pinId: { userId: user.id, pinId: id } },
    });

    if (existing) {
      await prisma.save.delete({
        where: { userId_pinId: { userId: user.id, pinId: id } },
      });
      return NextResponse.json({ saved: false });
    }

    await prisma.save.create({
      data: { userId: user.id, pinId: id },
    });

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
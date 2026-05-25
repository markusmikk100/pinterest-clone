import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json([], { status: 200 });

    const { searchParams } = new URL(req.url);
    const full = searchParams.get("full");

    const boards = await prisma.board.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: full ? {
        pins: { take: 3, select: { imageUrl: true } },
        _count: { select: { pins: true } },
      } : undefined,
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error("Get boards error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const board = await prisma.board.create({
      data: { name, userId: user.id },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error("Create board error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}